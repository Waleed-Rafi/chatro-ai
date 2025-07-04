
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowUp, Paperclip, Copy, ThumbsUp, ThumbsDown, RefreshCw } from "lucide-react";

interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  model?: string;
}

interface ChatConversationProps {
  initialMessage?: string;
}

export const ChatConversation = ({ initialMessage }: ChatConversationProps) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>(() => {
    if (initialMessage) {
      return [
        {
          id: "1",
          type: 'user',
          content: initialMessage,
          timestamp: new Date()
        },
        {
          id: "2",
          type: 'assistant',
          content: "I'm just a program, so I don't have feelings, but I'm here and ready to help you! How can I assist you today?",
          timestamp: new Date(),
          model: "OpenAI GPT-4o-mini"
        }
      ];
    }
    return [];
  });
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: message,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setMessage("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "That's a great question! Let me help you with that.",
        "I'd be happy to assist you with this. Here's what I think...",
        "Based on what you've shared, I can provide some insights.",
        "That's an interesting point. Let me break this down for you."
      ];
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: responses[Math.floor(Math.random() * responses.length)],
        timestamp: new Date(),
        model: "OpenAI GPT-4o-mini"
      };
      setMessages(prev => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full">
      {/* Scrollable Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-6">
        <div className="max-w-4xl mx-auto">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'} mb-6`}>
              {msg.type === 'assistant' && (
                <div className="w-8 h-8 bg-[#2a2a2a] rounded-full flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                  <span className="text-sm">🤖</span>
                </div>
              )}
              
              <div className={`max-w-xs md:max-w-2xl ${
                msg.type === 'user' 
                  ? 'bg-[#2a2a2a] text-white' 
                  : 'bg-transparent'
              } rounded-2xl p-4`}>
                <p className="text-white">{msg.content}</p>
                
                {msg.type === 'assistant' && (
                  <div className="mt-4 pt-4 border-t border-gray-600">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white p-1">
                          <Copy size={16} />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white p-1">
                          <RefreshCw size={16} />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white p-1">
                          <ThumbsUp size={16} />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white p-1">
                          <ThumbsDown size={16} />
                        </Button>
                      </div>
                      
                      {msg.model && (
                        <div className="flex items-center space-x-2">
                          <span className="text-xs text-gray-400">{msg.model}</span>
                          <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white p-1">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-gray-400">
                              <path d="M7 14l3-3 3 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start mb-6">
              <div className="w-8 h-8 bg-[#2a2a2a] rounded-full flex items-center justify-center mr-3 mt-1">
                <span className="text-sm">🤖</span>
              </div>
              <div className="bg-[#2a2a2a] rounded-2xl p-4">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Fixed Input Area at Bottom */}
      <div className="border-t border-[#2a2a2a] p-4 bg-[#1a1a1a]">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center bg-[#2a2a2a] rounded-full px-4 py-3">
            <Paperclip size={20} className="text-gray-400 mr-3 cursor-pointer hover:text-white" />
            <Input
              placeholder="Type your message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1 bg-transparent border-0 text-white placeholder-gray-500 focus:ring-0 focus:outline-none"
            />
            <Button 
              size="sm" 
              className="bg-[#555] hover:bg-[#666] text-white p-2 rounded-full ml-3"
              disabled={!message.trim() || isTyping}
              onClick={handleSendMessage}
            >
              <ArrowUp size={16} />
            </Button>
          </div>
          
          <div className="text-xs text-gray-500 text-center mt-2">
            Chatro can make mistakes. Check important info.
          </div>
        </div>
      </div>
    </div>
  );
};
