const API_BASE_URL = `http://localhost:3000`

async function addItem(gameId, name, type, rarity, quantity, power, description) {
    try {
        const response = await fetch(`${API_BASE_URL}/inventory/${gameId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, type, rarity, quantity, power, description })
        })
        if (!response.ok) {
            const errorText = await response.text()
            throw new Error(errorText || `Failed to add item to inventory of game with id ${gameId}.`)
        }
        console.log(`Added item to inventory of game with id ${gameId} successfully! ☺︎`)
        return response.json()
    }
    catch (error) {
        console.error(error.message || `Failed to add item to inventory of game with id ${gameId}. ☹︎`)
        return null
    }
}

export {
    addItem
}