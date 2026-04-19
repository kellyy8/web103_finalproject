import pool from '../config/database.js'
import '../config/dotenv.js'

// GET /games - get all games
async function getGames (req, res) {
    try {
        const query = 'SELECT * FROM games'
        const result = await pool.query(query)
        return res.status(200).json(result.rows)
    }
    catch (error) {
        return res.status(500).json({ error: `Failed to fetch games: ${error}` })
    }
}

export {
    getGames
}