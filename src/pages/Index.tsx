
import { useState } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { ChatArea } from "@/components/chat/ChatArea";
import { PricingModal } from "@/components/modals/PricingModal";
import { ModelSelector } from "@/components/chat/ModelSelector";
import { UsagePopover } from "@/components/chat/UsagePopover";
import { HistoryPopover } from "@/components/chat/HistoryPopover";

const Index = () => {
  const [isPricingOpen, setIsPricingOpen] = useState(false);
  const [isModelSelectorOpen, setIsModelSelectorOpen] = useState(false);
  const [isUsageOpen, setIsUsageOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
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
