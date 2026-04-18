import pool from './database.js'
import './dotenv.js'

async function createDatabase() {
    const createGamesTableQuery = `
    CREATE TABLE IF NOT EXISTS games (
        game_id SERIAL PRIMARY KEY,
        title VARCHAR(20) NOT NULL,
        genre VARCHAR(20) NOT NULL,
        date_added TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    `
    const dropGamesTableQuery = 'DROP TABLE IF EXISTS games;'

    const createItemsTableQuery = `
    CREATE TABLE IF NOT EXISTS items (
        item_id SERIAL PRIMARY KEY,
        game_id INTEGER REFERENCES games(game_id),
        name VARCHAR(20) NOT NULL,
        type VARCHAR(20),
        rarity VARCHAR(20),
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
        name VARCHAR(20) NOT NULL,
        description TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    `
    const dropLoadoutsTableQuery = 'DROP TABLE IF EXISTS loadouts;'

    try {
        await pool.query(dropItemsTableQuery)
        await pool.query(dropLoadoutsTableQuery)
        await pool.query(dropGamesTableQuery)
        
        await pool.query(createGamesTableQuery)
        console.log('Table "Games" is ready.')

        await pool.query(createItemsTableQuery)
        console.log('Table "Items" is ready.')
        
        await pool.query(createLoadoutsTableQuery)
        console.log('Table "Loadouts" is ready.')
        
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