import { NextResponse } from "next/server";


export async function POST(req: Request) {

    const res = NextResponse.json({ message: "Logged out successfully" });
    res.cookies.set('session', '', { maxAge: -1 });
    return res;
}