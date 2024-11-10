import AuthGuard from '@/components/auth/guard/auth-guard';
import { Role } from '@/lib/schemas/role';

function UserLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}

export default AuthGuard({ Component: UserLayout, allowedRoles: [Role.User] });
