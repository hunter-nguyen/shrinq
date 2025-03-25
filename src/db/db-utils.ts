import { db } from "./index"
import { hashPassword } from "@/utils/helpers"
import * as schema from "./schema"
import { eq } from "drizzle-orm"

export async function saveUrlToDB(shortCode: string, longUrl: string, name: string, userId: number) {
    await db.insert(schema.urls).values({
        name: name,
        shortCode: shortCode,
        regularUrl: longUrl,
        userId: userId
    })
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