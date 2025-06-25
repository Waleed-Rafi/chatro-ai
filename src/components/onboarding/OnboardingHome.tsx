
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { QuickActions } from "@/components/chat/QuickActions";
import { ArrowUp, Paperclip, Sparkles } from "lucide-react";
import { useState } from "react";

interface OnboardingHomeProps {
  onLogin: () => void;
}

export const OnboardingHome = ({ onLogin }: OnboardingHomeProps) => {
  const [message, setMessage] = useState("");

  return (
    <div className="flex-1 flex flex-col h-full">
      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center p-4 md:p-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles size={32} className="text-yellow-400" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-4">
            How can I help you today?
          </h1>
        </div>

        <QuickActions />
      </div>

      {/* Fixed Input Area at Bottom */}
      <div className="border-t border-border p-4 bg-background">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center bg-muted/50 rounded-full px-4 py-3 mb-2">
            <Paperclip size={20} className="text-muted-foreground mr-3 cursor-pointer hover:text-foreground transition-colors" />
            <Input
              placeholder="Type your message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="flex-1 bg-transparent border-0 text-foreground placeholder-muted-foreground focus:ring-0 focus:outline-none"
            />
            <Button 
              size="sm" 
              className="bg-muted-foreground hover:bg-foreground text-background p-2 rounded-full ml-3"
              disabled={!message.trim()}
              onClick={onLogin}
            >
              <ArrowUp size={16} />
            </Button>
          </div>
          
          <div className="text-xs text-muted-foreground text-center">
            Chatly can make mistakes. Check important info.
          </div>
        </div>
      </div>
    </div>
  );
};
