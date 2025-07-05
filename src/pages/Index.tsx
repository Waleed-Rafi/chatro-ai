
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { ChatArea } from '@/components/chat/ChatArea';
import { HistoryPopover } from '@/components/chat/HistoryPopover';
import { ModelSelector } from '@/components/chat/ModelSelector';
import { UsagePopover } from '@/components/chat/UsagePopover';
import { Sidebar } from '@/components/layout/Sidebar';
import { PricingModal } from '@/components/modals/PricingModal';
import { DailyPopup } from '@/components/modals/DailyPopup';
import { Layout } from '@/components/design-system/organisms/Layout';
import { useAuth } from '@/contexts/AuthContext';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { LOCAL_STORAGE_KEYS, TIMEOUTS } from '@/utils/constants';

const Index = () => {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  
  // Modal states
  const [isPricingOpen, setIsPricingOpen] = useState(false);
  const [isModelSelectorOpen, setIsModelSelectorOpen] = useState(false);
  const [isUsageOpen, setIsUsageOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [isDailyPopupOpen, setIsDailyPopupOpen] = useState(false);
  
  // Layout state
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  
  // Local storage for popup management
  const [hidePopupUntil] = useLocalStorage(LOCAL_STORAGE_KEYS.HIDE_POPUP_UNTIL, null);

  // Check if daily popup should be shown
  useEffect(() => {
    if (!isLoggedIn) {
      const now = new Date().getTime();
      const shouldShowPopup = !hidePopupUntil || now > parseInt(hidePopupUntil);

      if (shouldShowPopup) {
        const timer = setTimeout(() => {
          setIsDailyPopupOpen(true);
        }, TIMEOUTS.POPUP_DELAY);

        return () => clearTimeout(timer);
      }
    }
  }, [isLoggedIn, hidePopupUntil]);

  const handleLoginClick = () => {
    navigate('/auth?mode=login');
  };

  const handleToggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  return (
    <Layout
      sidebar={
        <Sidebar
          isCollapsed={isSidebarCollapsed}
          onToggleCollapse={handleToggleSidebar}
          onOpenPricing={() => setIsPricingOpen(true)}
        />
      }
    >
      <ChatArea
        onOpenModelSelector={() => setIsModelSelectorOpen(true)}
        onOpenUsage={() => setIsUsageOpen(true)}
        onOpenHistory={() => setIsHistoryOpen(true)}
        isSidebarCollapsed={isSidebarCollapsed}
        onToggleSidebar={handleToggleSidebar}
        isLoggedIn={isLoggedIn}
        onLogin={handleLoginClick}
        onOpenUpgrade={() => setIsPricingOpen(true)}
      />

      {/* Modals */}
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
    </Layout>
  );
};

export default Index;
