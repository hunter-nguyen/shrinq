import bcrypt from 'bcryptjs'
import { db } from '@/db/index';
import * as schema from "@/db/schema"
import { eq } from 'drizzle-orm';
// Helper functions

// logic to shorten URL
export function generateShortCode() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;
    for ( let i = 0; i < 6; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

export async function hashPassword(password: string): Promise<string> {
    const hashedPassword = await bcrypt.hash(password, 10);
    return hashedPassword;
}

export async function validatePassword(email: string, password: string) {

    const user = await db.query.users.findFirst({
        where: eq(schema.users.email, email),
    });

    if (!user || !user.hashedPassword) {
        return false;
    }

    const match = await bcrypt.compare(password, user.hashedPassword!);
    return match;
}