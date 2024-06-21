import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { OurApproachCardProps } from '@/types';
import Image from 'next/image';
import React from 'react';

export default function OurApproachCard({
  imageClassName,
  imageSrc,
  children,
}: OurApproachCardProps) {
  return (
    <Card className="z-10 flex flex-col justify-between items-center w-[13rem] h-[12rem] bg-background ">
      <div className={cn('w-36 mt-5', imageClassName)}>
        <Image
          className="w-full overflow-hidden"
          src={imageSrc}
          width={200}
          height={104}
          alt=""
        />
      </div>

      <span className="text-sm font-bold mt-5 text-center text-secondary">
        {children}
      </span>
    </Card>
  );
}
