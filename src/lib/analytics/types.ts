// Analytics event types
export interface AnalyticsEvent {
  event: string;
  [key: string]: unknown;
}

export interface UserProperties {
  user_id?: string;
  user_type?: 'free' | 'pro';
  signup_method?: 'email' | 'google' | 'facebook';
  [key: string]: unknown;
}

export interface PageViewEvent {
  page_title: string;
  page_location: string;
  page_path: string;
}

export interface AuthEvent {
  method: 'email' | 'google' | 'facebook';
  user_id?: string;
}

export interface ButtonClickEvent {
  button_name: string;
  page?: string;
  section?: string;
}
