interface QuickAction {
  icon: string;
  label: string;
  isPro?: boolean;
  onClick?: () => void;
}

interface QuickActionsProps {
  onActionClick?: (action: QuickAction) => void;
}

const quickActions: QuickAction[] = [
  { icon: '✏️', label: 'Help me write' },
  { icon: '🎨', label: 'Create images', isPro: true },
  { icon: '💻', label: 'Code' },
  { icon: '👁️', label: 'Analyze image', isPro: true },
  { icon: '🔗', label: 'Summarize link', isPro: true },
  { icon: '❓', label: 'Get advice' },
  // { icon: '📄', label: 'Process doc', isPro: true },
  // { icon: '📊', label: 'Analyze data', isPro: true },
  { icon: '∞', label: 'Brainstorm' },
  { icon: '🌐', label: 'Web search' },
];

export const QuickActions = ({ onActionClick }: QuickActionsProps) => {
  const handleActionClick = (action: QuickAction) => {
    onActionClick?.(action);
  };

  return (
    <>
      <div className='grid grid-cols-3 md:grid-cols-4 mb-6 justify-center items-center'>
        {quickActions.slice(0, 4).map((action, index) => (
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
      <div className='hidden sm:grid grid-cols-3 md:grid-cols-4'>
        {quickActions.slice(4).map((action, index) => (
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
