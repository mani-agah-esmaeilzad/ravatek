import cron from 'node-cron';
import { generateBlog } from '@/lib/ai';
import { prisma } from '@/lib/db';
import { slugify } from '@/lib/slugify';

async function persistGeneratedPost(language: 'fa' | 'en') {
  const text = await generateBlog(language);
  const lines = text.split('\n').filter(Boolean);
  if (lines.length < 3) return;

  const [titleLine, summaryLine, ...contentLines] = lines;
  const title = titleLine.replace(/^#+\s*/, '').trim();
  const summary = summaryLine.trim();
  const slug = slugify(title, language);
  const content = contentLines.join('\n').trim();

  await prisma.post.upsert({
    where: { slug_language: { slug, language } },
    create: {
      title,
      summary,
      slug,
      content,
      language
    },
    update: {
      title,
      summary,
      content
    }
  });
}

const globalCron = globalThis as typeof globalThis & { __ravatekCronRegistered?: boolean };

export function registerCronJobs() {
  if (globalCron.__ravatekCronRegistered) return;
  if (process.env.NODE_ENV === 'test') return;
  const schedule = process.env.CRON_SCHEDULE ?? '0 9,18 * * *';

  cron.schedule(schedule, async () => {
    for (const lang of ['fa', 'en'] as const) {
      try {
        await persistGeneratedPost(lang);
      } catch (error) {
        console.error('Failed to generate post', lang, error);
      }
    }
  });

  globalCron.__ravatekCronRegistered = true;
}

if (process.env.DISABLE_AUTOMATION !== 'true') {
  registerCronJobs();
}
