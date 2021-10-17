import React from 'react';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import Payment from '../Payment/Payment';

const PUBLIC_KEY = "pk_test_51Jh9HIHGbiSpfczp0OElcCMspTX0Xk094ninLTlO5lumRzkPsW6bqFPYuLZKxQfGPZ5Qyf8OGys0rjZ0ENz8GTXk00zxUTx0F4";

const stripeTestPromise = loadStripe(PUBLIC_KEY);

export default function StripeContainer({open, setOpen, success, setSuccess, fetchProducts, subTotal, cartId}) {
    return (
        <Elements stripe={stripeTestPromise}>
            <Payment setOpen={setOpen} open={open} success={success} setSuccess={setSuccess} fetchProducts={fetchProducts} subTotal={subTotal} cartId={cartId} />
        </Elements>
    )
}