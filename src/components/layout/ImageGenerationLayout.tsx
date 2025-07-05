import { useEffect, useState } from 'react';

import { Sidebar } from '@/components/layout/Sidebar';
import { PricingModal } from '@/components/modals/PricingModal';
import ImageGeneration from '@/pages/ImageGeneration';

const ImageGenerationLayout = () => {
  const [isPricingOpen, setIsPricingOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(() => {
    const stored = localStorage.getItem('sidebarCollapsed');
    return stored === 'true';
  });

  useEffect(() => {
    localStorage.setItem('sidebarCollapsed', isSidebarCollapsed.toString());
  }, [isSidebarCollapsed]);

  return (
    <div className='min-h-screen bg-[#1a1a1a] text-white flex'>
      <Sidebar
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        onOpenPricing={() => setIsPricingOpen(true)}
      />

      <div
        className={`flex-1 transition-all duration-300 ${
          isSidebarCollapsed ? 'md:ml-16' : 'md:ml-64'
        } pt-16 md:pt-0`}
      >
        <ImageGeneration />
      </div>

      <PricingModal
        isOpen={isPricingOpen}
        onClose={() => setIsPricingOpen(false)}
      />
    </div>
  );
};

export default ImageGenerationLayout;
