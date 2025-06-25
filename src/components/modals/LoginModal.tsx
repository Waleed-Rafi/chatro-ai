
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X, Star } from "lucide-react";
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
      <DialogContent className="sm:max-w-5xl bg-background border-border animate-in fade-in-0 zoom-in-95 duration-200 p-0">
        <div className="flex">
          {/* Left side - Stats */}
          <div className="flex-1 p-8 bg-muted/30">
            <Button
              variant="ghost"
              size="sm"
              className="absolute right-4 top-4 z-10"
              onClick={onClose}
            >
              <X size={16} />
            </Button>

            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 mb-2">
                <span className="text-2xl font-bold">#1</span>
              </div>
              <h2 className="text-lg font-semibold mb-2">AI Assistant</h2>
              <div className="flex justify-center gap-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} className="fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-2xl font-bold">30M+ users</p>
              <p className="text-sm text-muted-foreground">100K+ ratings</p>
            </div>

            <div className="text-center mb-8">
              <h3 className="text-lg font-semibold mb-4">Available On</h3>
              <div className="flex justify-center gap-4">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                  <div className="w-6 h-6 bg-blue-500 rounded-full"></div>
                </div>
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                  <div className="w-6 h-6 bg-blue-400 rounded-full"></div>
                </div>
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                  <div className="w-6 h-6 bg-red-500 rounded-full"></div>
                </div>
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                  <div className="w-6 h-6 bg-orange-500 rounded-full"></div>
                </div>
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                  <div className="w-6 h-6 bg-blue-600 rounded-full"></div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4 text-center">Trusted by Millions</h3>
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold mb-1">Best AI Assistant</h4>
                  <div className="flex gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={14} className="fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Chatly has been a lifesaver for my content needs. The AI creates amazing visuals and marketing copy that actually sounds human - it's cut my work time in half.
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <div className="w-6 h-6 bg-gray-400 rounded-full"></div>
                    <span className="text-sm">Sara Williams - Marketing Specialist</span>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-1">Find of the year</h4>
                  <div className="flex gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={14} className="fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    It has simplified my content creation process with its amazing chat and image generation. Plus it offers all the industry standard AI models in one place. That's totally amazing!
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <div className="w-6 h-6 bg-gray-400 rounded-full"></div>
                    <span className="text-sm">Andrew Roberts - UX Writer</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right side - Login */}
          <div className="flex-1 p-8">
            <div className="max-w-sm mx-auto">
              <h2 className="text-2xl font-bold mb-2">Join Millions of Happy Users</h2>
              <p className="text-muted-foreground mb-8">
                You must login to proceed. Your data is safe and you won't receive any spam.
              </p>

              <div className="space-y-3 mb-6">
                <Button 
                  className="w-full justify-center bg-black hover:bg-gray-800 text-white"
                  onClick={handleLogin}
                >
                  <span className="mr-2">G</span>
                  Continue with Google
                </Button>
                
                <Button 
                  variant="outline" 
                  className="w-full justify-center"
                  onClick={handleLogin}
                >
                  <span className="mr-2">f</span>
                  Continue with Facebook
                </Button>
                
                <Button 
                  variant="outline" 
                  className="w-full justify-center"
                  onClick={handleLogin}
                >
                  <span className="mr-2">🍎</span>
                  Continue with Apple
                </Button>
              </div>

              <div className="space-y-3">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full"
                />
                
                <Button 
                  variant="outline" 
                  className="w-full justify-center"
                  onClick={handleEmailLogin}
                  disabled={!email}
                >
                  <span className="mr-2">✉</span>
                  Continue with Email
                </Button>
              </div>

              <p className="text-xs text-muted-foreground mt-6 text-center">
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
