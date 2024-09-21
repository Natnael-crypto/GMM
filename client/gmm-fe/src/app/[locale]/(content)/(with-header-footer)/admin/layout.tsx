import AdminSidebar from '@/components/admin/sidebar'
import AuthGuard from '@/components/providers/auth-guard'
import React from 'react'

function AdminLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <div className='grid grid-cols-5'>
            <div className='col-span-1'><AdminSidebar /></div>
            <div className='col-span-4'>{children}</div>
        </div>
    )
}


export default AuthGuard({ Component: AdminLayout, allowedRoles: ['Admin'] })