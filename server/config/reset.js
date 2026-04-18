import pool from './database.js'
import './dotenv.js'

async function createDatabase() {
    const createGamesTableQuery = `
    CREATE TABLE IF NOT EXISTS games (
        game_id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        genre VARCHAR(255) NOT NULL,
        date_added TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    `
    const dropGamesTableQuery = 'DROP TABLE IF EXISTS games;'

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
    const dropItemsTableQuery = 'DROP TABLE IF EXISTS items;'

    const createLoadoutsTableQuery = `
    CREATE TABLE IF NOT EXISTS loadouts (
        loadout_id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    `
    const dropLoadoutsTableQuery = 'DROP TABLE IF EXISTS loadouts;'

    const createLoadoutItemsTableQuery = `
    CREATE TABLE IF NOT EXISTS loadout_items (
        loadout_id INTEGER REFERENCES loadouts(loadout_id) ON DELETE CASCADE,
        item_id INTEGER REFERENCES items(item_id) ON DELETE CASCADE,
        PRIMARY KEY (loadout_id, item_id)
    );
    `
    const dropLoadoutItemsTableQuery = 'DROP TABLE IF EXISTS loadout_items;'

    try {
        await pool.query(dropLoadoutItemsTableQuery)
        await pool.query(dropItemsTableQuery)
        await pool.query(dropLoadoutsTableQuery)
        await pool.query(dropGamesTableQuery)
        
        await pool.query(createGamesTableQuery)
        console.log('Table "games" is ready.')

        await pool.query(createItemsTableQuery)
        console.log('Table "items" is ready.')
        
        await pool.query(createLoadoutsTableQuery)
        console.log('Table "loadouts" is ready.')

        await pool.query(createLoadoutItemsTableQuery)
        console.log('Table "loadout_items" is ready.')
        
        console.log('Database created successfully! ☺︎')
    }
    catch (error) {
        console.error('Database creation failed. ☹︎', error)
    }
    finally {
        // close pool
        await pool.end()
    }
}

createDatabase()