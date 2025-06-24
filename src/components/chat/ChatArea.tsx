
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronDown, Send, Paperclip, Menu, Search, History, Zap } from "lucide-react";
import { ChatHistory } from "./ChatHistory";

interface ChatAreaProps {
  onOpenModelSelector: () => void;
  isSidebarCollapsed: boolean;
  onToggleSidebar: () => void;
}

export const ChatArea = ({ onOpenModelSelector, isSidebarCollapsed, onToggleSidebar }: ChatAreaProps) => {
  const [message, setMessage] = useState("");
  const [showHistory, setShowHistory] = useState(false);

  return (
    <div className="flex-1 flex flex-col relative">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-[#333]">
        <div className="flex items-center space-x-3">
          {isSidebarCollapsed && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onToggleSidebar}
              className="text-gray-400 hover:text-white"
            >
              <Menu size={16} />
            </Button>
          )}
          
          <Button
            variant="ghost"
            onClick={onOpenModelSelector}
            className="text-white hover:bg-[#1a1a1a] flex items-center space-x-2"
          >
            <span>OpenAI GPT-4o-mini</span>
            <ChevronDown size={16} />
          </Button>
        </div>

        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
            <Zap size={16} />
            <span className="ml-1">Usage</span>
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-gray-400 hover:text-white"
            onClick={() => setShowHistory(!showHistory)}
          >
            <History size={16} />
            <span className="ml-1">History</span>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex">
        <div className="flex-1 flex flex-col">
          {/* Chat Messages Area */}
          <div className="flex-1 flex flex-col items-center justify-center p-8">
            <div className="text-center max-w-2xl">
              <h1 className="text-4xl font-normal text-gray-300 mb-8">
                How can I help you today?
              </h1>

              {/* Quick Action Buttons */}
              <div className="grid grid-cols-5 gap-4 mb-8">
                <div className="flex flex-col items-center space-y-2">
                  <div className="w-12 h-12 bg-[#1a1a1a] border border-[#333] rounded-lg flex items-center justify-center">
                    <span className="text-red-400">✏️</span>
                  </div>
                  <span className="text-xs text-gray-400">Help me write</span>
                </div>
                
                <div className="flex flex-col items-center space-y-2">
                  <div className="w-12 h-12 bg-[#1a1a1a] border border-[#333] rounded-lg flex items-center justify-center relative">
                    <span className="text-purple-400">🎨</span>
                    <span className="absolute -top-1 -right-1 text-xs bg-purple-600 px-1 rounded">Pro</span>
                  </div>
                  <span className="text-xs text-gray-400">Create images</span>
                </div>
                
                <div className="flex flex-col items-center space-y-2">
                  <div className="w-12 h-12 bg-[#1a1a1a] border border-[#333] rounded-lg flex items-center justify-center">
                    <span className="text-blue-400">💻</span>
                  </div>
                  <span className="text-xs text-gray-400">Code</span>
                </div>
                
                <div className="flex flex-col items-center space-y-2">
                  <div className="w-12 h-12 bg-[#1a1a1a] border border-[#333] rounded-lg flex items-center justify-center relative">
                    <span className="text-green-400">👁️</span>
                    <span className="absolute -top-1 -right-1 text-xs bg-purple-600 px-1 rounded">Pro</span>
                  </div>
                  <span className="text-xs text-gray-400">Analyze image</span>
                </div>
                
                <div className="flex flex-col items-center space-y-2">
                  <div className="w-12 h-12 bg-[#1a1a1a] border border-[#333] rounded-lg flex items-center justify-center relative">
                    <span className="text-blue-400">🔗</span>
                    <span className="absolute -top-1 -right-1 text-xs bg-purple-600 px-1 rounded">Pro</span>
                  </div>
                  <span className="text-xs text-gray-400">Summarize link</span>
                </div>
              </div>

              {/* Second Row of Quick Actions */}
              <div className="grid grid-cols-5 gap-4 mb-8">
                <div className="flex flex-col items-center space-y-2">
                  <div className="w-12 h-12 bg-[#1a1a1a] border border-[#333] rounded-lg flex items-center justify-center">
                    <span className="text-purple-400">❓</span>
                  </div>
                  <span className="text-xs text-gray-400">Get advice</span>
                </div>
                
                <div className="flex flex-col items-center space-y-2">
                  <div className="w-12 h-12 bg-[#1a1a1a] border border-[#333] rounded-lg flex items-center justify-center relative">
                    <span className="text-red-400">📄</span>
                    <span className="absolute -top-1 -right-1 text-xs bg-purple-600 px-1 rounded">Pro</span>
                  </div>
                  <span className="text-xs text-gray-400">Process doc</span>
                </div>
                
                <div className="flex flex-col items-center space-y-2">
                  <div className="w-12 h-12 bg-[#1a1a1a] border border-[#333] rounded-lg flex items-center justify-center relative">
                    <span className="text-orange-400">📊</span>
                    <span className="absolute -top-1 -right-1 text-xs bg-purple-600 px-1 rounded">Pro</span>
                  </div>
                  <span className="text-xs text-gray-400">Analyze data</span>
                </div>
                
                <div className="flex flex-col items-center space-y-2">
                  <div className="w-12 h-12 bg-[#1a1a1a] border border-[#333] rounded-lg flex items-center justify-center">
                    <span className="text-purple-400">∞</span>
                  </div>
                  <span className="text-xs text-gray-400">Brainstorm</span>
                </div>
                
                <div className="flex flex-col items-center space-y-2">
                  <div className="w-12 h-12 bg-[#1a1a1a] border border-[#333] rounded-lg flex items-center justify-center">
                    <span className="text-pink-400">🌐</span>
                  </div>
                  <span className="text-xs text-gray-400">Web search</span>
                </div>
              </div>
            </div>

            {/* Advanced Web Search Notification */}
            <div className="w-full max-w-2xl bg-[#1a1a1a] border border-[#333] rounded-lg p-4 mb-6 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-[#333] rounded-full flex items-center justify-center">
                  <Search size={16} className="text-white" />
                </div>
                <div>
                  <div className="text-white font-medium">Try Advanced Web Search</div>
                  <div className="text-gray-400 text-sm">Experience more focused web searches with AI Search Engine</div>
                </div>
              </div>
              <Button variant="ghost" size="sm" className="text-gray-400">
                ×
              </Button>
            </div>
          </div>

          {/* Input Area */}
          <div className="p-6 border-t border-[#333]">
            <div className="max-w-4xl mx-auto relative">
              <div className="relative">
                <Input
                  placeholder="Type your message..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full bg-[#1a1a1a] border border-[#333] text-white placeholder-gray-500 pr-20 py-3 rounded-lg focus:border-blue-500"
                />
                <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center space-x-2">
                  <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white p-1">
                    <Paperclip size={16} />
                  </Button>
                  <Button 
                    size="sm" 
                    className="bg-[#333] hover:bg-[#444] text-gray-400 p-2 rounded-full"
                    disabled={!message.trim()}
                  >
                    <Send size={16} />
                  </Button>
                </div>
              </div>
              
              <div className="text-xs text-gray-500 text-center mt-2">
                Chatly can make mistakes. Check important info.
              </div>
            </div>
          </div>
        </div>

        {/* Chat History Sidebar */}
        {showHistory && (
          <ChatHistory onClose={() => setShowHistory(false)} />
        )}
      </div>
    </div>
  );
};
