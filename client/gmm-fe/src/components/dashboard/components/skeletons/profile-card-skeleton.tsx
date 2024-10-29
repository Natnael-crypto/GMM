import { Skeleton } from '@/components/ui/skeleton';
import React from 'react';

export default function ProfileCardSkeleton() {
  return (
    <div className="flex gap-4">
      <Skeleton className="bg-[#e3e3e3] rounded-full w-16 h-16 aspect-square overflow-hidden"></Skeleton>

      <div className="flex flex-col gap-1 justify-center">
        <h1 className="flex gap-2 font-bold text-xl text-muted-foreground">
          <Skeleton className="rounded-sm bg-[#eee] w-24 h-6" />{' '}
          <Skeleton className="rounded-sm bg-[#eee] w-24 h-6" />
        </h1>
      </div>
    </div>
  );
}
