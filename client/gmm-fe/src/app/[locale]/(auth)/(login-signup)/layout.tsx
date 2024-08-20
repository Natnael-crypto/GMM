import AuthHeader from '@/components/(auth)/components/header';
import RegistrationOverview from '@/components/(auth)/components/registration-overview';
import HowItWorks from '@/components/landing-page/components/how-it-works/how-it-works';
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
      <div className="px-8 sm:px-16 md:px-24 lg:px-[15%] flex flex-col-reverse lg:flex-row justify-between gap-5">
        <RegistrationOverview />
        <div className="flex justify-center my-8 w-full">{children}</div>
      </div>
      <HowItWorks />
      <Footer />
    </div>
  );
}
