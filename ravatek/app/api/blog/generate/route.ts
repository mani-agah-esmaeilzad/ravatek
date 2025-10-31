import { NextResponse } from 'next/server';
import { generateBlog } from '@/lib/ai';
import { prisma } from '@/lib/db';
import { slugify } from '@/lib/slugify';

export async function POST() {
  const results: Record<string, string> = {};

  for (const lang of ['fa', 'en'] as const) {
    try {
      const text = await generateBlog(lang);
      const [titleLine, summaryLine, ...contentLines] = text.split('\n').filter(Boolean);
      if (!titleLine || !summaryLine) {
        results[lang] = 'insufficient_content';
        continue;
      }

      const title = titleLine.replace(/^#+\s*/, '').trim();
      const summary = summaryLine.trim();
      const slug = slugify(title, lang);
      const content = contentLines.join('\n').trim();

      await prisma.post.upsert({
        where: { slug_language: { slug, language: lang } },
        create: {
          title,
          summary,
          slug,
          content,
          language: lang
        },
        update: {
          title,
          summary,
          content
        }
      });
      results[lang] = 'created';
    } catch (error) {
      console.error('Failed to generate post', lang, error);
      results[lang] = 'error';
    }
  }

  return NextResponse.json({ status: 'ok', results });
}
