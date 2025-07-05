
export const APP_CONFIG = {
  name: 'ChatApp',
  version: '1.0.0',
  description: 'AI-powered chat application',
} as const;

export const ROUTES = {
  HOME: '/',
  AUTH: '/auth',
  IMAGE_GENERATION: '/image-generation',
  SUPPORT: '/support',
  PRICING: '/pricing',
} as const;

export const LOCAL_STORAGE_KEYS = {
  HIDE_POPUP_UNTIL: 'hidePopupUntil',
  THEME: 'theme',
  USER_PREFERENCES: 'userPreferences',
} as const;

export const API_ENDPOINTS = {
  CHAT: '/api/chat',
  AUTH: '/api/auth',
  USER: '/api/user',
} as const;

export const TIMEOUTS = {
  POPUP_DELAY: 2000,
  DEBOUNCE_DELAY: 300,
  TOAST_DURATION: 5000,
} as const;
