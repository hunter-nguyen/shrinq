"use server";

import { saveUserToDB } from "@/db/db";

export async function createUser(formData: FormData) {
    const username = formData.get('user_name') as string;
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    // TODO: Check for collisions

    await saveUserToDB(username, email, password);
    return { success: true };
}