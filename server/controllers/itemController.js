import pool from '../config/database.js'
import '../config/dotenv.js'

// POST /inventory/:id - add item to inventory of game with id `id`
async function addItem(req, res) {
    const { id } = req.params
    const gameId = Number.parseInt(id, 10)
    const { name, type, rarity, quantity, power, description } = req.body

    try {
        if (!Number.isInteger(gameId) || gameId <= 0) {
            return res.status(400).json({ error: 'A valid game id is required in the route.' })
        }

        if (!name) {
            return res.status(400).json({ error: 'Item name is required.'})
        }

        const gameCheckQuery = `
        SELECT game_id
        FROM games
        WHERE game_id = $1;
        `
        const gameCheckResult = await pool.query(gameCheckQuery, [gameId])
        if (gameCheckResult.rowCount === 0) {
            return res.status(404).json({ error: `Game with id ${gameId} does not exist.` })
        }

        const normalizedQuantity = Number.parseInt(quantity, 10)
        const normalizedPower = Number.parseInt(power, 10)

        const query = `
        INSERT INTO items (game_id, name, type, rarity, quantity, power, description)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING *;
        `
        const result = await pool.query(query, [
            gameId,
            name,
            type,
            rarity,
            Number.isNaN(normalizedQuantity) ? 1 : normalizedQuantity,
            Number.isNaN(normalizedPower) ? 0 : normalizedPower,
            description
        ])
        return res.status(201).json(result.rows[0])
    }
    catch (error) {
        return res.status(500).json({ error: `Failed to add item to inventory of game with id: ${gameId}. ☹︎ : ${error.message}` })
    }
}

export {
    addItem
}