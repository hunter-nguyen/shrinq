import { NextResponse } from 'next/server';
import { deleteUserURL } from '@/db/db-utils';
import { cookies } from 'next/headers';
import * as jose from 'jose';

export async function DELETE(req: Request) {
    try {
        // Get token using Next.js cookies helper
        const cookieStore = await cookies();
        const token = cookieStore.get('token')?.value;

        if (!token) {
            return NextResponse.json({ error: "No token provided" }, { status: 401 });
        }

        const secret = new TextEncoder().encode(process.env.JWT_SECRET);
        const { payload } = await jose.jwtVerify<{ userId: number }>(token, secret);
        const userId = payload.userId;

        if (!req.body) {
            return NextResponse.json({ error: 'Request body is empty' }, { status: 400 });
        }

        try {
            const requestBody = await req.json();
            const { shortCode } = requestBody;

            if (!shortCode) {
                return NextResponse.json({ error: 'shortCode is required' }, { status: 400 });
            }

            await deleteUserURL(userId, shortCode);

            return NextResponse.json({ message: 'URL deleted successfully' }, { status: 200 });
        } catch (error) {
            console.error("Error deleting URL ", error);
            return NextResponse.json({ error: 'Failed to delete URL' }, { status: 500 });
        }

    } catch (error) {
        console.error("Error deleting URL:", error);
        return NextResponse.json({ error: "An unexpected error occurred" }, { status: 500 });
    }
}
