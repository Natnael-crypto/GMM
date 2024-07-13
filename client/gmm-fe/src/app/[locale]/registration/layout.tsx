import Header from '@/components/dashboard/components/header';

import Footer from '@/components/ui/footer';

import React from 'react';

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <div className="px-6 sm:px-16 md:px-24 lg:px-52 py-6 space-y-8">
        {children}
      </div>
      <Footer />
    </>
  );
}
