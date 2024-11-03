import AuthGuard from '@/components/auth/guard/auth-guard';
import { Role } from '@/lib/schemas/role';
import AuthHeader from '@/components/auth/auth-header';
import RegistrationOverview from '@/components/auth/registration-overview';
import HowItWorksCard from '@/components/landing-page/how-it-works/card';
import Footer from '@/components/ui/footer';
import { useTranslations } from 'next-intl';

function CheckoutLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const t = useTranslations('Landing.howItWorks');
  return (
    <div>
      <AuthHeader />
      <div className="py-6 px-6 sm:px-16 md:px-24 lg:px-52 flex flex-col-reverse lg:flex-row justify-between gap-5">
        <div className="w-full">
          <RegistrationOverview />

          <div className="w-full border-t my-8 py-8 space-y-8">
            <h2 className="text-2xl font-bold text-secondary text-center">
              {t('title')}
            </h2>

            <div className="mx-auto grid md:grid-cols-2 gap-10 w-fit">
              <HowItWorksCard
                imageSrc="/assets/icon_sign-up-for-an-account.svg"
                number={1}
              >
                {t('step1')}
              </HowItWorksCard>
              <HowItWorksCard
                imageSrc="/assets/icon_complete-profile.svg"
                number={2}
              >
                {t('step2')}
              </HowItWorksCard>
              <HowItWorksCard
                imageSrc="/assets/icon_match-and-follow-guided-match-making-process.svg"
                imageClassName="w-32"
                number={3}
              >
                {t('step3')}
              </HowItWorksCard>
              <HowItWorksCard
                imageSrc="/assets/icon_get-married.svg"
                number={4}
              >
                {t('step4')}
              </HowItWorksCard>
            </div>
          </div>
        </div>
        <div className="flex justify-center mb-8">{children}</div>
      </div>
      <Footer />
    </div>
  );
}

export default AuthGuard({
  Component: CheckoutLayout,
  allowedRoles: [Role.User],
});
