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
  <div className=" flex flex-col items-center gap-4">
    <div className="flex items-center flex-col gap-2">
      <Button
        className={cn(
          'text-xs w-[40%] h-8 hover:bg-primary cta',
          matchTolerance === 0.1 ? 'bg-primary' : ''
        )}
        variant="secondary"
        onClick={() => handleChange(0.1)}
      >
        &gt; 90% Match
      </Button>
      <p className="text-center font-semibold text-[14px]">Expands Age, Height, Weight, Marital Status & Born/Reverted fields.</p>
    </div>

    <div className="flex items-center flex-col gap-2">
      <Button
        className={cn(
          'text-xs w-[40%] h-8 hover:bg-primary cta items-center',
          matchTolerance === 0.2 ? 'bg-primary' : ''
        )}
        variant="secondary"
        onClick={() => handleChange(0.2)}
      >
        &gt; 80% Match
      </Button>
      <p className="text-center font-semibold text-[14px]">Further expands Country of Origin, City Country, Children, Employment, Education, Languages, Nationality/Passport.</p>
    </div>
    {/* Add more buttons and text as needed */}
  </div>
);
}
