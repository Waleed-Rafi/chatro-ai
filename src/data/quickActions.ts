export interface QuickAction {
  icon: string; // Icon component name
  label: string;
  isPro?: boolean;
  onClick?: () => void;
  suggestions?: string[]; // Array of suggestions for this action
}

export const quickActions: QuickAction[] = [
  {
    icon: 'Pencil',
    label: 'Help me write',
    suggestions: [
      'Help me write a speech',
      'Help me write a poem',
      'Help me write a blog post',
      'Help me write a professional email',
    ],
  },
  {
    icon: 'GalleryColored',
    label: 'Create images',
    isPro: true,
    suggestions: [
      'Create a logo for my business',
      'Create a social media post',
      'Create a book cover',
      'Create a poster design',
    ],
  },
  {
    icon: 'Code',
    label: 'Code',
    suggestions: [
      'Help me debug this code',
      'Write a function to sort data',
      'Create a React component',
      'Optimize this algorithm',
    ],
  },
  {
    icon: 'Eye',
    label: 'Analyze image',
    isPro: true,
    suggestions: [
      "What's in this image?",
      'Describe this photo',
      'Extract text from image',
      'Identify objects in image',
    ],
  },
  {
    icon: 'Chain',
    label: 'Summarize',
    isPro: true,
    suggestions: [
      'Summarize this article',
      'Summarize this document',
      'Summarize this video',
      'Summarize this meeting',
    ],
  },
  {
    icon: 'QuestionMark',
    label: 'Get advice',
    suggestions: [
      'Give me career advice',
      'Advice on relationships',
      'Financial planning advice',
      'Health and wellness tips',
    ],
  },
  {
    icon: 'Doc',
    label: 'Process doc',
    isPro: true,
    suggestions: [
      'Extract key information',
      'Convert to different format',
      'Analyze document structure',
      'Find specific data',
      'Compare documents',
    ],
  },
  {
    icon: 'Graph',
    label: 'Analyze data',
    isPro: true,
    suggestions: [
      'Create data visualization',
      'Find trends in data',
      'Calculate statistics',
      'Identify outliers',
    ],
  },
  {
    icon: 'Glasses',
    label: 'Brainstorm',
    suggestions: [
      'Brainstorm business ideas',
      'Creative writing ideas',
      'Marketing strategies',
      'Product features',
      'Problem solutions',
    ],
  },
  {
    icon: 'Globe',
    label: 'Web search',
    suggestions: [
      'Search for latest news',
      'Find product reviews',
      'Research a topic',
      'Find academic papers',
      'Search for tutorials',
    ],
  },
];
