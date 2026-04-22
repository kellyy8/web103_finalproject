import React, { useState } from 'react'
import { Modal } from '@mui/material'
import { addItem } from '../services/itemAPI'
import '../css/AddItemModal.css'

export default function AddItemModal({ gameId, gameTitle, open, handleClose, handleAddItem }) {
    const [name, setName] = useState('')
    const [showNameErrorMessage, setShowNameErrorMessage] = useState(false)
    const [type, setType] = useState('weapon') // DEFAULT VALUE = FIRST DROPDOWN OPTION
    const [rarity, setRarity] = useState('common') // DEFAULT VALUE = FIRST DROPDOWN OPTION
    const [quantity, setQuantity] = useState(1)
    const [power, setPower] = useState(0)
    const [description, setDescription] = useState('')

    const handleSubmit = async () => {
        if (!name) {
            setShowNameErrorMessage(true)
            return
        }
        const newItem = await addItem(gameId, name, type, rarity, quantity, power, description)
        if (newItem) {
            handleAddItem?.(newItem)
            handleClose()
        }
    }

    return (
        <Modal
            className='add-item-modal-root'
            open={open}
            onClose={handleClose}
            aria-labelledby='modal-modal-title'
            aria-describedby='modal-modal-description'
        >
            <div className='add-item-modal'>
                <div className='add-item-modal-header'>
                    <h1 id='modal-modal-title'>Add New Item</h1>
                    <button
                        className='add-item-modal-close'
                        onClick={handleClose}
                        aria-label='Close add item modal'
                    >
                        x
                    </button>
                </div>

                <h2 id='modal-modal-description'>Add an item to {gameTitle}'s inventory</h2>

                <div className='add-item-modal-field'>
                    <label htmlFor='name'>Item Name *</label>
                    <input
                        className='add-item-modal-name-input'
                        id='name'
                        type='text'
                        placeholder='e.g., Moonveil Katana'
                        value={name}
                        onChange={(e) => { setName(e.target.value); setShowNameErrorMessage(false); }}
                    />
                    {showNameErrorMessage && <p className='add-item-modal-error'>Name cannot be empty.</p>}
                </div>

                <div className='add-item-modal-grid'>
                    <div className='add-item-modal-field'>
                        <label htmlFor='type'>Type</label>
                        <select
                            id='type'
                            value={type}
                            onChange={(e) => { setType(e.target.value) }}
                        >
                            <option value='weapon'>Weapon</option>
                            <option value='armor'>Armor</option>
                            <option value='consumable'>Consumable</option>
                            <option value='material'>Material</option>
                            <option value='accessory'>Accessory</option>
                        </select>
                    </div>

                    <div className='add-item-modal-field'>
                        <label htmlFor='rarity'>Rarity</label>
                        <select
                            id='rarity'
                            value={rarity}
                            onChange={(e) => { setRarity(e.target.value) }}
                        >
                            <option value='common'>Common</option>
                            <option value='uncommon'>Uncommon</option>
                            <option value='rare'>Rare</option>
                            <option value='epic'>Epic</option>
                            <option value='legendary'>Legendary</option>
                        </select>
                    </div>
                </div>

                <div className='add-item-modal-grid'>
                    <div className='add-item-modal-field'>
                        <label htmlFor='quantity'>Quantity</label>
                        <input
                            id='quantity'
                            type='number'
                            value={quantity}
                            min='1'
                            onChange={(e) => { setQuantity(e.target.value) }}
                        />
                    </div>

                    <div className='add-item-modal-field'>
                        <label htmlFor='power'>Power</label>
                        <input
                            id='power'
                            type='number'
                            value={power}
                            min='0'
                            onChange={(e) => { setPower(e.target.value) }}
                        />
                    </div>
                </div>

                <div className='add-item-modal-field'>
                    <label htmlFor='description'>Description</label>
                    <textarea
                        id='description'
                        placeholder='Item description...'
                        value={description}
                        onChange={(e) => { setDescription(e.target.value) }}
                    />
                </div>

                <div className='add-item-modal-actions'>
                    <button className='add-item-modal-button-secondary' onClick={handleClose}>Cancel</button>
                    <button className='add-item-modal-button-primary' onClick={handleSubmit}>Add Item</button>
                </div>
            </div>
        </Modal>
    )
}