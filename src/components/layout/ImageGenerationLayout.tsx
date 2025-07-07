import { useState } from 'react';

import { Sidebar } from '@/components/layout/Sidebar';
import { PricingModal } from '@/components/modals/PricingModal';
import { useSidebar } from '@/contexts/SidebarContext';
import ImageGeneration from '@/screens/ImageGeneration';

const ImageGenerationLayout = () => {
  const [isPricingOpen, setIsPricingOpen] = useState(false);
  const { isSidebarCollapsed, setIsSidebarCollapsed } = useSidebar();

  return (
    <div className='min-h-screen bg-background text-foreground flex'>
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
