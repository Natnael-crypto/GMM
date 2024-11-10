import AuthGuard from '@/components/auth/guard/auth-guard';
import React from 'react';

function ProtectedContent({ children }: { children: React.ReactNode }) {
  return children;
}

export default AuthGuard({ Component: ProtectedContent });
