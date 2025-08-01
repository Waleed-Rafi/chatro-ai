import { Search } from 'lucide-react';
import * as React from 'react';

import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

import { AnthropicCircle } from '../icons/AnthropicCircle';
import { ChatGptCircle } from '../icons/ChatGptCircle';
import { GeminiCircle } from '../icons/GeminiCircle';
import { GrokCircle } from '../icons/GrokCircle';

interface ModelSelectorProps {
  children: React.ReactNode;
  selectedModel?: string;
  onModelSelect?: (modelName: string) => void;
}

export const ModelSelector = ({
  children,
  selectedModel,
  onModelSelect,
}: ModelSelectorProps) => {
  const [isOpen, setIsOpen] = React.useState(false);

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
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent
        className='w-80 bg-[#2a2a2a] border-[#404040] p-0 rounded-2xl shadow-2xl'
        side='bottom'
        align='start'
        sideOffset={8}
      >
        {/* Search */}
        <div className='p-4'>
          <div className='relative'>
            <Search
              size={16}
              className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400'
            />
            <Input
              placeholder='Search models...'
              className='bg-[#2a2a2a] text-white placeholder-gray-500 pl-10 pr-4 py-3 text-sm border border-[#404040] rounded-xl h-11 focus:border-[#404040] focus:ring-0 transition-colors popover-input'
            />
          </div>
        </div>

        {/* Models List */}
        <div className='max-h-96 overflow-y-auto scrollbar-hide'>
          <div className='px-3 pb-3'>
            {models.map((model, index) => (
              <div
                key={index}
                className={`flex items-center space-x-3 p-2.5 rounded-lg cursor-pointer transition-all duration-200 ${
                  selectedModel === model.name
                    ? 'bg-[#333]'
                    : 'hover:bg-[#2a2a2a]'
                }`}
                onClick={() => {
                  onModelSelect?.(model.name);
                  setIsOpen(false);
                }}
              >
                <div className='w-8 h-8 bg-[#333] rounded-full flex items-center justify-center flex-shrink-0'>
                  <span className='text-xs'>{model.icon}</span>
                </div>

                <div className='flex-1 min-w-0'>
                  <div className='flex items-center space-x-1.5 mb-0.5'>
                    <span className='text-white font-medium text-sm truncate'>
                      {model.name}
                    </span>
                    {model.isNew && (
                      <span className='text-[10px] bg-blue-600/20 text-blue-400 px-1.5 py-0.5 rounded text-white font-medium border border-blue-600/30'>
                        NEW
                      </span>
                    )}
                    {model.isPro && (
                      <span className='text-[10px] bg-purple-600/20 text-purple-400 px-1.5 py-0.5 rounded text-white font-medium border border-purple-600/30'>
                        Pro
                      </span>
                    )}
                    {model.isPreview && (
                      <span className='text-[10px] bg-gray-600/20 text-gray-400 px-1.5 py-0.5 rounded text-white font-medium border border-gray-600/30'>
                        PREVIEW
                      </span>
                    )}
                  </div>
                  <div className='text-gray-400 text-xs leading-relaxed'>
                    {model.description}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};
