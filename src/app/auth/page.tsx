'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';

import { GoogleIcon } from '@/components/icons/Google';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { companyInfo, footerLinks } from '@/data';
import { useAuth } from '@/hooks/use-auth';

const AuthContent = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signIn, signUp, signInWithProvider, loading, error, clearError } =
    useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const mode = searchParams.get('mode') || 'login';
  const isSignup = mode === 'signup';

  // Clear everything when switching modes - treat as new page
  useEffect(() => {
    clearError();
    setEmail('');
    setPassword('');
  }, [mode, clearError]);

  const handleEmailSubmit = async () => {
    if (email && password) {
      try {
        if (isSignup) {
          await signUp(email, password);
        } else {
          await signIn(email, password);
        }
        // Only redirect on success
        router.push('/');
      } catch (error) {
        console.error('Authentication error:', error);
        // Don't redirect - let the error show in the UI
      }
    }
  };

  const handleSocialLogin = async (provider: 'google' | 'facebook') => {
    try {
      await signInWithProvider(provider);
    } catch (error) {
      console.error('Social login error:', error);
      // Error will be handled by the store and shown in UI
    }
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
          <span className='text-xl font-semibold text-gray-900'>
            {companyInfo.name}
          </span>
        </div>
      </div>

      {/* Main Content */}
      <div className='flex-1 flex items-center justify-center p-4'>
        <div key={mode} className='w-full max-w-md animate-fade-in'>
          <div className='text-center mb-8'>
            <h1 className='text-3xl font-semibold text-gray-900 mb-2'>
              {isSignup ? 'Create an account' : 'Welcome back'}
            </h1>
            {isSignup ? (
              <p className='text-gray-600 text-sm'>
                Create your account to get started
              </p>
            ) : (
              <p className='text-gray-600 text-sm'>{companyInfo.name}!</p>
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
              <Input
                type='password'
                placeholder='Password'
                value={password}
                onChange={e => setPassword(e.target.value)}
                onKeyPress={handleKeyPress}
                className='w-full h-12 mt-3 rounded-xl border-gray-300 bg-white text-gray-900 placeholder:text-gray-500'
              />
            </div>

            {error && (
              <div className='text-red-600 text-sm mt-3 px-3 text-left bg-red-50 border border-red-200 rounded-lg py-3 shadow-sm'>
                <div className='flex items-start space-x-2'>
                  <span className='text-red-500 mt-0.5 flex-shrink-0'>⚠️</span>
                  <span className='leading-relaxed'>{error}</span>
                </div>
              </div>
            )}

            {/* Continue Button */}
            <Button
              onClick={handleEmailSubmit}
              disabled={loading}
              className='w-full h-12 rounded-xl bg-gray-900 text-white disabled:opacity-50 transition-colors hover:!bg-gray-800 hover:!text-white'
            >
              {loading ? 'Loading...' : isSignup ? 'Create Account' : 'Sign In'}
            </Button>

            {/* Switch Mode Link */}
            <div className='text-center'>
              <span className='text-gray-600 text-sm'>
                {isSignup
                  ? 'Already have an account? '
                  : "Don't have an account? "}
                <button
                  onClick={() => {
                    // Clear everything immediately when switching
                    clearError();
                    setEmail('');
                    setPassword('');
                    router.push(`/auth?mode=${isSignup ? 'login' : 'signup'}`);
                  }}
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
                onClick={() => handleSocialLogin('google')}
                className='w-full h-12 rounded-xl border-gray-300 bg-white text-gray-900 transition-all duration-200 hover:!bg-gray-50 hover:!text-gray-900 hover:!border-gray-400'
              >
                <GoogleIcon className='mr-1 !w-5 !h-5' />
                Continue with Google
              </Button>

              {/* <Button
                  variant='outline'
                  onClick={() => handleSocialLogin('facebook')}
                  className='w-full h-12 rounded-xl border-gray-300 bg-white text-gray-900 transition-all duration-200 hover:!bg-gray-50 hover:!text-gray-900 hover:!border-gray-400'
                >
                  <FacebookIcon className='mr-1 !w-5 !h-5' />
                  Continue with Facebook
                </Button> */}
            </div>
          </div>

          {/* Footer */}
          <div className='mt-24 text-center'>
            <div className='flex items-center justify-center space-x-4 text-sm text-gray-500'>
              {footerLinks.map((link, index) => (
                <>
                  <a
                    key={link.label}
                    href={link.href}
                    className='hover:text-gray-700 transition-colors'
                  >
                    {link.label}
                  </a>
                  {index < footerLinks.length - 1 && <span>|</span>}
                </>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Auth = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AuthContent />
    </Suspense>
  );
};

export default Auth;
