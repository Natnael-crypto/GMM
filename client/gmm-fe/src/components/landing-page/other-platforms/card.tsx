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
        'z-10 flex flex-col justify-between items-center  cursor-pointer  transition-colors duration-300 hover:bg-primary group',
        isActive ? 'bg-primary' : 'bg-background'
      )}
      onClick={onClick}
    >
      <div className={cn('w-20 mt-3 overflow-hidden', imageClassName)}>
        <Image
          className={cn(
            'w-full overflow-hidden transition-colors duration-300 group-hover:saturate-0 group-hover:brightness-0 group-hover:invert-[100%]',
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
          'text-xs font-bold text-center transition-colors duration-300 group-hover:text-primary-foreground',
          isActive ? 'text-primary-foreground' : 'text-secondary'
        )}
      >
        {children}
      </span>
    </Card>
  );
}
