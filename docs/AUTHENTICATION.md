# Authentication System Documentation

## Overview

This application uses a **hybrid authentication system** built with **Zustand** for client state
management, **React Query** for server state management, and **Supabase** for authentication
services. This approach provides the best of both worlds: lightweight client state with powerful
server state synchronization.

## Architecture

### State Management: Hybrid Approach

- **Zustand**: Lightweight client state management for auth operations
- **React Query**: Server state management for session/user data with caching
- **Benefits**: Automatic re-renders, built-in caching, optimistic updates, background refetching
- **Store:** `src/stores/auth-store.ts`
- **Hook:** `src/hooks/use-auth.ts`

### Authentication Provider: Supabase

- **Email/Password:** Traditional authentication
- **Social Login:** Google and Facebook OAuth (via Supabase providers)
- **Session Management:** Automatic token refresh and persistence
- **Security:** Built-in security features and best practices

## File Structure

```
src/
├── stores/
│   └── auth-store.ts          # Zustand store for auth operations
├── hooks/
│   └── use-auth.ts            # Hybrid hook combining Zustand + React Query
├── lib/
│   ├── supabase.ts            # Client-side Supabase config
│   ├── supabase-server.ts     # Server-side Supabase config
│   ├── email-test.ts          # Email validation debugging
│   └── session-debug.ts       # Session debugging utilities
├── types/
│   └── auth.ts                # TypeScript type definitions
├── providers/
│   └── QueryProvider.tsx      # React Query provider setup
├── screens/
│   └── Auth.tsx               # Authentication UI component
└── middleware.ts              # Next.js middleware for route protection
```

## Key Components

### 1. AuthStore (Zustand)

```typescript
// State management with actions
const useAuthStore = create<AuthStore>(set => ({
  user: null,
  session: null,
  loading: false,
  error: null,

  // Actions
  signUp: async (email, password) => {
    set({ loading: true, error: null });
    try {
      const { data, error } = await supabase.auth.signUp({
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
        error: error instanceof Error ? error.message : 'Sign up failed',
        loading: false,
      });
      throw error;
    }
  },
  signIn: async (email, password) => {
    /* ... */
  },
  signInWithProvider: async provider => {
    /* ... */
  },
  signOut: async () => {
    /* ... */
  },
  clearError: () => set({ error: null }),
  setUser: user => set({ user }),
  setSession: session => set({ session }),
}));
```

### 2. Hybrid Auth Hook

```typescript
// Combines Zustand + React Query for optimal state management
export const useAuth = () => {
  const auth = useAuthStore();
  const queryClient = useQueryClient();

  // React Query for session management
  const { data: session, isLoading: sessionLoading } = useQuery({
    queryKey: ['auth-session'],
    queryFn: async () => {
      const { data } = await supabase.auth.getSession();
      return data.session;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
  });

  // React Query for user data
  const { data: user, isLoading: userLoading } = useQuery({
    queryKey: ['auth-user'],
    queryFn: async () => {
      const { data } = await supabase.auth.getUser();
      return data.user;
    },
    enabled: !!session,
    staleTime: 5 * 60 * 1000,
  });

  // Sync Zustand with React Query
  useEffect(() => {
    if (session && user && (!auth.user || auth.user.id !== user.id)) {
      auth.setUser(user);
      auth.setSession(session);
    } else if (!session && !user && auth.user) {
      auth.setUser(null);
      auth.setSession(null);
    }
  }, [session, user, auth]);

  // Auth state change listener
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
```

### 3. Authentication UI Component

```typescript
// Direct implementation in screens/Auth.tsx
const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signIn, signUp, signInWithProvider, loading, error, clearError } = useAuth();

  // Clear state when switching modes
  useEffect(() => {
    clearError();
    setEmail('');
    setPassword('');
  }, [mode, clearError]);

  const handleEmailSubmit = async () => {
    if (email && password) {
      try {
        if (isSignup) {
          await signUp(email, password);
        } else {
          await signIn(email, password);
        }
        router.push('/');
      } catch (error) {
        // Error handled by store and displayed in UI
      }
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Auth UI implementation */}
    </div>
  );
};
```

## Features

### ✅ Email/Password Authentication

- Sign up without email verification (configurable)
- Sign in with credentials
- Form validation with error handling
- State clearing on mode switches

### ✅ Social Authentication

- Google OAuth via Supabase providers
- Facebook OAuth via Supabase providers
- No external OAuth setup required
- Automatic redirect handling

### ✅ Session Management

- Automatic session refresh via React Query
- Persistent login state across page refreshes
- Secure token storage
- Real-time auth state synchronization

### ✅ Route Protection

- Server-side middleware protection
- Client-side route guards
- Automatic redirects based on auth state
- Loading states during auth checks

### ✅ User Experience

- Loading indicators during auth operations
- Error handling with user-friendly messages
- Input field clearing on mode switches
- Fade-in animations for smooth transitions

## Usage Examples

### Basic Authentication

```typescript
import { useAuth } from '@/hooks/use-auth';

function MyComponent() {
  const { user, isAuthenticated, signOut } = useAuth();

  if (!isAuthenticated) {
    return <div>Please log in</div>;
  }

  return (
    <div>
      <p>Welcome, {user?.email}!</p>
      <button onClick={signOut}>Logout</button>
    </div>
  );
}
```

### Route Protection with Middleware

