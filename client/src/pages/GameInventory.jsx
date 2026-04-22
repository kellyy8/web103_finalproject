import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import AddItemModal from '../components/AddItemModal'
import { getSingleGame } from '../services/gameAPI'

// TODO: Partial implementation to test out add item modal.
export default function GameInventory () {
    const { id } = useParams()

    const [title, setTitle] = useState('')
    const [genre, setGenre] = useState('')
    const [itemCount, setItemCount] = useState(0)

    const [allItems, setAllItems] = useState([]) // TODO: Grab items from database.
    const [items, setItems] = useState([]) // use for displaying (filtered) items

    const [open, setOpen] = useState(false)
    const handleOpen = () => { setOpen(true) }
    const handleClose = () => { setOpen(false) }

    const handleAddItem = (newItem) => {
        // When a new item is added, update the list of items displayed on frontend.
        setAllItems((currentItems) => [newItem, ...currentItems])
        setItems((currentItems) => [newItem, ...currentItems])
        setItemCount((count) => count+1)
    }

    useEffect(() => {
        const updateGameDetails = async () => {
            const gameDetails = await getSingleGame(id)
            setTitle(gameDetails.title)
            setGenre(gameDetails.genre)
            setItemCount(gameDetails.item_count)
        }

        updateGameDetails()
    }, [])

    return (
        <div>
            <h1>{title}</h1>
            <h2>{genre}</h2>
            <h2>{itemCount} items</h2>

            <button onClick={handleOpen}>+ Add Item</button>
            {open &&
                <AddItemModal
                    gameId={id}
                    gameTitle={title}
                    open={open}
                    handleClose={handleClose}
                    handleAddItem={handleAddItem}
                />
            }
        </div>
    )
}