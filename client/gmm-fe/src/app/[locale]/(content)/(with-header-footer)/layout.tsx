import Footer from '@/components/ui/footer';
import Header from '@/components/ui/header';
import React from 'react';

export default function ContentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
