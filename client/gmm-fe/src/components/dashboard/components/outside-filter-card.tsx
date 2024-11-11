'use client';

import { useAppSelector } from '@/lib/hooks';
import { useCountPotentialMatchesQuery } from '@/lib/matchmaking/api';

export default function OutsideFilterCard() {
  const user = useAppSelector((state) => state.auth.user);
  const { data: stats } = useCountPotentialMatchesQuery(undefined, {
    skip: !user,
  });

  return (
    <div className="flex flex-col justify-center items-center rounded-se-3xl rounded-es-3xl overflow-hidden bg-card p-5 cursor-pointer border-2 border-muted-foreground text-muted-foreground min-h-32">
      <h1 className="text-2xl font-bold text-center">{stats?.poolSize}</h1>
      <p className="text-center font-bold">Outside Your Filters</p>
    </div>
  );
}
