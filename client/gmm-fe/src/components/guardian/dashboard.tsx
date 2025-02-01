'use client';
import { useAppSelector } from '@/lib/hooks';
import React from 'react';
import { Button, buttonVariants } from '../ui/button';
import { useGetCurrentSubscriptionQuery } from '@/lib/checkout/api';
import Loading from '../ui/loading';
import { Link } from '@/lib/navigation';
import { cn } from '@/lib/utils';

export default function GuardianDashboard() {
  const user = useAppSelector((state) => state.auth.user);

  const dependent = user?.dependents?.[0];
  const { data: subscription, isLoading } = useGetCurrentSubscriptionQuery(
    dependent?.id || '',
    {
      skip: !dependent,
    }
  );

  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-xl">Guardian Family Dashboard</h1>

      <div className="flex justify-between gap-4">
        {/* User Information */}
        <div className="shadow-lg bg-white rounded-lg p-4 space-y-4 w-full">
          <h2 className="font-bold text-xl">Guardian User Info</h2>

          <div className="space-y-3">
            <div className="space-y-1">
              <p className="font-bold">Full Name</p>
              <p className="text-sm">
                {dependent?.firstName} {dependent?.lastName}
              </p>
            </div>

            <div className="space-y-1">
              <p className="font-bold">Email</p>
              <p className="text-sm">{dependent?.email}</p>
            </div>

            <div className="space-y-1">
              <p className="font-bold">Matched Status</p>
              <p className="text-sm">Matched</p>
            </div>
          </div>
        </div>

        {/* Match Balance */}
        <div className="shadow-lg bg-white rounded-lg p-4 space-y-6 w-full pb-8">
          <h2 className="font-bold text-xl">Guardian User Match Balance</h2>

          <div className="flex flex-col gap-3 items-center justify-center w-full">
            <h1 className="text-3xl bg-primary text-primary-foreground rounded-full w-12 h-12 flex items-center justify-center text-center font-extrabold">
              {isLoading ? <Loading /> : subscription?.remainingMatches}
            </h1>

            <p className="font-bold">Available Matches Left</p>
          </div>

          <div className="flex flex-col gap-3 items-center justify-center w-full">
            <p className="font-bold px-10 text-center text-sm">
              You can purchase more by clicking the link below
            </p>

            <Button className="bg-primary text-primary-foreground h-7 w-fit text-sm">
              Top Up Balance
            </Button>
          </div>
        </div>

        {/* Your Information */}
        <div className="shadow-lg bg-white rounded-lg p-4 space-y-4 w-full">
          <h2 className="font-bold text-xl">Your Information</h2>

          <div className="space-y-3">
            <div className="space-y-1">
              <p className="font-bold">Full Name</p>
              <p className="text-sm">
                {user?.firstName} {user?.lastName}
              </p>
            </div>

            <div className="space-y-1">
              <p className="font-bold">Email</p>
              <p className="text-sm">{user?.email}</p>
            </div>

            <div className="space-y-1">
              <p className="font-bold">Relationship to the User</p>
              <p className="text-sm">Father</p>
            </div>

            <div className="flex items-center justify-center">
              {dependent && (
                <Link
                  href={`/guardian/profile/${dependent?.id}/basic-information`}
                  className={cn(
                    buttonVariants({
                      variant: 'default',
                    }),
                    'bg-primary text-primary-foreground h-7 w-fit text-sm'
                  )}
                >
                  View Full Information
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
