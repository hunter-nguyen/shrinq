"use server";

import { saveUserToDB } from "@/db/db-utils";
import * as schema from "@/db/schema"
import { db } from "@/db";
import { eq } from 'drizzle-orm';

export async function createUser(formData: FormData) {
    const username = formData.get('user_name') as string;
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    const existingUserByUsername = await db.query.users.findFirst({
        where: eq(schema.users.userName, username),
    });

    const existingUserByEmail = await db.query.users.findFirst({
        where: eq(schema.users.email, email),
    });

    if (existingUserByUsername) {
        return { userNameCollision: 'Username already exists.' };
    }

    if (existingUserByEmail) {
        return { emailCollision: 'Email already exists.' };
    }


    await saveUserToDB(username, email, password);
    return { success: true };
}