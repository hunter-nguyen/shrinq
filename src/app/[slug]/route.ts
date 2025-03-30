import { NextResponse } from 'next/server';
import { eq, sql } from 'drizzle-orm';
import { db } from '../../db/index';
import { urls } from '../../db/schema';
import redis from '../../db/redis';
import { revalidatePath } from 'next/cache';

export async function GET(req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  // Ensure `params` is available before destructuring
  if (!slug) {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }

  try {
    // Check Redis for cached URL
    const cachedUrl = await redis.get(`url:${slug}`);

    if (cachedUrl) {
      const urlRecord = await db.select().from(urls).where(eq(urls.shortCode, slug)).limit(1);

      if (urlRecord.length > 0) {
        // Update usage count in the database
        await db.update(urls)
          .set({ usageCount: sql`${urls.usageCount} + 1` })
          .where(eq(urls.shortCode, slug))
          .execute()
          .catch(err => console.error("Error updating usage count:", err));

          revalidatePath("/dashboard");

          return NextResponse.redirect(cachedUrl as string, 302);
        }
    }

    // If not found in cache, check the database
    const urlRecord = await db.select().from(urls).where(eq(urls.shortCode, slug)).limit(1);

    if (urlRecord.length === 0) {
      return NextResponse.redirect(new URL('/dashboard', req.url));
    }

    const record = urlRecord[0];
    const longUrl = record.regularUrl;

    // cache the long URL in Redis
    await redis.set(`url:${slug}`, longUrl);
    revalidatePath("/dashboard");

    return NextResponse.redirect(longUrl, 302);

  } catch (error) {
    console.error("Error processing redirect:", error);
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }
}