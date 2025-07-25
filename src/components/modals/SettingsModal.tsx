import { LogOut, Settings } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useAuth } from '@/contexts/AuthContext';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SettingsModal = ({ isOpen, onClose }: SettingsModalProps) => {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='sm:max-w-md bg-background border-border animate-in fade-in-0 zoom-in-95 duration-200'>
        <DialogHeader>
          <DialogTitle className='flex items-center gap-2'>
            <Settings size={20} />
            Settings
          </DialogTitle>
        </DialogHeader>

        <div className='space-y-4'>
          <div className='border-t border-border pt-4'>
            <Button
              variant='ghost'
              className='w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20'
              onClick={handleLogout}
            >
              <LogOut size={16} className='mr-2' />
              Log out
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
