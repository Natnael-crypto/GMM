import { cn } from '@/lib/utils';
import React from 'react';

export default function StepperItem({
  icon,
  text,
  className,
}: {
  icon: React.ReactNode;
  text: React.ReactNode;
  className?: string;
}) {
  return (
    <div className="relative cursor-pointer">
      <div
        className={cn(
          'rounded-full overflow-hidden text-foreground bg-[#c7c7c7] w-[2.8rem] h-[2.8rem] flex items-center justify-center',
          className
        )}
      >
        {icon}
      </div>
      <div
        className="absolute bottom-0 text-nowrap
      transform translate-y-6
      -translate-x-1/2 left-1/2
      text-xs font-semibold text-secondary "
      >
        {text}
      </div>
    </div>
  );
}
