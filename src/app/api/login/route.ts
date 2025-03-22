   import { NextResponse } from 'next/server';
   import { validatePassword } from '@/utils/helpers';
   import { z } from 'zod';
   import jwt, { Secret } from 'jsonwebtoken';
   import { getUserByEmail } from '@/db/db-utils';
   import 'dotenv/config'

   const loginSchema = z.object({
    email: z.string().email("Invalid email format"),
    password: z.string().min(6, "Password must be at least 6 characters")
   })

   export async function POST(req: Request) {
    try {
      const body = await req.json();

      const validatedData = loginSchema.parse(body);
      const { email, password } = validatedData;

      const isValid = await validatePassword(email, password);

      if (isValid) {
        const user = await getUserByEmail(email);

        if (!user) {
          return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        // create jwt
        const token = jwt.sign(
          { userId: user.id, email: user.email },
          process.env.JWT_SECRET as Secret,
          { expiresIn: '1h' }
        );

        const response = NextResponse.json({ success: true });

        // set httpOnly cookie
        response.cookies.set('token', token, {
          httpOnly: true,
          path: '/',
          maxAge: 3600,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict',
        });

        return response;

      } else {
        return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
      }
    } catch (error) {

      if (error instanceof z.ZodError) {
        const errorMessages = error.errors.map((e) => e.message).join(', ');
        return NextResponse.json({ error: errorMessages }, { status: 400 });
      } else {
        return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 });
      }
    }
  }