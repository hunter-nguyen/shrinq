import bcrypt from 'bcrypt'

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