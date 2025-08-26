import { Copy, RefreshCw, ThumbsDown, ThumbsUp } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

import { ChatInput } from '@/components/chat/ChatInput';
import { CompanyIcon } from '@/components/icons/CompanyIcon';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/use-auth';

interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  model?: string;
}

interface ChatConversationProps {
  chatId: string;
  selectedModel?: string;
  isLoggedIn: boolean;
  messages: Message[];
  isTyping: boolean;
  isLoadingChat: boolean;
  onSendMessage: (message: string) => Promise<void>;
}

export const ChatConversation = ({
  isLoggedIn,
  messages,
  isTyping,
  isLoadingChat,
  onSendMessage,
}: ChatConversationProps) => {
  const { user } = useAuth();
  const [message, setMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Auto-focus input when AI response is received
  useEffect(() => {
    if (
      !isTyping &&
      messages.length > 0 &&
      messages[messages.length - 1].type === 'assistant'
    ) {
      // Small delay to ensure the response is fully rendered
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isTyping, messages]);

  const handleSendMessage = async () => {
    if (!message.trim() || isTyping || !isLoggedIn || !user?.id) return;

    // Pass the message to parent and clear local state
    const messageToSend = message.trim();
    setMessage('');
    await onSendMessage(messageToSend);
  };

  return (
    <div className='flex-1 flex flex-col relative h-full'>
      {/* Loading State */}
      {isLoadingChat && (
        <div className='flex-1 flex flex-col items-center justify-center'>
          <div className='text-center'>
            <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-4'></div>
            <p className='text-gray-400 text-sm'>Loading conversation...</p>
          </div>
        </div>
      )}

      {/* Scrollable Messages Area */}
      {!isLoadingChat && (
        <div className='flex-1 overflow-y-auto px-4 py-4'>
          <div className='max-w-3xl mx-auto space-y-3'>
            {messages.map(msg => (
              <div
                key={msg.id}
                className={`flex items-start ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.type === 'assistant' && (
                  <div className='w-8 h-8 bg-white rounded-full flex items-center justify-center mr-3 flex-shrink-0 self-start mt-3'>
                    <CompanyIcon size={20} className='text-gray-800' />
                  </div>
                )}

                <div
                  className={`${
                    msg.type === 'user'
                      ? 'max-w-sm md:max-w-xl bg-[#2a2a2a] text-white'
                      : 'max-w-full bg-transparent'
                  } rounded-xl p-3`}
                >
                  <p className='text-white leading-relaxed'>{msg.content}</p>

                  {msg.type === 'assistant' && (
                    <div className='mt-2'>
                      <div className='flex items-center justify-start'>
                        <div className='flex items-center space-x-1'>
                          <Button
                            variant='ghost'
                            size='sm'
                            className='text-gray-400 hover:text-white p-1 h-6 w-6'
                          >
                            <Copy size={12} />
                          </Button>
                          <Button
                            variant='ghost'
                            size='sm'
                            className='text-gray-400 hover:text-white p-1 h-6 w-6'
                          >
                            <RefreshCw size={12} />
                          </Button>
                          <Button
                            variant='ghost'
                            size='sm'
                            className='text-gray-400 hover:text-white p-1 h-6 w-6'
                          >
                            <ThumbsUp size={12} />
                          </Button>
                          <Button
                            variant='ghost'
                            size='sm'
                            className='text-gray-400 hover:text-white p-1 h-6 w-6'
                          >
                            <ThumbsDown size={12} />
                          </Button>
                        </div>

                        {msg.model && (
                          <div className='flex items-center space-x-1 ml-2'>
                            <span className='text-xs text-gray-400'>
                              {msg.model}
                            </span>
                            <Button
                              variant='ghost'
                              size='sm'
                              className='text-gray-400 hover:text-white p-1 h-6 w-6'
                            >
                              <svg
                                width='12'
                                height='12'
                                viewBox='0 0 24 24'
                                fill='none'
                                className='text-gray-400'
                              >
                                <path
                                  d='M7 14l3-3 3 3'
                                  stroke='currentColor'
                                  strokeWidth='2'
                                  strokeLinecap='round'
                                  strokeLinejoin='round'
                                />
                              </svg>
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className='flex justify-start'>
                <div className='w-8 h-8 bg-white rounded-full flex items-center justify-center mr-3 flex-shrink-0 self-start mt-3'>
                  <CompanyIcon size={20} className='text-gray-800' />
                </div>
                <div className='bg-[#2a2a2a] rounded-xl p-3'>
                  <div className='flex items-center space-x-1'>
                    <div className='w-1.5 h-1.5 bg-gray-400 rounded-full animate-pulse' />
                    <div
                      className='w-1.5 h-1.5 bg-gray-400 rounded-full animate-pulse'
                      style={{ animationDelay: '0.1s' }}
                    />
                    <div
                      className='w-1.5 h-1.5 bg-gray-400 rounded-full animate-pulse'
                      style={{ animationDelay: '0.2s' }}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Invisible div for auto-scroll */}
            <div ref={messagesEndRef} />
          </div>
        </div>
      )}

      {/* Fixed Input Area at Bottom */}
      {!isLoadingChat && (
        <div className='sticky bottom-0 p-4 bg-[#212121]'>
          <div className='max-w-3xl mx-auto'>
            <ChatInput
              ref={inputRef}
              value={message}
              onChange={setMessage}
              onSend={handleSendMessage}
              placeholder={
                isTyping ? 'AI is typing...' : 'Type your message...'
              }
              disabled={isTyping || !isLoggedIn}
            />

            {/* Disclaimer Text */}
            <div className='mt-2 text-center'>
              <p className='text-xs text-gray-500'>
                Chatro can make mistakes. Consider checking important
                information.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
