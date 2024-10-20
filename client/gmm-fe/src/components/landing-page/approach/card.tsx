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
        'z-20 flex flex-col justify-between items-center w-40 lg:w-full cursor-pointer transition-colors duration-300 hover:bg-primary group',
        isActive ? 'bg-primary' : 'bg-background',
        className
      )}
      onClick={onClick}
    >
      <div className={cn('w-20 lg:mt-5 overflow-hidden', imageClassName)}>
        <Image
          className={cn(
            'w-full overflow-hidden group-hover:hidden object-cover',
            isActive ? 'hidden' : ''
          )}
          src={imageSrc}
          width={200}
          height={104}
          alt=""
        />

        <Image
          className={cn(
            'w-full overflow-hidden group-hover:block',
            isActive ? '' : 'hidden'
          )}
          src={imageSrc.replace('.svg', '-inverted.svg')}
          width={200}
          height={104}
          alt=""
        />
      </div>

      <span
        className={cn(
          'font-bold mt-5 text-center transition-colors duration-300 group-hover:text-white',
          isActive ? 'text-white' : 'text-secondary'
        )}
      >
        {children}
      </span>
    </Card>
  );
}
