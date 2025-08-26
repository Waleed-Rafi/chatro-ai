import { CheckCircle, Search, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import * as React from 'react';
import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useAuth } from '@/hooks/use-auth';
import type { Chat } from '@/types/chat';

interface HistoryPopoverProps {
  children: React.ReactNode;
  onChatSelect?: (chatId: string) => void;
  currentChatId?: string;
}

interface ChatWithDate extends Chat {
  created_at: string;
}

export const HistoryPopover = ({
  children,
  onChatSelect,
  currentChatId,
}: HistoryPopoverProps) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [chats, setChats] = useState<ChatWithDate[]>([]);
  const [filteredChats, setFilteredChats] = useState<ChatWithDate[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { user } = useAuth();

  // Fetch chats when popover opens
  useEffect(() => {
    if (isOpen && user?.id) {
      fetchChats();
    }
  }, [isOpen, user?.id]);

  // Filter chats based on search query
  useEffect(() => {
    if (searchQuery.trim()) {
      const filtered = chats.filter(chat =>
        chat.title?.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredChats(filtered);
    } else {
      setFilteredChats(chats);
    }
  }, [searchQuery, chats]);

  const fetchChats = async () => {
    if (!user?.id) return;

    setIsLoading(true);
    try {
      const response = await fetch(`/api/getChats?userId=${user.id}`);
      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setChats(data.chats || []);
        }
      }
    } catch (error) {
      console.error('Error fetching chats:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChatClick = (chatId: string) => {
    if (onChatSelect) {
      onChatSelect(chatId);
    } else {
      router.push(`/?chat=${chatId}`);
    }
    setIsOpen(false);
  };

  const handleDeleteChat = async (chatId: string, e: React.MouseEvent) => {
    e.stopPropagation();

    if (!user?.id) return;

    // Show confirmation dialog
    const isCurrentChat = currentChatId === chatId;

    try {
      const response = await fetch('/api/deleteChat', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chatId,
          userId: user.id,
        }),
      });

      if (response.ok) {
        // Remove the deleted chat from the list
        setChats(prev => prev.filter(chat => chat.id !== chatId));
        setFilteredChats(prev => prev.filter(chat => chat.id !== chatId));

        // If the deleted chat is the currently opened one, redirect to home
        if (isCurrentChat) {
          router.push('/?chat=new');
        }
      } else {
        console.error('Failed to delete chat');
      }
    } catch (error) {
      console.error('Error deleting chat:', error);
    }
  };

  const groupChatsByDate = (chats: ChatWithDate[]) => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    const groups: { [key: string]: ChatWithDate[] } = {
      today: [],
      yesterday: [],
      older: [],
    };

    chats.forEach(chat => {
      const chatDate = new Date(chat.created_at);
      const diffTime = Math.abs(today.getTime() - chatDate.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays === 0) {
        groups.today.push(chat);
      } else if (diffDays === 1) {
        groups.yesterday.push(chat);
      } else {
        groups.older.push(chat);
      }
    });

    return groups;
  };

  const renderChatGroup = (title: string, chats: ChatWithDate[]) => {
    if (chats.length === 0) return null;

    return (
      <div key={title}>
        <div className='text-gray-400 text-sm mb-3 font-medium capitalize'>
          {title}
        </div>
        <div className='space-y-2'>
          {chats.map(chat => (
            <div
              key={chat.id}
              className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                chat.id === currentChatId ? 'bg-[#333]' : 'hover:bg-[#333]'
              }`}
              onClick={() => handleChatClick(chat.id)}
            >
              <span className='text-sm truncate flex-1 mr-2 flex items-center text-white'>
                {chat.id === currentChatId && (
                  <CheckCircle
                    size={14}
                    className='mr-2 text-gray-400 flex-shrink-0'
                  />
                )}
                {chat.title || 'Untitled Chat'}
              </span>
              <Button
                variant='ghost'
                size='sm'
                className='p-1 h-8 w-8 text-gray-400 hover:text-red-400'
                onClick={e => handleDeleteChat(chat.id, e)}
              >
                <Trash2 size={14} />
              </Button>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const groupedChats = groupChatsByDate(filteredChats);

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent
        className='w-80 bg-[#2a2a2a] border-[#404040] p-0 rounded-2xl shadow-2xl'
        side='bottom'
        align='end'
        sideOffset={8}
      >
        {/* Header */}
        <div className='p-4 border-b border-[#404040]'>
          <h3 className='text-white font-medium'>Chat History</h3>
        </div>

        {/* Search */}
        <div className='p-4'>
          <div className='relative'>
            <Search
              size={16}
              className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400'
            />
            <Input
              placeholder='Search conversations...'
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className='bg-[#2a2a2a] text-white placeholder-gray-500 pl-10 pr-4 py-3 text-sm border border-[#404040] rounded-xl h-11 focus:border-[#404040] focus:ring-0 transition-colors popover-input'
            />
          </div>
        </div>

        {/* History Items */}
        <div className='max-h-96 overflow-y-auto scrollbar-hide'>
          <div className='px-4 pb-4'>
            {isLoading ? (
              <div className='text-center py-8'>
                <div className='animate-spin rounded-full h-6 w-6 border-b-2 border-white mx-auto mb-2'></div>
                <p className='text-gray-400 text-sm'>Loading chats...</p>
              </div>
            ) : filteredChats.length === 0 ? (
              <div className='text-center py-8'>
                <p className='text-gray-400 text-sm'>
                  {searchQuery ? 'No chats found' : 'No conversations yet'}
                </p>
              </div>
            ) : (
              <>
                {renderChatGroup('today', groupedChats.today)}
                {renderChatGroup('yesterday', groupedChats.yesterday)}
                {renderChatGroup('older', groupedChats.older)}
              </>
            )}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};
