import {
  trackButtonClick,
  trackLogin,
  trackSignUp,
  trackUpgradeClick,
} from '@/lib/analytics/events';

/**
 * Simple analytics hook for tracking essential events
 */
export const useAnalytics = () => {
  return {
    // Authentication tracking
    trackLogin,
    trackSignUp,

    // Button tracking
    trackButtonClick,
    trackUpgradeClick,
  };
};
