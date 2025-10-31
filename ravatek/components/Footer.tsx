import { useTranslations } from 'next-intl';

export function Footer() {
  const t = useTranslations('footer');
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-24 border-t border-border/60 bg-background/70">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-10 md:flex-row md:items-center md:justify-between">
        <p className="text-lg font-semibold">Ravatek</p>
        <p className="max-w-xl text-sm text-muted-foreground">{t('tagline')}</p>
        <p className="text-xs text-muted-foreground">© {currentYear} Ravatek. {t('rights')}</p>
      </div>
    </footer>
  );
}
