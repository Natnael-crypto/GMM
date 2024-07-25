import { Progress } from '@/components/ui/progress';
import { ProfileCompletionProgressProps } from '@/types';
import React from 'react';

export default function ProfileCompletionProgress({
  criteria,
  progress,
}: ProfileCompletionProgressProps) {
  return (
    <div className="space-y-1">
      <div className="flex justify-between">
        <span>{criteria}</span>
        <span>{progress}%</span>
      </div>
      <Progress className="bg-background h-1" value={progress} />
    </div>
  );
}
