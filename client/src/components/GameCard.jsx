import React from 'react'
import { Link } from 'react-router-dom'
import '../css/GameCard.css'

export default function GameCard ({ gameId, title, genre, date, image, itemCount = 0 }) {
    const formattedDate = date ? new Date(date).toLocaleDateString() : 'N/A'
    const itemLabel = itemCount === 1 ? 'item' : 'items'

    return (
        <Link className='game-card-link' to={`/inventory/${gameId}`}>
            <article className='game-card'>
                <img className='game-card-image' src={image || ''} alt={title || 'Game cover'} />
                <div className='game-card-content'>
                    <div className='game-card-header'>
                        <h3>{title}</h3>
                        {genre && <span className='game-card-genre'>{genre}</span>}
                    </div>
                    <div className='game-card-footer'>
                        <p>{itemCount} {itemLabel}</p>
                        <p>{formattedDate}</p>
                    </div>
                </div>
            </article>
        </Link>
    )
}