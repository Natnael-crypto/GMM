import { OurApproachSlideContentProps } from '@/types';
import React, { Children } from 'react';

export default function OurApproachSlideContent({
  title,
  children,
}: OurApproachSlideContentProps) {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl text-primary font-bold">{title}</h1>

      {Children.map(children, (child, index) => (
        <p key={index} className="text-muted-foreground mb-1 text-lg font-medium">
          {child}
        </p>
      ))}
    </div>
  );
}
