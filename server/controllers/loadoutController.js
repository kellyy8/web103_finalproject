import db from '../config/database.js'

const getAllLoadouts = async (req, res) => {
  try {
    const result = await db.query(
      'SELECT * FROM loadouts ORDER BY created_at DESC'
    )
    res.status(200).json(result.rows)
  } catch (error) {
    console.error('Error fetching loadouts:', error)
    res.status(500).json({ error: 'Failed to fetch loadouts' })
  }
}

const getLoadoutById = async (req, res) => {
  const { id } = req.params

  try {
    const loadoutResult = await db.query(
      'SELECT * FROM loadouts WHERE loadout_id = $1',
      [id]
    )

    if (loadoutResult.rows.length === 0) {
      return res.status(404).json({ error: 'Loadout not found' })
    }

    const itemsResult = await db.query(
      `SELECT i.*
       FROM loadout_items li
       JOIN items i ON li.item_id = i.item_id
       WHERE li.loadout_id = $1`,
      [id]
    )

    res.status(200).json({
      loadout: loadoutResult.rows[0],
      items: itemsResult.rows,
    })
  } catch (error) {
    console.error('Error fetching loadout:', error)
    res.status(500).json({ error: 'Failed to fetch loadout' })
  }
}

const createLoadout = async (req, res) => {
  const { name, description } = req.body

  if (!name || !name.trim()) {
    return res.status(400).json({ error: 'Loadout name is required' })
  }

  try {
    const result = await db.query(
      `INSERT INTO loadouts (name, description, created_at)
       VALUES ($1, $2, NOW())
       RETURNING *`,
      [name.trim(), description || '']
    )

    res.status(201).json(result.rows[0])
  } catch (error) {
    console.error('Error creating loadout:', error)
    res.status(500).json({ error: 'Failed to create loadout' })
  }
}

const addItemToLoadout = async (req, res) => {
  const { id } = req.params
  const { item_id } = req.body

  if (!item_id) {
    return res.status(400).json({ error: 'Item ID is required' })
  }

  try {
    await db.query(
      `INSERT INTO loadout_items (loadout_id, item_id)
       VALUES ($1, $2)`,
      [id, item_id]
    )

    res.status(201).json({ message: 'Item added to loadout successfully' })
  } catch (error) {
    console.error('Error adding item to loadout:', error)
    res.status(500).json({ error: 'Failed to add item to loadout' })
  }
}

export {
  getAllLoadouts,
  getLoadoutById,
  createLoadout,
  addItemToLoadout,
}