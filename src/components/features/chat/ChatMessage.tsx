
import { Typography } from '@/components/design-system/atoms/Typography';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/design-system/atoms/Icon';
import { cn } from '@/lib/utils';
import * as React from 'react';

interface ChatMessageProps {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
  isLoading?: boolean;
  onCopy?: () => void;
  onRegenerate?: () => void;
  className?: string;
}

const ChatMessage = React.forwardRef<HTMLDivElement, ChatMessageProps>(
  ({ id, content, role, timestamp, isLoading = false, onCopy, onRegenerate, className }, ref) => {
    const isUser = role === 'user';

    return (
      <div
        ref={ref}
        className={cn(
          'group flex gap-3 p-4 hover:bg-muted/50 transition-colors',
          isUser && 'bg-muted/20',
          className
        )}
      >
        <Avatar className="h-8 w-8 shrink-0">
          <AvatarImage src={isUser ? undefined : '/ai-avatar.png'} />
          <AvatarFallback>
            {isUser ? 'U' : 'AI'}
          </AvatarFallback>
        </Avatar>

        <div className="flex-1 min-w-0 space-y-2">
          <div className="flex items-center justify-between">
            <Typography variant="small" className="font-medium">
              {isUser ? 'You' : 'Assistant'}
            </Typography>
            <Typography variant="muted" className="text-xs">
              {timestamp.toLocaleTimeString()}
            </Typography>
          </div>

          <div className="prose prose-sm max-w-none dark:prose-invert">
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
                <Typography variant="muted">Thinking...</Typography>
              </div>
            ) : (
              <Typography variant="p" className="whitespace-pre-wrap">
                {content}
              </Typography>
            )}
          </div>

          {!isLoading && !isUser && (
            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              {onCopy && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onCopy}
                  className="h-6 px-2"
                >
                  <Icon name="Copy" size={12} />
                </Button>
              )}
              {onRegenerate && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onRegenerate}
                  className="h-6 px-2"
                >
                  <Icon name="RotateCcw" size={12} />
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }
);
ChatMessage.displayName = 'ChatMessage';

export { ChatMessage };
