import jwt, { Secret } from 'jsonwebtoken'
import { NextRequest, NextResponse } from 'next/server'

export function middleware(req: NextRequest) {
    const tokenCookie = req.cookies.get('token');

    if (!tokenCookie) {
        return NextResponse.redirect(new URL('/login', req.url));
    }
    try {
        const token = tokenCookie.value;
        const decoded = jwt.verify(token, process.env.JWT_SECRET as Secret);

        return NextResponse.next();
    } catch (error) {
        return NextResponse.redirect(new URL('/login', req.url));
    };
};

export const config = {
    matcher: ['/dashboard'],
};