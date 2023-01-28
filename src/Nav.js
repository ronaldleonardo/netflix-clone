import React, { useState, useEffect } from 'react';
import './Nav.css';

const Nav = () => {
    const [show, handleShow] = useState(false);

    const transitionNavBar = () => {
        if(window.scrollY > 100) {
            handleShow(true);
        } else {
            handleShow(false);
        }
    };

    useEffect(()=>{
        window.addEventListener('scroll', transitionNavBar);
        return () => window.removeEventListener('scroll', transitionNavBar);
    },[]);

    return( 
        <div className={`nav ${show && 'nav__black'}`}>
            <div className='nav__contents'>
                <img className='nav__logo' src='https://cdn.cookielaw.org/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png' alt='netflix-logo' />
                <img className='nav__avatar' src='https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png' alt='avatar' /> 
            </div>
        </div>
    );
}

export default Nav;