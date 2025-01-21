import Loading from '@/components/ui/loading';
import { useAppSelector } from '@/lib/hooks';
import { useGetAvailableMatchesLeftQuery } from '@/lib/matchmaking/api';
import { Link } from '@/lib/navigation';
import React from 'react';

export default function CurrentSubscriptionCard() {
  const user = useAppSelector((state) => state.auth.user);
  const { data: availableMatches, isLoading } = useGetAvailableMatchesLeftQuery(
    user?.id ?? '',
    { skip: !user }
  );

  return (
    <div className="border border-secondary rounded-lg bg-muted text-secondary p-5 font-semibold space-y-6 pb-8 text-center">
      <div className="space-y-1">
        <h1 className="font-bold text-3xl flex items-center justify-center">
          {availableMatches ?? <Loading />}
        </h1>
        <span>Remaining Matches</span>
      </div>

      <div className="mt-2">
        <Link
          href="/checkout"
          className="cta bg-primary text-primary-foreground hover:by-secondary px-4 py-2 text-xs rounded-full"
        >
          Purchase Now
        </Link>
      </div>
    </div>
  );
}
