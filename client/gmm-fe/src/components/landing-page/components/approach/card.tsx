import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { OurApproachCardProps } from '@/types';
import Image from 'next/image';
import React from 'react';

export default function OurApproachCard({
  className,
  imageClassName,
  imageSrc,
  isActive,
  children,
  onClick,
}: OurApproachCardProps) {
  return (
    <Card
      className={cn(
        'z-10 flex flex-col justify-between items-center w-40 h-40 lg:w-[13rem] lg:h-[12rem] cursor-pointer',
        isActive ? 'bg-primary' : 'bg-background',
        className
      )}
      onClick={onClick}
    >
      <div className={cn('w-36 lg:mt-5', imageClassName)}>
        <Image
          className="w-full overflow-hidden"
          src={isActive ? imageSrc.replace('.svg', '-inverted.svg') : imageSrc}
          width={200}
          height={104}
          alt=""
        />
      </div>

      <span
        className={cn(
          'text-sm font-bold mt-5 text-center',
          isActive ? 'text-white' : 'text-secondary'
        )}
      >
        {children}
      </span>
    </Card>
  );
}
