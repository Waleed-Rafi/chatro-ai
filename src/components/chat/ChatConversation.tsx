import {
  ArrowUp,
  Copy,
  Paperclip,
  RefreshCw,
  ThumbsDown,
  ThumbsUp,
} from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

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

  const handleSendMessage = async () => {
    if (!message.trim()) return;

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

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className='flex-1 flex flex-col min-h-0'>
      {/* Scrollable Messages Area */}
      <div className='flex-1 overflow-y-auto px-4 py-4'>
        <div className='max-w-3xl mx-auto space-y-3'>
          {messages.map(msg => (
            <div
              key={msg.id}
              className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.type === 'assistant' && (
                <div className='w-6 h-6 bg-[#2a2a2a] rounded-full flex items-center justify-center mr-2 mt-1 flex-shrink-0'>
                  <span className='text-xs'>🤖</span>
                </div>
              )}

              <div
                className={`max-w-xs md:max-w-lg ${
                  msg.type === 'user'
                    ? 'bg-[#2a2a2a] text-white'
                    : 'bg-transparent'
                } rounded-xl p-3`}
              >
                <p className='text-white leading-relaxed'>{msg.content}</p>

                {msg.type === 'assistant' && (
                  <div className='mt-2'>
                    <div className='flex items-center justify-between'>
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
                        <div className='flex items-center space-x-1'>
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
              <div className='w-6 h-6 bg-[#2a2a2a] rounded-full flex items-center justify-center mr-2 mt-1'>
                <span className='text-xs'>🤖</span>
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
        </div>
      </div>

      {/* Fixed Input Area at Bottom */}
      <div className='border-t border-[#2a2a2a] p-4 bg-[#1a1a1a]'>
        <div className='max-w-3xl mx-auto'>
          <div className='flex items-center bg-[#2a2a2a] rounded-full px-4 py-2'>
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
              className='bg-[#555] hover:bg-[#666] text-white p-2.5 rounded-full'
              disabled={!message.trim() || isTyping}
              onClick={handleSendMessage}
            >
              <ArrowUp size={16} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
