import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { OtherPlatformCardProps } from '@/types';
import Image from 'next/image';
import React from 'react';

export default function OtherPlatformCard({
  imageClassName,
  imageSrc,
  isActive,
  children,
  onClick,
}: OtherPlatformCardProps) {
  return (
    <Card
      className={cn(
        'z-10 flex flex-col justify-between items-center w-[10rem] h-[9rem] cursor-pointer',
        isActive ? 'bg-primary' : 'bg-background'
      )}
      onClick={onClick}
    >
      <div className={cn('w-20 mt-3', imageClassName)}>
        <Image
          className={cn(
            'w-full overflow-hidden',
            isActive ? 'saturate-0 brightness-0 invert-[100%]' : ''
          )}
          src={imageSrc}
          width={200}
          height={104}
          alt=""
        />
      </div>

      <span
        className={cn(
          'text-xs font-bold text-center',
          isActive ? 'text-white' : 'text-secondary'
        )}
      >
        {children}
      </span>
    </Card>
  );
}
