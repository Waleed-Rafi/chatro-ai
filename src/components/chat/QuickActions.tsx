import { quickActions as quickActionsData } from '@/data';

import { Chain } from '../icons/Chain';
import { Code } from '../icons/Code';
import { Doc } from '../icons/Doc';
import { Eye } from '../icons/Eye';
import { GalleryColored } from '../icons/GalleryColored';
import { Glasses } from '../icons/Glasses';
import { Globe } from '../icons/Globe';
import { Graph } from '../icons/Graph';
import { Pencil } from '../icons/Pencil';
import { QuestionMark } from '../icons/QuestionMark';

interface QuickAction {
  icon: React.ReactNode;
  label: string;
  isPro?: boolean;
  onClick?: () => void;
}

interface QuickActionsProps {
  onActionClick?: (action: QuickAction) => void;
}

// Icon mapping
const iconMap = {
  Pencil: Pencil,
  GalleryColored: GalleryColored,
  Code: Code,
  Eye: Eye,
  Chain: Chain,
  QuestionMark: QuestionMark,
  Doc: Doc,
  Graph: Graph,
  Glasses: Glasses,
  Globe: Globe,
};

// Convert data to component format
const quickActions: QuickAction[] = quickActionsData.map(action => {
  const IconComponent = iconMap[action.icon as keyof typeof iconMap];
  return {
    icon: <IconComponent size={32} />,
    label: action.label,
    isPro: action.isPro,
    onClick: action.onClick,
  };
});

export const QuickActions = ({ onActionClick }: QuickActionsProps) => {
  const handleActionClick = (action: QuickAction) => {
    onActionClick?.(action);
  };

  return (
    <>
      <div className='grid grid-cols-3 md:grid-cols-5 gap-8 md:gap-10 mb-8 w-full'>
        {quickActions.slice(0, 5).map((action, index) => (
          <div key={index} className='flex flex-col items-center justify-start'>
            <div
              className='w-12 h-12 md:w-16 md:h-16 bg-[#2a2a2a] rounded-2xl flex items-center justify-center relative group hover:bg-[#333] transition-colors cursor-pointer mb-3 flex-shrink-0'
              onClick={() => handleActionClick(action)}
            >
              <span className='text-lg md:text-2xl'>{action.icon}</span>
              {action.isPro && (
                <span className='absolute -top-1 -right-2 text-xs bg-purple-800 px-2 py-0.5 rounded text-white/80 rounded-full'>
                  Pro
                </span>
              )}
            </div>
            <span className='text-xs md:text-sm text-gray-400 text-center leading-relaxed px-1 whitespace-nowrap'>
              {action.label}
            </span>
          </div>
        ))}
      </div>

      {/* Second Row - Hidden on smallest screens */}
      <div className='hidden sm:grid grid-cols-3 md:grid-cols-5 gap-8 md:gap-10 w-full'>
        {quickActions.slice(5).map((action, index) => (
          <div
            key={index + 5}
            className='flex flex-col items-center justify-start'
          >
            <div
              className='w-12 h-12 md:w-16 md:h-16 bg-[#2a2a2a] rounded-2xl flex items-center justify-center relative group hover:bg-[#333] transition-colors cursor-pointer mb-3 flex-shrink-0'
              onClick={() => handleActionClick(action)}
            >
              <span className='text-lg md:text-2xl'>{action.icon}</span>
              {action.isPro && (
                <span className='absolute -top-1 -right-2 text-xs bg-purple-800 px-2 py-0.5 rounded text-white/80 rounded-full'>
                  Pro
                </span>
              )}
            </div>
            <span className='text-xs md:text-sm text-gray-400 text-center leading-relaxed px-1 whitespace-nowrap'>
              {action.label}
            </span>
          </div>
        ))}
      </div>
    </>
  );
};
