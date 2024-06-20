import HeroCarousel from '@/components/landing-page/components/hero-carousel';

import Footer from '@/components/ui/footer';
import { LocaleProps } from '@/types';

export default function Home({ params: { locale } }: LocaleProps) {
  return (
    <main className="flex flex-col justify-between">
      <div className="h-screen">
        <HeroCarousel />
      </div>
      <Footer />
    </main>
  );
}
