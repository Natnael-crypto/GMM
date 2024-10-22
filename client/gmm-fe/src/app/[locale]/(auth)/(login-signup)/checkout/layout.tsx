import AuthGuard from '@/components/auth/guard/auth-guard';
import { Role } from '@/lib/schemas/role';
import React from 'react';

function CheckoutLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}

export default AuthGuard({
  Component: CheckoutLayout,
  allowedRoles: [Role.User],
});
