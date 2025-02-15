import { auth } from '@/lib/auth/utils';
import { redirect } from '@/lib/navigation';

export default async function DashboardGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (
    session &&
    session.user &&
    session.user.accountStatus === 'Incomplete Registration'
  ) {
    return redirect('/registration');
  }

  return children;
}
