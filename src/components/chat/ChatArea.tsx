import { ArrowUp, Paperclip } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { quickActions } from '@/data/quickActions';

import { ChatConversation } from './ChatConversation';
import { ChatHeader } from './ChatHeader';
import { QuickActions } from './QuickActions';
import { SuggestionsPopover } from './SuggestionsPopover';

interface QuickAction {
  icon: React.ReactNode;
  label: string;
  isPro?: boolean;
  onClick?: () => void;
}

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
  const [message, setMessage] = useState('');
  const [isConversationStarted, setIsConversationStarted] = useState(false);
  const [initialMessage, setInitialMessage] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [currentSuggestions, setCurrentSuggestions] = useState<string[]>([]);

  const handleSendMessage = () => {
    if (!message.trim()) return;

    setInitialMessage(message);
    setIsConversationStarted(true);
    setMessage('');
    setShowSuggestions(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

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

  // If conversation has started, show the conversation component
  if (isConversationStarted) {
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
        />

        <ChatConversation initialMessage={initialMessage} />
      </div>
    );
  }

  // Default empty state
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
                  disabled={!message.trim()}
                  onClick={handleSendMessage}
                >
                  <ArrowUp size={16} />
                </Button>
              </div>

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
