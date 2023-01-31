import React, { useEffect } from 'react';
import Nav from '../Nav';
import Banner from '../Banner';
import requests from '../Requests';
import Row from '../Row';

import { selectUser } from '../features/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { selectSubscription, subscribed } from '../features/subscriptionSlice';
import db from '../firebase';

import './HomeScreen.css';
import ProfileScreen from './ProfileScreen';

const HomeScreen = () => {
    const user = useSelector(selectUser);
    const dispatch = useDispatch();
    const subscriptionCheck = useSelector(selectSubscription);



    useEffect(() => {
        db.collection('customers')
        .doc(user.uid)
        .collection('subscriptions')
        .get()
        .then(querySnapshot => {
            querySnapshot.forEach(async subscription => {
                dispatch(subscribed({
                    role: subscription.data().role,
                    current_period_end: subscription.data().current_period_end.seconds,
                    current_period_start: subscription.data().current_period_start.seconds,
                }))
            })
        })
    },[user.uid, dispatch])

	return (
        <div>
            { !subscriptionCheck ? <ProfileScreen /> : (
               <div className='homeScreen'>
                   <Nav />
                   <Banner />
                   <Row 
                   title='TRENDING NOW'
                   fetchUrl={requests.fetchTrending}
                   isLargeRow
                   />
                   <Row title='Top Rated' fetchUrl={requests.fetchTopRated}/>
                   <Row title='Netflix Originals' fetchUrl={requests.fetchNetflix0riginals}/>
                   <Row title='Action Movies' fetchUrl={requests.fetchActionMovies}/>
                   <Row title='Comedy Movies' fetchUrl={requests.fetchComedyMovies}/>
                   <Row title='Horror Movies' fetchUrl={requests.fetchHorrorMovies}/>
                   <Row title='Romance Movies' fetchUrl={requests.fetchRomanceMovies}/>
                   <Row title='Documentaries' fetchUrl={requests.fetchDocumentaries}/>
                </div> 
                )
            }
        </div>
    );
};

export default HomeScreen;

