'use client';

import DashboardLeftCards from '@/components/dashboard/components/dashboard-left-cards';
import MatchToleranceSelector from '@/components/dashboard/components/match-fuzziness-selector';
import MatchMeCard from '@/components/dashboard/components/match-me-card';
import MatchPreferenceFilter from '@/components/dashboard/components/match-preference-filter';
import OutsideFilterCard from '@/components/dashboard/components/outside-filter-card';
import ProfileCompletionCard from '@/components/dashboard/components/profile-completion-card';
import MatchFilterSkeleton from '@/components/dashboard/components/skeletons/match-filter-skeleton';
import { UpdateProfileProvider } from '@/components/dashboard/profile/update-profile-context';
import Footer from '@/components/ui/footer';
import { Skeleton } from '@/components/ui/skeleton';
import { useAppSelector } from '@/lib/hooks';
import { AccountStatus } from '@/lib/schemas/user';
import { cn } from '@/lib/utils';
import React from 'react';

export default function Dashboard() {
  const user = useAppSelector((state) => state.auth.user);
  const isAccountApproved = user?.accountStatus === AccountStatus.APPROVED;

  return (
    <UpdateProfileProvider autoSave={false}>
      <>
        <div className="py-6 space-y-8">
          <h1 className="text-xl text-center font-medium">Your Dashboard</h1>

          <div className="gmm-dashboard grid gap-4 px-3">
            <div>
              {user && <DashboardLeftCards user={user} />}
              {!user && (
                <Skeleton className="bg-[#e8f3db] rounded-se-3xl rounded-es-3xl w-full h-full" />
              )}
            </div>
            <div>
              <ProfileCompletionCard />
            </div>
          </div>

          <div
            className={cn(
              'space-y-3 relative gmm-dashboard px-3',
              user?.isMatched ? 'opacity-50' : ''
            )}
          >
            {user?.isMatched && (
              <div className="w-full h-full absolute top-0 left-0 z-[1000]"></div>
            )}

            {!user && <MatchFilterSkeleton />}

            {isAccountApproved && (
              <>
                <h1 className="text-xl font-bold text-secondary border-b border-secondary col-span-12">
                  Match Filters
                </h1>
                <div className="bg-muted text-muted-foreground flex flex-col items-center justify-center p-4 text-md font-medium rounded-se-3xl rounded-es-3xl">
                  <p>Find your potential spouse using Guardian Muslim Marriage match filters feature. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                </div>
                <div className="gmm-mpf-container flex flex-col flex-col-reverse md:grid md:grid-cols-12 gap-4 py-4">
                  <MatchPreferenceFilter />
                  <div className="md:col-span-3 flex gap-3 sm:flex-col md:gap-y-5 items-center">
                    <MatchMeCard />
                    <MatchToleranceSelector />
                    <OutsideFilterCard />
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
        <Footer />
      </>
    </UpdateProfileProvider>
  );
}
