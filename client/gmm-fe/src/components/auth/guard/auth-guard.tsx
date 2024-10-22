import { Session } from '@/lib/auth/types';
import { auth, getPathname } from '@/lib/auth/utils';
import { redirect } from '@/lib/navigation';
import React from 'react';

export interface AuthGuardProps {
  Component: React.JSXElementConstructor<any>;
  allowedRoles?: string[];
  canActivate?: (session: Session) => boolean;
}

export default function AuthGuard({
  Component,
  allowedRoles,
  canActivate = () => true,
}: AuthGuardProps) {
  return async function GuardComponent(props: any) {
    const session = await auth();
    const pathname = getPathname();

    const userRole = session?.user.roleId;

    const isAuthenticated = !!session;

    let isRoleAllowed = true;
    if (allowedRoles) {
      isRoleAllowed = !!(userRole && allowedRoles.includes(userRole));
    }

    const isAuthorized =
      isAuthenticated && isRoleAllowed && canActivate(session);

    if (isAuthorized) {
      return (
        <>
          <Component {...props} />
        </>
      );
    }

    if (pathname) {
      return redirect(`/login?redirect=${encodeURIComponent(pathname)}`);
    } else {
      return redirect(`/login`);
    }
  };
}
