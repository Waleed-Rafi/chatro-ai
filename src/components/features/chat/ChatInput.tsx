
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Icon } from '@/components/design-system/atoms/Icon';
import { cn } from '@/lib/utils';
import * as React from 'react';

interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  isLoading?: boolean;
  placeholder?: string;
  maxLength?: number;
  className?: string;
}

const ChatInput = React.forwardRef<HTMLTextAreaElement, ChatInputProps>(
  ({ 
    value, 
    onChange, 
    onSubmit, 
    isLoading = false, 
    placeholder = "Type your message...",
    maxLength = 4000,
    className 
  }, ref) => {
    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        if (value.trim() && !isLoading) {
          onSubmit();
        }
      }
    };

    const canSubmit = value.trim() && !isLoading;

    return (
      <div className={cn('relative', className)}>
        <Textarea
          ref={ref}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={isLoading}
          maxLength={maxLength}
          className="min-h-[60px] max-h-[200px] pr-12 resize-none"
          rows={3}
        />
        
        <div className="absolute bottom-2 right-2 flex items-center gap-2">
          <span className="text-xs text-muted-foreground">
            {value.length}/{maxLength}
          </span>
          
          <Button
            size="sm"
            onClick={onSubmit}
            disabled={!canSubmit}
            className="h-8 w-8 p-0"
          >
            <Icon 
              name={isLoading ? "Loader2" : "Send"} 
              size={14} 
              className={isLoading ? "animate-spin" : ""}
            />
          </Button>
        </div>
      </div>
    );
  }
);
ChatInput.displayName = 'ChatInput';

export { ChatInput };
