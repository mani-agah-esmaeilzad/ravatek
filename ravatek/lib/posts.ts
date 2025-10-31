import { prisma } from '@/lib/db';

export async function getLatestPosts(locale: string, take = 4) {
  return prisma.post.findMany({
    where: { language: locale },
    orderBy: { createdAt: 'desc' },
    take
  });
}

export async function getPostBySlug(slug: string, locale: string) {
  return prisma.post.findUnique({
    where: { slug_language: { slug, language: locale } }
  });
}

export async function getAllPosts(locale: string) {
  return prisma.post.findMany({
    where: { language: locale },
    orderBy: { createdAt: 'desc' }
  });
}
