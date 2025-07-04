import { ChevronDown, Menu } from 'lucide-react';

import { Button } from '@/components/ui/button';

interface ChatHeaderProps {
  onOpenModelSelector: () => void;
  onOpenUsage: () => void;
  onOpenHistory: () => void;
  isSidebarCollapsed: boolean;
  onToggleSidebar: () => void;
  onLogin: () => void;
  isLoggedIn: boolean;
  showBorder?: boolean;
}

export const ChatHeader = ({
  onOpenModelSelector,
  onOpenUsage,
  onOpenHistory,
  isSidebarCollapsed,
  onToggleSidebar,
  onLogin,
  isLoggedIn,
  showBorder = false,
}: ChatHeaderProps) => {
  return (
    <>
      {/* Desktop Header */}
      <div
        className={`hidden md:flex items-center justify-between p-4 ${
          showBorder ? 'border-b border-[#2a2a2a]' : ''
        }`}
      >
        <div className='flex items-center space-x-3'>
          {isSidebarCollapsed && (
            <Button
              variant='ghost'
              size='sm'
              onClick={onToggleSidebar}
              className='text-gray-400 hover:text-white'
            >
              <Menu size={16} />
            </Button>
          )}

          <Button
            variant='ghost'
            onClick={onOpenModelSelector}
            className='text-white bg-[#1a1a1a] hover:bg-[#1a1a1aaa] rounded-full flex items-center space-x-2'
          >
            <span>OpenAI GPT-4o-mini</span>
            <ChevronDown size={16} />
          </Button>
        </div>

        {isLoggedIn ? (
          <div className='flex items-center space-x-2'>
            <Button
              variant='ghost'
              size='sm'
              className='text-gray-400 hover:text-white'
              onClick={onOpenUsage}
            >
              <span className='mr-1'>⚡</span>
              Usage
            </Button>
            <Button
              variant='ghost'
              size='sm'
              className='text-gray-400 hover:text-white'
              onClick={onOpenHistory}
            >
              <span className='mr-1'>🕒</span>
              History
            </Button>
          </div>
        ) : (
          <div className='flex items-center space-x-2'>
            <Button
              className='bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full'
              size='sm'
              onClick={onLogin}
            >
              Login
            </Button>
          </div>
        )}
      </div>

      {/* Mobile Header */}
      <div
        className={`md:hidden fixed top-0 left-0 right-0 bg-[#1a1a1a] p-4 z-30 ${
          showBorder ? 'border-b border-[#2a2a2a]' : ''
        }`}
      >
        <div className='flex items-center justify-between'>
          <div className='flex items-center space-x-2 flex-1 min-w-0'>
            <Button
              variant='ghost'
              onClick={onOpenModelSelector}
              className='text-white hover:bg-[#2a2a2a] flex items-center space-x-2 min-w-0 flex-1 justify-start px-3 py-2'
            >
              <span className='truncate text-sm'>OpenAI GPT-4o-mini</span>
              <ChevronDown size={14} className='flex-shrink-0' />
            </Button>
          </div>

          {isLoggedIn ? (
            <div className='flex items-center space-x-1 flex-shrink-0'>
              <Button
                variant='ghost'
                size='sm'
                className='text-gray-400 hover:text-white p-2'
                onClick={onOpenUsage}
              >
                <span className='text-lg'>⚡</span>
              </Button>
              <Button
                variant='ghost'
                size='sm'
                className='text-gray-400 hover:text-white p-2'
                onClick={onOpenHistory}
              >
                <span className='text-lg'>🕒</span>
              </Button>
            </div>
          ) : (
            <Button
              className='bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full'
              size='sm'
              onClick={onLogin}
            >
              Login
            </Button>
          )}
        </div>
      </div>
    </>
  );
};
