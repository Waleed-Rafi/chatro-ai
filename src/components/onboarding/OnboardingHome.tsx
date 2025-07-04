import { ChevronDown, Paperclip, ArrowUp, Sparkles } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface OnboardingHomeProps {
  onLogin: () => void;
}

export const OnboardingHome = ({ onLogin }: OnboardingHomeProps) => {
  const [message, setMessage] = useState('');

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (message.trim()) {
        onLogin();
      }
    }
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      onLogin();
    }
  };

  return (
    <div className='flex-1 flex flex-col transition-all duration-300 pt-16 md:pt-0'>
      {/* Desktop Header */}
      <div className='hidden md:flex items-center justify-between p-4 border-b border-border'>
        <div className='flex items-center space-x-3'>
          <Button
            variant='ghost'
            className='text-foreground hover:bg-accent flex items-center space-x-2'
          >
            <span>OpenAI GPT-4o-mini</span>
            <ChevronDown size={16} />
          </Button>
        </div>

        <div className='flex items-center space-x-2'>
          <Button
            variant='ghost'
            size='sm'
            className='text-muted-foreground hover:text-foreground hover:bg-accent'
          >
            <span className='mr-1'>⚡</span>
            Usage
          </Button>
          <Button
            variant='ghost'
            size='sm'
            className='text-muted-foreground hover:text-foreground hover:bg-accent'
          >
            <span className='mr-1'>🕒</span>
            History
          </Button>
        </div>
      </div>

      {/* Mobile Header */}
      <div className='md:hidden fixed top-0 left-0 right-0 bg-background p-4 z-30 border-b border-border'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center space-x-2 flex-1 min-w-0'>
            <Button
              variant='ghost'
              className='text-foreground hover:bg-accent flex items-center space-x-2 min-w-0 flex-1 justify-start px-3 py-2'
            >
              <span className='truncate text-sm'>OpenAI GPT-4o-mini</span>
              <ChevronDown size={14} className='flex-shrink-0' />
            </Button>
          </div>

          <div className='flex items-center space-x-1 flex-shrink-0'>
            <Button
              variant='ghost'
              size='sm'
              className='text-muted-foreground hover:text-foreground hover:bg-accent p-2'
            >
              <span className='text-lg'>⚡</span>
            </Button>
            <Button
              variant='ghost'
              size='sm'
              className='text-muted-foreground hover:text-foreground hover:bg-accent p-2'
            >
              <span className='text-lg'>🕒</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className='flex-1 flex flex-col items-center justify-center p-4 md:p-8'>
        <div className='text-center max-w-4xl w-full'>
          <div className='flex items-center justify-center gap-2 mb-6'>
            <Sparkles size={32} className='text-yellow-400' />
          </div>
          <h1 className='text-2xl md:text-4xl font-normal text-foreground mb-8 md:mb-16'>
            How can I help you today?
          </h1>

          {/* Quick Action Buttons - Desktop Layout */}
          <div className='hidden md:grid grid-cols-5 gap-6 mb-8'>
            <div className='flex flex-col items-center space-y-3'>
              <div className='w-16 h-16 bg-muted hover:bg-muted/80 rounded-2xl flex items-center justify-center relative group transition-colors cursor-pointer'>
                <span className='text-2xl'>✏️</span>
              </div>
              <span className='text-sm text-muted-foreground text-center'>
                Help me write
              </span>
            </div>

            <div className='flex flex-col items-center space-y-3'>
              <div className='w-16 h-16 bg-muted hover:bg-muted/80 rounded-2xl flex items-center justify-center relative group transition-colors cursor-pointer'>
                <span className='text-2xl'>🎨</span>
                <span className='absolute -top-1 -right-1 text-xs bg-purple-600 px-1 py-0.5 rounded text-white'>
                  Pro
                </span>
              </div>
              <span className='text-sm text-muted-foreground text-center'>
                Create images
              </span>
            </div>

            <div className='flex flex-col items-center space-y-3'>
              <div className='w-16 h-16 bg-muted hover:bg-muted/80 rounded-2xl flex items-center justify-center relative group transition-colors cursor-pointer'>
                <span className='text-2xl'>💻</span>
              </div>
              <span className='text-sm text-muted-foreground text-center'>
                Code
              </span>
            </div>

            <div className='flex flex-col items-center space-y-3'>
              <div className='w-16 h-16 bg-muted hover:bg-muted/80 rounded-2xl flex items-center justify-center relative group transition-colors cursor-pointer'>
                <span className='text-2xl'>👁️</span>
                <span className='absolute -top-1 -right-1 text-xs bg-purple-600 px-1 py-0.5 rounded text-white'>
                  Pro
                </span>
              </div>
              <span className='text-sm text-muted-foreground text-center'>
                Analyze image
              </span>
            </div>

            <div className='flex flex-col items-center space-y-3'>
              <div className='w-16 h-16 bg-muted hover:bg-muted/80 rounded-2xl flex items-center justify-center relative group transition-colors cursor-pointer'>
                <span className='text-2xl'>🔗</span>
                <span className='absolute -top-1 -right-1 text-xs bg-purple-600 px-1 py-0.5 rounded text-white'>
                  Pro
                </span>
              </div>
              <span className='text-sm text-muted-foreground text-center'>
                Summarize link
              </span>
            </div>
          </div>

          {/* Second Row - Desktop */}
          <div className='hidden md:grid grid-cols-5 gap-6 mb-16'>
            <div className='flex flex-col items-center space-y-3'>
              <div className='w-16 h-16 bg-muted hover:bg-muted/80 rounded-2xl flex items-center justify-center relative group transition-colors cursor-pointer'>
                <span className='text-2xl'>❓</span>
              </div>
              <span className='text-sm text-muted-foreground text-center'>
                Get advice
              </span>
            </div>

            <div className='flex flex-col items-center space-y-3'>
              <div className='w-16 h-16 bg-muted hover:bg-muted/80 rounded-2xl flex items-center justify-center relative group transition-colors cursor-pointer'>
                <span className='text-2xl'>📄</span>
                <span className='absolute -top-1 -right-1 text-xs bg-purple-600 px-1 py-0.5 rounded text-white'>
                  Pro
                </span>
              </div>
              <span className='text-sm text-muted-foreground text-center'>
                Process doc
              </span>
            </div>

            <div className='flex flex-col items-center space-y-3'>
              <div className='w-16 h-16 bg-muted hover:bg-muted/80 rounded-2xl flex items-center justify-center relative group transition-colors cursor-pointer'>
                <span className='text-2xl'>📊</span>
                <span className='absolute -top-1 -right-1 text-xs bg-purple-600 px-1 py-0.5 rounded text-white'>
                  Pro
                </span>
              </div>
              <span className='text-sm text-muted-foreground text-center'>
                Analyze data
              </span>
            </div>

            <div className='flex flex-col items-center space-y-3'>
              <div className='w-16 h-16 bg-muted hover:bg-muted/80 rounded-2xl flex items-center justify-center relative group transition-colors cursor-pointer'>
                <span className='text-2xl'>∞</span>
              </div>
              <span className='text-sm text-muted-foreground text-center'>
                Brainstorm
              </span>
            </div>

            <div className='flex flex-col items-center space-y-3'>
              <div className='w-16 h-16 bg-muted hover:bg-muted/80 rounded-2xl flex items-center justify-center relative group transition-colors cursor-pointer'>
                <span className='text-2xl'>🌐</span>
              </div>
              <span className='text-sm text-muted-foreground text-center'>
                Web search
              </span>
            </div>
          </div>

          {/* Mobile Quick Actions */}
          <div className='md:hidden grid grid-cols-3 gap-4 mb-8'>
            <div className='flex flex-col items-center space-y-2'>
              <div className='w-12 h-12 bg-muted hover:bg-muted/80 rounded-2xl flex items-center justify-center relative group transition-colors cursor-pointer'>
                <span className='text-lg'>✏️</span>
              </div>
              <span className='text-xs text-muted-foreground text-center'>
                Help me write
              </span>
            </div>

            <div className='flex flex-col items-center space-y-2'>
              <div className='w-12 h-12 bg-muted hover:bg-muted/80 rounded-2xl flex items-center justify-center relative group transition-colors cursor-pointer'>
                <span className='text-lg'>🎨</span>
                <span className='absolute -top-1 -right-1 text-xs bg-purple-600 px-1 py-0.5 rounded text-white'>
                  Pro
                </span>
              </div>
              <span className='text-xs text-muted-foreground text-center'>
                Create images
              </span>
            </div>

            <div className='flex flex-col items-center space-y-2'>
              <div className='w-12 h-12 bg-muted hover:bg-muted/80 rounded-2xl flex items-center justify-center relative group transition-colors cursor-pointer'>
                <span className='text-lg'>💻</span>
              </div>
              <span className='text-xs text-muted-foreground text-center'>
                Code
              </span>
            </div>
          </div>

          {/* Second Row Mobile */}
          <div className='md:hidden grid grid-cols-3 gap-4 mb-16'>
            <div className='flex flex-col items-center space-y-2'>
              <div className='w-12 h-12 bg-muted hover:bg-muted/80 rounded-2xl flex items-center justify-center relative group transition-colors cursor-pointer'>
                <span className='text-lg'>❓</span>
              </div>
              <span className='text-xs text-muted-foreground text-center'>
                Get advice
              </span>
            </div>

            <div className='flex flex-col items-center space-y-2'>
              <div className='w-12 h-12 bg-muted hover:bg-muted/80 rounded-2xl flex items-center justify-center relative group transition-colors cursor-pointer'>
                <span className='text-lg'>📄</span>
                <span className='absolute -top-1 -right-1 text-xs bg-purple-600 px-1 py-0.5 rounded text-white'>
                  Pro
                </span>
              </div>
              <span className='text-xs text-muted-foreground text-center'>
                Process doc
              </span>
            </div>

            <div className='flex flex-col items-center space-y-2'>
              <div className='w-12 h-12 bg-muted hover:bg-muted/80 rounded-2xl flex items-center justify-center relative group transition-colors cursor-pointer'>
                <span className='text-lg'>🌐</span>
              </div>
              <span className='text-xs text-muted-foreground text-center'>
                Web search
              </span>
            </div>
          </div>

          {/* Input Area */}
          <div className='max-w-3xl mx-auto'>
            <div className='relative'>
              <div className='flex items-center bg-muted/50 rounded-full px-4 py-3'>
                <Paperclip
                  size={20}
                  className='text-muted-foreground mr-3 cursor-pointer hover:text-foreground transition-colors'
                />
                <Input
                  placeholder='Type your message...'
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className='flex-1 bg-transparent border-0 text-foreground placeholder:text-muted-foreground focus:ring-0 focus:outline-none'
                />
                <Button
                  size='sm'
                  className='bg-muted-foreground hover:bg-foreground text-background p-2 rounded-full ml-3'
                  disabled={!message.trim()}
                  onClick={handleSendMessage}
                >
                  <ArrowUp size={16} />
                </Button>
              </div>
            </div>

            <div className='text-xs text-muted-foreground text-center mt-4'>
              Chatro can make mistakes. Check important info.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
