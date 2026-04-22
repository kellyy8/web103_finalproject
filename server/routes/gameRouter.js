import express from 'express'
import {
    getGames,
    addGame
} from '../controllers/gameController.js'

const router = express.Router()

router.get('/', getGames)
router.post('/', addGame)

export default router