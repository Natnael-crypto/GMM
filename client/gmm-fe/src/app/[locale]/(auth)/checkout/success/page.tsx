'use client';

import { CheckoutCompletePage } from '@/components/auth/checkout/checkout-result';
import { constants } from '@/config';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useSearchParams } from 'next/navigation';

const stripePromise = loadStripe(constants.stripe.publicKey);

export default function page() {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutCompletePage />
    </Elements>
  );
}
