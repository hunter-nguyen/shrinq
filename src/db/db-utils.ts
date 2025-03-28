import { db } from "./index"
import { hashPassword } from "@/utils/helpers"
import * as schema from "./schema"
import { eq } from "drizzle-orm"
import redis from "./redis"

export async function saveUrlToDB(shortCode: string, longUrl: string, name: string, userId: number) {
    await db.insert(schema.urls).values({
        name: name,
        shortCode: shortCode,
        regularUrl: longUrl,
        userId: userId
    });

    await redis.set(`url:${shortCode}`, longUrl);
}
export async function saveUserToDB(userName: string, email: string, hashedPassword: string) {
    await db.insert(schema.users).values({
        userName: userName,
        email: email,
        hashedPassword: await hashPassword(hashedPassword)
    })
}

export async function getUserByEmail(email: string) {
    return await db.query.users.findFirst({
        where: eq(schema.users.email, email),
    });
}

export async function deleteUserURL(userId: number, shortCode: string) {
    if (!userId) {
        throw new Error("User not found");
    }

    const userWithUrls = await db
        .select()
        .from(schema.urls)
        .innerJoin(schema.users, eq(schema.users.id, schema.urls.userId));

    if (userWithUrls.length < 0) {
        throw new Error("URL not found");
    }

    await redis.del(`url:${shortCode}`);

    await db.delete(schema.urls).where(eq(schema.urls.userId, userId)).execute();
}