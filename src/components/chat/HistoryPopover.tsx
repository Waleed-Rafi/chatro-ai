import { MoreHorizontal, Search } from 'lucide-react';
import * as React from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

interface HistoryPopoverProps {
  children: React.ReactNode;
}

export const HistoryPopover = ({ children }: HistoryPopoverProps) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent
        className='w-72 bg-[#1a1a1a] border-[#333] p-0 rounded-2xl shadow-2xl'
        side='bottom'
        align='end'
        sideOffset={8}
      >
        {/* Header */}
        <div className='p-4 border-b border-[#333]'>
          <h3 className='text-white font-medium'>History</h3>
        </div>

        {/* Search */}
        <div className='p-4'>
          <div className='relative'>
            <Search
              size={16}
              className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400'
            />
            <Input
              placeholder='Search history...'
              className='bg-[#0d0d0d] text-white placeholder-gray-500 pl-10 pr-4 py-3 text-sm border-[#333] rounded-xl h-11 focus:border-[#555] focus:ring-0 transition-colors chat-input-no-focus'
            />
          </div>
        </div>

        {/* History Items */}
        <div className='max-h-96 overflow-y-auto scrollbar-hide'>
          <div className='px-4 pb-4'>
            <div className='text-gray-400 text-sm mb-3 font-medium'>Today</div>
            <div className='space-y-2'>
              <div className='flex items-center justify-between p-3 rounded-lg hover:bg-[#2a2a2a] cursor-pointer transition-all duration-200'>
                <span className='text-white text-sm truncate'>
                  General Chat and Greetings
                </span>
                <Button
                  variant='ghost'
                  size='sm'
                  className='text-gray-400 hover:text-white p-1 h-8 w-8'
                >
                  <MoreHorizontal size={14} />
                </Button>
              </div>

              <div className='flex items-center justify-between p-3 rounded-lg hover:bg-[#2a2a2a] cursor-pointer transition-all duration-200'>
                <span className='text-white text-sm truncate'>
                  Code Review and Debugging
                </span>
                <Button
                  variant='ghost'
                  size='sm'
                  className='text-gray-400 hover:text-white p-1 h-8 w-8'
                >
                  <MoreHorizontal size={14} />
                </Button>
              </div>

              <div className='flex items-center justify-between p-3 rounded-lg hover:bg-[#2a2a2a] cursor-pointer transition-all duration-200'>
                <span className='text-white text-sm truncate'>
                  Project Planning Discussion
                </span>
                <Button
                  variant='ghost'
                  size='sm'
                  className='text-gray-400 hover:text-white p-1 h-8 w-8'
                >
                  <MoreHorizontal size={14} />
                </Button>
              </div>
            </div>

            <div className='text-gray-400 text-sm mb-3 font-medium mt-6'>
              Yesterday
            </div>
            <div className='space-y-2'>
              <div className='flex items-center justify-between p-3 rounded-lg hover:bg-[#2a2a2a] cursor-pointer transition-all duration-200'>
                <span className='text-white text-sm truncate'>
                  API Integration Help
                </span>
                <Button
                  variant='ghost'
                  size='sm'
                  className='text-gray-400 hover:text-white p-1 h-8 w-8'
                >
                  <MoreHorizontal size={14} />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};
