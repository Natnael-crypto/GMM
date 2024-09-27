import AuthGuard from '@/components/providers/auth-guard'

function UserLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return children
}

export default AuthGuard({ Component: UserLayout, allowedRoles: ['User'] })