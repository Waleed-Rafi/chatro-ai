import Stripe from 'stripe';

// Initialize Stripe with secret key (server-side only)
export const stripe = process.env.STRIPE_SECRET_KEY
  ? new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2025-08-27.basil',
      typescript: true,
    })
  : null;

// Subscription plans configuration
export const SUBSCRIPTION_PLANS = [
  {
    id: 'pro-monthly',
    name: 'Pro Monthly',
    price: 2000, // $20.00 in cents
    currency: 'usd',
    interval: 'month' as const,
    intervalCount: 1,
    stripePriceId: process.env.STRIPE_MONTHLY_PRICE_ID || 'price_monthly_test',
    features: [
      'Advanced AI Models',
      'AI Chat without limits',
      '3600 images with Image Generation',
      'Unlimited access to AI Search Engine',
      'Chat with PDF, docs, and more',
      'Unlimited file uploads',
    ],
    badge: '',
    highlight: false,
    dailyPrice: 0.67,
  },
  {
    id: 'pro-quarterly',
    name: 'Pro Quarterly',
    price: 4500, // $45.00 in cents
    currency: 'usd',
    interval: 'month' as const,
    intervalCount: 3,
    stripePriceId:
      process.env.STRIPE_QUARTERLY_PRICE_ID || 'price_quarterly_test',
    features: [
      'Advanced AI Models',
      'AI Chat without limits',
      '3600 images with Image Generation',
      'Unlimited access to AI Search Engine',
      'Chat with PDF, docs, and more',
      'Unlimited file uploads',
    ],
    badge: 'Save 25%',
    highlight: true,
    badgeColor: 'bg-red-500',
    dailyPrice: 0.5,
  },
  {
    id: 'pro-yearly',
    name: 'Pro Yearly',
    price: 9000, // $90.00 in cents
    currency: 'usd',
    interval: 'year' as const,
    intervalCount: 1,
    stripePriceId: process.env.STRIPE_YEARLY_PRICE_ID || 'price_yearly_test',
    features: [
      'Advanced AI Models',
      'AI Chat without limits',
      '3600 images with Image Generation',
      'Unlimited access to AI Search Engine',
      'Chat with PDF, docs, and more',
      'Unlimited file uploads',
    ],
    badge: 'Save 63%',
    highlight: false,
    badgeColor: 'bg-yellow-400',
    dailyPrice: 0.25,
  },
];

// Utility function to format Stripe amounts
export const formatStripeAmount = (
  amount: number,
  currency: string = 'usd'
): string => {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency.toUpperCase(),
  });

  return formatter.format(amount / 100);
};

// Function to get subscription plans (server-side only)
export const getSubscriptionPlans = () => {
  return SUBSCRIPTION_PLANS;
};
