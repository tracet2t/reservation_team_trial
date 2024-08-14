import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';



const secret = new TextEncoder().encode('1cc191a30dfb823e280838d33afc0c2d60fc8c2fdc9b4b60211378528dc0e82c73d17bc7100a13424a0f0c0df23d0ca7a1b5cbc550285c11189df8bf71eb342b');

export async function middleware(req) {
  
  const token = req.cookies.get('token')?.value;
  if (token) {
      await jwtVerify(token, secret);
      return NextResponse.next(); 
    } else {
      return NextResponse.redirect(new URL("/", req.url));

  }
}

export const config = {
  matcher: ['/tasks'], 
};
