import { NextResponse } from "next/server";


export async function POST(req: Request) {

    // TODO: change how we handle the cookie here or implement JWT
    const res = NextResponse.json({ message: "Logged out successfully" });
    res.cookies.set('session', '', { maxAge: -1 });
    return res;
}