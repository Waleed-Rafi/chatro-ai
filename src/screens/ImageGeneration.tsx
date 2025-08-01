import { ArrowUp, Copy, Download, Paperclip } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  images?: string[];
  timestamp: Date;
}

const ImageGeneration = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  // Dummy images for demonstration
  const dummyImages = [
    '/lovable-uploads/photo-1618160702438-9b02ab6515c9',
    '/lovable-uploads/photo-1721322800607-8c38375eef04',
    '/lovable-uploads/photo-1470813740244-df37b8c1edcb',
    '/lovable-uploads/photo-1465146344425-f00d5f5c8f07',
  ];

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
    setIsGenerating(true);

    // Simulate image generation
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: 'Here are the images I generated for you:',
        images: dummyImages.slice(0, 4),
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, assistantMessage]);
      setIsGenerating(false);
    }, 2000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Empty state
  if (messages.length === 0) {
    return (
      <div className='min-h-screen bg-background text-white flex flex-col'>
        {/* Main Content */}
        <div className='flex-1 flex flex-col items-center justify-center p-4 md:p-8'>
          <div className='text-center max-w-5xl w-full'>
            <h1 className='text-2xl md:text-4xl font-normal text-gray-300 mb-8 md:mb-16'>
              What would you like to create today?
            </h1>

            {/* Sample Images Grid - Desktop */}
            {/* Flexbox: 1 image full height on left, 2 images stacked in center, 1 image full height on right */}
            <div className='hidden md:block mb-8 md:mb-16'>
              <div className='flex w-fit mx-auto gap-6 h-[500px]'>
                {/* Left: Large vertical image */}
                <div className='flex-shrink-0'>
                  <img
                    src='https://cdn.chatly.imagine.art/everask-web/images/image-generation/presets/image-gen-presets-asset-1.webp'
                    alt='Sample 1'
                    className='w-60 h-full object-cover rounded-2xl cursor-pointer hover:opacity-80 transition-opacity'
                  />
                </div>
                {/* Center: Two stacked images */}
                <div className='flex flex-col gap-6 flex-shrink-0'>
                  <img
                    src='https://cdn.chatly.imagine.art/everask-web/images/image-generation/presets/image-gen-presets-asset-2.webp'
                    alt='Sample 2'
                    className='w-60 h-1/2 object-cover rounded-2xl cursor-pointer hover:opacity-80 transition-opacity flex-1'
                  />
                  <img
                    src='https://cdn.chatly.imagine.art/everask-web/images/image-generation/presets/image-gen-presets-asset-3.webp'
                    alt='Sample 3'
                    className='w-60 h-1/2 object-cover rounded-2xl cursor-pointer hover:opacity-80 transition-opacity flex-1'
                  />
                </div>
                {/* Right: Large vertical image */}
                <div className='flex-shrink-0'>
                  <img
                    src='https://cdn.chatly.imagine.art/everask-web/images/image-generation/presets/image-gen-presets-asset-4.webp'
                    alt='Sample 4'
                    className='w-60 h-full object-cover rounded-2xl cursor-pointer hover:opacity-80 transition-opacity'
                  />
                </div>
              </div>
            </div>

            {/* Sample Images Grid - Mobile */}
            <div className='md:hidden mb-8'>
              <div className='grid grid-cols-2 gap-4 max-w-sm mx-auto'>
                <img
                  src='https://cdn.chatly.imagine.art/everask-web/images/image-generation/presets/image-gen-presets-asset-1.webp'
                  alt='Sample 1'
                  className='w-full h-32 object-cover rounded-xl cursor-pointer hover:opacity-80 transition-opacity'
                />
                <img
                  src='https://cdn.chatly.imagine.art/everask-web/images/image-generation/presets/image-gen-presets-asset-2.webp'
                  alt='Sample 2'
                  className='w-full h-32 object-cover rounded-xl cursor-pointer hover:opacity-80 transition-opacity'
                />
                <img
                  src='https://cdn.chatly.imagine.art/everask-web/images/image-generation/presets/image-gen-presets-asset-3.webp'
                  alt='Sample 3'
                  className='w-full h-32 object-cover rounded-xl cursor-pointer hover:opacity-80 transition-opacity'
                />
                <img
                  src='https://cdn.chatly.imagine.art/everask-web/images/image-generation/presets/image-gen-presets-asset-4.webp'
                  alt='Sample 4'
                  className='w-full h-32 object-cover rounded-xl cursor-pointer hover:opacity-80 transition-opacity'
                />
              </div>
            </div>
          </div>
        </div>

        {/* Fixed Input Area at Bottom */}
        <div className='p-4 bg-background'>
          <div className='max-w-3xl mx-auto'>
            <div className='flex items-center bg-[#2a2a2a] rounded-full px-4 py-3'>
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
                className='bg-[#555] hover:bg-[#666] text-white p-2 rounded-full ml-3'
                disabled={!message.trim()}
                onClick={handleSendMessage}
              >
                <ArrowUp size={16} />
              </Button>
            </div>

            <div className='text-xs text-gray-500 text-center mt-4'>
              Watch your ideas come to life with Chatro Image Generator
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Chat state with messages
  return (
    <div className='min-h-screen bg-[#1a1a1a] text-white flex flex-col'>
      {/* Scrollable Messages Area */}
      <div className='flex-1 overflow-y-auto p-4 md:p-8 space-y-6'>
        <div className='max-w-4xl mx-auto'>
          {messages.map(msg => (
            <div
              key={msg.id}
              className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'} mb-6`}
            >
              {msg.type === 'assistant' && (
                <div className='w-8 h-8 bg-[#2a2a2a] rounded-full flex items-center justify-center mr-3 mt-1 flex-shrink-0'>
                  <span className='text-sm'>🎨</span>
                </div>
              )}

              <div
                className={`max-w-xs md:max-w-2xl ${
                  msg.type === 'user'
                    ? 'bg-[#2a2a2a] text-white'
                    : 'bg-transparent'
                } rounded-2xl p-4`}
              >
                {msg.type === 'user' ? (
                  <p className='text-white'>{msg.content}</p>
                ) : (
                  <div>
                    <p className='text-white mb-4'>{msg.content}</p>
                    {msg.images && (
                      <div className='grid grid-cols-2 gap-3'>
                        {msg.images.map((img, idx) => (
                          <div key={idx} className='relative group'>
                            <img
                              src={img}
                              alt={`Generated ${idx + 1}`}
                              className='w-full h-32 md:h-40 object-cover rounded-xl cursor-pointer hover:opacity-90 transition-opacity'
                            />
                            <div className='absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity'>
                              <Button
                                size='sm'
                                className='bg-black bg-opacity-50 text-white hover:bg-opacity-70 p-1 rounded'
                              >
                                <Download size={14} />
                              </Button>
                            </div>
                            <div className='absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity'>
                              <Button
                                size='sm'
                                className='bg-black bg-opacity-50 text-white hover:bg-opacity-70 p-1 rounded'
                              >
                                <Copy size={14} />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}

          {isGenerating && (
            <div className='flex justify-start mb-6'>
              <div className='w-8 h-8 bg-[#2a2a2a] rounded-full flex items-center justify-center mr-3 mt-1'>
                <span className='text-sm'>🎨</span>
              </div>
              <div className='bg-[#2a2a2a] rounded-2xl p-4'>
                <div className='flex items-center space-x-2'>
                  <div className='w-2 h-2 bg-gray-400 rounded-full animate-bounce' />
                  <div
                    className='w-2 h-2 bg-gray-400 rounded-full animate-bounce'
                    style={{ animationDelay: '0.1s' }}
                  />
                  <div
                    className='w-2 h-2 bg-gray-400 rounded-full animate-bounce'
                    style={{ animationDelay: '0.2s' }}
                  />
                  <span className='text-gray-400 ml-2'>
                    Generating images...
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Fixed Input Area at Bottom */}
      <div className='border-t border-[#2a2a2a] p-4 bg-[#1a1a1a]'>
        <div className='max-w-4xl mx-auto'>
          <div className='flex items-center bg-[#2a2a2a] rounded-full px-4 py-3'>
            <Paperclip
              size={20}
              className='text-gray-400 mr-3 cursor-pointer hover:text-white'
            />
            <Input
              placeholder='Generate a new image for...'
              value={message}
              onChange={e => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              className='flex-1 bg-transparent border-0 text-white placeholder-gray-500 focus:ring-0 focus:outline-none'
            />
            <Button
              size='sm'
              className='bg-[#555] hover:bg-[#666] text-white p-2 rounded-full ml-3'
              disabled={!message.trim() || isGenerating}
              onClick={handleSendMessage}
            >
              <ArrowUp size={16} />
            </Button>
          </div>

          <div className='text-xs text-gray-500 text-center mt-2'>
            Watch your ideas come to life with Chatro Image Generator
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageGeneration;
