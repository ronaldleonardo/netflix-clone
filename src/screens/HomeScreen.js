import React, { useState, useEffect } from 'react';
import Nav from '../Nav';
import Banner from '../Banner';
import requests from '../Requests';
import Row from '../Row';
import db from '../firebase';

import './HomeScreen.css';


const HomeScreen = () => {

	// const [subscription, setSubscription] = useState(null);

	// useEffect(() => {
	// 	db.collection('customers')
	// 	.doc(user.uid)
	// 	.collection('subscriptions')
	// 	.get()
	// 	.then(querySnapshot => {
	// 		querySnapshot.forEach(async subscription => {
	// 			setSubscription({
	// 				role: subscription.data().role,
	// 			})
	// 		})
	// 	})
	// },[user.uid])

	return (
		<div className='homeScreen'>
			<Nav />
			<Banner />
			<Row 
				title='TRENDING NOW'
				fetchUrl={requests.fetchTrending}
				isLargeRow
			/>
			
			<Row title='Netflix Originals' fetchUrl={requests.fetchNetflix0riginals}/>
			<Row title='Top Rated' fetchUrl={requests.fetchTopRated}/>
			<Row title='Action Movies' fetchUrl={requests.fetchActionMovies}/>
			<Row title='Comedy Movies' fetchUrl={requests.fetchComedyMovies}/>
			<Row title='Horror Movies' fetchUrl={requests.fetchHorrorMovies}/>
			<Row title='Romance Movies' fetchUrl={requests.fetchRomanceMovies}/>
			<Row title='Documentaries' fetchUrl={requests.fetchDocumentaries}/>
		</div>
	);
}

export default HomeScreen;