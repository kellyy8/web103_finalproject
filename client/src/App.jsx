import React from 'react'
import { useRoutes } from 'react-router-dom'
import Navigation from './components/Navigation'
import GameLibrary from './pages/GameLibrary'
import GameInventory from './pages/GameInventory'
import UniversalLoadouts from './pages/UniversalLoadouts'
import './App.css'

const App = () => {
  let element = useRoutes([
    {
      path: '/',
      element: <GameLibrary />
    },
    {
      path:'/inventory/:id',
      element: <GameInventory />
    },
    {
      path: '/loadouts',
      element: <UniversalLoadouts />
    }
  ])

  return (
    <div className='app'>

      <Navigation />

      { element }

    </div>
  )
}

export default App