'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { Suspense, useEffect } from 'react';

import { trackPageView } from '@/lib/analytics/events';
import { initializeGTM } from '@/lib/analytics/gtm';

interface AnalyticsProviderProps {
  children: React.ReactNode;
}

const AnalyticsTracker = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Track page views on route changes
  useEffect(() => {
    const url = pathname + searchParams.toString();
    trackPageView(url);
  }, [pathname, searchParams]);

  return null;
};

export const AnalyticsProvider = ({ children }: AnalyticsProviderProps) => {
  // Initialize analytics on mount
  useEffect(() => {
    initializeGTM();
  }, []);

  return (
    <>
      <Suspense fallback={null}>
        <AnalyticsTracker />
      </Suspense>
      {children}
    </>
  );
};
