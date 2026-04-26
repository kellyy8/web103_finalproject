import express from 'express'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import favicon from 'serve-favicon'
import dotenv from 'dotenv'
import cors from 'cors'
import { initializeDatabase } from './config/initialize.js'

// TODO: Import routers
import gameRouter from './routes/gameRouter.js'
import itemRouter from './routes/itemRouter.js'

dotenv.config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const serverPublicDir = path.resolve(__dirname, 'public')
const devFaviconPath = path.resolve(__dirname, '../client/public/favicon.svg')
const prodFaviconPath = path.resolve(serverPublicDir, 'favicon.svg')

const PORT = process.env.PORT || 3000

const app = express()

app.use(cors())
app.use(express.json())

if (process.env.NODE_ENV === 'development') {
    if (fs.existsSync(devFaviconPath)) {
        app.use(favicon(devFaviconPath))
    }
}
else if (process.env.NODE_ENV === 'production') {
    if (fs.existsSync(prodFaviconPath)) {
        app.use(favicon(prodFaviconPath))
    }
    app.use(express.static(serverPublicDir))
}

// TODO: Sync routers with endpoints
app.use('/games', gameRouter)
app.use('/inventory', itemRouter)

if (process.env.NODE_ENV === 'production') {
    app.get('/*', (_, res) =>
        res.sendFile(path.resolve(serverPublicDir, 'index.html'))
    )
}

async function startServer() {
    try {
        await initializeDatabase()
        app.listen(PORT, () => {
            console.log(`server listening on http://localhost:${PORT}`)
        })
    }
    catch (error) {
        console.error('Server startup failed during DB initialization.', error)
        process.exit(1)
    }
}

startServer()