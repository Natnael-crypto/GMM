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
      <div className="py-6 px-6 sm:px-16 md:px-24 lg:px-52 flex flex-col-reverse lg:flex-row justify-between gap-5">
        <RegistrationOverview />
        <div className="flex justify-center my-8 w-full">{children}</div>
      </div>
      <HowItWorks />
      <Footer />
    </div>
  );
}
