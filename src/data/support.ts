export interface SupportFAQ {
  question: string;
  answer: string;
}

export const supportFAQs: SupportFAQ[] = [
  {
    question: 'What can I use Chatro for?',
    answer:
      'Chatro is an AI-powered chat assistant that can help you with writing, coding, analysis, creative tasks, and much more. You can ask questions, get explanations, brainstorm ideas, or have conversations',
  },
  {
    question: 'What platforms is Chatro available on?',
    answer:
      "Chatro is available as a web application that works on all modern browsers across desktop, tablet, and mobile devices. We're also working on dedicated mobile apps for iOS and Android.",
  },
  {
    question: 'How do I get started with Chatro?',
    answer:
      'Getting started is easy! Simply create an account, choose your preferred AI model, and start chatting. You can ask questions, request help with tasks, or engage in creative conversations right away.',
  },
  {
    question: 'What are the different pricing plans?',
    answer:
      'We offer a free tier with basic features, and premium plans with advanced capabilities like longer conversations, priority support, and access to more powerful AI models. Check our pricing page for details.',
  },
  {
    question: 'Is my personal data safe and secure when using Chatro?',
    answer:
      "Yes, we take data security very seriously. All conversations are encrypted, we don't store personal data unnecessarily, and we follow industry-standard security practices to protect",
  },
  {
    question: 'Can I share my account with others?',
    answer:
      'Each Chatro account is intended for individual use. Sharing accounts may violate our terms of service and could result in reduced performance or account limitations.',
  },
  {
    question: 'How can I contact support?',
    answer:
      'You can reach our support team through the contact form on this page, or email us directly at support@chatro.com. We typically respond within 24 hours.',
  },
  {
    question: 'How can I report a bug to the developer?',
    answer:
      'Please report bugs through our support channels or email bugs@chatro.com with a detailed description of the issue, steps to reproduce it, and any error messages you encountered.',
  },
  {
    question: 'Can I switch between AI models?',
    answer:
      'Yes! Pro subscribers can switch between multiple AI models including OpenAI GPT-4.1, OpenAI o1-mini (Beta), Google Gemini 2.5 Flash, X AI Grok 3 Mini, Deepseek R1, and Anthropic Claude models.',
  },
  {
    question: "What's new in Image Generation?",
    answer:
      'Our Image Generation feature allows you to create high-quality images from text descriptions. Pro users get 240 images per month with advanced customization options and faster generation times.',
  },
  {
    question: 'What file types are supported for upload?',
    answer:
      'Pro users can upload and analyze various file types including PDFs, Word documents, Excel spreadsheets, PowerPoint presentations, text files, images (JPG, PNG, GIF), and more.',
  },
  {
    question: 'How can I cancel my subscription?',
    answer:
      "You can cancel your subscription at any time through your account settings. Your access will continue until the end of your current billing period, and you won't be charged for the next cycle.",
  },
];

export const supportContact = {
  email: 'support@chatro.com',
  bugsEmail: 'bugs@chatro.com',
  responseTime: '24 hours',
};
