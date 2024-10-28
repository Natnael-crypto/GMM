import AuthGuard from '@/components/auth/guard/auth-guard';
import Header from '@/components/ui/header';
import React from 'react';

function ContentLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}

export default AuthGuard({ Component: ContentLayout });
