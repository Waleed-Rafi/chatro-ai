// Design System - Color Tokens and Constants

export const colors = {
  // Background colors
  background: {
    primary: '#000000',
    secondary: '#2a2a2a',
    tertiary: '#3a3a3a',
    overlay: 'rgba(0, 0, 0, 0.8)',
  },

  // Text colors
  text: {
    primary: '#ffffff',
    secondary: '#9ca3af', // gray-400
    tertiary: '#6b7280', // gray-500
    muted: '#4b5563', // gray-600
  },

  // Border colors
  border: {
    primary: '#374151', // gray-700
    secondary: '#4b5563', // gray-600
    accent: '#3b82f6', // blue-500
  },

  // Interactive colors
  interactive: {
    hover: '#3a3a3a',
    active: '#4a4a4a',
    disabled: '#1f1f1f',
  },

  // Accent colors
  accent: {
    blue: '#3b82f6',
    purple: '#8b5cf6',
    pink: '#ec4899',
    gradient: {
      blueToPurple: 'linear-gradient(to right, #3b82f6, #8b5cf6)',
      blueToPurpleToPink:
        'linear-gradient(to right, #3b82f6, #8b5cf6, #ec4899)',
    },
  },

  // Status colors
  status: {
    success: '#10b981', // green-500
    warning: '#f59e0b', // amber-500
    error: '#ef4444', // red-500
    info: '#3b82f6', // blue-500
  },
} as const;

export const spacing = {
  xs: '0.25rem', // 4px
  sm: '0.5rem', // 8px
  md: '1rem', // 16px
  lg: '1.5rem', // 24px
  xl: '2rem', // 32px
  '2xl': '3rem', // 48px
  '3xl': '4rem', // 64px
} as const;

export const borderRadius = {
  sm: '0.25rem', // 4px
  md: '0.5rem', // 8px
  lg: '0.75rem', // 12px
  xl: '1rem', // 16px
  '2xl': '1.5rem', // 24px
  full: '9999px',
} as const;

export const shadows = {
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
  '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.8)',
} as const;

export const transitions = {
  fast: '150ms ease-in-out',
  normal: '200ms ease-in-out',
  slow: '300ms ease-in-out',
} as const;

// CSS Variables for use in Tailwind
export const cssVariables = {
  '--color-background-primary': colors.background.primary,
  '--color-background-secondary': colors.background.secondary,
  '--color-background-tertiary': colors.background.tertiary,
  '--color-text-primary': colors.text.primary,
  '--color-text-secondary': colors.text.secondary,
  '--color-text-tertiary': colors.text.tertiary,
  '--color-border-primary': colors.border.primary,
  '--color-border-secondary': colors.border.secondary,
  '--color-interactive-hover': colors.interactive.hover,
  '--color-accent-blue': colors.accent.blue,
  '--color-accent-purple': colors.accent.purple,
  '--color-accent-pink': colors.accent.pink,
} as const;