```typescript
// middleware.ts - Automatic route protection
export async function middleware(request: NextRequest) {
  const supabase = createServerClient(/* ... */);
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Redirect unauthenticated users to auth
  if (!user && !request.nextUrl.pathname.startsWith('/auth')) {
    return NextResponse.redirect(new URL('/auth', request.url));
  }

  // Redirect authenticated users away from auth
  if (user && request.nextUrl.pathname.startsWith('/auth')) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}
```

### Authentication Screen

```typescript
// Direct usage in screens/Auth.tsx
const Auth = () => {
  const { signIn, signUp, signInWithProvider, loading, error } = useAuth();

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Email/Password form */}
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      {/* Error display */}
      {error && (
        <div className="text-red-600 text-sm mt-3 px-3 text-left bg-red-50 border border-red-200 rounded-lg py-3 shadow-sm">
          <div className="flex items-start space-x-2">
            <span className="text-red-500 mt-0.5 flex-shrink-0">⚠️</span>
            <span className="leading-relaxed">{error}</span>
          </div>
        </div>
      )}

      {/* Social login buttons */}
      <button onClick={() => signInWithProvider('google')}>
        Continue with Google
      </button>
      <button onClick={() => signInWithProvider('facebook')}>
        Continue with Facebook
      </button>
    </div>
  );
};
```

## Environment Variables

Create a `.env.local` file with your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Supabase Setup

1. **Create a Supabase project** at https://supabase.com
2. **Enable Authentication** in your project dashboard
3. **Configure OAuth providers** (Google, Facebook) in Supabase dashboard
4. **Set up redirect URLs** for OAuth callbacks
5. **Configure email settings** (disable confirmations for immediate login)

### OAuth Configuration (Supabase Built-in)

#### Google OAuth Setup

1. **Supabase Dashboard Configuration:**
   - Go to your Supabase project dashboard
   - Navigate to Authentication → Providers
   - Enable Google provider
   - Supabase will provide the redirect URL automatically
   - No external Google Cloud Console setup required

#### Facebook OAuth Setup

1. **Supabase Dashboard Configuration:**
   - Go to your Supabase project dashboard
   - Navigate to Authentication → Providers
   - Enable Facebook provider
   - Supabase will provide the redirect URL automatically
   - No external Facebook Developer setup required

#### Important Notes:

- Supabase handles all OAuth provider configuration internally
- No need for external Google Cloud Console or Facebook Developer accounts
- Redirect URLs are automatically configured by Supabase
- For local development, Supabase handles localhost redirects automatically

## Best Practices

### 1. Error Handling

- Errors are re-thrown from Zustand store for component-level handling
- User-friendly error messages displayed in UI
- Error clearing on mode switches and successful operations

### 2. Loading States

- Loading indicators during all auth operations
- Form disabling during submission
- React Query provides automatic loading states

### 3. Security

- No sensitive data in localStorage
- HTTPS required in production
- Supabase handles all security best practices
- Session tokens managed securely

### 4. Performance

- React Query provides intelligent caching
- Zustand provides lightweight client state
- Automatic background refetching
- Optimistic updates for better UX

## Testing

### Unit Tests

```typescript
import { renderHook } from '@testing-library/react';
import { useAuth } from '@/hooks/use-auth';

test('should return authentication state', () => {
  const { result } = renderHook(() => useAuth());
  expect(result.current.isAuthenticated).toBe(false);
});
```

### Integration Tests

```typescript
import { render, screen } from '@testing-library/react';
import { Auth } from '@/screens/Auth';

test('should render auth form', () => {
  render(<Auth />);
  expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
});
```

## Migration from Context

If migrating from React Context:

1. **Replace Context Provider** with Zustand store + React Query
2. **Update imports** to use `useAuth` hook
3. **Remove Provider wrapping** from components
4. **Update tests** to use new patterns

## Troubleshooting

### Common Issues

1. **Session not persisting**
   - Check Supabase configuration
   - Verify environment variables
   - Check browser console for errors

2. **OAuth redirect issues**
   - Verify Supabase OAuth provider settings
   - Check redirect URLs in Supabase dashboard
   - Ensure HTTPS in production

3. **"Email not confirmed" errors**
   - Disable email confirmations in Supabase dashboard
   - Or check email for confirmation link
   - Configure email templates if needed

4. **"Invalid email" errors**
   - Check Supabase email restrictions
   - Verify email format validation
   - Check Supabase auth settings

### Debug Mode

Enable debug logging:

```typescript
// In development
const supabase = createBrowserClient(url, key, {
  auth: {
    debug: true,
  },
});
```

### Debug Utilities

The codebase includes debugging utilities:

- `src/lib/email-test.ts` - Email validation debugging
- `src/lib/session-debug.ts` - Session state debugging
- Console logs throughout auth operations

## Future Enhancements

- [ ] Multi-factor authentication
- [ ] Role-based access control
- [ ] Session analytics
- [ ] Advanced user profiles
- [ ] Audit logging
- [ ] Rate limiting
- [ ] Account linking
- [ ] Biometric authentication

## Support

For issues and questions:

1. Check the Supabase documentation
2. Review the Zustand documentation
3. Review the React Query documentation
4. Check existing GitHub issues
5. Create a new issue with detailed information

## Architecture Benefits

### Why This Hybrid Approach?

1. **Zustand**: Lightweight, no provider wrapping, easy testing
2. **React Query**: Powerful caching, background updates, optimistic updates
3. **Supabase**: Built-in security, OAuth providers, session management
4. **Combined**: Best performance, developer experience, and user experience

This architecture provides enterprise-level authentication with minimal boilerplate and maximum
flexibility.
