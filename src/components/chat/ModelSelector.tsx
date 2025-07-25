import { Search, X } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { AnthropicCircle } from '../icons/AnthropicCircle';
import { ChatGptCircle } from '../icons/ChatGptCircle';
import { GeminiCircle } from '../icons/GeminiCircle';
import { GrokCircle } from '../icons/GrokCircle';

interface ModelSelectorProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ModelSelector = ({ isOpen, onClose }: ModelSelectorProps) => {
  if (!isOpen) return null;

  const models = [
    {
      name: 'OpenAI GPT-4o-mini',
      description: "OpenAI's fastest compact model",
      isPro: false,
      isSelected: true,
      icon: <ChatGptCircle />,
    },
    {
      name: 'Google Gemini 2.5 Flash',
      description: "Google's latest reasoning model",
      isPro: false,
      isNew: true,
      icon: <GeminiCircle />,
    },
    {
      name: 'Grok 3 Mini',
      description: "X AI's advanced reasoning model",
      isPro: false,
      isNew: true,
      icon: <GrokCircle />,
    },
    {
      name: 'OpenAI GPT-4.1-nano',
      description: "OpenAI's fastest compact model",
      isPro: false,
      isNew: true,
      icon: <ChatGptCircle />,
    },
    {
      name: 'OpenAI o4-mini',
      description: "OpenAI's efficient reasoning model",
      isPro: false,
      isNew: true,
      icon: <ChatGptCircle />,
    },
    {
      name: 'Anthropic Claude 4 Sonnet',
      description: "Anthropic's best coding model",
      isPro: true,
      isNew: true,
      icon: <AnthropicCircle />,
    },
    {
      name: 'OpenAI GPT-4.1',
      description: "OpenAI's most advanced model",
      isPro: true,
      isNew: true,
      icon: <ChatGptCircle />,
    },
    {
      name: 'OpenAI o4-mini (High)',
      description: "OpenAI's best reasoning model",
      isPro: true,
      isNew: true,
      icon: <ChatGptCircle />,
    },
    {
      name: 'OpenAI GPT-4o',
      description: "OpenAI's most advanced model",
      isPro: true,
      icon: <ChatGptCircle />,
    },
    {
      name: 'Deepseek R1',
      description: 'Optimized for reasoning tasks',
      isPro: true,
      isPreview: true,
      icon: '🧠',
    },
    {
      name: 'Anthropic Claude 3.7 Sonnet',
      description: "Anthropic's most advanced model",
      isPro: true,
      icon: <AnthropicCircle />,
    },
  ];

  return (
    <>
      {/* Desktop Modal */}
      <div className='hidden md:block'>
        <div className='fixed inset-0 z-40' onClick={onClose} />
        <div className='absolute top-16 left-16 z-50 w-90 bg-[#1a1a1a] rounded-lg shadow-lg border border-[#333]'>
          {/* Search */}
          <div className='p-4'>
            <div className='relative'>
              <Search
                size={16}
                className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400'
              />
              <Input
                placeholder='Search...'
                className='bg-[#0d0d0d] text-white placeholder-gray-500 pl-10 border-[#333]'
              />
            </div>
          </div>

          {/* Models List */}
          <div
            className='space-y-1 max-h-96 overflow-y-auto p-4 pt-0'
            style={{
              scrollbarWidth: 'thin',
              scrollbarColor: 'rgba(255, 255, 255, 0.2) transparent',
            }}
          >
            <style jsx>{`
              div::-webkit-scrollbar {
                width: 4px;
              }
              div::-webkit-scrollbar-track {
                background: transparent;
              }
              div::-webkit-scrollbar-thumb {
                background: rgba(255, 255, 255, 0.2);
                border-radius: 2px;
              }
              div::-webkit-scrollbar-thumb:hover {
                background: rgba(255, 255, 255, 0.3);
              }
            `}</style>
            {models.map((model, index) => (
              <div
                key={index}
                className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-colors ${
                  model.isSelected ? 'bg-[#333]' : 'hover:bg-[#333]'
                }`}
                onClick={onClose}
              >
                <div className='w-8 h-8 bg-[#333] rounded-full flex items-center justify-center'>
                  <span className='text-xs'>{model.icon}</span>
                </div>

                <div className='flex-1'>
                  <div className='flex items-center space-x-2'>
                    <span className='text-white font-medium text-sm'>
                      {model.name}
                    </span>
                    {model.isNew && (
                      <span className='text-xs bg-blue-600 px-1.5 py-0.5 rounded text-white'>
                        NEW
                      </span>
                    )}
                    {model.isPro && (
                      <span className='text-xs bg-purple-600 px-1.5 py-0.5 rounded text-white'>
                        Pro
                      </span>
                    )}
                    {model.isPreview && (
                      <span className='text-xs bg-gray-600 px-1.5 py-0.5 rounded text-white'>
                        PREVIEW
                      </span>
                    )}
                  </div>
                  <div className='text-gray-400 text-xs'>
                    {model.description}
                  </div>
                </div>

                {/* <div className='w-4 h-4 border border-gray-500 rounded-full flex items-center justify-center'>
                  {model.isSelected && (
                    <div className='w-2 h-2 bg-white rounded-full' />
                  )}
                </div> */}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Full Screen Modal */}
      <div className='md:hidden fixed inset-0 z-50 bg-[#1a1a1a]'>
        {/* Header */}
        <div className='flex items-center justify-between p-4 border-b border-[#333]'>
          <h2 className='text-white text-lg font-medium'>Select Model</h2>
          <Button
            variant='ghost'
            size='sm'
            onClick={onClose}
            className='text-gray-400 hover:text-white'
          >
            <X size={20} />
          </Button>
        </div>

        {/* Search */}
        <div className='p-4'>
          <div className='relative'>
            <Search
              size={16}
              className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400'
            />
            <Input
              placeholder='Search...'
              className='bg-[#0d0d0d] text-white placeholder-gray-500 pl-10 border-[#333]'
            />
          </div>
        </div>

        {/* Models List */}
        <div className='flex-1 overflow-y-auto px-4 pb-4'>
          <div className='space-y-2'>
            {models.map((model, index) => (
              <div
                key={index}
                className={`flex items-center space-x-3 p-4 rounded-lg cursor-pointer transition-colors ${
                  model.isSelected ? 'bg-[#333]' : 'hover:bg-[#333]'
                }`}
                onClick={onClose}
              >
                <div className='w-10 h-10 bg-[#333] rounded-full flex items-center justify-center'>
                  <span className='text-sm'>{model.icon}</span>
                </div>

                <div className='flex-1'>
                  <div className='flex items-center space-x-2 mb-1'>
                    <span className='text-white font-medium'>{model.name}</span>
                    {model.isNew && (
                      <span className='text-xs bg-blue-600 px-1.5 py-0.5 rounded text-white'>
                        NEW
                      </span>
                    )}
                    {model.isPro && (
                      <span className='text-xs bg-purple-600 px-1.5 py-0.5 rounded text-white'>
                        Pro
                      </span>
                    )}
                    {model.isPreview && (
                      <span className='text-xs bg-gray-600 px-1.5 py-0.5 rounded text-white'>
                        PREVIEW
                      </span>
                    )}
                  </div>
                  <div className='text-gray-400 text-sm'>
                    {model.description}
                  </div>
                </div>

                <div className='w-5 h-5 border border-gray-500 rounded-full flex items-center justify-center'>
                  {model.isSelected && (
                    <div className='w-2.5 h-2.5 bg-white rounded-full' />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
