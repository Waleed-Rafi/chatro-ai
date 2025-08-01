import { Copy, RefreshCw, ThumbsDown, ThumbsUp } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

import { ChatInput } from '@/components/chat/ChatInput';
import { CompanyIcon } from '@/components/icons/CompanyIcon';
import { Button } from '@/components/ui/button';

interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  model?: string;
}

interface ChatConversationProps {
  initialMessage?: string;
}

export const ChatConversation = ({ initialMessage }: ChatConversationProps) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>(() => {
    if (initialMessage) {
      return [
        {
          id: '1',
          type: 'user',
          content: initialMessage,
          timestamp: new Date(),
        },
        {
          id: '2',
          type: 'assistant',
          content:
            "I'm just a program, so I don't have feelings, but I'm here and ready to help you! How can I assist you today?",
          timestamp: new Date(),
          model: 'OpenAI GPT-4o-mini',
        },
      ];
    }
    return [];
  });
  const [isTyping, setIsTyping] = useState(false);
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
    if (!message.trim() || isTyping) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: message,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setMessage('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "That's a great question! Let me help you with that.",
        "I'd be happy to assist you with this. Here's what I think...",
        "Based on what you've shared, I can provide some insights.",
        "That's an interesting point. Let me break this down for you.",
      ];

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: responses[Math.floor(Math.random() * responses.length)],
        timestamp: new Date(),
        model: 'OpenAI GPT-4o-mini',
      };
      setMessages(prev => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className='flex-1 flex flex-col relative h-full'>
      {/* Scrollable Messages Area */}
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

      {/* Fixed Input Area at Bottom */}
      <div className='sticky bottom-0 p-4 bg-[#212121]'>
        <div className='max-w-3xl mx-auto'>
          <ChatInput
            ref={inputRef}
            value={message}
            onChange={setMessage}
            onSend={handleSendMessage}
            placeholder={isTyping ? 'AI is typing...' : 'Type your message...'}
            disabled={isTyping}
          />

          {/* Disclaimer Text */}
          <div className='mt-2 text-center'>
            <p className='text-xs text-gray-500'>
              Chatro can make mistakes. Consider checking important information.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
