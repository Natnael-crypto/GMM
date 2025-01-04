'use client';

import { Button } from '@/components/ui/button';
import React from 'react';
import { useUpdateProfileContext } from '../profile/update-profile-context';
import Loading from '@/components/ui/loading';
import { useCountPotentialMatchesQuery } from '@/lib/matchmaking/api';
import { useAppSelector } from '@/lib/hooks';
import { useMatch } from '@/lib/hooks/match/match-hook';
import { cn } from '@/lib/utils';

export default function MatchMeCard() {
  const { findNewMatch, result } = useMatch();

  const user = useAppSelector((state) => state.auth.user);

  const { data: stats } = useCountPotentialMatchesQuery(undefined, {
    skip: !user,
  });

  const fuzzyMatchThreshold = useAppSelector(
    (state) => state.preference.tolerance
  );

  const matchMeText =
    fuzzyMatchThreshold === 0
      ? 'Match me'
      : `Match me (> ${100 - fuzzyMatchThreshold * 100}%)`;

  return (
    <div className="gmm-mpf-results-pm-container bg-primary text-primary-foreground group">
      <div className="font-bold mb-8 space-y-1">
        <h1 className="text-lg md:text-xl lg:text-3xl text-center min-h-8">
          {stats?.potentialMatchCount}
        </h1>
        <p className="lg:text-lg text-center">Potential Matches</p>
      </div>
      <Button
        className={cn(
          'text-sm font-semibold hover:bg-background hover:text-secondary w-full bg-background text-secondary truncate',
          fuzzyMatchThreshold === 0 ? 'cta' : ''
        )}
        onClick={findNewMatch}
        disabled={result.isLoading}
      >
        {result.isLoading ? <Loading /> : matchMeText}
      </Button>
    </div>
  );
}
