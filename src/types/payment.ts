export interface SubscriptionPlan {
  id: string;
  name: string;
  price: number; // Price in cents
  currency: string;
  interval: 'month' | 'year'; // Base interval (quarterly uses month with intervalCount: 3)
  intervalCount: number; // Number of base intervals (1 for monthly, 3 for quarterly, 12 for yearly)
  stripePriceId: string;
  features: string[];
  badge?: string;
  badgeColor?: string;
  highlight?: boolean;
  dailyPrice: number; // Calculated daily price for comparison
}

export interface CreateCheckoutSessionRequest {
  priceId: string;
  successUrl: string;
  cancelUrl: string;
  customerEmail?: string;
}

export interface CreateCheckoutSessionResponse {
  sessionId: string;
  url: string;
}
