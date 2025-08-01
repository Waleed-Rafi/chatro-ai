export enum UserDisplayType {
  FULL_NAME = 'full_name',
  EMAIL_USERNAME = 'email_username',
  FALLBACK = 'fallback',
}

export interface UserDisplayInfo {
  displayName: string;
  initials: string;
  type: UserDisplayType;
}

export interface UserProfile {
  id: string;
  email?: string;
  fullName?: string;
  avatarUrl?: string;
  displayInfo: UserDisplayInfo;
}

// Auth provider specific metadata interfaces
export interface GoogleUserMetadata {
  full_name?: string;
  avatar_url?: string;
  email?: string;
  name?: string;
  picture?: string;
}

export interface FacebookUserMetadata {
  full_name?: string;
  avatar_url?: string;
  email?: string;
  name?: string;
  picture?: string;
}

export interface EmailUserMetadata {
  email?: string;
}

export type UserMetadata =
  | GoogleUserMetadata
  | FacebookUserMetadata
  | EmailUserMetadata;
