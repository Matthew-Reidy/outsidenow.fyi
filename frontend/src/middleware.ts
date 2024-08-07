import { Cookie } from 'next/font/google'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 

export function middleware(request: NextRequest){
   //return NextResponse.redirect(new URL('/home', request.url))
     // Setting cookies on the response using the `ResponseCookies` API
   //const response = NextResponse.next()
   //   response.cookies.set('vercel', 'fast')
   //   let cookie = response.cookies.get('vercel')
   //   console.log(cookie)
   
   //   return response
 
   
   //return response
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
  }