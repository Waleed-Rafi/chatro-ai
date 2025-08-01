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
