export interface PricingFeature {
  feature: string;
  reply: string | boolean;
  openai: string | boolean;
}

export interface PricingFAQ {
  question: string;
  answer: string;
}

export interface AdditionalFeature {
  feature: string;
  reply: string | boolean;
  openai: string | boolean;
}

export const pricingFAQs: PricingFAQ[] = [
  {
    question: 'What can I use Chatro for?',
    answer: 'Answer for what you can use Chatro for...',
  },
  {
    question: 'What platforms is Chatro available on?',
    answer: 'Answer about platform availability...',
  },
  {
    question: 'What subscription plans are available?',
    answer: 'Answer about subscription plans...',
  },
  {
    question: 'Can I switch between AI models?',
    answer: 'Answer about switching AI models...',
  },
  {
    question: "What's new in Image Generation?",
    answer: 'Answer about image generation updates...',
  },
  {
    question: 'What file types are supported for upload?',
    answer: 'Answer about supported file types...',
  },
  {
    question: 'Is my personal data safe and secure when using Chatro?',
    answer: 'Answer about data security...',
  },
  {
    question: 'Can I share my account with others?',
    answer: 'Answer about account sharing...',
  },
  {
    question: 'Who do I contact if I have questions or need support?',
    answer: 'Answer about contacting support...',
  },
  {
    question: 'How can I report a bug to the developer?',
    answer: 'Answer about reporting bugs...',
  },
  {
    question: 'How can I cancel my subscription?',
    answer: 'Answer about canceling subscription...',
  },
];

export const pricingFeatures: PricingFeature[] = [
  { feature: 'Chat with links', reply: 'Advanced', openai: 'Limited' },
  { feature: 'Chat with documents', reply: 'Advanced', openai: 'Limited' },
  { feature: 'Analyze data', reply: 'Advanced', openai: 'Limited' },
  { feature: 'Chat with image', reply: true, openai: false },
];

export const additionalFeatures: AdditionalFeature[] = [
  { feature: 'Image Generation', reply: 'Advanced', openai: 'Limited' },
  { feature: 'AI Search Engine', reply: 'Advanced', openai: 'Limited' },
];

export const pricingPlans = {
  free: {
    name: 'Free',
    price: '$0',
    period: '/month',
    description: 'Perfect for getting started with AI',
    features: ['3 messages per day', 'Basic AI models', 'Standard support'],
    excludedFeatures: ['Advanced features'],
    buttonText: 'Get Started Free',
    buttonVariant: 'default' as const,
  },
  pro: {
    name: 'Pro',
    price: '$19',
    period: '/month',
    description: 'For power users and professionals',
    features: [
      'Unlimited messages',
      'All AI models',
      'Priority support',
      'Advanced features',
      'Image generation',
    ],
    excludedFeatures: [],
    buttonText: 'Start Pro Trial',
    buttonVariant: 'default' as const,
    isPopular: true,
  },
};

// Client-safe subscription plans (without environment variables)
export const CLIENT_SUBSCRIPTION_PLANS = [
  {
    id: 'pro-monthly',
    name: 'Pro Monthly',
    price: 2000, // $20.00 in cents
    currency: 'usd',
    interval: 'month' as const,
    intervalCount: 1,
    stripePriceId: 'price_1S1M4XRoCFoQeLKrzGRNUReE', // Hardcoded for client safety
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
    stripePriceId: 'price_1S1M5pRoCFoQeLKrFuV04V70', // Hardcoded for client safety
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
    stripePriceId: 'price_1S1M6sRoCFoQeLKrzYBzYAxY', // Hardcoded for client safety
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

// Client-safe function to get subscription plans
export const getClientSubscriptionPlans = () => {
  return CLIENT_SUBSCRIPTION_PLANS;
};

// Validation function to ensure subscription plans are properly configured
export const validateSubscriptionPlans = () => {
  const errors: string[] = [];

  CLIENT_SUBSCRIPTION_PLANS.forEach((plan, index) => {
    if (!plan.stripePriceId || plan.stripePriceId.startsWith('price_')) {
      errors.push(`Plan ${index + 1} (${plan.name}): Invalid Stripe price ID`);
    }

    if (plan.price <= 0) {
      errors.push(`Plan ${index + 1} (${plan.name}): Invalid price`);
    }

    if (plan.intervalCount <= 0) {
      errors.push(`Plan ${index + 1} (${plan.name}): Invalid interval count`);
    }

    if (plan.dailyPrice <= 0) {
      errors.push(`Plan ${index + 1} (${plan.name}): Invalid daily price`);
    }
  });

  if (errors.length > 0) {
    console.error('Subscription plan validation errors:', errors);
    return false;
  }

  return true;
};

// Validate plans on module load (development only)
if (process.env.NODE_ENV === 'development') {
  validateSubscriptionPlans();
}
