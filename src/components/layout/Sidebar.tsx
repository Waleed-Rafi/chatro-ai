'use client';

import {
  ChevronDown,
  ChevronRight,
  CreditCard,
  LogOut,
  Plus,
  Settings,
  X,
} from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';

import { SettingsModal } from '@/components/modals/SettingsModal';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { UserAvatar } from '@/components/ui/user-avatar';
import { useAuth } from '@/hooks/use-auth';
import { useUserDisplay } from '@/hooks/use-user-display';

import { ArrowLeft } from '../icons/ArrowLeft';
import { Chat } from '../icons/Chat';
import { CompanyIcon } from '../icons/CompanyIcon';
import { Crown } from '../icons/Crown';
import { ImageGeneration } from '../icons/ImageGeneration';
import { Support } from '../icons/Support';

interface SidebarProps {
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  onOpenPricing: () => void;
}

export const Sidebar = ({
  isCollapsed,
  onToggleCollapse,
  onOpenPricing,
}: SidebarProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated, signOut, userProfile } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isMobileProfileOpen, setIsMobileProfileOpen] = useState(false);
  const [isDesktopProfileOpen, setIsDesktopProfileOpen] = useState(false);

  // Get user display information
  const userDisplayInfo = useUserDisplay();

  const isActive = (path: string) => pathname === path;

  return (
    <>
      {/* Mobile Overlay Sidebar */}
      {isMobileMenuOpen && (
        <>
          <div
            className='fixed inset-0 bg-black/50 z-50 md:hidden animate-fade-in'
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className='fixed left-0 top-0 bottom-0 w-80 bg-gradient-to-r from-[#212121] to-[#282621] z-50 md:hidden flex flex-col animate-slide-in'>
            {/* Header */}
            <div className='p-4 flex items-center justify-between'>
              <div className='flex items-center space-x-2'>
                <CompanyIcon size={32} className='text-sidebar-foreground' />
                <span className='text-white font-semibold'>Chatro</span>
              </div>
              <Button
                variant='ghost'
                size='sm'
                onClick={() => setIsMobileMenuOpen(false)}
                className='text-gray-400 hover:text-white'
              >
                <X size={20} />
              </Button>
            </div>

            {/* Start New Button */}
            <div className='px-4 mb-4'>
              <Button
                className='w-full bg-[#1a1a1a] hover:bg-[#2a2a2a] text-white justify-start rounded-xl py-5'
                variant='outline'
                onClick={() => {
                  router.push('/');
                  setIsMobileMenuOpen(false);
                }}
              >
                <Plus size={16} className='mr-1 text-foreground/60' />
                Start New
              </Button>
            </div>

            {/* Tools Section */}
            <div className='flex-1 px-4'>
              <div className='text-xs text-gray-400 mb-2 px-2'>Tools</div>
              <div className='space-y-1 mb-6'>
                <Button
                  variant='ghost'
                  className={`w-full justify-start ${
                    isActive('/')
                      ? 'text-white bg-[#1a1a1a]'
                      : 'text-gray-400 hover:text-white hover:bg-[#1a1a1a]'
                  }`}
                  onClick={() => {
                    router.push('/');
                    setIsMobileMenuOpen(false);
                  }}
                >
                  <Chat size={16} className='mr-3' />
                  AI Chat
                </Button>

                <Button
                  variant='ghost'
                  className={`w-full justify-start ${
                    isActive('/image-generation')
                      ? 'text-white bg-[#1a1a1a]'
                      : 'text-gray-400 hover:text-white hover:bg-[#1a1a1a]'
                  }`}
                  onClick={() => {
                    router.push('/image-generation');
                    setIsMobileMenuOpen(false);
                  }}
                >
                  <ImageGeneration size={16} className='mr-3' />
                  Image Generation
                </Button>
              </div>

              <div className='text-xs text-gray-400 mb-2 px-2'>Others</div>
              <div className='space-y-1'>
                <Button
                  variant='ghost'
                  className={`w-full justify-start ${
                    isActive('/support')
                      ? 'text-white bg-[#1a1a1a]'
                      : 'text-gray-400 hover:text-white hover:bg-[#1a1a1a]'
                  }`}
                  onClick={() => {
                    router.push('/support');
                    setIsMobileMenuOpen(false);
                  }}
                >
                  <Support size={16} className='mr-3' />
                  Support
                </Button>

                <Button
                  variant='ghost'
                  className={`w-full justify-start ${
                    isActive('/pricing')
                      ? 'text-white bg-[#1a1a1a]'
                      : 'text-gray-400 hover:text-white hover:bg-[#1a1a1a]'
                  }`}
                  onClick={() => {
                    router.push('/pricing');
                    setIsMobileMenuOpen(false);
                  }}
                >
                  <CreditCard size={16} className='mr-3' />
                  Pricing Plans
                </Button>
              </div>
            </div>

            {/* Bottom Section */}
            <div className='p-4'>
              {isAuthenticated && (
                <div className='mb-4'>
                  <div className='text-xs text-gray-400 mb-2'>
                    Unlock all premium features
                  </div>
                  <div className='text-xs text-gray-500 mb-3'>
                    Supercharge your productivity with Chatro Pro
                  </div>
                  <Button
                    className='w-full bg-blue-600 hover:bg-blue-700 text-white'
                    onClick={() => {
                      onOpenPricing();
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    👑 Upgrade
                  </Button>
                </div>
              )}

              {/* Profile Section */}
              {isAuthenticated && (
                <Popover
                  open={isMobileProfileOpen}
                  onOpenChange={setIsMobileProfileOpen}
                >
                  <PopoverTrigger asChild>
                    <div className='flex items-center space-x-2 cursor-pointer p-2 rounded-lg hover:bg-[#1a1a1a]'>
                      <UserAvatar
                        size='md'
                        profilePictureUrl={userProfile?.avatarUrl}
                        className='flex-shrink-0'
                      />
                      <div className='flex-1'>
                        <div className='text-sm text-white'>
                          {userDisplayInfo.displayName}
                        </div>
                      </div>
                      <ChevronDown
                        size={16}
                        className={`text-gray-400 transition-transform duration-200 ${
                          isMobileProfileOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </div>
                  </PopoverTrigger>
                  <PopoverContent
                    className='w-full bg-[#2a2a2a] border-gray-700 p-2 rounded-lg'
                    side='top'
                    align='start'
                  >
                    <Button
                      variant='ghost'
                      className='w-full justify-start text-white hover:bg-[#333] p-3'
                      onClick={() => setIsSettingsOpen(true)}
                    >
                      <Settings size={16} className='mr-3' />
                      Settings
                    </Button>
                    <Button
                      variant='ghost'
                      className='w-full justify-start text-white hover:bg-[#333] p-3'
                      onClick={() => signOut()}
                    >
                      <span className='mr-3'>↗</span>
                      Log out
                    </Button>
                  </PopoverContent>
                </Popover>
              )}
            </div>
          </div>
        </>
      )}

      {/* Desktop Sidebar */}
      <div
        className={`bg-gradient-to-r from-[#212121] to-[#282621] transition-all duration-300 ${
          isCollapsed ? 'w-16' : 'w-64'
        } flex flex-col fixed h-full z-40 hidden md:flex`}
      >
        {/* Header */}
        <div className='px-3 py-4'>
          {isCollapsed ? (
            <div className='flex justify-center items-center w-full'>
              <CompanyIcon size={32} className='text-sidebar-foreground' />
            </div>
          ) : (
            <div className='flex items-center justify-between w-full'>
              <div className='flex items-center'>
                <CompanyIcon size={32} className='text-sidebar-foreground' />
                <span className='text-sidebar-foreground font-semibold ml-2'>
                  Chatro
                </span>
              </div>
              <Button
                variant='ghost'
                onClick={onToggleCollapse}
                className='text-sidebar-foreground/60 hover:text-sidebar-foreground p-1'
                size='icon'
              >
                <ArrowLeft size={18} className='text-sidebar-foreground' />
              </Button>
            </div>
          )}
        </div>

        <div className='p-3 mb-6'>
          <Button
            className={`w-full bg-transparent hover:bg-sidebar-accent/80 text-sidebar-foreground border border-sidebar-accent-foreground/40 rounded-xl py-5 ${isCollapsed ? 'justify-center' : 'justify-start'}`}
            onClick={() => router.push('/')}
          >
            <Plus
              size={16}
              className={isCollapsed ? '' : 'mr-1 text-sidebar-foreground/60'}
            />
            {!isCollapsed && 'Start New'}
          </Button>
        </div>

        <div className='flex-1 px-3'>
          {!isCollapsed && (
            <div className='text-xs text-sidebar-foreground/60 mb-3 px-2'>
              Tools
            </div>
          )}

          <div>
            <Button
              variant='ghost'
              className={`w-full rounded-xl py-6 ${isCollapsed ? 'justify-center' : 'justify-start'} ${
                isActive('/')
                  ? 'text-sidebar-foreground bg-sidebar-accent hover:bg-sidebar-accent/80'
                  : 'text-sidebar-foreground/60 hover:bg-sidebar-accent/10'
              }`}
              onClick={() => router.push('/')}
            >
              <Chat size={16} className={isCollapsed ? '' : 'mr-1.5'} />
              {!isCollapsed && 'AI Chat'}
            </Button>

            <Button
              variant='ghost'
              className={`w-full rounded-xl py-6 ${isCollapsed ? 'justify-center' : 'justify-start'} ${
                isActive('/image-generation')
                  ? 'text-sidebar-foreground bg-sidebar-accent hover:bg-sidebar-accent/80'
                  : 'text-sidebar-foreground/60 hover:bg-sidebar-accent/10'
              }`}
              onClick={() => router.push('/image-generation')}
            >
              <ImageGeneration
                size={16}
                className={isCollapsed ? '' : 'mr-1.5'}
              />
              {!isCollapsed && 'Image Generation'}
            </Button>
          </div>

          {!isCollapsed && (
            <div className='text-xs text-sidebar-foreground/60 mb-2 px-2 mt-6'>
              Others
            </div>
          )}

          <div>
            <Button
              variant='ghost'
              className={`w-full rounded-xl py-6 ${isCollapsed ? 'justify-center' : 'justify-start'} ${
                isActive('/support')
                  ? 'text-sidebar-foreground bg-sidebar-accent'
                  : 'text-sidebar-foreground/60 hover:text-sidebar-foreground hover:bg-sidebar-accent'
              }`}
              onClick={() => router.push('/support')}
            >
              <Support size={16} className={isCollapsed ? '' : 'mr-1.5'} />
              {!isCollapsed && 'Support'}
            </Button>

            <Button
              variant='ghost'
              className={`w-full rounded-xl py-6 ${isCollapsed ? 'justify-center' : 'justify-start'} ${
                isActive('/pricing')
                  ? 'text-sidebar-foreground bg-sidebar-accent'
                  : 'text-sidebar-foreground/60 hover:text-sidebar-foreground hover:bg-sidebar-accent'
              }`}
              onClick={() => router.push('/pricing')}
            >
              <CreditCard size={16} className={isCollapsed ? '' : 'mr-1.5'} />
              {!isCollapsed && 'Pricing Plans'}
            </Button>
          </div>
        </div>

        <div className='p-3'>
          {isAuthenticated && !isCollapsed && (
            <div className='mb-3 bg-sidebar-accent/60 rounded-xl px-3 py-4'>
              <div className='text-xs text-sidebar-foreground/90 font-semibold mb-0.5'>
                Unlock all premium features
              </div>
              <div className='text-xs text-sidebar-foreground/50 mb-3'>
                Supercharge your productivity with Chatro Pro
              </div>
              <Button
                className='w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl'
                onClick={onOpenPricing}
              >
                <Crown size={16} className='mr-0.5' />
                Upgrade
              </Button>
            </div>
          )}

          {isAuthenticated && (
            <div className=''>
              {isCollapsed ? (
                <div className='flex justify-center items-center'>
                  <UserAvatar
                    size='md'
                    profilePictureUrl={userProfile?.avatarUrl}
                  />
                </div>
              ) : (
                <Popover
                  open={isDesktopProfileOpen}
                  onOpenChange={setIsDesktopProfileOpen}
                >
                  <PopoverTrigger asChild>
                    <div className='flex items-center cursor-pointer rounded-xl bg-sidebar-accent/60 hover:bg-sidebar-accent/40 px-3 py-2 space-x-2'>
                      <UserAvatar
                        size='md'
                        profilePictureUrl={userProfile?.avatarUrl}
                        className='flex-shrink-0'
                      />
                      <div className='flex-1'>
                        <div className='text-sm text-sidebar-foreground'>
                          {userDisplayInfo.displayName}
                        </div>
                      </div>
                      <ChevronDown
                        size={16}
                        className={`text-sidebar-foreground/60 transition-transform duration-200 ${
                          isDesktopProfileOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </div>
                  </PopoverTrigger>
                  <PopoverContent
                    className='w-full bg-[#1D1C1B] border-sidebar-accent-foreground/15 p-2 rounded-xl'
                    side='top'
                    align='start'
                  >
                    <Button
                      variant='ghost'
                      className='w-full justify-start text-sidebar-foreground p-3'
                      onClick={() => setIsSettingsOpen(true)}
                    >
                      <Settings size={16} className='mr-1' />
                      Settings
                    </Button>
                    <Button
                      variant='ghost'
                      className='w-full justify-start text-sidebar-foreground p-3'
                      onClick={() => signOut()}
                    >
                      <LogOut size={16} className='mr-1' />
                      Log out
                    </Button>
                  </PopoverContent>
                </Popover>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Mobile Header */}
      <div className='fixed top-0 left-0 right-0 bg-background p-4 flex items-center justify-between z-30 md:hidden'>
        <div className='flex items-center space-x-3'>
          <Button
            variant='ghost'
            size='sm'
            onClick={() => setIsMobileMenuOpen(true)}
            className='text-foreground/60 hover:text-foreground p-1'
          >
            <ChevronRight size={20} />
          </Button>
          <div className='flex items-center space-x-2'>
            <div className='w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center'>
              <span className='text-xs font-bold'>C</span>
            </div>
            <span className='text-foreground font-semibold'>Chatro</span>
          </div>
        </div>
      </div>

      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      />
    </>
  );
};
