import pool from '../config/database.js'
import '../config/dotenv.js'

// GET /games - get all games
async function getGames (req, res) {
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
    }
    catch (error) {
        return res.status(500).json({ error: `Failed to fetch games: ${error.message}` })
    }
}

// GET /games/:id - get game with id `id`
async function getSingleGame (req, res) {
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
    }
    catch (error) {
        return res.status(500).json({ error: `Failed to fetch game with id ${id}: ${error.message}` })
    }
}

// POST /games - add new game to database
async function addGame (req, res) {
    try {
        var { title, genre, imageURL } = req.body
        if (!title) {
            return res.status(400).json({ error: 'Game title is required.'})
        }
        if (!imageURL) {
            imageURL = 'https://www.shutterstock.com/image-vector/default-ui-image-placeholder-wireframes-600nw-1037719192.jpg'
        }

        const query = `
        INSERT INTO games (title, genre, image)
        VALUES ($1, $2, $3)
        RETURNING *;
        `
        const result = await pool.query(query, [title, genre, imageURL])
        console.log('Added game to database successfully! ☺︎')
        return res.status(201).json(result.rows[0])
    }
    catch (error) {
        return res.status(500).json({ error: `Failed to add game: ${error.message}` })
    }
}

export {
    getGames,
    getSingleGame,
    addGame
}