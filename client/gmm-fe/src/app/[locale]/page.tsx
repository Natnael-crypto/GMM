import OurApproach from '@/components/landing-page/components/approach/approach';
import HeroCarousel from '@/components/landing-page/components/carousel/hero-carousel';
import CreateAccount from '@/components/landing-page/components/create-account/create-account';
import OtherPlatforms from '@/components/landing-page/components/other-platforms/other-platforms';

import Footer from '@/components/ui/footer';
import LanguageSelector from '@/components/ui/language-selector';
import { LocaleProps } from '@/types';

export default function Home({ params: { locale } }: LocaleProps) {
  return (
    <main className="flex flex-col">
      <div className="px-6 sm:px-16 md:px-24 lg:px-52 bg-tertiary text-tertiary-foreground flex justify-end">
        <LanguageSelector
          text="Language"
          className="text-tertiary-foreground hover:text-tertiary-foreground"
        />
      </div>
      <HeroCarousel />
      <OurApproach />
      <CreateAccount />
      <OtherPlatforms />
      <Footer />
    </main>
  );
}
