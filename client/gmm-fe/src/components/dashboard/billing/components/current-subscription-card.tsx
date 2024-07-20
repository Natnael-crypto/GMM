import { Button } from '@/components/ui/button';
import React from 'react';

export default function CurrentSubscriptionCard() {
  return (
    <div className="border border-secondary rounded-lg bg-gray-300 text-secondary p-5 font-semibold space-y-4 pb-8">
      <span>Your Plan</span>

      <div className="space-y-1">
        <h1 className="font-bold text-xl">6 Months Subscription</h1>
        <span>Renews on July 2024</span>
      </div>

      <Button
        className="text-secondary border-secondary bg-transparent h-6 font-bold text-xs"
        variant="outline"
      >
        Cancel Subscription
      </Button>
    </div>
  );
}
