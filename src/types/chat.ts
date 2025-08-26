import type { ReactNode } from 'react';

// Message types
export interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  model?: string;
  chatId?: string;
}

// Chat types
export interface Chat {
  id: string;
  title?: string;
  model?: string;
  created_at: string;
  updated_at?: string;
  messageCount?: number;
  userId?: string;
}

// API Response types
export interface CreateChatResponse {
  success: boolean;
  chatId: string;
  userMessage: string;
  botMessage: string;
  isNewChat: boolean;
  error?: string;
}

export interface GetMessagesResponse {
  success: boolean;
  messages: ChatMessage[];
  error?: string;
}

// Database message format (from API)
export interface ChatMessage {
  id: string;
  chat_id: string;
  prompt: string;
  created_at: string;
  model_output: string;
  model?: string;
}

// Chat state types
export interface ChatState {
  currentChatId: string | null;
  messages: Message[];
  isLoading: boolean;
  isTyping: boolean;
  error: string | null;
}

// Quick action types
export interface QuickAction {
  icon: ReactNode;
  label: string;
  isPro?: boolean;
  suggestions?: string[];
  onClick?: () => void;
}

// Model types
export interface AIModel {
  id: string;
  name: string;
  description: string;
  isPro: boolean;
  isNew?: boolean;
  isPreview?: boolean;
  icon: string;
  provider: 'openai' | 'anthropic' | 'google' | 'x-ai' | 'deepseek';
}

// Chat input types
export interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSend: (message?: string) => void;
  placeholder?: string;
  disabled?: boolean;
  isLoading?: boolean;
}

// Chat conversation types
export interface ChatConversationProps {
  chatId: string;
  selectedModel?: string;
  isLoggedIn: boolean;
  messages: Message[];
  isTyping: boolean;
  isLoadingChat: boolean;
  onSendMessage: (message: string) => Promise<void>;
}

// Chat header types
export interface ChatHeaderProps {
  selectedModel?: string;
  onModelSelect?: (modelName: string) => void;
  isSidebarCollapsed: boolean;
  onToggleSidebar: () => void;
  onLogin: () => void;
  isLoggedIn: boolean;
  showBorder?: boolean;
  onOpenUpgrade?: () => void;
}

// Suggestions popover types
export interface SuggestionsPopoverProps {
  suggestions: string[];
  onSuggestionClick: (suggestion: string) => void;
  onClose: () => void;
  isVisible: boolean;
}

// Quick actions types
export interface QuickActionsProps {
  onActionClick: (action: QuickAction) => void;
}

// Usage popover types
export interface UsagePopoverProps {
  isOpen: boolean;
  onClose: () => void;
}

// Model selector types
export interface ModelSelectorProps {
  children: ReactNode;
  selectedModel?: string;
  onModelSelect?: (modelName: string) => void;
}
