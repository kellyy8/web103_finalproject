import express from 'express'
import {
    addItem
} from '../controllers/itemController.js'

const router = express.Router()

router.post('/:id', addItem)

export default router