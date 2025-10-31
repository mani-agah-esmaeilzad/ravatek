import { notFound } from 'next/navigation';
import { getPostBySlug } from '@/lib/posts';
import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { formatDate } from '@/lib/format-date';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';

interface Props {
  params: { locale: string; slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPostBySlug(params.slug, params.locale);
  if (!post) return {};
  return {
    title: post.title,
    description: post.summary,
    openGraph: {
      title: post.title,
      description: post.summary,
      type: 'article'
    }
  };
}

export default async function BlogDetailPage({ params }: Props) {
  const { locale, slug } = params;
  const post = await getPostBySlug(slug, locale);
  const t = await getTranslations({ locale, namespace: 'blog' });

  if (!post) {
    notFound();
  }

  const safePost = post!;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="mx-auto max-w-3xl px-6 pt-28 pb-24">
        <p className="text-sm text-muted-foreground">{formatDate(safePost.createdAt, locale)}</p>
        <h1 className="mt-4 text-4xl font-bold tracking-tight">{safePost.title}</h1>
        <p className="mt-4 text-lg text-muted-foreground">{safePost.summary}</p>
        <article className="prose prose-slate mt-10 max-w-none dark:prose-invert">
          <ReactMarkdown rehypePlugins={[rehypeHighlight]} remarkPlugins={[remarkGfm]}>{safePost.content}</ReactMarkdown>
        </article>
        <div className="mt-12 text-sm text-muted-foreground">{t('publishedOn')}: {formatDate(safePost.createdAt, locale)}</div>
      </main>
      <Footer />
    </div>
  );
}
