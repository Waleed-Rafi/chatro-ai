# Analytics Setup Guide

## Overview

Simple and scalable analytics implementation using Google Tag Manager (GTM) for tracking essential
user interactions.

## Setup

### 1. Environment Variable

Add your GTM container ID:

```bash
# .env.local
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX
```

### 2. GTM Container Setup

1. Create a GTM container in [Google Tag Manager](https://tagmanager.google.com/)
2. Add the container ID to your environment variables
3. Configure tags for Google Analytics 4, Google Ads, etc.

## Implementation

### File Structure

```
src/
├── lib/analytics/
│   ├── index.ts          # Main exports
│   ├── gtm.ts           # GTM core functionality
│   ├── events.ts        # Event tracking functions
│   └── types.ts         # TypeScript types
├── providers/
│   └── AnalyticsProvider.tsx  # Analytics initialization
└── hooks/
    └── use-analytics.ts       # Easy-to-use hook
```

### Available Events

Currently tracking these essential events:

1. **Page Views** - Automatic on route changes
2. **Login** - Email and social login
3. **Sign Up** - Email and social signup
4. **Upgrade Clicks** - When users click upgrade buttons

### Usage

```tsx
import { useAnalytics } from '@/hooks/use-analytics';

const MyComponent = () => {
  const analytics = useAnalytics();

  const handleUpgrade = () => {
    analytics.trackUpgradeClick('pricing_page');
  };

  const handleLogin = () => {
    analytics.trackLogin('email');
  };

  return <button onClick={handleUpgrade}>Upgrade Now</button>;
};
```

## Adding New Events

To add new events:

1. **Add type** in `src/lib/analytics/types.ts`
2. **Add function** in `src/lib/analytics/events.ts`
3. **Export** in `src/lib/analytics/index.ts`
4. **Add to hook** in `src/hooks/use-analytics.ts`

Example:

```tsx
// types.ts
export interface PurchaseEvent {
  plan_name: string;
  value: number;
}

// events.ts
export const trackPurchase = (planName: string, value: number) => {
  pushEvent({
    event: 'purchase',
    plan_name: planName,
    value: value,
  });
};

// use-analytics.ts
export const useAnalytics = () => {
  return {
    // ... existing events
    trackPurchase,
  };
};
```

## Best Practices

1. **Keep it simple** - Only track essential events
2. **Type safety** - Use TypeScript interfaces
3. **Modular design** - Easy to extend and maintain
4. **Performance** - GTM loads asynchronously
5. **Privacy** - No PII tracking

## Testing

1. Use GTM Preview mode
2. Check browser console for dataLayer
3. Verify events in Google Analytics
4. Test in different browsers
