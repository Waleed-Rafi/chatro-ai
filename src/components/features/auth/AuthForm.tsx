
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Typography } from '@/components/design-system/atoms/Typography';
import { LoadingSpinner } from '@/components/design-system/molecules/LoadingSpinner';
import { AppleIcon, FacebookIcon, GoogleIcon } from '@/components/icons';
import * as React from 'react';

interface AuthFormProps {
  mode: 'login' | 'signup';
  onModeChange: (mode: 'login' | 'signup') => void;
  isLoading?: boolean;
  onSubmit: (data: { email: string; password: string; name?: string }) => void;
  onSocialAuth: (provider: 'google' | 'facebook' | 'apple') => void;
}

const AuthForm = React.forwardRef<HTMLFormElement, AuthFormProps>(
  ({ mode, onModeChange, isLoading = false, onSubmit, onSocialAuth }, ref) => {
    const [formData, setFormData] = React.useState({
      name: '',
      email: '',
      password: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      onSubmit(formData);
    };

    const handleInputChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData(prev => ({ ...prev, [field]: e.target.value }));
    };

    return (
      <form ref={ref} onSubmit={handleSubmit} className="space-y-6">
        <div className="text-center space-y-2">
          <Typography variant="h2" className="text-2xl font-bold">
            {mode === 'login' ? 'Welcome back' : 'Create your account'}
          </Typography>
          <Typography variant="muted">
            {mode === 'login'
              ? 'Sign in to your account to continue'
              : 'Sign up to get started with our platform'
            }
          </Typography>
        </div>

        <div className="space-y-4">
          {mode === 'signup' && (
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                type="text"
                value={formData.name}
                onChange={handleInputChange('name')}
                required={mode === 'signup'}
                disabled={isLoading}
              />
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange('email')}
              required
              disabled={isLoading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={formData.password}
              onChange={handleInputChange('password')}
              required
              disabled={isLoading}
            />
          </div>
        </div>

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? (
            <>
              <LoadingSpinner size="sm" className="mr-2" />
              {mode === 'login' ? 'Signing in...' : 'Creating account...'}
            </>
          ) : (
            mode === 'login' ? 'Sign in' : 'Create account'
          )}
        </Button>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <Separator className="w-full" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={() => onSocialAuth('google')}
            disabled={isLoading}
          >
            <GoogleIcon className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => onSocialAuth('facebook')}
            disabled={isLoading}
          >
            <FacebookIcon className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => onSocialAuth('apple')}
            disabled={isLoading}
          >
            <AppleIcon className="h-4 w-4" />
          </Button>
        </div>

        <div className="text-center">
          <Typography variant="small">
            {mode === 'login' ? "Don't have an account?" : 'Already have an account?'}{' '}
            <button
              type="button"
              onClick={() => onModeChange(mode === 'login' ? 'signup' : 'login')}
              className="font-medium text-primary hover:underline"
              disabled={isLoading}
            >
              {mode === 'login' ? 'Sign up' : 'Sign in'}
            </button>
          </Typography>
        </div>
      </form>
    );
  }
);
AuthForm.displayName = 'AuthForm';

export { AuthForm };
