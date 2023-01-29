import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { auth } from '../firebase';
import { selectUser } from '../features/userSlice';

import Nav from '../Nav';
import PlansScreen from './PlansScreen';
import './ProfileScreen.css';

const ProfileScreen = () => {
    const user = useSelector(selectUser);

    return(
        <div className='profileScreen'>
            <Nav />
            <div className='profileScreen__body'>
                <h1>Edit Profile</h1>
                <div className='profileScreen__info'>
                    <img
                        src='https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png'
                        alt='profile__avatar' />

                    <div className='profileScreen__details'>
                        <h2>{user.email}</h2>
                        <div className='profileScreen__plans'>
                            <h3>Plans</h3>

                            <PlansScreen />
                            <Link to='/'>
                                <button 
                                    className='profileScreen__signOut'
                                    onClick={() => auth.signOut()}>
                                        Sign Out
                                </button>
                            </Link>
                        </div>
                    </div>

                </div>
                
            </div>
        </div>
    );
};

export default ProfileScreen;