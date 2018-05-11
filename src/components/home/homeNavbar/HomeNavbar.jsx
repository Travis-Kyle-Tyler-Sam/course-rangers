import React from 'react';
import Login from '../../Login';
import './HomeNavbar.css';

import navbarLogo from '../../../images/logo-home-1.png';

export default function HomeNavbar() {
    return (
        <header>
            <div className='top-navbar'>
                <div>
                    <h2>Elearning</h2>
                </div>
                <div>
                    <img src={navbarLogo} alt=""/>
                </div>
                <div className='Reg-log-section'>
                    <a href={process.env.REACT_APP_LOGIN}>Register </a>
                    <span>/</span>
                    <a href={process.env.REACT_APP_LOGIN}> Login</a>
                </div>
            </div>
        </header>
    )
}
