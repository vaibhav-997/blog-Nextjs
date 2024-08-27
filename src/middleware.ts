
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {

    const token =  request.cookies.get('next-auth.session-token')
    

    if(token?.value.length && token.value.length > 0){
        return NextResponse.redirect(new URL('/', request.url))
    }


  


}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/sign-in', '/sign-up', '/verify/:path*', '/forgot-password/:path*'],
}