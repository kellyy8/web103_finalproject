import React, { useState, useEffect } from 'react'

export default function Searchbar({ allGames, setGames }) {
    const [searchValue, setSearchValue] = useState('')

    useEffect(() => {
        const normalizedSearchValue = searchValue.trim().toLowerCase()
        const filteredGames = (allGames || []).filter((game) => {
            return (
                game.title.toLowerCase().includes(normalizedSearchValue) ||
                game.genre.toLowerCase().includes(normalizedSearchValue)
            )
        })

        setGames(normalizedSearchValue ? filteredGames : allGames || [])
    }, [searchValue, allGames, setGames])

    return (
        <div>
            <input
                type='text'
                placeholder='Search games by name or genre...'
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
            />
        </div>
    )
}