import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { selectUser } from '../features/userSlice';
import { loadStripe } from '@stripe/stripe-js';

import db from '../firebase';

import './PlansScreen.css';
import Loader from '../Loader';



const PlansScreen = () => {
    const [products, setProducts] = useState([]);
    const user = useSelector(selectUser);
    const [subscription, setSubscription] = useState(null);
    const [isLoadingButton, setIsLoadingButton] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        db.collection('customers')
        .doc(user.uid)
        .collection('subscriptions')
        .get()
        .then(querySnapshot => {
            querySnapshot.forEach(async subscription => {
                setSubscription({
                    role: subscription.data().role,
                    current_period_end: subscription.data().current_period_end.seconds,
                    current_period_start: subscription.data().current_period_start.seconds,
                })
            })
        });

    },[user.uid])

    useEffect(() => {
        db.collection('products')
        .where('active', '==', true)
        .get()
        .then((querySnapshot) => {
            const products = {};
            querySnapshot.forEach(async (productDoc) => {
                products[productDoc.id] = productDoc.data();
                const priceSnap = await productDoc.ref.collection('prices').get();
                priceSnap.docs.forEach((price) => {
                    products[productDoc.id].prices = {
                        priceId: price.id,
                        priceData: price.data(),
                    };
                });
            });
            setProducts(products);
            setIsLoading(false);

        });

    },[]);

    const loadCheckout = async (priceId) => {
        setIsLoadingButton(true);

        const docRef = await db
        .collection('customers')
        .doc(user.uid)
        .collection('checkout_sessions')
        .add({
            price: priceId,
            success_url: window.location.origin,
            cancel_url: window.location.origin,
        });

        docRef.onSnapshot( async (snap) => {
            const { error, sessionId } = snap.data();

            if (error) {
                // Show an error to your customer and
                // inspect your Cloud Function logs in the Firebase console
                alert(`An error occured: ${error.message}`);
            }

            if (sessionId){
                // We have a session, let's redirect to Checkoout
                // Init Stripe

                const stripe = await loadStripe('pk_test_51MVVt5EbST6SUaYMRSxlwJbMiYH6Fe2J84Fcav1BIVwiOs8vWVztALUwec3UiCBZrQClSdvbilK9GV7utcgeAjNd00rf27EM1K');
                stripe.redirectToCheckout({ sessionId });   
            }
            setIsLoadingButton(false);

        });

    };

    return(
        <div className='plansScreen'>
            <br />

            <div className='plansScreen__loader'>
               {isLoading && <Loader/>}
            </div>

            {subscription && (
            <p>
                Renewal date: {' '} 
                {new Date(
                    subscription?.current_period_end * 1000
                    ).toLocaleDateString()} 
            </p>
            )}
            {Object.entries(products).map(([productId, productData]) => {
                // add some logic to check if user subs is active
                const isCurrentPackage = productData.name
                    ?.toLowerCase()
                    .includes(subscription?.role);

                return (
                    <div key={productId} className={`${isCurrentPackage && 'plansScreen__plan--disabled'} plansScreen__plan`}>
                        <div className='plansScreen__info'>
                            <h5>{productData.name}</h5>
                            <h6>{productData.description}</h6>
                        </div>
                        {!isLoadingButton &&  <button onClick={() => !isCurrentPackage && loadCheckout(productData?.prices?.priceId)}>
                            {isCurrentPackage ? 'Current Package' : 'Subscribe'}
                        </button>}
                        {isLoadingButton &&  <button disabled>
                            <Loader/>
                        </button>}
                       
                    </div>
                );
            })}
        </div>
    );
};

export default PlansScreen;
