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
  const buttonClass = "inline-flex items-center justify-center whitespace-nowrap rounded-full font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-secondary text-secondary-foreground px-4 py-2 text-sm h-8 hover:bg-primary cta px-6";

return (
  <div className="flex flex-col items-center gap-4 justify-center">
    <div className="flex flex-col items-center gap-2 justify-center text-center">
      <Button
        className={cn(
          buttonClass,
          matchTolerance === 0.1 ? 'bg-primary' : ''
        )}
        variant="secondary"
        onClick={() => handleChange(0.1)}
      >
        &gt; 90% Match
      </Button>
      <p className="text-center text-[11px] mt-2 font-semibold">
        Expands Age, Height, Weight, Marital Status & Born/Reverted fields.
      </p>
    </div>

    <div className="flex flex-col items-center gap-2 justify-center text-center mt-2">
      <Button
        className={cn(
          buttonClass,
          matchTolerance === 0.2 ? 'bg-primary' : ''
        )}
        variant="secondary"
        onClick={() => handleChange(0.2)}
      >
        &gt; 80% Match
      </Button>
      <p className="text-center text-[11px] mt-2 font-semibold">
        Further Expands Country of Origin, City Country, Children, Employment, Education, Languages, Nationality/Passport.
      </p>
    </div>
  </div>
);

}
