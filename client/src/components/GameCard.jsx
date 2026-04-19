import React from 'react'
import { Link } from 'react-router-dom'

export default function GameCard ({ title, genre, date, image }) {
    const formattedDate = date ? new Date(date).toLocaleDateString() : 'N/A'

    return (
        <div>
            <img src={image || ''} alt={title || 'Game cover'} />
            <div>
                <h1>{title}</h1>
                <h2>{genre}</h2>
                <div>
                    {/** TODO: Count # of items in each game. */}
                    <p># items</p>
                    <p>{formattedDate}</p>
                </div>
            </div>
        </div>
    )
}