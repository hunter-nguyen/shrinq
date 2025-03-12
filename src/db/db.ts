import { db } from "./index"
import * as schema from "./schema"

export async function saveToDatabase(shortCode: string, longUrl: string, name: string) {
    await db.insert(schema.urls).values({
        name: name,
        shortCode: shortCode,
        regularUrl: longUrl
    })
}

export async function getFromDatabase() {

}