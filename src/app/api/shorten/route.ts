import { generateShortCode } from "@/utils/helpers";
import { saveToDatabase } from "@/db/db";

export async function POST(req: Request) {
    const { longUrl } = await req.json();
    const shortCode = generateShortCode();

    // TODO define name; name will be sent via the frontend
    await saveToDatabase(shortCode, longUrl, name);

    return new Response(
        JSON.stringify({ shortUrl: `http://localhost:3000/${shortCode}` }),
        {
            status: 201,
            headers: { "Content-Type": "application/json" },
        }
    );
}
