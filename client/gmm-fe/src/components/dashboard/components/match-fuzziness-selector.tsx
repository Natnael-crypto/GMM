'use client';

import { Button } from '@/components/ui/button';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { setMatchTolerance } from '@/lib/matchmaking/slice';
import React from 'react';
import { cn } from '@/lib/utils';

export default function MatchToleranceSelector() {
  const dispatch = useAppDispatch();
  const matchTolerance = useAppSelector((state) => state.preference.tolerance);

  const handleChange = (value: number) => {
    if (matchTolerance !== value) {
      dispatch(setMatchTolerance(value));
    } else {
      dispatch(setMatchTolerance(0));
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <Button
        className={cn(
          'text-xs w-full h-8 hover:bg-primary cta',
          matchTolerance === 0.1 ? 'bg-primary' : ''
        )}
        variant="secondary"
        onClick={() => handleChange(0.1)}
      >
        &gt; 90% Match
      </Button>
      <Button
        className={cn(
          'text-xs w-full h-8 hover:bg-primary cta',
          matchTolerance === 0.2 ? 'bg-primary' : ''
        )}
        variant="secondary"
        onClick={() => handleChange(0.2)}
      >
        &gt; 80% Match
      </Button>
    </div>
  );
}
