import AuthGuard from '@/components/providers/auth-guard';
import React from 'react'

function CheckoutLayout({ children }: Readonly<{
    children: React.ReactNode;
}>) {
    return children
}

export default AuthGuard({ Component: CheckoutLayout, allowedRoles: ['User'] });