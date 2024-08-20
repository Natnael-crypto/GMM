import AuthGuard from '@/components/providers/auth-guard';
import Footer from '@/components/ui/footer';
import Header from '@/components/ui/header';
import React from 'react';

function ContentLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}

export default AuthGuard({ Component: ContentLayout });
