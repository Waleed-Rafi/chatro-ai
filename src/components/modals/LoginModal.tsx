
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LoginModal = ({ isOpen, onClose }: LoginModalProps) => {
  const [email, setEmail] = useState("");
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
      <DialogContent className="max-w-7xl w-full h-[90vh] bg-background border-border animate-in fade-in-0 zoom-in-95 duration-200 p-0 overflow-hidden">
        <div className="flex h-full">
          {/* Left side - Stats and testimonials */}
          <div className="hidden md:flex flex-1 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-12 flex-col justify-center relative">
            <Button
              variant="ghost"
              size="sm"
              className="absolute right-4 top-4 p-0 h-8 w-8 text-muted-foreground hover:text-foreground"
              onClick={onClose}
            >
              <X size={20} />
            </Button>

            {/* #1 AI Assistant Badge */}
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-white dark:bg-gray-800 rounded-full shadow-lg mb-6">
                <span className="text-3xl font-bold text-orange-500">#1</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">AI Assistant</h3>
              <div className="flex justify-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-xl">★</span>
                ))}
              </div>
              <p className="text-3xl font-bold text-gray-900 dark:text-white mb-2">30M+ users</p>
              <p className="text-gray-600 dark:text-gray-300">100K+ ratings</p>
            </div>

            {/* Available On */}
            <div className="text-center mb-12">
              <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Available On</h4>
              <div className="flex justify-center space-x-4">
                <div className="w-12 h-12 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center shadow-md">
                  <div className="w-6 h-6 bg-blue-500 rounded-full"></div>
                </div>
                <div className="w-12 h-12 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center shadow-md">
                  <div className="w-6 h-6 bg-orange-500 rounded-full"></div>
                </div>
                <div className="w-12 h-12 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center shadow-md">
                  <div className="w-6 h-6 bg-red-500 rounded-full"></div>
                </div>
                <div className="w-12 h-12 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center shadow-md">
                  <div className="w-6 h-6 bg-green-500 rounded-full"></div>
                </div>
                <div className="w-12 h-12 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center shadow-md">
                  <div className="w-6 h-6 bg-purple-500 rounded-full"></div>
                </div>
              </div>
            </div>

            {/* Trusted by Millions */}
            <div>
              <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 text-center">Trusted by Millions</h4>
              <div className="space-y-6">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                  <h5 className="font-semibold text-gray-900 dark:text-white mb-2">Best AI Assistant</h5>
                  <div className="flex mb-3">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-yellow-400">★</span>
                    ))}
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                    Chatly has been a lifesaver for my content needs. The AI creates amazing visuals and marketing copy that actually sounds human - it's cut my work time in half.
                  </p>
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-gray-300 rounded-full mr-3"></div>
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">Sara Williams</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Marketing Specialist</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                  <h5 className="font-semibold text-gray-900 dark:text-white mb-2">Find of the year</h5>
                  <div className="flex mb-3">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-yellow-400">★</span>
                    ))}
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                    It has simplified my content creation process with its amazing chat and image generation. Plus it offers all the industry standard AI models in one place. That's totally amazing!
                  </p>
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-gray-300 rounded-full mr-3"></div>
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">Andrew Roberts</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">UX Writer</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right side - Login form */}
          <div className="flex-1 flex flex-col justify-center p-8 md:p-12 bg-background relative">
            <Button
              variant="ghost"
              size="sm"
              className="absolute right-4 top-4 p-0 h-8 w-8 md:hidden"
              onClick={onClose}
            >
              <X size={20} />
            </Button>

            <div className="w-full max-w-md mx-auto">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-3 text-foreground">Join Millions of Happy Users</h2>
                <p className="text-muted-foreground">
                  You must login to proceed. Your data is safe and you won't receive any spam.
                </p>
              </div>

              <div className="space-y-4 mb-6">
                <Button 
                  className="w-full justify-center bg-black hover:bg-gray-800 text-white h-12 rounded-lg"
                  onClick={handleLogin}
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
                  className="w-full justify-center h-12 rounded-lg bg-muted hover:bg-muted/80"
                  onClick={handleLogin}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" className="mr-3 text-blue-600">
                    <path fill="currentColor" d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  Continue with Facebook
                </Button>
                
                <Button 
                  variant="outline" 
                  className="w-full justify-center h-12 rounded-lg bg-muted hover:bg-muted/80"
                  onClick={handleLogin}
                >
                  <svg width="16" height="20" viewBox="0 0 24 24" className="mr-3">
                    <path fill="currentColor" d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                  </svg>
                  Continue with Apple
                </Button>
              </div>

              <div className="relative mb-6">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-12 rounded-lg pr-12"
                />
              </div>
              
              <Button 
                variant="outline" 
                className="w-full justify-center h-12 rounded-lg bg-muted hover:bg-muted/80 mb-6"
                onClick={handleEmailLogin}
                disabled={!email}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" className="mr-3" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
                Continue with Email
              </Button>

              <p className="text-xs text-muted-foreground text-center">
                By proceeding, you agree to our{" "}
                <a href="#" className="text-blue-500 hover:underline">Terms of Use</a>{" "}
                and read our{" "}
                <a href="#" className="text-blue-500 hover:underline">Privacy Policy</a>
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
