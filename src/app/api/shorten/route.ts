import { generateShortCode } from "@/utils/helpers";
import { saveUrlToDB } from "@/db/db-utils";
import { db } from "@/db/index"
import * as schema from "@/db/schema"
import { eq } from "drizzle-orm";
import * as jose from 'jose'

export async function POST(req: Request) {
    const { longUrl, name } = await req.json();
    const tokenCookie = req.headers.get('Cookie')

    let shortCode: string = '';
    const shortCodeAlias = name;

    const existingShortCode = await db.query.urls.findFirst({
        where: eq(schema.urls.shortCode, name)
    });

    if (name && !existingShortCode) {
        shortCode = shortCodeAlias
    } else if (name && existingShortCode) {
        return new Response(
            JSON.stringify({ error: "Alias already taken. Please choose another." }),
            { status: 400, headers: { "Content-Type": "application/json" } }
        );
    } else {
        shortCode = await generateShortCode();
    }
    const token = tokenCookie
        ?.split('; ')
        .find((c) => c.startsWith('token='))
        ?.split('=')[1];

    if (!token) {
        return new Response(
            JSON.stringify({ error: "No token provided" }),
            { status: 401, headers: { "Content-Type": "application/json" } }
        );
    }

    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jose.jwtVerify<{ userId: number }>(token, secret);

    const userId = payload.userId;

    await saveUrlToDB(shortCode, longUrl, name, userId);

    return new Response(
        JSON.stringify({ shortUrl: `http://localhost:3000/${shortCode}` }),
        {
            status: 201,
            headers: { "Content-Type": "application/json" },
        }
    );
}
