import {
  Chain,
  Code,
  Doc,
  Eye,
  GalleryColored,
  Glasses,
  Globe,
  Graph,
  Pencil,
  QuestionMark,
} from '../icons';

interface QuickAction {
  icon: React.ReactNode;
  label: string;
  isPro?: boolean;
  onClick?: () => void;
}

interface QuickActionsProps {
  onActionClick?: (action: QuickAction) => void;
}

const quickActions: QuickAction[] = [
  { icon: <Pencil size={32} />, label: 'Help me write' },
  { icon: <GalleryColored size={32} />, label: 'Create images', isPro: true },
  { icon: <Code size={32} />, label: 'Code' },
  { icon: <Eye size={32} />, label: 'Analyze image', isPro: true },
  { icon: <Chain size={32} />, label: 'Summarize link', isPro: true },
  { icon: <QuestionMark size={32} />, label: 'Get advice' },
  { icon: <Doc size={32} />, label: 'Process doc', isPro: true },
  { icon: <Graph size={32} />, label: 'Analyze data', isPro: true },
  { icon: <Glasses size={32} />, label: 'Brainstorm' },
  { icon: <Globe size={32} />, label: 'Web search' },
];

export const QuickActions = ({ onActionClick }: QuickActionsProps) => {
  const handleActionClick = (action: QuickAction) => {
    onActionClick?.(action);
  };

  return (
    <>
      <div className='grid grid-cols-3 md:grid-cols-5 mb-6 justify-center items-center'>
        {quickActions.slice(0, 5).map((action, index) => (
          <div
            key={index}
            className='flex flex-col items-center space-y-2 md:space-y-3'
          >
            <div
              className='w-12 h-12 md:w-16 md:h-16 bg-[#2a2a2a] rounded-2xl flex items-center justify-center relative group hover:bg-[#333] transition-colors cursor-pointer'
              onClick={() => handleActionClick(action)}
            >
              <span className='text-lg md:text-2xl'>{action.icon}</span>
              {action.isPro && (
                <span className='absolute -top-1 -right-1 text-xs bg-purple-600 px-1 py-0.5 rounded text-white'>
                  Pro
                </span>
              )}
            </div>
            <span className='text-xs md:text-sm text-gray-400 text-center'>
              {action.label}
            </span>
          </div>
        ))}
      </div>

      {/* Second Row - Hidden on smallest screens */}
      <div className='hidden sm:grid grid-cols-3 md:grid-cols-5'>
        {quickActions.slice(5).map((action, index) => (
          <div
            key={index + 5}
            className='flex flex-col items-center space-y-2 md:space-y-3'
          >
            <div
              className='w-12 h-12 md:w-16 md:h-16 bg-[#2a2a2a] rounded-2xl flex items-center justify-center relative group hover:bg-[#333] transition-colors cursor-pointer'
              onClick={() => handleActionClick(action)}
            >
              <span className='text-lg md:text-2xl'>{action.icon}</span>
              {action.isPro && (
                <span className='absolute -top-1 -right-1 text-xs bg-purple-600 px-1 py-0.5 rounded text-white'>
                  Pro
                </span>
              )}
            </div>
            <span className='text-xs md:text-sm text-gray-400 text-center'>
              {action.label}
            </span>
          </div>
        ))}
      </div>
    </>
  );
};
