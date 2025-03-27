import { NextResponse } from 'next/server';
import { eq, sql } from 'drizzle-orm';
import { db } from '../../db/index';
import * as schema from '../../db/schema';
import { urls } from '../../db/schema';

export async function GET(req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  // Ensure `params` is available before destructuring
  if (!slug) {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }

  try {
    // query to get the URL record
    const urlRecord = await db.select().from(urls).where(eq(urls.shortCode, slug)).limit(1);

    if (urlRecord.length === 0) {
      return NextResponse.redirect(new URL('/dashboard', req.url));
    }

    const record = urlRecord[0];

    // Update usage count before redirecting
    await db.update(urls)
      .set({ usageCount: sql`${urls.usageCount} + 1` })
      .where(eq(urls.id, record.id));

    const result = await db
      .select()
      .from(schema.urls)
      .where(eq(schema.urls.shortCode, slug))
      .limit(1);

    if (result.length === 0) {
      return NextResponse.redirect(new URL('/dashboard', req.url));
    }

    const longUrl = result[0].regularUrl;

    return NextResponse.redirect(longUrl, 302);

    } catch (error) {
      console.error("Database query error:", error);
      return NextResponse.redirect(new URL('/dashboard', req.url));
  }
}