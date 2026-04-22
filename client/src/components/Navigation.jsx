import React from 'react'
import '../App.css'
import '../css/Navigation.css'

const Navigation = () => {
    return (
        <nav className='navigation' aria-label='Primary'>
            <a className='navigation-brand' href='/' aria-label='GameVault home'>
                <svg className='navigation-brand-mark' viewBox='0 0 32 32' aria-hidden='true' focusable='false'>
                    <path d='M16 3 5 9v14l11 6 11-6V9L16 3Z' fill='none' stroke='currentColor' strokeWidth='2' strokeLinejoin='round' />
                    <path d='M16 3v26M5 9l11 6 11-6' fill='none' stroke='currentColor' strokeWidth='2' strokeLinejoin='round' />
                </svg>
                <h1>GameVault</h1>
            </a>

            <ul className='navigation-links'>
                <li>
                    <a href='/' className='navigation-link'>
                        <svg className='navigation-link-icon navigation-link-icon-library' viewBox='0 0 24 24' aria-hidden='true' focusable='false'>
                            <path d='M5 4v16M10 8v12M15 6v14M20 10v10' />
                        </svg>
                        <span>Library</span>
                    </a>
                </li>
                <li>
                    <a href='/loadouts' className='navigation-link'>
                        <svg className='navigation-link-icon navigation-link-icon-loadouts' viewBox='0 0 24 24' aria-hidden='true' focusable='false'>
                            <path d='M12 3 4 7.5v9L12 21l8-4.5v-9L12 3Z' />
                            <path d='M12 3v18M4 7.5l8 4.5 8-4.5' />
                        </svg>
                        <span>Loadouts</span>
                    </a>
                </li>
            </ul>
        </nav>
    )
}

export default Navigation