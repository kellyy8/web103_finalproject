import React from 'react'
import '../App.css'
import '../css/Navigation.css'

// TODO: Placeholder navigation bar. Update to match wireframe.
const Navigation = () => {
    return (
        <nav>
            <ul>
                <li><h1>GameVault</h1></li>
            </ul>

            <ul>
                <li><a href='/' role='button'>Library</a></li>
                <li><a href='/loadouts' role='button'>Loadouts</a></li>
            </ul>
            
        </nav>
    )
}

export default Navigation