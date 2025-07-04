import { useNavigate } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';

interface DailyPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DailyPopup = ({ isOpen, onClose }: DailyPopupProps) => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/auth?mode=login');
    onClose();
  };

  const handleSignup = () => {
    navigate('/auth?mode=signup');
    onClose();
  };

  const handleStayLoggedOut = () => {
    // Set a flag to not show popup again today
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    localStorage.setItem('hidePopupUntil', tomorrow.getTime().toString());
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='sm:max-w-md bg-background border-border animate-in fade-in-0 zoom-in-95 duration-200 p-0'>
        <div className='p-8 text-center'>
          <h2 className='text-xl font-semibold text-foreground mb-4'>
            Welcome back
          </h2>
          <p className='text-muted-foreground text-sm mb-8 leading-relaxed'>
            Log in or sign up to get smarter
            <br />
            responses, upload files and images,
            <br />
            and more.
          </p>

          <div className='space-y-3'>
            <Button
              onClick={handleLogin}
              className='w-full h-12 rounded-full bg-foreground hover:bg-foreground/90 text-background'
            >
              Log in
            </Button>

            <Button
              onClick={handleSignup}
              variant='outline'
              className='w-full h-12 rounded-full border-border hover:bg-accent text-foreground'
            >
              Sign up for free
            </Button>

            <button
              onClick={handleStayLoggedOut}
              className='w-full text-muted-foreground text-sm hover:text-foreground underline mt-4'
            >
              Stay logged out
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
