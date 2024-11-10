import AuthGuard from '@/components/auth/guard/auth-guard';
import Footer from '@/components/ui/footer';
import Header from '@/components/ui/header';
import React from 'react';

function TemrsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <Footer />
    </>
  );
}

export default AuthGuard({ Component: TemrsLayout });
