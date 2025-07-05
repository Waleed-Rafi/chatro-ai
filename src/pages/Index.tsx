import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { ChatArea } from '@/components/chat/ChatArea';
import { HistoryPopover } from '@/components/chat/HistoryPopover';
import { ModelSelector } from '@/components/chat/ModelSelector';
import { UsagePopover } from '@/components/chat/UsagePopover';
import { Sidebar } from '@/components/layout/Sidebar';
import { PricingModal } from '@/components/modals/PricingModal';
import { useAuth } from '@/contexts/AuthContext';

import { DailyPopup } from '../components/modals/DailyPopup';

const Index = () => {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const [isPricingOpen, setIsPricingOpen] = useState(false);
  const [isModelSelectorOpen, setIsModelSelectorOpen] = useState(false);
  const [isUsageOpen, setIsUsageOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [isDailyPopupOpen, setIsDailyPopupOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(() => {
    const stored = localStorage.getItem('sidebarCollapsed');
    return stored === 'true';
  });

  useEffect(() => {
    localStorage.setItem('sidebarCollapsed', isSidebarCollapsed.toString());
  }, [isSidebarCollapsed]);

  // Check if daily popup should be shown
  useEffect(() => {
    if (!isLoggedIn) {
      const hidePopupUntil = localStorage.getItem('hidePopupUntil');
      const now = new Date().getTime();

      if (!hidePopupUntil || now > parseInt(hidePopupUntil)) {
        // Show popup after a short delay
        const timer = setTimeout(() => {
          setIsDailyPopupOpen(true);
        }, 2000);

        return () => clearTimeout(timer);
      }
    }
  }, [isLoggedIn]);

  const handleLoginClick = () => {
    navigate('/auth?mode=login');
  };

  return (
    <div className='min-h-screen bg-background text-foreground flex'>
      <Sidebar
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        onOpenPricing={() => setIsPricingOpen(true)}
      />

      <div className='flex-1 flex flex-col'>
        <ChatArea
          onOpenModelSelector={() => setIsModelSelectorOpen(true)}
          onOpenUsage={() => setIsUsageOpen(true)}
          onOpenHistory={() => setIsHistoryOpen(true)}
          isSidebarCollapsed={isSidebarCollapsed}
          onToggleSidebar={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          isLoggedIn={isLoggedIn}
          onLogin={handleLoginClick}
          onOpenUpgrade={() => setIsPricingOpen(true)}
        />
      </div>

      <PricingModal
        isOpen={isPricingOpen}
        onClose={() => setIsPricingOpen(false)}
      />

      <DailyPopup
        isOpen={isDailyPopupOpen}
        onClose={() => setIsDailyPopupOpen(false)}
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
