'use client';

import { Button } from '@/components/ui/button';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { setFuzzyMatchThreshold } from '@/lib/matchmaking/slice';
import React from 'react';
import { useUpdateProfileContext } from '../profile/update-profile-context';
import Loading from '@/components/ui/loading';
import { cn } from '@/lib/utils';

export default function MatchFuzzinessSelector() {
  const dispatch = useAppDispatch();
  const fuzzyMatchThreshold = useAppSelector(
    (state) => state.preference.fuzzyMatchThreshold
  );

  const handleChange = (value: number) => {
    if (fuzzyMatchThreshold !== value) {
      dispatch(setFuzzyMatchThreshold(value));
    } else {
      dispatch(setFuzzyMatchThreshold(0));
    }
  };

  return (
    <div className="flex flex-col gap-2 max-w-48">
      <Button
        className={cn(
          'text-xs w-full h-8 hover:bg-primary',
          fuzzyMatchThreshold === 0.1 ? 'bg-primary' : ''
        )}
        variant="secondary"
        onClick={() => handleChange(0.1)}
      >
        &gt; 90% Match
      </Button>
      <Button
        className={cn(
          'text-xs w-full h-8 hover:bg-primary',
          fuzzyMatchThreshold === 0.2 ? 'bg-primary' : ''
        )}
        variant="secondary"
        onClick={() => handleChange(0.2)}
      >
        &gt; 80% Match
      </Button>
    </div>
  );
}
