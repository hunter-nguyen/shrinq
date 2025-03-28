import * as jose from 'jose'
import { NextRequest, NextResponse } from 'next/server'

export async function middleware(req: NextRequest) {
    const tokenCookie = req.cookies.get('token');

    if (!tokenCookie) {
        return NextResponse.redirect(new URL('/login', req.url));
    }
    try {
        const token = tokenCookie.value;
        const secret = new TextEncoder().encode(process.env.JWT_SECRET);

        await jose.jwtVerify(token, secret);

        return NextResponse.next();
    } catch (error) {
        console.error("Middleware error: ", error);
        return NextResponse.redirect(new URL('/login', req.url));
    };
};

export const config = {
    matcher: ['/dashboard/:path*'],
};