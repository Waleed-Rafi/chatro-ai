
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Sidebar } from "@/components/layout/Sidebar";
import { ChatArea } from "@/components/chat/ChatArea";
import { OnboardingHome } from "@/components/onboarding/OnboardingHome";
import { PricingModal } from "@/components/modals/PricingModal";
import { ModelSelector } from "@/components/chat/ModelSelector";
import { UsagePopover } from "@/components/chat/UsagePopover";
import { HistoryPopover } from "@/components/chat/HistoryPopover";
import { LoginModal } from "@/components/modals/LoginModal";
import { Button } from "@/components/ui/button";
import { LogIn } from "lucide-react";

const Index = () => {
  const { isLoggedIn } = useAuth();
  const [isPricingOpen, setIsPricingOpen] = useState(false);
  const [isModelSelectorOpen, setIsModelSelectorOpen] = useState(false);
  const [isUsageOpen, setIsUsageOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const handleLoginClick = () => {
    setIsLoginOpen(true);
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-background text-foreground flex">
        <Sidebar 
          isCollapsed={isSidebarCollapsed}
          onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          onOpenPricing={() => setIsPricingOpen(true)}
        />
        
        {/* Header for logged out users */}
        <div className="flex-1 flex flex-col">
          <div className="h-12 md:h-16 border-b border-border flex items-center justify-between px-4 md:px-6 bg-background">
            <div className="flex items-center space-x-3">
              <div className="hidden md:flex items-center space-x-2">
                <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center">
                  <span className="text-xs font-bold text-white">C</span>
                </div>
                <span className="text-foreground font-semibold">Chatly</span>
              </div>
              <div className="text-sm text-muted-foreground hidden md:block">
                OpenAI GPT-4o-mini
              </div>
            </div>
            
            <Button
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
              onClick={handleLoginClick}
            >
              <LogIn size={16} className="mr-2" />
              Login
            </Button>
          </div>
          
          <OnboardingHome onLogin={handleLoginClick} />
        </div>

        <LoginModal 
          isOpen={isLoginOpen}
          onClose={() => setIsLoginOpen(false)}
        />

        <PricingModal 
          isOpen={isPricingOpen}
          onClose={() => setIsPricingOpen(false)}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex">
      <Sidebar 
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        onOpenPricing={() => setIsPricingOpen(true)}
      />
      
      <div className="flex-1 flex flex-col">
        <ChatArea 
          onOpenModelSelector={() => setIsModelSelectorOpen(true)}
          onOpenUsage={() => setIsUsageOpen(true)}
          onOpenHistory={() => setIsHistoryOpen(true)}
          isSidebarCollapsed={isSidebarCollapsed}
          onToggleSidebar={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        />
      </div>

      <PricingModal 
        isOpen={isPricingOpen}
        onClose={() => setIsPricingOpen(false)}
      />

      <ModelSelector 
        isOpen={isModelSelectorOpen}
        onClose={() => setIsModelSelectorOpen(false)}
      />

      <UsagePopover 
        isOpen={isUsageOpen}
        onClose={() => setIsUsageOpen(false)}
      />

      <HistoryPopover 
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
      />
    </div>
  );
};

export default Index;
