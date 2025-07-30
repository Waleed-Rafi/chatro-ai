export interface AIModel {
  id: string;
  name: string;
  description: string;
  icon: string; // Icon component name
  isPro?: boolean;
  isBeta?: boolean;
  isNew?: boolean;
}

export const aiModels: AIModel[] = [
  {
    id: 'gpt-4o',
    name: 'OpenAI GPT-4o',
    description: 'Most capable model for complex tasks',
    icon: 'ChatGptCircle',
    isPro: true,
  },
  {
    id: 'gpt-4o-mini',
    name: 'OpenAI GPT-4o Mini',
    description: 'Fast and efficient for most tasks',
    icon: 'ChatGptCircle',
  },
  {
    id: 'gemini-2.0-flash',
    name: 'Google Gemini 2.0 Flash',
    description: 'Fast and efficient for most tasks',
    icon: 'GeminiCircle',
    isPro: true,
  },
  {
    id: 'grok-3-mini',
    name: 'X AI Grok 3 Mini',
    description: 'Fast and efficient for most tasks',
    icon: 'GrokCircle',
    isPro: true,
  },
  {
    id: 'claude-3.5-sonnet',
    name: 'Anthropic Claude 3.5 Sonnet',
    description: 'Most capable model for complex tasks',
    icon: 'AnthropicCircle',
    isPro: true,
  },
  {
    id: 'deepseek-r1',
    name: 'Deepseek R1',
    description: 'Fast and efficient for most tasks',
    icon: 'ChatGptCircle',
    isPro: true,
  },
];
