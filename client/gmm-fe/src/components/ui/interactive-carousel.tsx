'use client';

import * as React from 'react';

import {
  Carousel,
  CarouselContent,
  type CarouselApi,
} from '@/components/ui/carousel';
import { CarouselNext, CarouselPrevious } from './previous-button';
import { cn } from '@/lib/utils';
import { HeroCarouselProps } from '@/types';

export default function InteractiveCarousel({
  children,
  itemCount,
}: HeroCarouselProps) {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <div className="w-full">
      <Carousel setApi={setApi} className="w-full h-fit">
        <CarouselContent>{children}</CarouselContent>
        {/* <CarouselPrevious className="w-10 lg:w-20" />
        <CarouselNext className="end-0 w-10 lg:w-20" /> */}
      </Carousel>
      <div className="w-full py-2 justify-center flex gap-1">
        {Array.from({ length: itemCount }).map((_, index) => {
          return (
            <div
              key={index}
              className={cn(
                'rounded-full w-2 h-2 cursor-pointer',
                index === current - 1 ? 'bg-primary' : 'bg-accent opacity-50'
              )}
              onClick={() => api?.scrollTo(index)}
            ></div>
          );
        })}
      </div>
    </div>
  );
}
