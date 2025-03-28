import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {

    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value

    if (!token) {
        return NextResponse.json({ message: "No user is logged in"}, {status: 401})
    }

    const response = NextResponse.json({ message: "Logged out successfully."})

    response.cookies.set('token', '', {
        httpOnly: true,
        path: '/',
        maxAge: 0,
        sameSite: 'strict',
    });

    return response;
}