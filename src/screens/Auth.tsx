'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

import { AppleIcon, FacebookIcon } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/AuthContext';

import { GoogleIcon } from '../components/icons/Google';

const Auth = () => {
  const [email, setEmail] = useState('');
  const { login } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const mode = searchParams.get('mode') || 'login';
  const isSignup = mode === 'signup';

  const handleEmailSubmit = () => {
    if (email) {
      login();
      router.push('/');
    }
  };

  const handleSocialLogin = () => {
    login();
    router.push('/');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleEmailSubmit();
    }
  };

  return (
    <div className='min-h-screen bg-white flex flex-col'>
      {/* Header */}
      <div className='p-4 md:p-6'>
        <div className='flex items-center'>
          <span className='text-xl font-semibold text-gray-900'>Chatro</span>
        </div>
      </div>

      {/* Main Content */}
      <div className='flex-1 flex items-center justify-center p-4'>
        <div className='w-full max-w-md'>
          <div className='text-center mb-8'>
            <h1 className='text-3xl font-semibold text-gray-900 mb-2'>
              {isSignup ? 'Create an account' : 'Welcome back'}
            </h1>
            {isSignup ? (
              <p className='text-gray-600 text-sm'>
                Create your account to get started
              </p>
            ) : (
              <p className='text-gray-600 text-sm'>
                We missed you, welcome back to Chatro!
              </p>
            )}
          </div>

          <div className='space-y-4'>
            {/* Email Input */}
            <div>
              <Input
                type='email'
                placeholder='Email address'
                value={email}
                onChange={e => setEmail(e.target.value)}
                onKeyPress={handleKeyPress}
                className='w-full h-12 rounded-xl border-gray-300 bg-white text-gray-900 placeholder:text-gray-500'
              />
            </div>

            {/* Continue Button */}
            <Button
              onClick={handleEmailSubmit}
              className='w-full h-12 rounded-xl bg-gray-900 text-white disabled:opacity-50 transition-colors hover:!bg-gray-800 hover:!text-white'
            >
              Continue
            </Button>

            {/* Switch Mode Link */}
            <div className='text-center'>
              <span className='text-gray-600 text-sm'>
                {isSignup
                  ? 'Already have an account? '
                  : "Don't have an account? "}
                <button
                  onClick={() =>
                    router.push(`/auth?mode=${isSignup ? 'login' : 'signup'}`)
                  }
                  className='text-blue-600 hover:text-blue-700 font-medium transition-colors'
                >
                  {isSignup ? 'Log in' : 'Sign up'}
                </button>
              </span>
            </div>

            {/* Divider */}
            <div className='relative my-6'>
              <div className='absolute inset-0 flex items-center'>
                <div className='w-full border-t border-gray-300' />
              </div>
              <div className='relative flex justify-center text-sm'>
                <span className='px-2 bg-white text-gray-500'>OR</span>
              </div>
            </div>

            {/* Social Login Buttons */}
            <div className='space-y-3'>
              <Button
                variant='outline'
                onClick={handleSocialLogin}
                className='w-full h-12 rounded-xl border-gray-300 bg-white text-gray-900 transition-all duration-200 hover:!bg-gray-50 hover:!text-gray-900 hover:!border-gray-400'
              >
                <GoogleIcon className='mr-1 !w-5 !h-5' />
                Continue with Google
              </Button>

              <Button
                variant='outline'
                onClick={handleSocialLogin}
                className='w-full h-12 rounded-xl border-gray-300 bg-white text-gray-900 transition-all duration-200 hover:!bg-gray-50 hover:!text-gray-900 hover:!border-gray-400'
              >
                <FacebookIcon className='mr-1 !w-5 !h-5' />
                Continue with Facebook
              </Button>

              <Button
                variant='outline'
                onClick={handleSocialLogin}
                className='w-full h-12 rounded-xl border-gray-300 bg-white text-gray-900 transition-all duration-200 hover:!bg-gray-50 hover:!text-gray-900 hover:!border-gray-400'
              >
                <AppleIcon className='mr-1 !w-5 !h-5' />
                Continue with Apple
              </Button>
            </div>
          </div>

          {/* Footer */}
          <div className='mt-24 text-center'>
            <div className='flex items-center justify-center space-x-4 text-sm text-gray-500'>
              <a href='helo' className='hover:text-gray-700 transition-colors'>
                Terms of Use
              </a>
              <span>|</span>
              <a href='helo' className='hover:text-gray-700 transition-colors'>
                Privacy Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
