import { MetadataRoute } from 'next';
import { prisma } from '@/lib/db';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://ravatek.example.com';
  const staticRoutes = ['en', 'fa'].flatMap((locale) =>
    ['', '/blog'].map((path) => ({
      url: `${baseUrl}/${locale}${path}`,
      changefreq: 'daily' as const,
      priority: 0.8
    }))
  );

  let posts: { slug: string; language: string; updatedAt: Date }[] = [];
  try {
    posts = await prisma.post.findMany({
      select: { slug: true, language: true, updatedAt: true },
      orderBy: { updatedAt: 'desc' }
    });
  } catch (error) {
    console.error('Unable to generate sitemap posts', error);
  }

  const postRoutes = posts.map((post) => ({
    url: `${baseUrl}/${post.language}/blog/${post.slug}`,
    lastModified: post.updatedAt,
    changefreq: 'daily' as const,
    priority: 0.6
  }));

  return [...staticRoutes, ...postRoutes];
}
