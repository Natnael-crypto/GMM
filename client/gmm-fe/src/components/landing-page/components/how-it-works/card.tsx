import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { HowItWorksCardProps } from '@/types';
import Image from 'next/image';
import React from 'react';

export default function HowItWorksCard({
  imageClassName,
  imageSrc,
  number,
  children,
  onClick,
}: HowItWorksCardProps) {
  return (
    <Card
      className={cn(
        'z-10 flex flex-col justify-between items-center w-[12rem] h-[10rem] bg-background relative'
      )}
      onClick={onClick}
    >
      <div className="absolute w-8 h-8 rounded-full bg-primary top-0 left-0 -translate-x-1/4 -translate-y-1/4 flex items-center justify-center font-bold text-primary-foreground text-2xl">
        {number}
      </div>
      <div className={cn('w-28 mt-3', imageClassName)}>
        <Image
          className="w-full overflow-hidden"
          src={imageSrc}
          width={200}
          height={104}
          alt=""
        />
      </div>

      <span className={cn('text-xs font-bold mt-5 text-center text-secondary')}>
        {children}
      </span>
    </Card>
  );
}
