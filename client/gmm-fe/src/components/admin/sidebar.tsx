'use client'

import { Link, usePathname } from '@/lib/navigation';
import { cn } from '@/lib/utils';
import { faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'

export function SidebarSection({ title, children }: Readonly<{ title: string, children: React.ReactNode }>) {
    const [isOpen, setIsOpen] = React.useState(true);

    return (
        <div className='space-y-2 w-full overflow-hidden'>
            <h2 className="text-sm font-semibold cursor-pointer w-full flex justify-between items-center" onClick={() => setIsOpen(prev => !prev)}>
                <span>{title}</span>
                <FontAwesomeIcon icon={faChevronUp} className={cn('transition-all duration-300', isOpen ? '' : 'rotate-180')} />
            </h2>
            <ul className={cn("space-y-1 overflow-hidden transition-all duration-300 ease-in-out", isOpen ? 'h-full opacity-100' : 'h-0 opacity-0')}>
                {children}
            </ul>
        </div>
    )
}

export function SidebarLink({ href, children }: { href: string, children: React.ReactNode }) {
    const pathname = usePathname();

    const isActive = (href: string) => pathname === href;

    return <li className="text-xs w-full truncate">
        <Link
            href={href}
            className={cn(
                'block px-3 py-1 w-full text-secondary hover:text-secondary-foreground bg-transparent hover:bg-secondary transition-colors duration-300 rounded-full',
                isActive(href)
                    ? 'bg-secondary text-secondary-foreground'
                    : ''
            )}
        >
            {children}
        </Link>
    </li>
}


export default function AdminSidebar() {
    return (
        <div className='h-screen w-full p-5 border-r border-dashed bg-muted space-y-5'>
            <h1 className="font-semibold truncate overflow-hidden">Admin Dashboard</h1>

            <div className='space-y-2'>
                <SidebarSection title='Users'>
                    <SidebarLink href="/admin/users">All Users</SidebarLink>
                    <SidebarLink href="/admin/match-pool">Match Pool</SidebarLink>
                    <SidebarLink href="/admin/matches">Matches</SidebarLink>
                </SidebarSection>

                <SidebarSection title='Subscription'>
                    <SidebarLink href="">Payment History</SidebarLink>
                    <SidebarLink href="">Subscription Plans</SidebarLink>
                </SidebarSection>
            </div>

        </div >
    )
}
