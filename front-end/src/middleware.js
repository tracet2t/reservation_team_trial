import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const secret = new TextEncoder().encode('1cc191a30dfb823e280838d33afc0c2d60fc8c2fdc9b4b60211378528dc0e82c73d17bc7100a13424a0f0c0df23d0ca7a1b5cbc550285c11189df8bf71eb342b');

export async function middleware(req) {
  const token = req.cookies.get('token')?.value;
  const isAdmin = req.cookies.get('isAdmin')?.value === 'true'; // Read isAdmin cookie
  const url = req.nextUrl.clone();

  if (token) {
    try {
      await jwtVerify(token, secret);

      const res = NextResponse.next();
      res.cookies.set('authStatus', 'true', { path: '/' });

      if (url.pathname === '/login') {
        url.pathname = '/tasks';
        return NextResponse.redirect(url);
      }

      // Restrict access to /register unless user is admin
      if (url.pathname === '/register' && !isAdmin) {
        url.pathname = '/';
        return NextResponse.redirect(url);
      }

      return res;
    } catch (err) {
      const res = NextResponse.next();
      res.cookies.set('authStatus', 'false', { path: '/' });
      return res;
    }
  } else {
    const res = NextResponse.next();
    res.cookies.set('authStatus', 'false', { path: '/' });

    if (url.pathname === '/tasks') {
      url.pathname = '/';
      return NextResponse.redirect(url);
    }
    
    if (url.pathname === '/register') {
      url.pathname = '/';
      return NextResponse.redirect(url);
    }

    return res;
  }
}

export const config = {
  matcher: ['/tasks', '/login', '/register'],
};
