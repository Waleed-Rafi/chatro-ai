import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { AppleIcon, FacebookIcon, GoogleIcon } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/AuthContext';

const Auth = () => {
  const [email, setEmail] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const mode = searchParams.get('mode') || 'login';
  const isSignup = mode === 'signup';

  const handleEmailSubmit = () => {
    if (email) {
      login();
      navigate('/');
    }
  };

  const handleSocialLogin = () => {
    login();
    navigate('/');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleEmailSubmit();
    }
  };

  return (
    <div className='min-h-screen bg-background flex flex-col'>
      {/* Header */}
      <div className='p-4 md:p-6'>
        <div className='flex items-center'>
          <span className='text-xl font-semibold text-foreground'>Chatro</span>
        </div>
      </div>

      {/* Main Content */}
      <div className='flex-1 flex items-center justify-center p-4'>
        <div className='w-full max-w-md'>
          <div className='text-center mb-8'>
            <h1 className='text-3xl font-semibold text-foreground mb-2'>
              {isSignup ? 'Create an account' : 'Welcome back'}
            </h1>
            {isSignup ? (
              <p className='text-muted-foreground text-sm'>
                Create your account to get started
              </p>
            ) : (
              <p className='text-muted-foreground text-sm'>
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
                className='w-full h-12 rounded-xl border-border bg-background text-foreground placeholder:text-muted-foreground'
              />
            </div>

            {/* Continue Button */}
            <Button
              onClick={handleEmailSubmit}
              className='w-full h-12 rounded-xl bg-foreground hover:bg-foreground/90 text-background disabled:opacity-50'
            >
              Continue
            </Button>

            {/* Switch Mode Link */}
            <div className='text-center'>
              <span className='text-muted-foreground text-sm'>
                {isSignup
                  ? 'Already have an account? '
                  : "Don't have an account? "}
                <button
                  onClick={() =>
                    navigate(`/auth?mode=${isSignup ? 'login' : 'signup'}`)
                  }
                  className='text-blue-500 hover:text-blue-600 font-medium'
                >
                  {isSignup ? 'Log in' : 'Sign up'}
                </button>
              </span>
            </div>

            {/* Divider */}
            <div className='relative my-6'>
              <div className='absolute inset-0 flex items-center'>
                <div className='w-full border-t border-border' />
              </div>
              <div className='relative flex justify-center text-sm'>
                <span className='px-2 bg-background text-muted-foreground'>
                  OR
                </span>
              </div>
            </div>

            {/* Social Login Buttons */}
            <div className='space-y-3'>
              <Button
                variant='outline'
                onClick={handleSocialLogin}
                className='w-full h-12 rounded-xl border-border hover:bg-accent text-foreground'
              >
                <GoogleIcon className='mr-3' />
                Continue with Google
              </Button>

              <Button
                variant='outline'
                onClick={handleSocialLogin}
                className='w-full h-12 rounded-xl border-border hover:bg-accent text-foreground'
              >
                <FacebookIcon className='mr-3' />
                Continue with Facebook
              </Button>

              <Button
                variant='outline'
                onClick={handleSocialLogin}
                className='w-full h-12 rounded-xl border-border hover:bg-accent text-foreground'
              >
                <AppleIcon className='mr-3' />
                Continue with Apple
              </Button>
            </div>
          </div>

          {/* Footer */}
          <div className='mt-24 text-center'>
            <div className='flex items-center justify-center space-x-4 text-sm text-muted-foreground'>
              <a href='helo' className='hover:text-foreground'>
                Terms of Use
              </a>
              <span>|</span>
              <a href='helo' className='hover:text-foreground'>
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
