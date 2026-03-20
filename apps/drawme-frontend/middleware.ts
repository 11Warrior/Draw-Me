import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
    const token = req.cookies.get("signin_token")?.value;
    
    if (!token) {
        return NextResponse.redirect(new URL('/auth', req.url))
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/draw/:path*']
}