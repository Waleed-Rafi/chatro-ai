import { create } from 'zustand';

import { supabase } from '@/lib/supabase';
import type { AuthProvider, AuthState, Session, User } from '@/types/auth';

interface AuthStore extends AuthState {
  signUp: (email: string, password: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signInWithProvider: (provider: AuthProvider) => Promise<void>;
  signOut: () => Promise<void>;
  initialize: () => Promise<void>;
  clearError: () => void;
  setUser: (user: User | null) => void;
  setSession: (session: Session | null) => void;
}

export const useAuthStore = create<AuthStore>(set => ({
  user: null,
  session: null,
  loading: false,
  error: null,

  signUp: async (email: string, password: string) => {
    set({ loading: true, error: null });
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
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

      set({
        user: data.user,
        session: data.session,
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

      set({
        user: data.user,
        session: data.session,
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
        set({
          user: session.user,
          session,
          loading: false,
        });
      } else {
        set({ loading: false });
      }

      // Listen for auth changes
      supabase.auth.onAuthStateChange((event, session) => {
        set({
          user: session?.user ?? null,
          session,
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
  setUser: (user: User | null) => set({ user }),
  setSession: (session: Session | null) => set({ session }),
}));
