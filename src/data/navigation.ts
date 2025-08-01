export interface NavigationItem {
  id: string;
  label: string;
  href: string;
  icon: string; // Icon component name
  isPro?: boolean;
  isExternal?: boolean;
}

export const sidebarNavigation: NavigationItem[] = [
  {
    id: 'chat',
    label: 'Chat',
    href: '/',
    icon: 'Chat',
  },
  {
    id: 'image-generation',
    label: 'Image Generation',
    href: '/image-generation',
    icon: 'ImageGeneration',
    isPro: true,
  },
  {
    id: 'support',
    label: 'Support',
    href: '/support',
    icon: 'Support',
  },
];

export const footerLinks = [
  {
    label: 'Terms of Use',
    href: '/terms',
  },
  {
    label: 'Privacy Policy',
    href: '/privacy',
  },
];

export const companyInfo = {
  name: 'Chatro',
  description: 'Your intelligent AI chat assistant',
  email: 'support@chatro.com',
  website: 'https://chatro.com',
};
