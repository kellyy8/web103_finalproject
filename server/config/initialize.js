import pool from './database.js'
import games from '../data/sample.js'

const createGamesTableQuery = `
CREATE TABLE IF NOT EXISTS games (
    game_id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    genre VARCHAR(255) NOT NULL,
    image TEXT,
    date_added TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
`

const createItemsTableQuery = `
CREATE TABLE IF NOT EXISTS items (
    item_id SERIAL PRIMARY KEY,
    game_id INTEGER REFERENCES games(game_id),
    name VARCHAR(255) NOT NULL,
    type VARCHAR(255),
    rarity VARCHAR(255),
    quantity INTEGER,
    power INTEGER,
    description TEXT,
    date_added TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
`

const createLoadoutsTableQuery = `
CREATE TABLE IF NOT EXISTS loadouts (
    loadout_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
`

const createLoadoutItemsTableQuery = `
CREATE TABLE IF NOT EXISTS loadout_items (
    loadout_id INTEGER REFERENCES loadouts(loadout_id) ON DELETE CASCADE,
    item_id INTEGER REFERENCES items(item_id) ON DELETE CASCADE,
    PRIMARY KEY (loadout_id, item_id)
);
`

const insertGameQuery = `
INSERT INTO games (title, genre, image)
VALUES ($1, $2, $3);
`

async function seedGamesIfEmpty() {
    const countResult = await pool.query('SELECT COUNT(*)::int AS count FROM games;')
    const gameCount = countResult.rows[0]?.count ?? 0

    if (gameCount > 0) {
        console.log('Seed skipped: games table already has data.')
        return
    }

    for (const game of games) {
        await pool.query(insertGameQuery, [game.title, game.genre, game.image])
    }
    console.log('Sample games seeded successfully.')
}

async function initializeDatabase() {
    await pool.query(createGamesTableQuery)
    await pool.query(createItemsTableQuery)
    await pool.query(createLoadoutsTableQuery)
    await pool.query(createLoadoutItemsTableQuery)
    console.log('Database tables are ready.')

    await seedGamesIfEmpty()
}

export {
    initializeDatabase
}
