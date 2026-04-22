const API_BASE_URL = `http://localhost:3000`

async function getGames() {
    try {
        const response = await fetch(`${API_BASE_URL}/games`, { method: 'GET' })
        if (!response.ok) {
            const errorText = await response.text()
            throw new Error(errorText || 'Failed to fetch games')
        }
        console.log('Fetched games from database successfully! ☺︎')
        return response.json()
    }
    catch (error) {
        console.error(error.message || 'Failed to fetch games from database. ☹︎')
        return []
    }
}

async function addGame(title, genre, imageURL) {
    try {
        const response = await fetch(`${API_BASE_URL}/games`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title, genre, imageURL })
        })
        if (!response.ok) {
            const errorText = await response.text()
            throw new Error(errorText || 'Failed to add game to database')
        }
        console.log('Added game to database successfully! ☺︎')
    }
    catch (error) {
        console.error(error.message || 'Failed to add game to database. ☹︎')
    }
}

export {
    getGames,
    addGame
}