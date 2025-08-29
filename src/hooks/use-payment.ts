import { useCallback, useState } from 'react';

import { getStripe } from '@/lib/stripe-client';
import { SubscriptionPlan } from '@/types/payment';

interface UsePaymentReturn {
  isLoading: boolean;
  error: string | null;
  createCheckoutSession: (
    plan: SubscriptionPlan,
    userEmail?: string
  ) => Promise<void>;
  clearError: () => void;
}

export const usePayment = (): UsePaymentReturn => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const createCheckoutSession = useCallback(
    async (plan: SubscriptionPlan, userEmail?: string) => {
      setIsLoading(true);
      setError(null);

      try {
        const stripe = await getStripe();
        if (!stripe) {
          throw new Error(
            'Stripe is not configured. Please check your environment variables.'
          );
        }

        // Create checkout session via our API
        const response = await fetch('/api/stripe/create-checkout-session', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            priceId: plan.stripePriceId,
            successUrl: `${window.location.origin}/payment/success?plan=${plan.id}`,
            cancelUrl: `${window.location.origin}/payment/cancel`,
            customerEmail: userEmail, // Pass user email if available
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(
            errorData.error || 'Failed to create checkout session'
          );
        }

        const { url } = await response.json();

        if (url) {
          // Redirect to Stripe Checkout
          window.location.href = url;
        } else {
          throw new Error('No checkout URL received');
        }
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : 'An unexpected error occurred';
        setError(errorMessage);
        console.error('Payment error:', err);
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  return {
    isLoading,
    error,
    createCheckoutSession,
    clearError,
  };
};
