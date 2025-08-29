import { loadStripe, Stripe } from '@stripe/stripe-js';

let stripePromise: Promise<Stripe | null>;

export const getStripe = (): Promise<Stripe | null> => {
  if (!stripePromise) {
    const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;

    if (!publishableKey) {
      console.warn(
        'NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY is not set - Stripe will not be available'
      );
      return Promise.resolve(null);
    }

    stripePromise = loadStripe(publishableKey);
  }

  return stripePromise;
};

export const initializeStripe = async (): Promise<Stripe | null> => {
  try {
    const stripe = await getStripe();
    if (!stripe) {
      console.error('Failed to initialize Stripe');
      return null;
    }
    return stripe;
  } catch (error) {
    console.error('Error initializing Stripe:', error);
    return null;
  }
};
