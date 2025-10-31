import { getAllPosts } from '@/lib/posts';
import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { BlogCard } from '@/components/blog-card';

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: 'blog' });
  return {
    title: `${t('title')} | Ravatek`,
    description: t('latest')
  };
}

export default async function BlogPage({ params }: { params: { locale: string } }) {
  const locale = params.locale;
  const t = await getTranslations({ locale, namespace: 'blog' });
  const posts = await getAllPosts(locale);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="mx-auto max-w-6xl px-6 pt-28 pb-24">
        <h1 className="text-4xl font-bold tracking-tight">{t('latest')}</h1>
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {posts.length === 0 && <p className="text-muted-foreground">{t('empty')}</p>}
          {posts.map((post) => (
            <BlogCard key={post.id} post={post} locale={locale} />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
