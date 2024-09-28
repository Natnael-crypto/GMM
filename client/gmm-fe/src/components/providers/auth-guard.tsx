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
      !session || (allowedRoles &&
        (session.user as any).roleId &&
        !allowedRoles.includes((session.user as any).roleId)
      )
    ) {
      if ((session?.user as any)?.roleId === 'Admin') {
        return redirect('/admin');
      }

      if ((session?.user as any)?.roleId === 'Guardian') {
        return redirect('/guardian');
      }

      redirect('/login');
    }

    return (
      <>
        <Component {...props} />
      </>
    );
  };
}
