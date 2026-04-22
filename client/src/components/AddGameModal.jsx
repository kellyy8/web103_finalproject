import React, { useState } from 'react'
import { Modal } from '@mui/material'
import { addGame } from '../services/gameAPI'

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
}

export default function AddGameModal({ open, handleOpen, handleClose }) {
    const [title, setTitle] = useState('')
    const [genre, setGenre] = useState('')
    const [imageURL, setImageURL] = useState('')
    const [showTitleErrorMessage, setShowTitleErrorMessage] = useState(false)

    const handleSubmit = () => {
        if (!title) {
            setShowTitleErrorMessage(true)
            return
        }
        addGame(title, genre, imageURL)
        handleClose()
    }

    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby='modal-modal-title'
                aria-describedby='modal-modal-description'
            >
                <div style={style}>
                    <h1>Add New Game</h1>
                    <h2>Add a game to your library. A starter inventory will be automatically created.</h2>
                    {/** GAME TITLE */}
                    <label htmlFor='title'>Title *</label>
                    <input
                        id='title'
                        type='text'
                        placeholder='e.g., Elden Ring'
                        value={title}
                        onChange={(e) => { setTitle(e.target.value); setShowTitleErrorMessage(false) }}
                    />
                    {showTitleErrorMessage && <p>Title cannot be empty.</p>}
                    {/** GAME GENRE */}
                    <label htmlFor='genre'>Genre</label>
                    <input
                        id='genre'
                        type='text'
                        value={genre}
                        placeholder='e.g., Action RPG'
                        onChange={(e) => { setGenre(e.target.value) }}
                    />
                    {/** GAME IMAGE */}
                    <label htmlFor='image-url'>ImageURL</label>
                    <input
                        id='image-url'
                        type='text'
                        value={imageURL}
                        onChange={(e) => { setImageURL(e.target.value) }}
                    />
                    <div>
                        <button onClick={handleClose}>Cancel</button>
                        <button onClick={handleSubmit}>Add Game</button>
                    </div>
                </div>
            </Modal>
        </div>
    )
}