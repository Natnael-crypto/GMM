import AuthGuard from '@/components/auth/guard/auth-guard';
import Footer from '@/components/ui/footer';
import Header from '@/components/ui/header';
import { Role } from '@/lib/schemas/role';

function GuardianLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header wide={true} />
      <main className="min-h-[85vh] py-3 px-6 sm:px-16">{children}</main>
      <Footer />
    </>
  );
}

export default AuthGuard({
  Component: GuardianLayout,
  allowedRoles: [Role.Guardian],
});
