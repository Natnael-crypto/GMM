import { cn } from '@/lib/utils';
import React from 'react';

const Card = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<'div'>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      `border bg-card p-4 text-card-foreground shadow-md outline-none
      rounded-tr-3xl rounded-bl-3xl`,
      className
    )}
    {...props}
  >
    {props.children}
  </div>
));
Card.displayName = 'Card';

export { Card };
