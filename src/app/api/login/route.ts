   import { NextResponse } from 'next/server';
   import { validatePassword } from '@/utils/helpers';
   import { z } from 'zod';

   const loginSchema = z.object({
    email: z.string().email("Invalid email format"),
    password: z.string().min(6, "Password must be at least 6 characters")
   })

   export async function POST(req: Request) {

    try {
      const body = await req.json();
      const validatedData = loginSchema.parse(body);  // Validates the incoming data
      const { email, password } = validatedData;
      const isValid = await validatePassword(email, password);
      if (isValid) {
        return NextResponse.json({ success: true });
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
