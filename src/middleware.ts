import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

// This middleware runs in Edge Runtime by default in Next.js 13+
export async function middleware(request: NextRequest) {
  console.log('🚀🚀🚀 MIDDLEWARE IS DEFINITELY RUNNING!');
  console.log('Path:', request.nextUrl.pathname);
  console.log('Method:', request.method);

  // Only run auth logic for auth routes
  if (request.nextUrl.pathname.startsWith('/auth')) {
    let supabaseResponse = NextResponse.next({
      request,
    });

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll();
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value }) =>
              request.cookies.set(name, value)
            );
            supabaseResponse = NextResponse.next({
              request,
            });
            cookiesToSet.forEach(({ name, value, options }) =>
              supabaseResponse.cookies.set(name, value, options)
            );
          },
        },
      }
    );

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      console.log(
        '🔍 Auth check - User:',
        user?.email,
        'Session exists:',
        !!user
      );

      // If there's a user and the user is trying to access auth routes
      if (user) {
        console.log('🔄 Redirecting to home - user authenticated');
        const redirectUrl = request.nextUrl.clone();
        redirectUrl.pathname = '/';
        return NextResponse.redirect(redirectUrl);
      }
    } catch (error) {
      console.error('❌ Error in auth middleware:', error);
    }
  }

  // Just return the request as-is for other routes
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
