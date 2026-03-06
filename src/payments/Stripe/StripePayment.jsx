import { EmbeddedCheckout, EmbeddedCheckoutProvider } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js'
import React, { useCallback } from 'react'
import { useParams } from 'react-router-dom';

const stripePromise = loadStripe("pk_test_XXXX");

export const StripePayment = () => {

 const { id } = useParams();

 const fetchClientSecret = useCallback(() => {

   const token = localStorage.getItem('token');

   return fetch("https://global-backend.sezan.xyz/api/create-checkout-session", {
     method: "POST",
     headers: {
       "Content-Type": "application/json",
       Authorization: `Bearer ${token}`,
     },
     body: JSON.stringify({
        transaction_id: id 
     })
   })
   .then(res => res.json())
   .then(data => data.clientSecret);

 }, [id]);

 const options = { fetchClientSecret };

 return (
   <div id="checkout">
     <EmbeddedCheckoutProvider
       stripe={stripePromise}
       options={options}
     >
       <EmbeddedCheckout />
     </EmbeddedCheckoutProvider>
   </div>
 )
}

export default StripePayment;