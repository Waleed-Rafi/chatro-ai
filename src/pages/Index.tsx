import { LogIn } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { ChatArea } from '@/components/chat/ChatArea';
import { HistoryPopover } from '@/components/chat/HistoryPopover';
import { ModelSelector } from '@/components/chat/ModelSelector';
import { UsagePopover } from '@/components/chat/UsagePopover';
import { Sidebar } from '@/components/layout/Sidebar';
import { DailyPopup } from '@/components/modals/DailyPopup';
import { PricingModal } from '@/components/modals/PricingModal';
import { OnboardingHome } from '@/components/onboarding/OnboardingHome';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

const Index = () => {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const [isPricingOpen, setIsPricingOpen] = useState(false);
  const [isModelSelectorOpen, setIsModelSelectorOpen] = useState(false);
  const [isUsageOpen, setIsUsageOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [isDailyPopupOpen, setIsDailyPopupOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

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

  if (!isLoggedIn) {
    return (
      <div className='min-h-screen bg-background text-foreground flex'>
        <Sidebar
          isCollapsed={isSidebarCollapsed}
          onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          onOpenPricing={() => setIsPricingOpen(true)}
        />

        {/* Header for logged out users */}
        <div
          className={`flex-1 flex flex-col transition-all duration-300 ${
            isSidebarCollapsed ? 'md:ml-16' : 'md:ml-64'
          }`}
        >
          <div className='hidden md:flex h-16 border-b border-border items-center justify-end px-6 bg-background'>
            <Button
              className='bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg'
              onClick={handleLoginClick}
            >
              <LogIn size={16} className='mr-2' />
              Login
            </Button>
          </div>

          <OnboardingHome onLogin={handleLoginClick} />
        </div>

        {/* Daily Popup */}
        <DailyPopup
          isOpen={isDailyPopupOpen}
          onClose={() => setIsDailyPopupOpen(false)}
        />

        <PricingModal
          isOpen={isPricingOpen}
          onClose={() => setIsPricingOpen(false)}
        />
      </div>
    );
  }

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
