import Header from '@/components/dashboard/components/header';
import Footer from '@/components/ui/footer';
import React from 'react';

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  );
}
