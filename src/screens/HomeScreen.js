import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Nav from '../Nav';
import Banner from '../Banner';
import requests from '../Requests';
import Row from '../Row';
import db from '../firebase';
import { selectUser } from '../features/userSlice';

import './HomeScreen.css';

const HomeScreen = () => {
	// const [products, setProducts] = useState([]);
	// const [subscription, setSubscription] = useState(null);
	// const user = useSelector(selectUser);

	// useEffect(() => {
    //     db.collection('customers')
    //     .doc(user.uid)
    //     .collection('subscriptions')
    //     .get()
    //     .then(querySnapshot => {
    //         querySnapshot.forEach(async subscription => {
    //             setSubscription({
    //                 role: subscription.data().role,
    //                 current_period_end: subscription.data().current_period_end.seconds,
    //                 current_period_start: subscription.data().current_period_start.seconds,
    //             })
    //         })
    //     });
    // },[user.uid])

    // useEffect(() => {
    //     db.collection('products')
    //     .where('active', '==', true)
    //     .get()
    //     .then((querySnapshot) => {
    //         const products = {};
    //         querySnapshot.forEach(async (productDoc) => {
    //             products[productDoc.id] = productDoc.data();
    //             const priceSnap = await productDoc.ref.collection('prices').get();
    //             priceSnap.docs.forEach((price) => {
    //                 products[productDoc.id].prices = {
    //                     priceId: price.id,
    //                     priceData: price.data(),
    //                 };
    //             });
    //         });
    //         setProducts(products);
    //     });
    // },[]);
	
	// useEffect(subscription => {
	// 	const timer = setTimeout(() => {
	// 	  console.log(subscription)
	// 	}, 6000);
	// 	return () => clearTimeout(timer);
	//   }, []);

	return (
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
	);
}

export default HomeScreen;