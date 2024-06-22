'use client';

import { Button } from '@/components/ui/button';
import { useCarousel } from '@/components/ui/carousel';
import { cn } from '@/lib/utils';
import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

const CarouselPrevious = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof Button>
>(({ className, variant = 'outline', size = 'icon', ...props }, ref) => {
  const { orientation, scrollPrev, canScrollPrev } = useCarousel();

  return (
    <Button
      ref={ref}
      variant={variant}
      size={size}
      className={cn(
        'absolute h-16 w-20 rounded-none rounded-r-lg bg-[#726b6b88] border-none',
        orientation === 'horizontal'
          ? 'left-0 top-1/2 -translate-y-1/2'
          : '-top-12 left-1/2 -translate-x-1/2 rotate-90',
        className
      )}
      disabled={!canScrollPrev}
      onClick={scrollPrev}
      {...props}
    >
      <FontAwesomeIcon
        className="text-3xl text-background ml-4"
        icon={faChevronLeft}
      />
      <span className="sr-only">Previous slide</span>
    </Button>
  );
});
CarouselPrevious.displayName = 'CarouselPrevious';

const CarouselNext = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof Button>
>(({ className, variant = 'outline', size = 'icon', ...props }, ref) => {
  const { orientation, scrollNext, canScrollNext } = useCarousel();

  return (
    <Button
      ref={ref}
      variant={variant}
      size={size}
      className={cn(
        'absolute h-16 w-20 rounded-none rounded-l-lg bg-[#726b6b88] border-none',
        orientation === 'horizontal'
          ? 'right-0 top-1/2 -translate-y-1/2'
          : '-top-12 left-1/2 -translate-x-1/2 rotate-90',
        className
      )}
      disabled={!canScrollNext}
      onClick={scrollNext}
      {...props}
    >
      <FontAwesomeIcon
        className="text-3xl text-background mr-4"
        icon={faChevronRight}
      />
      <span className="sr-only">Nextious slide</span>
    </Button>
  );
});
CarouselNext.displayName = 'CarouselNext';

export { CarouselNext, CarouselPrevious };
