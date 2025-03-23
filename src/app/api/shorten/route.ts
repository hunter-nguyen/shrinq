import { generateShortCode } from "@/utils/helpers";
import { saveUrlToDB } from "@/db/db-utils";

export async function POST(req: Request) {
    const { longUrl, name } = await req.json();

    const shortCode = generateShortCode();

    await saveUrlToDB(await shortCode, longUrl, name);

    return new Response(
        JSON.stringify({ shortUrl: `http://localhost:3000/${shortCode}` }),
        {
            status: 201,
            headers: { "Content-Type": "application/json" },
        }
    );
}
