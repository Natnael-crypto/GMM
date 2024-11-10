'use client';

import { Link, usePathname } from '@/lib/navigation';
import React from 'react';
import { cn } from '@/lib/utils';
import CurrentSubscriptionCard from '../billing/components/current-subscription-card';
import { useAppSelector } from '@/lib/hooks';
import Loading from '@/components/ui/loading';

export default function Sidebar() {
  const pathname = usePathname();
  const user = useAppSelector((state) => state.auth.user);

  const isActive = (href: string) => pathname === href;

  if (!user) return <Loading />;

  return (
    <div className="text-secondary text-sm space-y-4">
      <div>
        <h1 className="font-bold">Profile Settings</h1>

        <div className="flex flex-col py-2 gap-1">
          <Link
            href="/dashboard/personal-info"
            className={cn(
              'ps-3 text-secondary hover:text-secondary-foreground bg-transparent hover:bg-secondary transition-colors duration-300 rounded-full',
              isActive('/dashboard/personal-info')
                ? 'bg-secondary text-secondary-foreground'
                : ''
            )}
          >
            Personal Info
          </Link>
          <Link
            href="/dashboard/billing"
            className={cn(
              'ps-3 text-secondary hover:text-secondary-foreground bg-transparent hover:bg-secondary transition-colors duration-300 rounded-full',
              isActive('/dashboard/billing')
                ? 'bg-secondary text-secondary-foreground'
                : ''
            )}
          >
            Billing
          </Link>
        </div>
      </div>

      <div>
        <h1 className="font-bold">Quick Links</h1>

        <div className="flex flex-col py-2 gap-1">
          <Link
            href="/dashboard"
            className="ps-3 text-secondary hover:text-secondary-foreground bg-transparent hover:bg-secondary transition-colors duration-300 rounded-full"
          >
            Dashboard
          </Link>
          <Link
            href={`/dashboard/profile/${user.id}/basic-information`}
            className="ps-3 text-secondary hover:text-secondary-foreground bg-transparent hover:bg-secondary transition-colors duration-300 rounded-full"
          >
            Profile
          </Link>
          <Link
            href=""
            className="ps-3 text-secondary hover:text-secondary-foreground bg-transparent hover:bg-secondary transition-colors duration-300 rounded-full"
          >
            Legal
          </Link>
          <Link
            href=""
            className="ps-3 text-secondary hover:text-secondary-foreground bg-transparent hover:bg-secondary transition-colors duration-300 rounded-full"
          >
            FAQ
          </Link>
          <Link
            href="/support"
            className="ps-3 text-secondary hover:text-secondary-foreground bg-transparent hover:bg-secondary transition-colors duration-300 rounded-full"
          >
            Help
          </Link>
        </div>
      </div>

      <CurrentSubscriptionCard />
    </div>
  );
}
