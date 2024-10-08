import CompatibilityStepper from '@/components/dashboard/components/stepper/compatibility-stepper';
import { buttonVariants } from '@/components/ui/button';
import { Link } from '@/lib/navigation';
import { cn } from '@/lib/utils';

import React from 'react';

const pageNames: Record<string, string> = {
  '/dashboard/compatibility/basic-information': 'Basic Information',
  '/dashboard/compatibility/worldly-lifestyle': 'Worldly Lifestyle',
  '/dashboard/compatibility/islamic-lifestyle': 'Islamic Lifestyle',
  '/dashboard/compatibility/marriage': 'Marriage Discussion',
  '/dashboard/compatibility/family': 'Family Introduction',
};

export default function CompatibilityLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="px-6 sm:px-16 md:px-24 lg:px-52 py-6 space-y-8">
        <div className="relative">
          <h1 className="text-xl text-center">Compatibility</h1>
          <div className="absolute left-0 top-1/2 -translate-y-1/2">
            <Link
              href={`/dashboard`}
              className={cn(
                buttonVariants({
                  variant: 'outline',
                  size: 'sm',
                }),
                'rounded-full text-xs text-secondary h-6'
              )}
            >
              Your Dashboard
            </Link>
          </div>
        </div>

        <CompatibilityStepper />

        <div className="py-3">{children}</div>
      </div>
    </div>
  );
}
