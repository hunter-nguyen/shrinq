import { db } from "./index"
import { hashPassword } from "@/utils/helpers"
import * as schema from "./schema"

export async function saveUrlToDB(shortCode: string, longUrl: string, name: string) {
    await db.insert(schema.urls).values({
        name: name,
        shortCode: shortCode,
        regularUrl: longUrl
    })
}
export async function saveUserToDB(userName: string, email: string, hashedPassword: string) {
    await db.insert(schema.users).values({
        userName: userName,
        email: email,
        hashedPassword: await hashPassword(hashedPassword)
    })
}