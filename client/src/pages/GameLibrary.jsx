import React, { useState, useEffect } from 'react'
import Searchbar from '../components/Searchbar'
import GameCard from '../components/GameCard'
import { getGames } from '../services/gameAPI'
import '../css/GameLibrary.css'
import AddGameModal from '../components/AddGameModal'

export default function GameLibrary () {
    const [allGames, setAllGames] = useState([])
    const [games, setGames] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    // For AddGameModal
    const [open, setOpen] = useState(false)
    const handleOpen = () => { setOpen(true) }
    const handleClose = () => { setOpen(false) }
    const handleGameAdded = (newGame) => {
        // When a new game is added, update the list of games displayed on frontend.
        setGames((currentGames) => [newGame, ...currentGames])
        setAllGames((currentGames) => [newGame, ...currentGames])
    }

    useEffect(() => {
        // Use `getGames` API to fetch games from database
        const loadGames = async () => {
            try {
                const data = await getGames()
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
        <div className='game-library-page'>
            <header className='game-library-hero'>
                <h1>Your Game Library</h1>
                <h2>Manage your game collection and inventory items</h2>
            </header>

            <div className='game-library-toolbar'>
                <Searchbar
                    allGames={allGames}
                    setGames={setGames}
                />
                <button className='game-library-add-button' onClick={handleOpen}>+ Add Game</button>
            </div>

            {open &&
                <AddGameModal
                    open={open}
                    handleClose={handleClose}
                    onGameAdded={handleGameAdded}
                />
            }

            {(games && games.length != 0) ?
                <div className='game-library-grid'>
                    {games.map((game, _) => 
                        <GameCard
                            key={game.game_id}
                            gameId={game.game_id}
                            title={game.title}
                            genre={game.genre}
                            date={game.date_added}
                            image={game.image}
                            itemCount={game.item_count}
                        />
                    )}
                </div>
                :
                <div className='game-library-empty'>No games to display.</div>
            }
        </div>
    )
}