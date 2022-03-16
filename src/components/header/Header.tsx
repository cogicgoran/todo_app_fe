import React from 'react'
import './Header.css';
import logo from '../../assets/images/logo_AragoK.png';
import { useLogout } from '../../hooks/useLogout';

function Header(): JSX.Element {
    const { handleLogout } = useLogout();
    return (
        <header className='header'>
            <img className='header__logo' src={logo} alt="Logo" />
            <div className='logout__container'>
                <button className='logout-btn' onClick={handleLogout}>LOGOUT</button>
            </div>
        </header>
    )
}

export default Header