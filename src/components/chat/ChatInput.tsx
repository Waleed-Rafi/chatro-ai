import { ArrowUp, Paperclip } from 'lucide-react';
import { forwardRef } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

export const ChatInput = forwardRef<HTMLInputElement, ChatInputProps>(
  (
    {
      value,
      onChange,
      onSend,
      placeholder = 'Type your message...',
      disabled = false,
      className = '',
    },
    ref
  ) => {
    const handleKeyPress = (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        onSend();
      }
    };

    return (
      <div
        className={`flex items-center bg-[#2a2a2a] rounded-full px-4 py-2 transition-all duration-200 focus-within:ring-[1.5px] focus-within:ring-[#404040] focus-within:ring-offset-1 focus-within:ring-offset-[#212121] ${className}`}
      >
        <Paperclip
          size={20}
          className='text-gray-400 mr-3 cursor-pointer hover:text-white'
        />
        <Input
          ref={ref}
          placeholder={placeholder}
          value={value}
          onChange={e => onChange(e.target.value)}
          onKeyPress={handleKeyPress}
          disabled={disabled}
          className='flex-1 bg-transparent border-0 text-white placeholder-gray-500 focus:ring-0 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed chat-input'
        />
        <Button
          size='sm'
          className='bg-[#555] hover:bg-[#666] text-white p-2.5 rounded-full disabled:opacity-50 disabled:cursor-not-allowed'
          disabled={!value.trim() || disabled}
          onClick={onSend}
        >
          <ArrowUp size={16} />
        </Button>
      </div>
    );
  }
);

ChatInput.displayName = 'ChatInput';
