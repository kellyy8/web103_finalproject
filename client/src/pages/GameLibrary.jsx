import React, { useState, useEffect } from 'react'
import Searchbar from '../components/Searchbar'
import GameCard from '../components/GameCard'
import { getGames } from '../services/gameAPI'

export default function GameLibrary () {
    const [allGames, setAllGames] = useState([])
    const [games, setGames] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        // Use `getGames` API to fetch games from database
        const loadGames = async () => {
            try {
                const data = await getGames()
                console.log(data)
                setGames(Array.isArray(data) ? data : [])
                setAllGames(Array.isArray(data) ? data : [])
            } catch (error) {
                setError('Failed to load game library.')
            } finally {
                setLoading(false)
            }
        }

        loadGames()
    }, [])

    if (loading) {
        return <div>Loading games...</div>
    }

    if (error) {
        return <div>{error}</div>
    }

    return (
        <div>
            <h1>Your Game Library</h1>
            <h2>Manage your game collection and inventory items</h2>
            <div>
                <Searchbar
                    allGames={allGames}
                    setGames={setGames}
                />
                <button>+ Add Game</button>
            </div>

            {(games && games.length != 0) ?
                <div>
                    {games.map((game, _) => 
                        <GameCard
                            key={game.game_id}
                            gameId={game.game_id}
                            title={game.title}
                            genre={game.genre}
                            date={game.date_added}
                            image={game.image}
                        />
                    )}
                </div>
                :
                <div>No games to display.</div>
            }
        </div>
    )
}