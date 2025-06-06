import { generateShortCode } from "@/utils/helpers";
import { saveUrlToDB } from "@/db/db-utils";
import { db } from "@/db/index"
import * as schema from "@/db/schema"
import { eq } from "drizzle-orm";
import * as jose from 'jose'
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import redis from "@/db/redis";

export async function POST(req: Request) {
    try {
        const { longUrl, name } = await req.json();

        // Get token using Next.js cookies helper
        const cookieStore = await cookies();
        const token = cookieStore.get('token')?.value;

        if (!token) {
            return NextResponse.json(
                { error: "No token provided" },
                { status: 401 }
            );
        }

        let shortCode: string = '';
        const shortCodeAlias = name;

        const existingShortCode = await redis.get(`url:${shortCodeAlias}`);

        if (name && !existingShortCode) {
            shortCode = shortCodeAlias;
            const dbShortCode = await db.query.urls.findFirst({
                where: eq(schema.urls.shortCode, shortCode)
            });
            if (dbShortCode) {
                return NextResponse.json(
                    { error: "Alias already taken. Please choose another." },
                    { status: 400 }
                );
            }
        }  else {
            shortCode = await generateShortCode();
        }

        const secret = new TextEncoder().encode(process.env.JWT_SECRET);
        const { payload } = await jose.jwtVerify<{ userId: number }>(token, secret);

        const userId = payload.userId;

        await saveUrlToDB(shortCode, longUrl, name, userId);

        const userUrls = await db.query.urls.findMany({
            where: eq(schema.urls.userId, userId)
        });

        return NextResponse.json({
            shortUrl: `https://shrinq.link/${shortCode}`,
            userUrls
        }, { status: 201 });

    } catch (error) {
        console.error('Error in URL shortening:', error);
        return NextResponse.json(
            { error: "An unexpected error occurred" },
            { status: 500 }
        );
    }
}

export async function GET(req: Request) {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get('token')?.value;

        if (!token) {
            return NextResponse.json(
                { error: "No token provided" },
                { status: 401 }
            );
        }

        const secret = new TextEncoder().encode(process.env.JWT_SECRET);
        const { payload } = await jose.jwtVerify<{ userId: number }>(token, secret);

        const userId = payload.userId;

        const { searchParams } = new URL(req.url);

        const page = parseInt(searchParams.get('page')!);
        const limit = parseInt(searchParams.get('limit')!);
        const offset = (page - 1) * limit;

        const userUrls = await db.query.urls.findMany({
            where: eq(schema.urls.userId, userId),
            orderBy: (urls, { asc }) => asc(urls.id),
            limit,
            offset,
        });

        return NextResponse.json({ userUrls }, { status: 200 });

    } catch (error) {
        console.error('Error fetching URLs:', error);
        return NextResponse.json(
            { error: "An unexpected error occurred" },
            { status: 500 }
        );
    }
}
