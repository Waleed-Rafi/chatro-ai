import {
  Edit3,
  ImageIcon,
  Code,
  Eye,
  Link,
  HelpCircle,
  FileText,
  BarChart,
  Infinity,
  Globe,
} from 'lucide-react';

import { Button } from '@/components/ui/button';

export const QuickActions = () => {
  const actions = [
    {
      icon: Edit3,
      label: 'Help me write',
      bgColor: 'bg-red-500',
      isPro: false,
    },
    {
      icon: ImageIcon,
      label: 'Create images',
      bgColor: 'bg-purple-500',
      isPro: true,
    },
    { icon: Code, label: 'Code', bgColor: 'bg-blue-500', isPro: false },
    { icon: Eye, label: 'Analyze image', bgColor: 'bg-green-500', isPro: true },
    {
      icon: Link,
      label: 'Summarize link',
      bgColor: 'bg-blue-600',
      isPro: true,
    },
    {
      icon: HelpCircle,
      label: 'Get advice',
      bgColor: 'bg-purple-600',
      isPro: false,
    },
    {
      icon: FileText,
      label: 'Process doc',
      bgColor: 'bg-red-600',
      isPro: true,
    },
    {
      icon: BarChart,
      label: 'Analyze data',
      bgColor: 'bg-orange-500',
      isPro: true,
    },
    {
      icon: Infinity,
      label: 'Brainstorm',
      bgColor: 'bg-pink-500',
      isPro: false,
    },
    { icon: Globe, label: 'Web search', bgColor: 'bg-indigo-500', isPro: true },
  ];

  return (
    <div className='grid grid-cols-5 gap-4 max-w-2xl mx-auto'>
      {actions.map((action, index) => (
        <div key={index} className='flex flex-col items-center'>
          <Button
            variant='ghost'
            className='w-16 h-16 rounded-2xl p-0 mb-2 hover:scale-105 transition-transform duration-200'
            style={{ backgroundColor: action.bgColor }}
          >
            <action.icon size={24} className='text-white' />
          </Button>
          <div className='text-center'>
            <span className='text-sm text-foreground block'>
              {action.label}
            </span>
            {action.isPro && (
              <span className='text-xs bg-blue-600 text-white px-1.5 py-0.5 rounded mt-1 inline-block'>
                Pro
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
