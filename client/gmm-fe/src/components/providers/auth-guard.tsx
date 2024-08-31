import { auth } from '@/lib/auth/utils';
import { redirect } from '@/lib/navigation';

export interface AuthGuardProps {
  Component: React.JSXElementConstructor<any>;
  allowedRoles?: string[];
}

export default function AuthGuard({ Component, allowedRoles }: AuthGuardProps) {
  return async function IsAuth(props: any) {
    const session = await auth();

    if (
      !session
      /*
      ||
      (allowedRoles &&
        session.user.role &&
        !allowedRoles.includes(session.user.role)
      )
      */
    ) {
      redirect('/login');
    }

    return (
      <>
        <Component {...props} />
      </>
    );
  };
}
