import { Skeleton } from '@/components/ui/skeleton';
import React from 'react';

export default function MatchFilterSkeleton() {
  return (
    <div className="mx-auto space-y-10 mb-8">
      <Skeleton className="h-10 w-72" />

      <div className="grid grid-cols-4 gap-4">
        <div className="col-span-3">
          <div className="grid grid-cols-3 gap-x-4 gap-y-6">
            {Array.from({ length: 15 }).map((_, index) => (
              <Skeleton key={index} className="h-8 rounded-md" />
            ))}
          </div>
        </div>

        <div className="col-span-1 flex flex-col gap-4 items-center">
          <Skeleton className="w-full h-24 mx-auto aspect-square rounded-se-3xl rounded-es-3xl" />
          <Skeleton className="w-2/3 mx-auto h-8 rounded-full" />
          <Skeleton className="w-full h-24 mx-auto aspect-square rounded-se-3xl rounded-es-3xl" />
        </div>
      </div>
    </div>
  );
}
