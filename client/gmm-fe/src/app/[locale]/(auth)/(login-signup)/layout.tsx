import AuthHeader from '@/components/auth/auth-header';
import RegistrationOverview from '@/components/auth/registration-overview';
import HowItWorks from '@/components/landing-page/how-it-works/how-it-works';
import Footer from '@/components/ui/footer';
import React from 'react';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <AuthHeader />
      <div className="gmm-reg-body pb-6 px-6 sm:px-16 md:px-[3rem] lg:px-[5rem] 2xl:px-[15rem] 3xl:px-[20rem] flex flex-col-reverse lg:flex-row justify-between gap-5">
        <RegistrationOverview />
        <div className="flex grid mb-auto justify-center">
          {children}
          <div className="text-sm mt-3 text-center">
            <a className="text-sm text-primary font-semibold" href="/en/">Family Member Login</a>
          </div>
        </div>
      </div>
      <HowItWorks />
      <Footer />
    </div>
  );
}
