import OurApproach from '@/components/landing-page/components/approach/approach';
import HeroCarousel from '@/components/landing-page/components/carousel/hero-carousel';
import CreateAccount from '@/components/landing-page/components/create-account/create-account';
import HowItWorks from '@/components/landing-page/components/how-it-works/how-it-works';
import OtherPlatforms from '@/components/landing-page/components/other-platforms/other-platforms';
import GuardianServices from '@/components/landing-page/components/services/guardian-services';

import Footer from '@/components/ui/footer';
import LanguageSelector from '@/components/ui/language-selector';
import Profile from '@/components/ui/profile';
import { auth } from '@/lib/auth/utils';

import { LocaleProps } from '@/types';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default async function Home() {
  const session = await auth();

  return (
    <main className="flex flex-col">
      <div className="px-6 sm:px-16 md:px-24 lg:px-52 bg-tertiary text-tertiary-foreground flex justify-end items-center">
        <LanguageSelector
          text="Language"
          className="text-tertiary-foreground hover:text-tertiary-foreground"
        />
        {session ? (
          <div className="flex gap-2 items-center">
            <FontAwesomeIcon icon={faBell} />
            <div className="px-2">
              <Profile />
            </div>
          </div>
        ) : null}
      </div>
      <HeroCarousel />
      <OurApproach />
      {!session && <CreateAccount />}
      <OtherPlatforms />
      <HowItWorks />
      {!session && <CreateAccount variant="filled" margin="wide" />}
      <GuardianServices />
      <Footer />
    </main>
  );
}
