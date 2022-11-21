import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import { useLoaderData, useNavigation } from 'react-router-dom';
import Loading from '../../Shared/Loading/Loading';
import CheckoutForm from './CheckoutForm';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK);

const Payment = () => {
    const booking = useLoaderData()
    const { treatment, price, appointmentDate, slot } = booking;
    // const navigation = useNavigation();

    // if(navigation.state === "loading"){
    //     return <Loading></Loading>
    // }

    return (
        <div>
            <h2 className='text-3xl text-secondary font-bold mb-2 mt-10'>Payment for {treatment}</h2>
            <p className='text-xl'>
                Please Pay <strong>${price}</strong> for your appointment on {appointmentDate} at {slot}
            </p>
            <div className='w-96 my-12'>
                <Elements stripe={stripePromise}>
                    <CheckoutForm 
                        booking={booking}
                    />
                </Elements>
            </div>
        </div>
    );
};

export default Payment;