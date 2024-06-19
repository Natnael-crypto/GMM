import LanguageSelector from '@/components/landing-page/components/language-selector';
import { LocaleProps } from '@/types';
import { useTranslations } from 'next-intl';

export default function Home({ params: { locale } }: LocaleProps) {
  const t = useTranslations();

  return (
    <main className="">
      <div className="flex justify-end px-24 bg-tertiary">
        <LanguageSelector />
      </div>
    </main>
  );
}
