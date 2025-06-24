
import { useState } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { ChatArea } from "@/components/chat/ChatArea";
import { PricingModal } from "@/components/modals/PricingModal";
import { ModelSelector } from "@/components/chat/ModelSelector";

const Index = () => {
  const [isPricingOpen, setIsPricingOpen] = useState(false);
  const [isModelSelectorOpen, setIsModelSelectorOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-white flex">
      <Sidebar 
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        onOpenPricing={() => setIsPricingOpen(true)}
      />
      
      <div className="flex-1 flex flex-col">
        <ChatArea 
          onOpenModelSelector={() => setIsModelSelectorOpen(true)}
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
    </div>
  );
};

export default Index;
