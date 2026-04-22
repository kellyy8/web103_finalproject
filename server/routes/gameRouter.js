import express from 'express'
import {
    getGames,
    getSingleGame,
    addGame
} from '../controllers/gameController.js'

const router = express.Router()

router.get('/', getGames)
router.get('/:id', getSingleGame)
router.post('/', addGame)

export default router