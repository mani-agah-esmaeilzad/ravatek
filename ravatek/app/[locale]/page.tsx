import { getTranslations } from 'next-intl/server';
import Link from 'next-intl/link';
import { SceneCanvas } from '@/components/SceneCanvas';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Metadata } from 'next';
import { getLatestPosts } from '@/lib/posts';
import { BlogCard } from '@/components/blog-card';

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: 'hero' });
  return {
    title: t('title'),
    description: t('subtitle')
  };
}

export default async function HomePage({ params }: { params: { locale: string } }) {
  const locale = params.locale;
  const tHero = await getTranslations({ locale, namespace: 'hero' });
  const tBlog = await getTranslations({ locale, namespace: 'blog' });
  const tSections = await getTranslations({ locale, namespace: 'sections' });
  const tProjects = await getTranslations({ locale, namespace: 'projects' });
  const posts = await getLatestPosts(locale);
  const projectKeys = ['hrbooteh', 'arabicHr', 'zenlub', 'revanac', 'amlak'] as const;
  const projects = projectKeys.map((key) => ({
    key,
    category: tProjects(`${key}.category`),
    title: tProjects(`${key}.title`),
    description: tProjects(`${key}.description`)
  }));
  const contactLabel = tProjects('cta');
  const projectContactLinks = projectKeys.reduce<Record<(typeof projectKeys)[number], string>>((links, key) => {
    const subject = encodeURIComponent(
      tProjects('emailSubject', { project: tProjects(`${key}.title`) })
    );
    links[key] = `mailto:hello@ravatek.ai?subject=${subject}`;
    return links;
  }, {} as Record<(typeof projectKeys)[number], string>);

  return (
    <div className="relative min-h-screen overflow-hidden" id="top">
      <SceneCanvas />
      <Navbar />
      <main className="mx-auto flex max-w-6xl flex-col gap-24 px-6 pt-28 pb-24">
        <section className="relative flex flex-col gap-8 py-24 text-center md:py-32">
          <div className="mx-auto max-w-3xl">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">{tHero('title')}</h1>
            <p className="mt-6 text-lg text-muted-foreground md:text-xl">{tHero('subtitle')}</p>
          </div>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button size="lg" className="px-8" asChild>
              <Link href={`/${locale}#contact`}>{tHero('primaryCta')}</Link>
            </Button>
            <Button variant="outline" size="lg" className="px-8" asChild>
              <a href="mailto:hello@ravatek.ai">{tHero('secondaryCta')}</a>
            </Button>
          </div>
        </section>

        <section id="products" className="rounded-3xl border border-border/60 bg-background/70 p-10 backdrop-blur">
          <h2 className="text-2xl font-semibold tracking-tight">{tSections('productsTitle')}</h2>
          <p className="mt-3 text-muted-foreground">{tSections('productsDescription')}</p>
        </section>

        <section id="projects" className="rounded-3xl border border-border/60 bg-background/70 p-10 backdrop-blur">
          <div className="flex flex-col gap-3">
            <h2 className="text-2xl font-semibold tracking-tight">{tSections('projectsTitle')}</h2>
            <p className="text-muted-foreground">{tSections('projectsDescription')}</p>
          </div>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {projects.map((project) => (
              <article
                key={project.key}
                className="group relative flex flex-col gap-3 rounded-2xl border border-border/60 bg-background/60 p-6 transition hover:border-border hover:shadow-lg"
              >
                <span className="text-xs font-semibold uppercase tracking-wide text-primary/80">
                  {project.category}
                </span>
                <h3 className="text-xl font-semibold tracking-tight">{project.title}</h3>
                <p className="text-sm text-muted-foreground">{project.description}</p>
                <Button variant="ghost" className="mt-auto w-fit px-0 text-sm" asChild>
                  <a href={projectContactLinks[project.key]}>{contactLabel}</a>
                </Button>
              </article>
            ))}
          </div>
        </section>

        <section id="solutions" className="rounded-3xl border border-border/60 bg-background/70 p-10 backdrop-blur">
          <h2 className="text-2xl font-semibold tracking-tight">{tSections('solutionsTitle')}</h2>
          <p className="mt-3 text-muted-foreground">{tSections('solutionsDescription')}</p>
        </section>

        <section className="space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold tracking-tight">{tBlog('title')}</h2>
            <Button variant="ghost" asChild>
              <Link href={`/${locale}/blog`}>{tBlog('latest')}</Link>
            </Button>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {posts.length === 0 && <p className="text-muted-foreground">{tBlog('empty')}</p>}
            {posts.map((post) => (
              <BlogCard key={post.id} post={post} locale={locale} />
            ))}
          </div>
        </section>

        <section id="about" className="rounded-3xl border border-border/60 bg-background/70 p-10 backdrop-blur">
          <h2 className="text-2xl font-semibold tracking-tight">{tSections('aboutTitle')}</h2>
          <p className="mt-3 text-muted-foreground">{tSections('aboutDescription')}</p>
        </section>

        <section id="contact" className="rounded-3xl border border-border/60 bg-background/70 p-10 backdrop-blur">
          <h2 className="text-2xl font-semibold tracking-tight">{tSections('contactTitle')}</h2>
          <p className="mt-3 text-muted-foreground">{tSections('contactDescription')}</p>
          <div className="mt-6 flex flex-wrap gap-4">
            <Button asChild>
              <Link href={`/${locale}#top`}>{tHero('secondaryCta')}</Link>
            </Button>
            <Button variant="outline" asChild>
              <a href="mailto:hello@ravatek.ai">hello@ravatek.ai</a>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
