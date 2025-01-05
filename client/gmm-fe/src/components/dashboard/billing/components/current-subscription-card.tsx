import { Button } from '@/components/ui/button';
import React from 'react';

export default function CurrentSubscriptionCard() {
  return (
    <div className="border border-secondary rounded-lg bg-muted text-secondary p-5 font-semibold space-y-4 pb-8 text-center">
      
      <div className="space-y-1">
        <h1 className="font-bold text-3xl">06</h1>
        <span>Remaining Matches</span>
      </div>
      <Button
        className="text-secondary border-secondary bg-primary text-white rounded-lg font-bold text-xs whitespace-normal"
        variant="outline"
      >
        Purchase More Matches
      </Button>
    </div>
  );
}
