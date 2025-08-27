export interface Chat {
  id: string;
  user_id: string;
  title: string;
  created_at: string;
  updated_at: string;
}

export interface ChatMessage {
  id: string;
  chat_id: string;
  prompt: string;
  model_output: string;
  created_at: string;
  user_id?: string;
}

export interface OpenAIMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}
