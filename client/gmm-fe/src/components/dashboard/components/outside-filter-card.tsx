'use client';

import { useAppSelector } from '@/lib/hooks';
import { useCountPotentialMatchesQuery } from '@/lib/matchmaking/api';

export default function OutsideFilterCard() {
  const user = useAppSelector((state) => state.auth.user);
  const { data: stats } = useCountPotentialMatchesQuery(undefined, {
    skip: !user,
  });

  return (
    <div className="gmm-mpf-results-oyf-container bg-card border-2 border-muted-foreground text-muted-foreground min-h-32">
      <h1 className="text-2xl font-bold text-center">
        {stats?.outsidePreferenceCount}
      </h1>
      <p className="text-center font-bold">Outside Your Filters</p>
    </div>
  );
}
