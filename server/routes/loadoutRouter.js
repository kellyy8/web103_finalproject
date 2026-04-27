import express from 'express'
import {
  getAllLoadouts,
  getLoadoutById,
  createLoadout,
  addItemToLoadout,
} from '../controllers/loadoutController.js'

const router = express.Router()

router.get('/', getAllLoadouts)
router.get('/:id', getLoadoutById)
router.post('/', createLoadout)
router.post('/:id/items', addItemToLoadout)

export default router