
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Settings, Monitor, Sun, Moon, LogOut } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { useAuth } from "@/contexts/AuthContext";

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SettingsModal = ({ isOpen, onClose }: SettingsModalProps) => {
  const { theme, setTheme } = useTheme();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-background border-border animate-in fade-in-0 zoom-in-95 duration-200">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Settings size={20} />
            Settings
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium mb-3">Theme</h3>
            <div className="space-y-2">
              <Button
                variant={theme === 'light' ? 'default' : 'ghost'}
                className="w-full justify-start"
                onClick={() => setTheme('light')}
              >
                <Sun size={16} className="mr-2" />
                Light
              </Button>
              <Button
                variant={theme === 'dark' ? 'default' : 'ghost'}
                className="w-full justify-start"
                onClick={() => setTheme('dark')}
              >
                <Moon size={16} className="mr-2" />
                Dark
              </Button>
              <Button
                variant={theme === 'system' ? 'default' : 'ghost'}
                className="w-full justify-start"
                onClick={() => setTheme('system')}
              >
                <Monitor size={16} className="mr-2" />
                System
              </Button>
            </div>
          </div>

          <div className="border-t border-border pt-4">
            <Button
              variant="ghost"
              className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
              onClick={handleLogout}
            >
              <LogOut size={16} className="mr-2" />
              Log out
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
