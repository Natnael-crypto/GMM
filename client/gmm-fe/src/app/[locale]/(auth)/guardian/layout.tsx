import AuthGuard from '@/components/auth/guard/auth-guard';
import { Role } from '@/lib/schemas/role';

function GuardianLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex flex-col items-center justify-center h-screen">
      {children}
    </main>
  );
}

export default AuthGuard({
  Component: GuardianLayout,
  allowedRoles: [Role.Guardian],
});
