import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { IUser } from './models/user.model';

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });
  if (!token) {
    return NextResponse.redirect(new URL('/auth/signin', request.url));
  }
  console.log(token);

  const user = (token as { user: IUser }).user;

  if (request.nextUrl.pathname.startsWith('/account/admin')) {
    if (user.role !== 'admin') {
      const url = new URL(`/auth/signin`, request.url);
      return NextResponse.rewrite(url);
    }
  }

  if (request.nextUrl.pathname.startsWith('/account/user')) {
    return NextResponse.rewrite(new URL('/dashboard/user', request.url));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/account/:path*'],
};
