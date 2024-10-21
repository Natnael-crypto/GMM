import { auth } from '@/lib/auth/utils';
import { redirect } from '@/lib/navigation';
import { AccountStatus } from '@/lib/schemas/user';

export default async function DashboardGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (
    session &&
    session.user &&
    session.user.accountStatus === AccountStatus.INCOMPLETE_REGISTRATION
  ) {
    return redirect('/registration');
  }

  return children;
}
