import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';

import { debugSession } from '@/lib/session-debug';
import { supabase } from '@/lib/supabase';
import { useAuthStore } from '@/stores/auth-store';

export const useAuth = () => {
  const auth = useAuthStore();
  const queryClient = useQueryClient();

  // Use React Query for session management with proper initialization
  const { data: session, isLoading: sessionLoading } = useQuery({
    queryKey: ['auth-session'],
    queryFn: async () => {
      debugSession(); // Debug session state
      const { data } = await supabase.auth.getSession();
      return data.session;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false, // Prevent unnecessary refetches
  });

  // Use React Query for user data
  const { data: user, isLoading: userLoading } = useQuery({
    queryKey: ['auth-user'],
    queryFn: async () => {
      const { data } = await supabase.auth.getUser();
      return data.user;
    },
    enabled: !!session,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Sync Zustand store with React Query data and initialize on mount
  useEffect(() => {
    if (session && user && (!auth.user || auth.user.id !== user.id)) {
      auth.setUser(user);
      auth.setSession(session);
    } else if (!session && !user && auth.user) {
      auth.setUser(null);
      auth.setSession(null);
    }
  }, [session, user, auth]);

  // Listen for auth state changes
  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session) {
        queryClient.setQueryData(['auth-session'], session);
        queryClient.setQueryData(['auth-user'], session.user);
        auth.setUser(session.user);
        auth.setSession(session);
      } else if (event === 'SIGNED_OUT') {
        queryClient.setQueryData(['auth-session'], null);
        queryClient.setQueryData(['auth-user'], null);
        auth.setUser(null);
        auth.setSession(null);
      }
    });

    return () => subscription.unsubscribe();
  }, [queryClient, auth]);

  return {
    user: user || auth.user,
    session: session || auth.session,
    loading: auth.loading || sessionLoading || userLoading,
    error: auth.error,
    isAuthenticated: !!(user || auth.user),
    signIn: auth.signIn,
    signUp: auth.signUp,
    signInWithProvider: auth.signInWithProvider,
    signOut: auth.signOut,
    clearError: auth.clearError,
  };
};
