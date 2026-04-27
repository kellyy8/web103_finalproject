import pool from '../config/database.js'
import '../config/dotenv.js'

const starterItems = [
  {
    name: 'Starter Sword',
    type: 'Weapon',
    rarity: 'Common',
    quantity: 1,
    power: 10,
    description: 'A basic sword to begin your journey.',
  },
  {
    name: 'Leather Armor',
    type: 'Armor',
    rarity: 'Common',
    quantity: 1,
    power: 5,
    description: 'Basic protective gear.',
  },
  {
    name: 'Health Potion',
    type: 'Consumable',
    rarity: 'Common',
    quantity: 3,
    power: 0,
    description: 'Restores health during battle.',
  },
]

// GET /games
async function getGames(req, res) {
  try {
    const query = `
      SELECT
        g.*,
        COUNT(i.item_id)::int AS item_count
      FROM games g
      LEFT JOIN items i ON i.game_id = g.game_id
      GROUP BY g.game_id
      ORDER BY g.date_added DESC;
    `
    const result = await pool.query(query)
    return res.status(200).json(result.rows)
  } catch (error) {
    return res.status(500).json({ error: `Failed to fetch games: ${error.message}` })
  }
}

// GET /games/:id
async function getSingleGame(req, res) {
  const { id } = req.params

  try {
    const query = `
      SELECT
        g.*,
        COUNT(i.item_id)::int AS item_count
      FROM games g
      LEFT JOIN items i ON i.game_id = g.game_id
      WHERE g.game_id = $1
      GROUP BY g.game_id;
    `
    const result = await pool.query(query, [id])

    if (result.rowCount === 0) {
      return res.status(404).json({ error: `Game with id ${id} does not exist.` })
    }

    return res.status(200).json(result.rows[0])
  } catch (error) {
    return res.status(500).json({ error: `Failed to fetch game with id ${id}: ${error.message}` })
  }
}

// POST /games
async function addGame(req, res) {
  let { title, genre, imageURL } = req.body

  if (!title || !title.trim()) {
    return res.status(400).json({ error: 'Game title is required.' })
  }

  if (!imageURL) {
    imageURL =
      'https://www.shutterstock.com/image-vector/default-ui-image-placeholder-wireframes-600nw-1037719192.jpg'
  }

  const client = await pool.connect()

  try {
    await client.query('BEGIN')

    const gameQuery = `
      INSERT INTO games (title, genre, image)
      VALUES ($1, $2, $3)
      RETURNING *;
    `
    const gameResult = await client.query(gameQuery, [title.trim(), genre || '', imageURL])
    const newGame = gameResult.rows[0]

    for (const item of starterItems) {
      await client.query(
        `
        INSERT INTO items (game_id, name, type, rarity, quantity, power, description)
        VALUES ($1, $2, $3, $4, $5, $6, $7);
        `,
        [
          newGame.game_id,
          item.name,
          item.type,
          item.rarity,
          item.quantity,
          item.power,
          item.description,
        ]
      )
    }

    await client.query('COMMIT')
    console.log('Added game and starter inventory successfully! ☺︎')
    return res.status(201).json(newGame)
  } catch (error) {
    await client.query('ROLLBACK')
    return res.status(500).json({ error: `Failed to add game: ${error.message}` })
  } finally {
    client.release()
  }
}

export {
  getGames,
  getSingleGame,
  addGame,
}