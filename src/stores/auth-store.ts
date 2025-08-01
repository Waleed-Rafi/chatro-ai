import { create } from 'zustand';

import { supabase } from '@/lib/supabase';
import { extractUserProfile } from '@/lib/user-utils';
import type { AuthProvider, AuthState, Session, User } from '@/types/auth';
import type { UserProfile } from '@/types/user';

interface AuthStore extends AuthState {
  userProfile: UserProfile | null;
  signUp: (email: string, password: string, name?: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signInWithProvider: (provider: AuthProvider) => Promise<void>;
  signOut: () => Promise<void>;
  initialize: () => Promise<void>;
  clearError: () => void;
  setUser: (user: User | null) => void;
  setSession: (session: Session | null) => void;
  setUserProfile: (profile: UserProfile | null) => void;
}

export const useAuthStore = create<AuthStore>(set => ({
  user: null,
  session: null,
  userProfile: null,
  loading: false,
  error: null,

  signUp: async (email: string, password: string, name?: string) => {
    set({ loading: true, error: null });
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: name,
          },
        },
      });

      if (error) {
        console.error('❌ Error details:', {
          message: error.message,
          status: error.status,
          name: error.name,
          details: error,
        });
        throw error;
      }

      const profile = extractUserProfile(data.user);
      set({
        user: data.user,
        session: data.session,
        userProfile: profile,
        loading: false,
        error: null,
      });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Sign up failed',
        loading: false,
      });
      throw error;
    }
  },

  signIn: async (email: string, password: string) => {
    set({ loading: true, error: null });
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      const profile = extractUserProfile(data.user);
      set({
        user: data.user,
        session: data.session,
        userProfile: profile,
        loading: false,
        error: null,
      });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Sign in failed',
        loading: false,
      });
      throw error;
    }
  },

  signInWithProvider: async (provider: AuthProvider) => {
    set({ loading: true, error: null });
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) throw error;
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Social sign in failed',
        loading: false,
      });
    }
  },

  signOut: async () => {
    set({ loading: true });
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;

      set({
        user: null,
        session: null,
        userProfile: null,
        loading: false,
      });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Sign out failed',
        loading: false,
      });
    }
  },

  initialize: async () => {
    set({ loading: true });
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session) {
        const profile = extractUserProfile(session.user);
        set({
          user: session.user,
          session,
          userProfile: profile,
          loading: false,
        });
      } else {
        set({ loading: false });
      }

      // Listen for auth changes
      supabase.auth.onAuthStateChange((event, session) => {
        const profile = extractUserProfile(session?.user ?? null);
        set({
          user: session?.user ?? null,
          session,
          userProfile: profile,
          loading: false,
        });
      });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Initialization failed',
        loading: false,
      });
    }
  },

  clearError: () => set({ error: null }),
  setUser: (user: User | null) => {
    const profile = extractUserProfile(user);
    set({ user, userProfile: profile });
  },
  setSession: (session: Session | null) => set({ session }),
  setUserProfile: (profile: UserProfile | null) =>
    set({ userProfile: profile }),
}));
