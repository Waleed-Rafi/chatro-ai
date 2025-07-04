
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sparkles } from "lucide-react";

const Auth = () => {
  const [email, setEmail] = useState("");
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
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="p-4 md:p-6">
        <div className="flex items-center">
          <span className="text-xl font-semibold text-foreground">Chatro</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-semibold text-foreground mb-2">
              {isSignup ? 'Create your account' : 'Welcome back'}
            </h1>
            {isSignup && (
              <p className="text-muted-foreground text-sm">
                Create your account to get started
              </p>
            )}
          </div>

          <div className="space-y-4">
            {/* Email Input */}
            <div>
              <Input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyPress={handleKeyPress}
                className="w-full h-12 rounded-xl border-border bg-background text-foreground placeholder:text-muted-foreground"
              />
            </div>

            {/* Continue Button */}
            <Button
              onClick={handleEmailSubmit}
              disabled={!email}
              className="w-full h-12 rounded-xl bg-foreground hover:bg-foreground/90 text-background disabled:opacity-50"
            >
              Continue
            </Button>

            {/* Switch Mode Link */}
            <div className="text-center">
              <span className="text-muted-foreground text-sm">
                {isSignup ? "Already have an account? " : "Don't have an account? "}
                <button
                  onClick={() => navigate(`/auth?mode=${isSignup ? 'login' : 'signup'}`)}
                  className="text-blue-500 hover:text-blue-600 font-medium"
                >
                  {isSignup ? 'Log in' : 'Sign up'}
                </button>
              </span>
            </div>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-background text-muted-foreground">OR</span>
              </div>
            </div>

            {/* Social Login Buttons */}
            <div className="space-y-3">
              <Button
                variant="outline"
                onClick={handleSocialLogin}
                className="w-full h-12 rounded-xl border-border hover:bg-accent text-foreground"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" className="mr-3">
                  <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Continue with Google
              </Button>

              <Button
                variant="outline"
                onClick={handleSocialLogin}
                className="w-full h-12 rounded-xl border-border hover:bg-accent text-foreground"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" className="mr-3">
                  <path fill="#00A1F1" d="M0 0h11.377v11.372H0z"/>
                  <path fill="#FFB900" d="M12.623 0H24v11.372H12.623z"/>
                  <path fill="#00A1F1" d="M0 12.628h11.377V24H0z"/>
                  <path fill="#FFB900" d="M12.623 12.628H24V24H12.623z"/>
                </svg>
                Continue with Microsoft Account
              </Button>

              <Button
                variant="outline"
                onClick={handleSocialLogin}
                className="w-full h-12 rounded-xl border-border hover:bg-accent text-foreground"
              >
                <svg width="16" height="20" viewBox="0 0 24 24" className="mr-3">
                  <path fill="currentColor" d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                </svg>
                Continue with Apple
              </Button>

              <Button
                variant="outline"
                onClick={handleSocialLogin}
                className="w-full h-12 rounded-xl border-border hover:bg-accent text-foreground"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" className="mr-3" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
                Continue with phone
              </Button>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-12 text-center">
            <div className="flex items-center justify-center space-x-4 text-sm text-muted-foreground">
              <a href="#" className="hover:text-foreground">Terms of Use</a>
              <span>|</span>
              <a href="#" className="hover:text-foreground">Privacy Policy</a>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Sparkles Icon */}
      <div className="fixed bottom-8 right-8">
        <div className="w-12 h-12 bg-yellow-400 rounded-xl flex items-center justify-center">
          <Sparkles size={24} className="text-white" />
        </div>
      </div>
    </div>
  );
};

export default Auth;
