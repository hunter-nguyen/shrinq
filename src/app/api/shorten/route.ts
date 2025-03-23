import { generateShortCode } from "@/utils/helpers";
import { saveUrlToDB } from "@/db/db-utils";
import { db } from "@/db/index"
import * as schema from "@/db/schema"
import { eq } from "drizzle-orm";

export async function POST(req: Request) {
    const { longUrl, name } = await req.json();

    // TODO: add custom aliases
    let shortCode: string = '';
    const shortCodeAlias = name;

    const existingShortCode = await db.query.urls.findFirst({
        where: eq(schema.urls.shortCode, name)
    });

    if (name && !existingShortCode) {
        shortCode = shortCodeAlias
    } else if (name && existingShortCode) {
        // log or error to say that there is existing alias
        return new Response(
            JSON.stringify({ error: "Alias already taken. Please choose another." }),
            { status: 400, headers: { "Content-Type": "application/json" } }
        );
    } else {
        shortCode = await generateShortCode();
    }

    await saveUrlToDB(shortCode, longUrl, name);

    return new Response(
        JSON.stringify({ shortUrl: `http://localhost:3000/${shortCode}` }),
        {
            status: 201,
            headers: { "Content-Type": "application/json" },
        }
    );
}
