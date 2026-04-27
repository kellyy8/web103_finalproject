import express from 'express'
import path from 'path'
import favicon from 'serve-favicon'
import dotenv from 'dotenv'
import cors from 'cors'

import gameRouter from './routes/gameRouter.js'
import itemRouter from './routes/itemRouter.js'
import loadoutRouter from './routes/loadoutRouter.js'

dotenv.config()

const PORT = process.env.PORT || 3000
const app = express()

app.use(cors())
app.use(express.json())

app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ error: 'Something went wrong on the server.' })
})

if (process.env.NODE_ENV === 'development') {
  app.use(favicon(path.resolve('../', 'client', 'public', 'lightning.png')))
} else if (process.env.NODE_ENV === 'production') {
  app.use(favicon(path.resolve('public', 'lightning.png')))
  app.use(express.static('public'))
}

app.use('/games', gameRouter)
app.use('/inventory', itemRouter)
app.use('/api/loadouts', loadoutRouter)

if (process.env.NODE_ENV === 'production') {
  app.get('/*', (_, res) => res.sendFile(path.resolve('public', 'index.html')))
}

app.listen(PORT, () => {
  console.log(`server listening on http://localhost:${PORT}`)
})