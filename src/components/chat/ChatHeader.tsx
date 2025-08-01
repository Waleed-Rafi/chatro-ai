import { ChevronDown } from 'lucide-react';

import { Button } from '@/components/ui/button';

import { ArrowRight } from '../icons/ArrowRight';

import { HistoryPopover } from './HistoryPopover';
import { ModelSelector } from './ModelSelector';

interface ChatHeaderProps {
  selectedModel?: string;
  onModelSelect?: (modelName: string) => void;
  isSidebarCollapsed: boolean;
  onToggleSidebar: () => void;
  onLogin: () => void;
  isLoggedIn: boolean;
  showBorder?: boolean;
  onOpenUpgrade: () => void;
}

export const ChatHeader = ({
  selectedModel = 'OpenAI GPT-4o-mini',
  onModelSelect,
  isSidebarCollapsed,
  onToggleSidebar,
  onLogin,
  isLoggedIn,
  showBorder = false,
  onOpenUpgrade,
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
              <ArrowRight size={18} className='text-sidebar-foreground' />
            </Button>
          )}

          <ModelSelector
            selectedModel={selectedModel}
            onModelSelect={onModelSelect}
          >
            <Button
              variant='ghost'
              className='text-white bg-[#2a2a2a] hover:bg-[#2a2a2aaa] rounded-full flex items-center space-x-2'
            >
              <span>{selectedModel}</span>
              <ChevronDown size={16} />
            </Button>
          </ModelSelector>
        </div>

        {isLoggedIn ? (
          <div className='flex items-center space-x-2'>
            {/* <Button
              variant='ghost'
              size='sm'
              className='text-gray-400 hover:text-white'
              onClick={onOpenUsage}
            >
              <span className='mr-1'>⚡</span>
              Usage
            </Button> */}
            {/* upgrade to pro button */}
            <Button
              size='sm'
              className='bg-blue-600 hover:bg-blue-700 text-white px-5 rounded-full'
              onClick={onOpenUpgrade}
            >
              Upgrade
            </Button>
            <HistoryPopover>
              <Button
                variant='ghost'
                size='sm'
                className='text-white bg-[#2a2a2a] hover:bg-[#2a2a2aaa] rounded-full flex items-center space-x-2'
              >
                <span className='mr-1'>🕒</span>
                History
              </Button>
            </HistoryPopover>
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
            <ModelSelector
              selectedModel={selectedModel}
              onModelSelect={onModelSelect}
            >
              <Button
                variant='ghost'
                className='text-white hover:bg-[#2a2a2a] flex items-center space-x-2 min-w-0 flex-1 justify-start px-3 py-2'
              >
                <span className='truncate text-sm'>{selectedModel}</span>
                <ChevronDown size={14} className='flex-shrink-0' />
              </Button>
            </ModelSelector>
          </div>

          {isLoggedIn ? (
            <div className='flex items-center space-x-1 flex-shrink-0'>
              <HistoryPopover>
                <Button
                  variant='ghost'
                  size='sm'
                  className='text-gray-400 hover:text-white p-2'
                >
                  <span className='text-lg'>🕒</span>
                </Button>
              </HistoryPopover>
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
