import { pushEvent } from './gtm';
import type { AuthEvent } from './types';

// Page view tracking
export const trackPageView = (url: string, title?: string) => {
  pushEvent({
    event: 'page_view',
    page_title: title || document.title,
    page_location: url,
    page_path: url,
  });
};

// Authentication events
export const trackLogin = (method: AuthEvent['method']) => {
  pushEvent({
    event: 'login',
    method: method,
  });
};

export const trackSignUp = (method: AuthEvent['method']) => {
  pushEvent({
    event: 'sign_up',
    method: method,
  });
};

// Button click tracking
export const trackButtonClick = (buttonName: string, page?: string) => {
  pushEvent({
    event: 'button_click',
    button_name: buttonName,
    page: page,
  });
};

// Upgrade button tracking (specific to our use case)
export const trackUpgradeClick = (source: string) => {
  pushEvent({
    event: 'upgrade_click',
    source: source,
    button_name: 'upgrade_button',
  });
};
