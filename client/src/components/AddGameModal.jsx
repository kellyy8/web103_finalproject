import React, { useState } from 'react'
import { Modal } from '@mui/material'
import { addGame } from '../services/gameAPI'
import '../css/AddGameModal.css'

export default function AddGameModal({ open, handleClose, onGameAdded }) {
    const [title, setTitle] = useState('')
    const [genre, setGenre] = useState('')
    const [imageURL, setImageURL] = useState('')
    const [showTitleErrorMessage, setShowTitleErrorMessage] = useState(false)

    const handleSubmit = async () => {
        if (!title) {
            setShowTitleErrorMessage(true)
            return
        }

        const createdGame = await addGame(title, genre, imageURL)
        if (createdGame) {
            onGameAdded?.(createdGame)
            handleClose()
        }
    }

    return (
        <Modal
            className='add-game-modal-root'
            open={open}
            onClose={handleClose}
            aria-labelledby='modal-modal-title'
            aria-describedby='modal-modal-description'
        >
            <div className='add-game-modal'>
                <div className='add-game-modal-header'>
                    <h1 id='modal-modal-title'>Add New Game</h1>
                    <button
                        className='add-game-modal-close'
                        onClick={handleClose}
                        aria-label='Close add game modal'
                    >
                        x
                    </button>
                </div>

                <h2 id='modal-modal-description'>
                    Add a game to your library. A starter inventory will be automatically created.
                </h2>

                <div className='add-game-modal-field'>
                    <label htmlFor='title'>Game Name *</label>
                    <input
                        id='title'
                        type='text'
                        placeholder='e.g., Elden Ring'
                        value={title}
                        onChange={(e) => { setTitle(e.target.value); setShowTitleErrorMessage(false); }}
                    />
                    {showTitleErrorMessage && <p className='add-game-modal-error'>Title cannot be empty.</p>}
                </div>

                <div className='add-game-modal-field'>
                    <label htmlFor='genre'>Genre</label>
                    <input
                        id='genre'
                        type='text'
                        value={genre}
                        placeholder='e.g., Action RPG'
                        onChange={(e) => { setGenre(e.target.value) }}
                    />
                </div>

                <div className='add-game-modal-field'>
                    <label htmlFor='image-url'>Image URL</label>
                    <input
                        id='image-url'
                        type='text'
                        value={imageURL}
                        placeholder='https://example.com/image-name.jpg'
                        onChange={(e) => { setImageURL(e.target.value) }}
                    />
                </div>

                <div className='add-game-modal-actions'>
                    <button className='add-game-modal-button-secondary' onClick={handleClose}>Cancel</button>
                    <button className='add-game-modal-button-primary' onClick={handleSubmit}>Add Game</button>
                </div>
            </div>
        </Modal>
    )
}