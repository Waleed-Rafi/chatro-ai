import { useAuth } from '@/hooks/use-auth';
import { UserDisplayType, type UserDisplayInfo } from '@/types/user';

/**
 * Custom hook to get user display information
 * @returns UserDisplayInfo object with display name, initials, and type
 */
export const useUserDisplay = (): UserDisplayInfo => {
  const { userProfile } = useAuth();

  return (
    userProfile?.displayInfo || {
      displayName: 'User',
      initials: 'U',
      type: UserDisplayType.FALLBACK,
    }
  );
};
