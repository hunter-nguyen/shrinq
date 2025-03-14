import { NextResponse } from 'next/server';
import { eq } from 'drizzle-orm';
import { db } from '../../db/index';
import * as schema from '../../db/schema';

export async function GET(req: Request, { params }: { params: Promise<{ slug: string }> }) {

  const { slug } = await params;
  // Ensure `params` is available before destructuring
  if (!slug) {
    return NextResponse.json({ error: "Slug parameter is missing" }, { status: 400 });
  }

  try {
    const result = await db
      .select()
      .from(schema.urls)
      .where(eq(schema.urls.shortCode, slug))
      .limit(1);

    if (result.length === 0) {
      return NextResponse.json({ error: "Shortcode not found" }, { status: 404 });
    }

    const longUrl = result[0].regularUrl;

    return NextResponse.redirect(longUrl, 301); // Permanent redirect
  } catch (error) {
    console.error("Database query error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
