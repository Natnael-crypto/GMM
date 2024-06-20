import Footer from '@/components/ui/footer';
import Header from '@/components/ui/header';
import { LocaleProps } from '@/types';
import { useTranslations } from 'next-intl';

export default function Home({ params: { locale } }: LocaleProps) {
  const t = useTranslations();

  return (
    <main className="flex flex-col justify-between">
      <Header />
      <div className="h-screen "></div>
      <Footer />
    </main>
  );
}
