import AuthGuard from "@/components/providers/auth-guard";

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

export default AuthGuard({ Component: GuardianLayout, allowedRoles: ['Guardian'] })