
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronDown, Send, Paperclip, Menu, ArrowUp } from "lucide-react";

interface ChatAreaProps {
  onOpenModelSelector: () => void;
  onOpenUsage: () => void;
  onOpenHistory: () => void;
  isSidebarCollapsed: boolean;
  onToggleSidebar: () => void;
}

export const ChatArea = ({ 
  onOpenModelSelector, 
  onOpenUsage, 
  onOpenHistory, 
  isSidebarCollapsed, 
  onToggleSidebar 
}: ChatAreaProps) => {
  const [message, setMessage] = useState("");

  return (
    <div className={`flex-1 flex flex-col transition-all duration-300 ${
      isSidebarCollapsed ? 'ml-16' : 'ml-64'
    }`}>
      {/* Header */}
      <div className="flex items-center justify-between p-4">
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
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-gray-400 hover:text-white"
            onClick={onOpenUsage}
          >
            <span className="mr-1">⚡</span>
            <span>Usage</span>
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-gray-400 hover:text-white"
            onClick={onOpenHistory}
          >
            <span className="mr-1">🕒</span>
            <span>History</span>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center p-8">
        <div className="text-center max-w-4xl w-full">
          <h1 className="text-4xl font-normal text-gray-300 mb-16">
            How can I help you today?
          </h1>

          {/* Input Area First */}
          <div className="max-w-3xl mx-auto mb-16">
            <div className="relative">
              <div className="flex items-center bg-[#2a2a2a] rounded-full px-4 py-3">
                <Paperclip size={20} className="text-gray-400 mr-3 cursor-pointer hover:text-white" />
                <Input
                  placeholder="Type your message..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="flex-1 bg-transparent border-0 text-white placeholder-gray-500 focus:ring-0 focus:outline-none"
                />
                <Button 
                  size="sm" 
                  className="bg-[#555] hover:bg-[#666] text-white p-2 rounded-full ml-3"
                  disabled={!message.trim()}
                >
                  <ArrowUp size={16} />
                </Button>
              </div>
            </div>
            
            <div className="text-xs text-gray-500 text-center mt-4">
              Chatly can make mistakes. Check important info.
            </div>
          </div>

          {/* Quick Action Buttons */}
          <div className="grid grid-cols-5 gap-6 mb-8">
            <div className="flex flex-col items-center space-y-3">
              <div className="w-16 h-16 bg-[#2a2a2a] rounded-2xl flex items-center justify-center relative group hover:bg-[#333] transition-colors cursor-pointer">
                <span className="text-2xl">✏️</span>
              </div>
              <span className="text-sm text-gray-400">Help me write</span>
            </div>
            
            <div className="flex flex-col items-center space-y-3">
              <div className="w-16 h-16 bg-[#2a2a2a] rounded-2xl flex items-center justify-center relative group hover:bg-[#333] transition-colors cursor-pointer">
                <span className="text-2xl">🎨</span>
                <span className="absolute -top-1 -right-1 text-xs bg-purple-600 px-1.5 py-0.5 rounded text-white">Pro</span>
              </div>
              <span className="text-sm text-gray-400">Create images</span>
            </div>
            
            <div className="flex flex-col items-center space-y-3">
              <div className="w-16 h-16 bg-[#2a2a2a] rounded-2xl flex items-center justify-center relative group hover:bg-[#333] transition-colors cursor-pointer">
                <span className="text-2xl">💻</span>
              </div>
              <span className="text-sm text-gray-400">Code</span>
            </div>
            
            <div className="flex flex-col items-center space-y-3">
              <div className="w-16 h-16 bg-[#2a2a2a] rounded-2xl flex items-center justify-center relative group hover:bg-[#333] transition-colors cursor-pointer">
                <span className="text-2xl">👁️</span>
                <span className="absolute -top-1 -right-1 text-xs bg-purple-600 px-1.5 py-0.5 rounded text-white">Pro</span>
              </div>
              <span className="text-sm text-gray-400">Analyze image</span>
            </div>
            
            <div className="flex flex-col items-center space-y-3">
              <div className="w-16 h-16 bg-[#2a2a2a] rounded-2xl flex items-center justify-center relative group hover:bg-[#333] transition-colors cursor-pointer">
                <span className="text-2xl">🔗</span>
                <span className="absolute -top-1 -right-1 text-xs bg-purple-600 px-1.5 py-0.5 rounded text-white">Pro</span>
              </div>
              <span className="text-sm text-gray-400">Summarize link</span>
            </div>
          </div>

          {/* Second Row of Quick Actions */}
          <div className="grid grid-cols-5 gap-6">
            <div className="flex flex-col items-center space-y-3">
              <div className="w-16 h-16 bg-[#2a2a2a] rounded-2xl flex items-center justify-center relative group hover:bg-[#333] transition-colors cursor-pointer">
                <span className="text-2xl">❓</span>
              </div>
              <span className="text-sm text-gray-400">Get advice</span>
            </div>
            
            <div className="flex flex-col items-center space-y-3">
              <div className="w-16 h-16 bg-[#2a2a2a] rounded-2xl flex items-center justify-center relative group hover:bg-[#333] transition-colors cursor-pointer">
                <span className="text-2xl">📄</span>
                <span className="absolute -top-1 -right-1 text-xs bg-purple-600 px-1.5 py-0.5 rounded text-white">Pro</span>
              </div>
              <span className="text-sm text-gray-400">Process doc</span>
            </div>
            
            <div className="flex flex-col items-center space-y-3">
              <div className="w-16 h-16 bg-[#2a2a2a] rounded-2xl flex items-center justify-center relative group hover:bg-[#333] transition-colors cursor-pointer">
                <span className="text-2xl">📊</span>
                <span className="absolute -top-1 -right-1 text-xs bg-purple-600 px-1.5 py-0.5 rounded text-white">Pro</span>
              </div>
              <span className="text-sm text-gray-400">Analyze data</span>
            </div>
            
            <div className="flex flex-col items-center space-y-3">
              <div className="w-16 h-16 bg-[#2a2a2a] rounded-2xl flex items-center justify-center relative group hover:bg-[#333] transition-colors cursor-pointer">
                <span className="text-2xl">∞</span>
              </div>
              <span className="text-sm text-gray-400">Brainstorm</span>
            </div>
            
            <div className="flex flex-col items-center space-y-3">
              <div className="w-16 h-16 bg-[#2a2a2a] rounded-2xl flex items-center justify-center relative group hover:bg-[#333] transition-colors cursor-pointer">
                <span className="text-2xl">🌐</span>
              </div>
              <span className="text-sm text-gray-400">Web search</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
