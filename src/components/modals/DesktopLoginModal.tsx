import { X } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/AuthContext';

interface DesktopLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DesktopLoginModal = ({
  isOpen,
  onClose,
}: DesktopLoginModalProps) => {
  const [email, setEmail] = useState('');
  const { login } = useAuth();

  const handleLogin = () => {
    login();
    onClose();
  };

  const handleEmailLogin = () => {
    if (email) {
      login();
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='max-w-6xl w-full bg-background border-border animate-in fade-in-0 zoom-in-95 duration-200 p-0 gap-0'>
        <div className='flex min-h-[600px]'>
          {/* Left Side - Marketing Content */}
          <div className='flex-1 bg-muted/30 p-8 flex flex-col justify-center'>
            <div className='text-center mb-8'>
              <div className='inline-flex items-center justify-center w-16 h-16 bg-orange-500 rounded-full mb-4'>
                <span className='text-2xl font-bold text-white'>#1</span>
              </div>
              <div className='text-lg font-semibold text-foreground mb-2'>
                AI Assistant
              </div>
              <div className='flex justify-center mb-4'>
                <div className='flex space-x-1'>
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className='text-yellow-400 text-xl'>
                      ★
                    </span>
                  ))}
                </div>
              </div>
              <div className='text-3xl font-bold text-foreground mb-2'>
                30M+ users
              </div>
              <div className='text-muted-foreground'>100K+ ratings</div>
            </div>

            <div className='text-center mb-8'>
              <h3 className='text-xl font-semibold text-foreground mb-4'>
                Available On
              </h3>
              <div className='flex justify-center space-x-4'>
                <div className='w-12 h-12 rounded-full bg-red-500 flex items-center justify-center'>
                  <span className='text-white font-bold'>G</span>
                </div>
                <div className='w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center'>
                  <span className='text-white font-bold'>S</span>
                </div>
                <div className='w-12 h-12 rounded-full bg-red-600 flex items-center justify-center'>
                  <span className='text-white font-bold'>O</span>
                </div>
                <div className='w-12 h-12 rounded-full bg-orange-500 flex items-center justify-center'>
                  <span className='text-white font-bold'>F</span>
                </div>
                <div className='w-12 h-12 rounded-full bg-blue-400 flex items-center justify-center'>
                  <span className='text-white font-bold'>E</span>
                </div>
              </div>
            </div>

            <div className='mb-8'>
              <h3 className='text-xl font-semibold text-foreground text-center mb-6'>
                Trusted by Millions
              </h3>
              <div className='grid grid-cols-1 gap-6'>
                <div className='bg-background/50 p-4 rounded-lg'>
                  <h4 className='font-semibold text-foreground mb-2'>
                    Best AI Assistant
                  </h4>
                  <div className='flex space-x-1 mb-2'>
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className='text-yellow-400'>
                        ★
                      </span>
                    ))}
                  </div>
                  <p className='text-sm text-muted-foreground mb-3'>
                    Chatro has been a lifesaver for my content needs. The AI
                    creates amazing visuals and marketing copy that actually
                    sounds human - it's cut my work time in half.
                  </p>
                  <div className='flex items-center space-x-2'>
                    <div className='w-8 h-8 bg-gray-400 rounded-full' />
                    <div>
                      <div className='text-sm font-medium text-foreground'>
                        Sara Williams
                      </div>
                      <div className='text-xs text-muted-foreground'>
                        Marketing Specialist
                      </div>
                    </div>
                  </div>
                </div>

                <div className='bg-background/50 p-4 rounded-lg'>
                  <h4 className='font-semibold text-foreground mb-2'>
                    Find of the year
                  </h4>
                  <div className='flex space-x-1 mb-2'>
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className='text-yellow-400'>
                        ★
                      </span>
                    ))}
                  </div>
                  <p className='text-sm text-muted-foreground mb-3'>
                    It has simplified my content creation process with its
                    amazing chat and image generation. Plus it offers all the
                    industry standard AI models in one place. That's totally
                    amazing!
                  </p>
                  <div className='flex items-center space-x-2'>
                    <div className='w-8 h-8 bg-gray-400 rounded-full' />
                    <div>
                      <div className='text-sm font-medium text-foreground'>
                        Andrew Roberts
                      </div>
                      <div className='text-xs text-muted-foreground'>
                        UX Writer
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Login Form */}
          <div className='w-96 p-8 flex flex-col justify-center relative'>
            <Button
              variant='ghost'
              size='sm'
              className='absolute right-4 top-4 p-0 h-6 w-6'
              onClick={onClose}
            >
              <X size={16} />
            </Button>

            <div className='mb-8'>
              <h2 className='text-2xl font-bold mb-2 text-foreground'>
                Join Millions of Happy Users
              </h2>
              <p className='text-muted-foreground text-sm'>
                You must login to proceed. Your data is safe and you won't
                receive any spam.
              </p>
            </div>

            <div className='space-y-3 mb-6'>
              <Button
                className='w-full justify-center bg-foreground hover:bg-foreground/90 text-background h-12 rounded-lg'
                onClick={handleLogin}
              >
                <svg
                  width='18'
                  height='18'
                  viewBox='0 0 24 24'
                  className='mr-3'
                >
                  <path
                    fill='currentColor'
                    d='M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z'
                  />
                  <path
                    fill='currentColor'
                    d='M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z'
                  />
                  <path
                    fill='currentColor'
                    d='M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z'
                  />
                  <path
                    fill='currentColor'
                    d='M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z'
                  />
                </svg>
                Continue with Google
              </Button>

              <Button
                variant='outline'
                className='w-full justify-center h-12 rounded-lg bg-muted hover:bg-muted/80'
                onClick={handleLogin}
              >
                <svg
                  width='20'
                  height='20'
                  viewBox='0 0 24 24'
                  className='mr-3 text-blue-600'
                >
                  <path
                    fill='currentColor'
                    d='M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z'
                  />
                </svg>
                Continue with Facebook
              </Button>

              <Button
                variant='outline'
                className='w-full justify-center h-12 rounded-lg bg-muted hover:bg-muted/80'
                onClick={handleLogin}
              >
                <svg
                  width='16'
                  height='20'
                  viewBox='0 0 24 24'
                  className='mr-3'
                >
                  <path
                    fill='currentColor'
                    d='M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z'
                  />
                </svg>
                Continue with Apple
              </Button>
            </div>

            <div className='mb-4'>
              <Input
                type='email'
                placeholder='Enter your email'
                value={email}
                onChange={e => setEmail(e.target.value)}
                className='w-full h-12 rounded-lg'
              />
            </div>

            <Button
              variant='outline'
              className='w-full justify-center h-12 rounded-lg bg-muted hover:bg-muted/80 mb-6'
              onClick={handleEmailLogin}
              disabled={!email}
            >
              <svg
                width='16'
                height='16'
                viewBox='0 0 24 24'
                className='mr-3'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
              >
                <path d='M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z' />
                <polyline points='22,6 12,13 2,6' />
              </svg>
              Continue with Email
            </Button>

            <p className='text-xs text-muted-foreground text-center'>
              By proceeding, you agree to our{' '}
              <a href='hello' className='text-blue-500 hover:underline'>
                Terms of Use
              </a>{' '}
              and read our{' '}
              <a href='hello' className='text-blue-500 hover:underline'>
                Privacy Policy
              </a>
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
