import LanguageSelector from '@/components/landing-page/components/language-selector';
import { LocaleProps } from '@/types';

export default function Home({ params: { locale } }: LocaleProps) {
  return (
    <main className="">
      <div className="flex justify-end px-24 bg-tertiary">
        <LanguageSelector />
      </div>
    </main>
  );
}
