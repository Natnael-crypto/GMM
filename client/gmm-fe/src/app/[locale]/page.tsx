'use client';

import OurApproach from '@/components/landing-page/approach/approach';
import HeroCarousel from '@/components/landing-page/carousel/hero-carousel';
import CreateAccount from '@/components/landing-page/create-account/create-account';
import HowItWorks from '@/components/landing-page/how-it-works/how-it-works';
import OtherPlatforms from '@/components/landing-page/other-platforms/other-platforms';
import GuardianServices from '@/components/landing-page/services/guardian-services';

import Footer from '@/components/ui/footer';
import LanguageSelector from '@/components/ui/language-selector';
import Profile from '@/components/ui/profile';
import { useAppSelector } from '@/lib/hooks';

import { faBell } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Home() {
  const user = useAppSelector((state) => state.auth.user);

  return (
    <main className="flex flex-col">
      <div className="px-6 sm:px-16 md:px-[3rem] lg:px-[5rem] 2xl:px-[15rem] 3xl:px-[20rem] bg-tertiary text-tertiary-foreground flex justify-end items-center">
        <LanguageSelector
          text="Language"
          className="text-tertiary-foreground hover:text-tertiary-foreground"
        />
        {user ? (
          <div className="flex gap-2 items-center">
            <FontAwesomeIcon icon={faBell} />
            <div className="px-2">
              <Profile user={user} />
            </div>
          </div>
        ) : null}
      </div>
      <HeroCarousel />
      <OurApproach />
      <CreateAccount user={user}/>
      <OtherPlatforms />
      <HowItWorks />
      <CreateAccount variant="filled" margin="wide" user={user} />
      <GuardianServices />
      <Footer />
    </main>
  );
}
