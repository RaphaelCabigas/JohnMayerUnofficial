import { NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'


// Handles redirections and session token
// https://nextjs.org/docs/pages/building-your-application/routing/middleware
// https://stackoverflow.com/questions/76498110/how-to-check-the-authorization-token-and-its-validity-from-middleware-or-a-commo
export async function middleware(request) {
    // Get the session token to verify the user's session/authentication
    const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
    // The current path being accessed 
    const path = request.nextUrl.pathname;    // console.log(path);
    // console.log(request.url)

    // If user has a session token/authenticated and tries to access the paths
    if (token && (path.startsWith("/login") || path.startsWith("/register"))) {
        // redirect user to dashboard 
        return NextResponse.redirect(new URL('/dashboard', request.url));
    }
    // If user does not have a session token/unauthenticated  
    if (!token && path.startsWith("/dashboard")) {
        // redirect user to login
        return NextResponse.redirect(new URL('/login', request.url));
    }
    // If none of the conditions are met, just continue
    return NextResponse.next();
}

// Middleware only applies to the following routes
export const config = {
    matcher: ["/login", "/register", "/dashboard"]
}