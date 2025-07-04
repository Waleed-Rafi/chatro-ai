import { ChevronDown, Send, Paperclip, Menu, ArrowUp } from 'lucide-react';
import { useState } from 'react';

import { ChatConversation } from './ChatConversation';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface ChatAreaProps {
  onOpenModelSelector: () => void;
  onOpenUsage: () => void;
  onOpenHistory: () => void;
  isSidebarCollapsed: boolean;
  onToggleSidebar: () => void;
}

export const ChatArea = ({
  onOpenModelSelector,
  onOpenUsage,
  onOpenHistory,
  isSidebarCollapsed,
  onToggleSidebar,
}: ChatAreaProps) => {
  const [message, setMessage] = useState('');
  const [isConversationStarted, setIsConversationStarted] = useState(false);
  const [initialMessage, setInitialMessage] = useState('');

  const handleSendMessage = () => {
    if (!message.trim()) return;

    setInitialMessage(message);
    setIsConversationStarted(true);
    setMessage('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // If conversation has started, show the conversation component
  if (isConversationStarted) {
    return (
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ${
          isSidebarCollapsed ? 'md:ml-16' : 'md:ml-64'
        } pt-16 md:pt-0 h-screen`}
      >
        {/* Desktop Header */}
        <div className='hidden md:flex items-center justify-between p-4 border-b border-[#2a2a2a]'>
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
              className='text-white hover:bg-[#1a1a1a] flex items-center space-x-2'
            >
              <span>OpenAI GPT-4o-mini</span>
              <ChevronDown size={16} />
            </Button>
          </div>

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
        </div>

        {/* Mobile Header */}
        <div className='md:hidden fixed top-0 left-0 right-0 bg-[#1a1a1a] p-4 z-30 border-b border-[#2a2a2a]'>
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
          </div>
        </div>

        <ChatConversation initialMessage={initialMessage} />
      </div>
    );
  }

  // Default empty state
  return (
    <div
      className={`flex-1 flex flex-col transition-all duration-300 ${
        isSidebarCollapsed ? 'md:ml-16' : 'md:ml-64'
      } pt-16 md:pt-0`}
    >
      {/* Desktop Header */}
      <div className='hidden md:flex items-center justify-between p-4'>
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
            className='text-white hover:bg-[#1a1a1a] flex items-center space-x-2'
          >
            <span>OpenAI GPT-4o-mini</span>
            <ChevronDown size={16} />
          </Button>
        </div>

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
      </div>

      {/* Mobile Header - Single Row */}
      <div className='md:hidden fixed top-0 left-0 right-0 bg-[#1a1a1a] p-4 z-30'>
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
        </div>
      </div>

      {/* Main Content */}
      <div className='flex-1 flex flex-col items-center justify-center p-4 md:p-8'>
        <div className='text-center max-w-4xl w-full'>
          <h1 className='text-2xl md:text-4xl font-normal text-gray-300 mb-8 md:mb-16'>
            How can I help you today?
          </h1>

          {/* Input Area */}
          <div className='max-w-3xl mx-auto mb-8 md:mb-16'>
            <div className='relative'>
              <div className='flex items-center bg-[#2a2a2a] rounded-full px-4 py-3'>
                <Paperclip
                  size={20}
                  className='text-gray-400 mr-3 cursor-pointer hover:text-white'
                />
                <Input
                  placeholder='Type your message...'
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className='flex-1 bg-transparent border-0 text-white placeholder-gray-500 focus:ring-0 focus:outline-none'
                />
                <Button
                  size='sm'
                  className='bg-[#555] hover:bg-[#666] text-white p-2 rounded-full ml-3'
                  disabled={!message.trim()}
                  onClick={handleSendMessage}
                >
                  <ArrowUp size={16} />
                </Button>
              </div>
            </div>

            <div className='text-xs text-gray-500 text-center mt-4'>
              Chatro can make mistakes. Check important info.
            </div>
          </div>

          {/* Quick Action Buttons - Mobile optimized grid */}
          <div className='grid grid-cols-3 md:grid-cols-5 gap-4 md:gap-6 mb-6 md:mb-8'>
            <div className='flex flex-col items-center space-y-2 md:space-y-3'>
              <div className='w-12 h-12 md:w-16 md:h-16 bg-[#2a2a2a] rounded-2xl flex items-center justify-center relative group hover:bg-[#333] transition-colors cursor-pointer'>
                <span className='text-lg md:text-2xl'>✏️</span>
              </div>
              <span className='text-xs md:text-sm text-gray-400 text-center'>
                Help me write
              </span>
            </div>

            <div className='flex flex-col items-center space-y-2 md:space-y-3'>
              <div className='w-12 h-12 md:w-16 md:h-16 bg-[#2a2a2a] rounded-2xl flex items-center justify-center relative group hover:bg-[#333] transition-colors cursor-pointer'>
                <span className='text-lg md:text-2xl'>🎨</span>
                <span className='absolute -top-1 -right-1 text-xs bg-purple-600 px-1 py-0.5 rounded text-white'>
                  Pro
                </span>
              </div>
              <span className='text-xs md:text-sm text-gray-400 text-center'>
                Create images
              </span>
            </div>

            <div className='flex flex-col items-center space-y-2 md:space-y-3'>
              <div className='w-12 h-12 md:w-16 md:h-16 bg-[#2a2a2a] rounded-2xl flex items-center justify-center relative group hover:bg-[#333] transition-colors cursor-pointer'>
                <span className='text-lg md:text-2xl'>💻</span>
              </div>
              <span className='text-xs md:text-sm text-gray-400 text-center'>
                Code
              </span>
            </div>

            <div className='flex flex-col items-center space-y-2 md:space-y-3'>
              <div className='w-12 h-12 md:w-16 md:h-16 bg-[#2a2a2a] rounded-2xl flex items-center justify-center relative group hover:bg-[#333] transition-colors cursor-pointer'>
                <span className='text-lg md:text-2xl'>👁️</span>
                <span className='absolute -top-1 -right-1 text-xs bg-purple-600 px-1 py-0.5 rounded text-white'>
                  Pro
                </span>
              </div>
              <span className='text-xs md:text-sm text-gray-400 text-center'>
                Analyze image
              </span>
            </div>

            <div className='flex flex-col items-center space-y-2 md:space-y-3'>
              <div className='w-12 h-12 md:w-16 md:h-16 bg-[#2a2a2a] rounded-2xl flex items-center justify-center relative group hover:bg-[#333] transition-colors cursor-pointer'>
                <span className='text-lg md:text-2xl'>🔗</span>
                <span className='absolute -top-1 -right-1 text-xs bg-purple-600 px-1 py-0.5 rounded text-white'>
                  Pro
                </span>
              </div>
              <span className='text-xs md:text-sm text-gray-400 text-center'>
                Summarize link
              </span>
            </div>
          </div>

          {/* Second Row of Quick Actions - Hidden on smallest screens */}
          <div className='hidden sm:grid grid-cols-3 md:grid-cols-5 gap-4 md:gap-6'>
            <div className='flex flex-col items-center space-y-2 md:space-y-3'>
              <div className='w-12 h-12 md:w-16 md:h-16 bg-[#2a2a2a] rounded-2xl flex items-center justify-center relative group hover:bg-[#333] transition-colors cursor-pointer'>
                <span className='text-lg md:text-2xl'>❓</span>
              </div>
              <span className='text-xs md:text-sm text-gray-400 text-center'>
                Get advice
              </span>
            </div>

            <div className='flex flex-col items-center space-y-2 md:space-y-3'>
              <div className='w-12 h-12 md:w-16 md:h-16 bg-[#2a2a2a] rounded-2xl flex items-center justify-center relative group hover:bg-[#333] transition-colors cursor-pointer'>
                <span className='text-lg md:text-2xl'>📄</span>
                <span className='absolute -top-1 -right-1 text-xs bg-purple-600 px-1 py-0.5 rounded text-white'>
                  Pro
                </span>
              </div>
              <span className='text-xs md:text-sm text-gray-400 text-center'>
                Process doc
              </span>
            </div>

            <div className='flex flex-col items-center space-y-2 md:space-y-3'>
              <div className='w-12 h-12 md:w-16 md:h-16 bg-[#2a2a2a] rounded-2xl flex items-center justify-center relative group hover:bg-[#333] transition-colors cursor-pointer'>
                <span className='text-lg md:text-2xl'>📊</span>
                <span className='absolute -top-1 -right-1 text-xs bg-purple-600 px-1 py-0.5 rounded text-white'>
                  Pro
                </span>
              </div>
              <span className='text-xs md:text-sm text-gray-400 text-center'>
                Analyze data
              </span>
            </div>

            <div className='flex flex-col items-center space-y-2 md:space-y-3'>
              <div className='w-12 h-12 md:w-16 md:h-16 bg-[#2a2a2a] rounded-2xl flex items-center justify-center relative group hover:bg-[#333] transition-colors cursor-pointer'>
                <span className='text-lg md:text-2xl'>∞</span>
              </div>
              <span className='text-xs md:text-sm text-gray-400 text-center'>
                Brainstorm
              </span>
            </div>

            <div className='flex flex-col items-center space-y-2 md:space-y-3'>
              <div className='w-12 h-12 md:w-16 md:h-16 bg-[#2a2a2a] rounded-2xl flex items-center justify-center relative group hover:bg-[#333] transition-colors cursor-pointer'>
                <span className='text-lg md:text-2xl'>🌐</span>
              </div>
              <span className='text-xs md:text-sm text-gray-400 text-center'>
                Web search
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
