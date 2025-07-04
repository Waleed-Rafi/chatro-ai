import { Search, X, MoreHorizontal } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface HistoryPopoverProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HistoryPopover = ({ isOpen, onClose }: HistoryPopoverProps) => {
  if (!isOpen) return null;

  return (
    <>
      {/* Desktop Popover */}
      <div className='hidden md:block'>
        <div className='fixed inset-0 z-40' onClick={onClose} />
        <div className='absolute top-16 right-8 z-50 w-80 bg-[#2a2a2a] rounded-lg shadow-lg'>
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
                placeholder='Search...'
                className='bg-[#1a1a1a] text-white placeholder-gray-500 pl-10'
              />
            </div>
          </div>

          {/* History Items */}
          <div className='max-h-96 overflow-y-auto'>
            <div className='px-4 pb-4'>
              <div className='text-gray-400 text-sm mb-3'>Today</div>
              <div className='flex items-center justify-between p-3 rounded-lg hover:bg-[#333] cursor-pointer'>
                <span className='text-white text-sm'>
                  General Chat and Greetings
                </span>
                <Button
                  variant='ghost'
                  size='sm'
                  className='text-gray-400 hover:text-white'
                >
                  <MoreHorizontal size={16} />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Bottom Sheet */}
      <div className='md:hidden fixed inset-0 z-50 bg-black/50'>
        <div className='fixed bottom-0 left-0 right-0 bg-[#1a1a1a] rounded-t-lg max-h-[80vh] flex flex-col'>
          {/* Header */}
          <div className='flex items-center justify-between p-4 border-b border-[#333]'>
            <h3 className='text-white font-medium text-lg'>History</h3>
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
                className='bg-[#2a2a2a] text-white placeholder-gray-500 pl-10'
              />
            </div>
          </div>

          {/* History Items */}
          <div className='flex-1 overflow-y-auto px-4 pb-4'>
            <div className='text-gray-400 text-sm mb-3'>Today</div>
            <div className='flex items-center justify-between p-4 rounded-lg hover:bg-[#333] cursor-pointer'>
              <span className='text-white'>General Chat and Greetings</span>
              <Button
                variant='ghost'
                size='sm'
                className='text-gray-400 hover:text-white'
              >
                <MoreHorizontal size={16} />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
