import Image from 'next/image';

import { useUserDisplay } from '@/hooks/use-user-display';
import { UserDisplayType } from '@/types/user';

interface UserAvatarProps {
  size?: 'sm' | 'md' | 'lg';
  showName?: boolean;
  className?: string;
  profilePictureUrl?: string;
}

const sizeClasses = {
  sm: 'w-6 h-6 text-xs',
  md: 'w-8 h-8 text-sm',
  lg: 'w-12 h-12 text-base',
};

const getDisplayTypeColor = (type: UserDisplayType): string => {
  switch (type) {
    case UserDisplayType.FULL_NAME:
      return 'bg-blue-600';
    case UserDisplayType.EMAIL_USERNAME:
      return 'bg-green-600';
    case UserDisplayType.FALLBACK:
      return 'bg-gray-600';
    default:
      return 'bg-gray-600';
  }
};

export const UserAvatar = ({
  size = 'md',
  showName = false,
  className = '',
  profilePictureUrl,
}: UserAvatarProps) => {
  const userDisplayInfo = useUserDisplay();
  const hasProfilePicture = !!profilePictureUrl;

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <div
        className={`${sizeClasses[size]} rounded-full flex items-center justify-center overflow-hidden`}
      >
        {hasProfilePicture ? (
          <Image
            src={profilePictureUrl!}
            alt={`${userDisplayInfo.displayName}'s profile picture`}
            width={size === 'sm' ? 24 : size === 'md' ? 32 : 48}
            height={size === 'sm' ? 24 : size === 'md' ? 32 : 48}
            className='w-full h-full object-cover'
          />
        ) : (
          <div
            className={`w-full h-full ${getDisplayTypeColor(userDisplayInfo.type)} flex items-center justify-center text-white font-medium`}
          >
            {userDisplayInfo.initials}
          </div>
        )}
      </div>
      {showName && (
        <span className='text-sm font-medium'>
          {userDisplayInfo.displayName}
        </span>
      )}
    </div>
  );
};
