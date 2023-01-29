import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import SignUpForm from './screens/SignUpForm';
import ProfileScreen from './screens/ProfileScreen';

import { auth } from './firebase';
import { login, logout, selectUser } from './features/userSlice';

import './App.css';



function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();


  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((userAuth) => {
      if(userAuth) {
        dispatch(
          login({
            uid: userAuth.uid,
            email: userAuth.email
          })
        );
      } else {
        dispatch(logout());

      }
    });
    return unsubscribe;
  }, [dispatch]);

  
  return (
    <div className="app">
      <Routes>
          <Route index element={
            !user? <LoginScreen /> : <HomeScreen />
          } />

          <Route path='/signup' element={<SignUpForm/>}/> 
          <Route path='/profile' element={<ProfileScreen />}/>
      </Routes>
    </div>
  );
}

export default App;
