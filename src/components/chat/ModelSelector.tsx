import { Search } from 'lucide-react';
import * as React from 'react';
import { useEffect, useState } from 'react';

import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import type { AIModel } from '@/types/chat';

import { AnthropicCircle } from '../icons/AnthropicCircle';
import { ChatGptCircle } from '../icons/ChatGptCircle';
import { GeminiCircle } from '../icons/GeminiCircle';
import { GrokCircle } from '../icons/GrokCircle';

interface ModelSelectorProps {
  children: React.ReactNode;
  selectedModel?: string;
  onModelSelect?: (modelName: string) => void;
}

// Icon mapping for different providers
const iconMap = {
  openai: () => <ChatGptCircle size={28} />,
  google: () => <GeminiCircle size={28} />,
  'x-ai': () => <GrokCircle size={28} />,
  anthropic: () => <AnthropicCircle size={28} />,
  deepseek: () => <span className='text-xl'>🧠</span>,
};

export const ModelSelector = ({
  children,
  selectedModel,
  onModelSelect,
}: ModelSelectorProps) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [models, setModels] = useState<AIModel[]>([]);
  const [filteredModels, setFilteredModels] = useState<AIModel[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch models when popover opens
  useEffect(() => {
    if (isOpen) {
      fetchModels();
    }
  }, [isOpen]);

  // Filter models based on search query
  useEffect(() => {
    if (searchQuery.trim()) {
      const filtered = models.filter(
        model =>
          model.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          model.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredModels(filtered);
    } else {
      setFilteredModels(models);
    }
  }, [searchQuery, models]);

  const fetchModels = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/getModelList');
      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setModels(data.models || []);
        } else {
          setError('Failed to fetch models');
        }
      } else {
        setError('Failed to fetch models');
      }
    } catch (error) {
      console.error('Error fetching models:', error);
      setError('Failed to fetch models');
    } finally {
      setIsLoading(false);
    }
  };

  const handleModelSelect = (modelId: string) => {
    onModelSelect?.(modelId);
    setIsOpen(false);
  };

  const renderIcon = (provider: string) => {
    const IconComponent = iconMap[provider as keyof typeof iconMap];
    if (IconComponent) {
      return IconComponent();
    }
    return <span className='text-lg'>🤖</span>;
  };

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
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className='bg-[#2a2a2a] text-white placeholder-gray-500 pl-10 pr-4 py-3 text-sm border border-[#404040] rounded-xl h-11 focus:border-[#404040] focus:ring-0 transition-colors popover-input'
            />
          </div>
        </div>

        {/* Models List */}
        <div className='max-h-96 overflow-y-auto scrollbar-hide'>
          <div className='px-3 pb-3'>
            {isLoading && (
              <div className='flex items-center justify-center py-4'>
                <span className='text-gray-400'>Loading models...</span>
              </div>
            )}
            {error && (
              <div className='flex items-center justify-center py-4 text-red-400'>
                {error}
              </div>
            )}
            {!isLoading && !error && filteredModels.length === 0 && (
              <div className='flex items-center justify-center py-4 text-gray-400'>
                No models found.
              </div>
            )}
            {!isLoading &&
              !error &&
              filteredModels.length > 0 &&
              filteredModels.map((model, index) => (
                <div
                  key={index}
                  className={`flex items-center space-x-3 p-2.5 rounded-lg cursor-pointer transition-all duration-200 ${
                    selectedModel === model.name
                      ? 'bg-[#333]'
                      : 'hover:bg-[#2a2a2a]'
                  }`}
                  onClick={() => handleModelSelect(model.name)}
                >
                  <div className='w-10 h-10 bg-[#333] rounded-full flex items-center justify-center flex-shrink-0 p-0'>
                    {renderIcon(model.provider)}
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
