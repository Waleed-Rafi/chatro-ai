import type { User } from '@/types/auth';
import {
  UserDisplayType,
  type UserDisplayInfo,
  type UserProfile,
} from '@/types/user';

/**
 * Extracts user profile data from auth provider metadata
 * @param user - The user object from authentication
 * @returns UserProfile object with normalized data
 */
export const extractUserProfile = (user: User | null): UserProfile | null => {
  if (!user) return null;

  const metadata = user.user_metadata || {};

  // Extract email (prioritize user.email over metadata)
  const email = user.email || metadata.email;

  // Extract full name from various possible sources
  let fullName: string | undefined;

  // Check different possible name fields based on auth provider
  if (metadata.full_name) {
    fullName = metadata.full_name;
  } else if (metadata.name) {
    fullName = metadata.name;
  }

  // Extract avatar URL from various possible sources
  let avatarUrl: string | undefined;

  if (metadata.avatar_url) {
    avatarUrl = metadata.avatar_url;
  } else if (metadata.picture) {
    avatarUrl = metadata.picture;
  }

  // Generate display info
  const displayInfo = generateDisplayInfo(email, fullName);

  return {
    id: user.id,
    email,
    fullName,
    avatarUrl,
    displayInfo,
  };
};

/**
 * Generates display information from email and full name
 * @param email - User's email
 * @param fullName - User's full name
 * @returns UserDisplayInfo object
 */
export const generateDisplayInfo = (
  email?: string,
  fullName?: string
): UserDisplayInfo => {
  let displayName: string;
  let type: UserDisplayType;

  if (fullName && fullName.trim()) {
    displayName = fullName.trim();
    type = UserDisplayType.FULL_NAME;
  } else if (email) {
    displayName = email.split('@')[0];
    type = UserDisplayType.EMAIL_USERNAME;
  } else {
    displayName = 'User';
    type = UserDisplayType.FALLBACK;
  }

  const initials = generateInitials(displayName);

  return {
    displayName,
    initials,
    type,
  };
};

/**
 * Generates initials from a display name
 * @param displayName - The display name to generate initials from
 * @returns The initials string
 */
export const generateInitials = (displayName: string): string => {
  if (displayName === 'User') return 'U';

  const nameParts = displayName.split(' ').filter(part => part.length > 0);

  if (nameParts.length >= 2) {
    return `${nameParts[0][0]}${nameParts[1][0]}`.toUpperCase();
  }

  return displayName.substring(0, 2).toUpperCase();
};

/**
 * Gets the display name for a user with fallback logic
 * @param user - The user object from authentication
 * @returns The display name string
 */
export const getUserDisplayName = (user: User | null): string => {
  const profile = extractUserProfile(user);
  return profile?.displayInfo.displayName || 'User';
};

/**
 * Gets the display type for a user
 * @param user - The user object from authentication
 * @returns The UserDisplayType enum value
 */
export const getUserDisplayType = (user: User | null): UserDisplayType => {
  const profile = extractUserProfile(user);
  return profile?.displayInfo.type || UserDisplayType.FALLBACK;
};

/**
 * Gets user initials from user object
 * @param user - The user object from authentication
 * @returns The initials string
 */
export const getUserInitials = (user: User | null): string => {
  const profile = extractUserProfile(user);
  return profile?.displayInfo.initials || 'U';
};

/**
 * Gets complete user display information
 * @param user - The user object from authentication
 * @returns UserDisplayInfo object with display name, initials, and type
 */
export const getUserDisplayInfo = (user: User | null): UserDisplayInfo => {
  const profile = extractUserProfile(user);
  return (
    profile?.displayInfo || {
      displayName: 'User',
      initials: 'U',
      type: UserDisplayType.FALLBACK,
    }
  );
};
