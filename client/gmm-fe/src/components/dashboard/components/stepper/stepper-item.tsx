import { cn } from '@/lib/utils';
import Link from 'next/link';
import React from 'react';

export default function StepperItem({
  href,
  icon,
  text,
  className,
}: {
  href: string;
  icon: React.ReactNode;
  text: React.ReactNode;
  className?: string;
}) {
  return (
    <div className="relative cursor-pointer">
      <Link
        href={href}
        className={cn(
          'stepper-icon rounded-full overflow-hidden text-foreground bg-[#c7c7c7] flex items-center justify-center my-2',
          className
        )}

      >{icon}</Link>

      <div
        className="absolute bottom-0 text-nowrap
      transform translate-y-6
      -translate-x-1/2 left-1/2
      text-md font-semibold text-secondary hidden sm:block"
      >
        <Link href={href}>{text}</Link>
      </div>
    </div>
  );
}
