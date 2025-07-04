
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowUp, Paperclip } from "lucide-react";

interface OnboardingHomeProps {
  onLogin: () => void;
}

export const OnboardingHome = ({ onLogin }: OnboardingHomeProps) => {
  const [message, setMessage] = useState("");

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (message.trim()) {
        onLogin();
      }
    }
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      onLogin();
    }
  };

  return (
    <div className="flex-1 flex flex-col">
      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center p-4 md:p-8">
        <div className="text-center max-w-4xl w-full">
          <h1 className="text-2xl md:text-4xl font-normal text-gray-300 mb-8 md:mb-16">
            How can I help you today?
          </h1>

          {/* Quick Action Buttons - Mobile optimized grid */}
          <div className="grid grid-cols-3 md:grid-cols-5 gap-4 md:gap-6 mb-6 md:mb-8">
            <div className="flex flex-col items-center space-y-2 md:space-y-3">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-[#2a2a2a] rounded-2xl flex items-center justify-center relative group hover:bg-[#333] transition-colors cursor-pointer">
                <span className="text-lg md:text-2xl">✏️</span>
              </div>
              <span className="text-xs md:text-sm text-gray-400 text-center">Help me write</span>
            </div>
            
            <div className="flex flex-col items-center space-y-2 md:space-y-3">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-[#2a2a2a] rounded-2xl flex items-center justify-center relative group hover:bg-[#333] transition-colors cursor-pointer">
                <span className="text-lg md:text-2xl">🎨</span>
                <span className="absolute -top-1 -right-1 text-xs bg-purple-600 px-1 py-0.5 rounded text-white">Pro</span>
              </div>
              <span className="text-xs md:text-sm text-gray-400 text-center">Create images</span>
            </div>
            
            <div className="flex flex-col items-center space-y-2 md:space-y-3">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-[#2a2a2a] rounded-2xl flex items-center justify-center relative group hover:bg-[#333] transition-colors cursor-pointer">
                <span className="text-lg md:text-2xl">💻</span>
              </div>
              <span className="text-xs md:text-sm text-gray-400 text-center">Code</span>
            </div>
            
            <div className="flex flex-col items-center space-y-2 md:space-y-3">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-[#2a2a2a] rounded-2xl flex items-center justify-center relative group hover:bg-[#333] transition-colors cursor-pointer">
                <span className="text-lg md:text-2xl">👁️</span>
                <span className="absolute -top-1 -right-1 text-xs bg-purple-600 px-1 py-0.5 rounded text-white">Pro</span>
              </div>
              <span className="text-xs md:text-sm text-gray-400 text-center">Analyze image</span>
            </div>
            
            <div className="flex flex-col items-center space-y-2 md:space-y-3">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-[#2a2a2a] rounded-2xl flex items-center justify-center relative group hover:bg-[#333] transition-colors cursor-pointer">
                <span className="text-lg md:text-2xl">🔗</span>
                <span className="absolute -top-1 -right-1 text-xs bg-purple-600 px-1 py-0.5 rounded text-white">Pro</span>
              </div>
              <span className="text-xs md:text-sm text-gray-400 text-center">Summarize link</span>
            </div>
          </div>

          {/* Second Row of Quick Actions - Hidden on smallest screens */}
          <div className="hidden sm:grid grid-cols-3 md:grid-cols-5 gap-4 md:gap-6 mb-8 md:mb-16">
            <div className="flex flex-col items-center space-y-2 md:space-y-3">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-[#2a2a2a] rounded-2xl flex items-center justify-center relative group hover:bg-[#333] transition-colors cursor-pointer">
                <span className="text-lg md:text-2xl">❓</span>
              </div>
              <span className="text-xs md:text-sm text-gray-400 text-center">Get advice</span>
            </div>
            
            <div className="flex flex-col items-center space-y-2 md:space-y-3">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-[#2a2a2a] rounded-2xl flex items-center justify-center relative group hover:bg-[#333] transition-colors cursor-pointer">
                <span className="text-lg md:text-2xl">📄</span>
                <span className="absolute -top-1 -right-1 text-xs bg-purple-600 px-1 py-0.5 rounded text-white">Pro</span>
              </div>
              <span className="text-xs md:text-sm text-gray-400 text-center">Process doc</span>
            </div>
            
            <div className="flex flex-col items-center space-y-2 md:space-y-3">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-[#2a2a2a] rounded-2xl flex items-center justify-center relative group hover:bg-[#333] transition-colors cursor-pointer">
                <span className="text-lg md:text-2xl">📊</span>
                <span className="absolute -top-1 -right-1 text-xs bg-purple-600 px-1 py-0.5 rounded text-white">Pro</span>
              </div>
              <span className="text-xs md:text-sm text-gray-400 text-center">Analyze data</span>
            </div>
            
            <div className="flex flex-col items-center space-y-2 md:space-y-3">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-[#2a2a2a] rounded-2xl flex items-center justify-center relative group hover:bg-[#333] transition-colors cursor-pointer">
                <span className="text-lg md:text-2xl">∞</span>
              </div>
              <span className="text-xs md:text-sm text-gray-400 text-center">Brainstorm</span>
            </div>
            
            <div className="flex flex-col items-center space-y-2 md:space-y-3">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-[#2a2a2a] rounded-2xl flex items-center justify-center relative group hover:bg-[#333] transition-colors cursor-pointer">
                <span className="text-lg md:text-2xl">🌐</span>
              </div>
              <span className="text-xs md:text-sm text-gray-400 text-center">Web search</span>
            </div>
          </div>
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
              disabled={!message.trim()}
              onClick={handleSendMessage}
            >
              <ArrowUp size={16} />
            </Button>
          </div>
          
          <div className="text-xs text-gray-500 text-center mt-2">
            Reply can make mistakes. Check important info.
          </div>
        </div>
      </div>
    </div>
  );
};
