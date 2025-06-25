
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
          onLogin={handleLoginClick}
        />
        
        <div className="flex-1 flex flex-col">
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
