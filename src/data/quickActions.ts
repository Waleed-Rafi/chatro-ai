export interface QuickAction {
  icon: string; // Icon component name
  label: string;
  isPro?: boolean;
  onClick?: () => void;
}

export const quickActions: QuickAction[] = [
  { icon: 'Pencil', label: 'Help me write' },
  { icon: 'GalleryColored', label: 'Create images', isPro: true },
  { icon: 'Code', label: 'Code' },
  { icon: 'Eye', label: 'Analyze image', isPro: true },
  { icon: 'Chain', label: 'Summarize', isPro: true },
  { icon: 'QuestionMark', label: 'Get advice' },
  { icon: 'Doc', label: 'Process doc', isPro: true },
  { icon: 'Graph', label: 'Analyze data', isPro: true },
  { icon: 'Glasses', label: 'Brainstorm' },
  { icon: 'Globe', label: 'Web search' },
];
