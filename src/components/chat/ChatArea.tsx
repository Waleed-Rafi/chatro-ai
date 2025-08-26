import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';

import { quickActions } from '@/data/quickActions';
import { useAuth } from '@/hooks/use-auth';
import type {
  ChatMessage,
  CreateChatResponse,
  Message,
  QuickAction,
} from '@/types/chat';

import { ChatConversation } from './ChatConversation';
import { ChatHeader } from './ChatHeader';
import { ChatInput } from './ChatInput';
import { QuickActions } from './QuickActions';
import { SuggestionsPopover } from './SuggestionsPopover';

interface ChatAreaProps {
  selectedModel?: string;
  onModelSelect?: (modelName: string) => void;
  isSidebarCollapsed: boolean;
  onToggleSidebar: () => void;
  onLogin: () => void;
  isLoggedIn: boolean;
  onOpenUpgrade: () => void;
}

export const ChatArea = ({
  selectedModel = 'OpenAI GPT-4o-mini',
  onModelSelect,
  isSidebarCollapsed,
  onToggleSidebar,
  onLogin,
  isLoggedIn,
  onOpenUpgrade,
}: ChatAreaProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user } = useAuth();
  const [message, setMessage] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [currentSuggestions, setCurrentSuggestions] = useState<string[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [isLoadingChat, setIsLoadingChat] = useState(false);

  // Ref for the input field to enable auto-focus
  const inputRef = useRef<HTMLInputElement>(null);

  // Get current chat ID from URL or create a new one
  const currentChatId = searchParams.get('chat') || 'new';
  const isNewChat = currentChatId === 'new';

  // Auto-focus input when starting a new chat
  useEffect(() => {
    if (isNewChat && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isNewChat]);

  // Fetch existing chat messages when loading an existing chat
  useEffect(() => {
    const fetchExistingChat = async () => {
      if (
        !isNewChat &&
        currentChatId &&
        currentChatId !== 'new' &&
        isLoggedIn &&
        user?.id
      ) {
        setIsLoadingChat(true);
        try {
          const response = await fetch(
            `/api/getMessages?chatId=${currentChatId}`
          );
          if (response.ok) {
            const data = await response.json();
            if (data.success && data.messages) {
              // Convert API messages to our message format
              const formattedMessages = data.messages
                .map((msg: ChatMessage) => [
                  {
                    id: `user-${msg.id}`,
                    type: 'user' as const,
                    content: msg.prompt,
                    timestamp: new Date(msg.created_at),
                    model: undefined,
                  },
                  {
                    id: `assistant-${msg.id}`,
                    type: 'assistant' as const,
                    content: msg.model_output,
                    timestamp: new Date(msg.created_at),
                    model: 'OpenAI GPT-4o-mini', // Default model, you can fetch this from chat details
                  },
                ])
                .flat();

              setMessages(formattedMessages);
            }
          } else {
            console.error('Failed to fetch chat messages');
          }
        } catch (error) {
          console.error('Error fetching chat messages:', error);
        } finally {
          setIsLoadingChat(false);
        }
      }
    };

    fetchExistingChat();
  }, [currentChatId, isNewChat, isLoggedIn, user?.id]);

  useEffect(() => {
    if (isNewChat) {
      setMessages([]);
    }
  }, [isNewChat]);

  const handleSendMessage = useCallback(
    async (messageContent?: string) => {
      const contentToSend = messageContent || message;
      if (!contentToSend.trim() || !isLoggedIn || !user?.id) return;

      const userMessage: Message = {
        id: Date.now().toString(),
        type: 'user',
        content: contentToSend.trim(),
        timestamp: new Date(),
        model: undefined,
      };

      // Add user message immediately
      setMessages(prev => [...prev, userMessage]);
      setMessage('');
      setShowSuggestions(false);
      setIsTyping(true);

      try {
        // Create a temporary chat ID if this is a new chat
        const tempChatId = isNewChat ? `temp_${Date.now()}` : currentChatId;

        // Update URL to show the chat is active
        if (isNewChat) {
          router.push(`/?chat=${tempChatId}`);
        }

        // Call the createChat API
        const response = await fetch('/api/createChat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId: user.id,
            chatMessage: userMessage.content,
            chatId: isNewChat ? undefined : currentChatId,
          }),
        });

        if (response.ok) {
          const data: CreateChatResponse = await response.json();

          // Add AI response
          const assistantMessage: Message = {
            id: (Date.now() + 1).toString(),
            type: 'assistant',
            content:
              data.botMessage ||
              'Sorry, I encountered an error. Please try again.',
            timestamp: new Date(),
            model: selectedModel,
          };

          setMessages(prev => [...prev, assistantMessage]);

          // If this was a new chat, update the URL with the real chat ID
          if (isNewChat && data.chatId) {
            router.replace(`/?chat=${data.chatId}`);
          }
        } else {
          // Handle error
          const errorMessage: Message = {
            id: (Date.now() + 1).toString(),
            type: 'assistant',
            content: 'Sorry, I encountered an error. Please try again.',
            timestamp: new Date(),
            model: selectedModel,
          };
          setMessages(prev => [...prev, errorMessage]);
        }
      } catch (error) {
        console.error('Error sending message:', error);
        const errorMessage: Message = {
          id: (Date.now() + 1).toString(),
          type: 'assistant',
          content: 'Sorry, I encountered an error. Please try again.',
          timestamp: new Date(),
          model: selectedModel,
        };
        setMessages(prev => [...prev, errorMessage]);
      } finally {
        setIsTyping(false);
      }
    },
    [
      message,
      isLoggedIn,
      isNewChat,
      currentChatId,
      router,
      user?.id,
      selectedModel,
    ]
  );

  const handleQuickActionClick = (action: QuickAction) => {
    // Find the action data from quickActions array
    const actionData = quickActions.find(qa => qa.label === action.label);

    if (actionData?.suggestions) {
      setCurrentSuggestions(actionData.suggestions);
      setShowSuggestions(true);
    } else {
      // If no suggestions, just set the action label as the message
      setMessage(action.label);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setMessage(suggestion);
    setShowSuggestions(false);
  };

  const handleCloseSuggestions = () => {
    setShowSuggestions(false);
  };

  const handleChatSelect = (chatId: string) => {
    router.push(`/?chat=${chatId}`);
  };

  // If there's an active chat, show the conversation component
  if (!isNewChat) {
    return (
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ${
          isSidebarCollapsed ? 'md:ml-16' : 'md:ml-64'
        } pt-16 md:pt-0 h-screen`}
      >
        <ChatHeader
          selectedModel={selectedModel}
          onModelSelect={onModelSelect}
          isSidebarCollapsed={isSidebarCollapsed}
          onToggleSidebar={onToggleSidebar}
          onLogin={onLogin}
          isLoggedIn={isLoggedIn}
          showBorder={false}
          onOpenUpgrade={onOpenUpgrade}
          onChatSelect={handleChatSelect}
          currentChatId={currentChatId}
        />

        <div className='flex-1 min-h-0'>
          <ChatConversation
            chatId={currentChatId}
            selectedModel={selectedModel}
            isLoggedIn={isLoggedIn}
            messages={messages}
            isTyping={isTyping}
            isLoadingChat={isLoadingChat}
            onSendMessage={messageContent => handleSendMessage(messageContent)}
          />
        </div>
      </div>
    );
  }

  // Default empty state for new chat
  return (
    <div
      className={`flex-1 flex flex-col transition-all duration-300 ${
        isSidebarCollapsed ? 'md:ml-16' : 'md:ml-64'
      } pt-16 md:pt-0`}
    >
      <ChatHeader
        selectedModel={selectedModel}
        onModelSelect={onModelSelect}
        isSidebarCollapsed={isSidebarCollapsed}
        onToggleSidebar={onToggleSidebar}
        onLogin={onLogin}
        isLoggedIn={isLoggedIn}
        showBorder={false}
        onOpenUpgrade={onOpenUpgrade}
        onChatSelect={handleChatSelect}
        currentChatId={currentChatId}
      />

      {/* Main Content */}
      <div className='flex-1 flex flex-col items-center justify-center p-4 md:p-8'>
        <div className='text-center max-w-4xl w-full'>
          <h1 className='text-2xl md:text-4xl font-normal text-gray-300 mb-8 md:mb-16'>
            How can I help you today?
          </h1>

          {/* Input Area */}
          <div className='max-w-3xl mx-auto mb-6 md:mb-12'>
            <div className='relative'>
              <ChatInput
                value={message}
                onChange={setMessage}
                onSend={() => handleSendMessage()}
                placeholder='Type your message...'
                disabled={!isLoggedIn}
                ref={inputRef}
              />

              {/* Suggestions Popover - Below input field */}
              <SuggestionsPopover
                suggestions={currentSuggestions}
                onSuggestionClick={handleSuggestionClick}
                onClose={handleCloseSuggestions}
                isVisible={showSuggestions}
              />
            </div>
          </div>

          {/* Quick Action Buttons - Always in DOM but invisible when suggestions shown */}
          <div
            className={`w-4/6 mx-auto transition-opacity duration-200 ${
              showSuggestions ? 'opacity-0 pointer-events-none' : 'opacity-100'
            }`}
          >
            <QuickActions onActionClick={handleQuickActionClick} />
          </div>
        </div>
      </div>
    </div>
  );
};
