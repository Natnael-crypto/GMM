'use client';

import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from '../ui/carousel';
import { CarouselNext, CarouselPrevious } from '../ui/previous-button';
import React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

export default function ProfileCarousel({
  imageUrls,
}: {
  imageUrls: string[];
}) {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);

  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCurrent(api.selectedScrollSnap() + 1);

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <>
      <Carousel setApi={setApi} className="w-full">
        <CarouselContent>
          {imageUrls.map((imageUrl, index) => (
            <CarouselItem key={`profile_pic_${index}`}>
              <Image
                src={imageUrl}
                className="object-cover w-full h-[21rem] object-top"
                width={600}
                height={1000}
                alt="Hero image"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="w-8" />
        <CarouselNext className="end-0 w-8" />
      </Carousel>
      <div className="w-full justify-center flex gap-1">
        {Array.from({ length: imageUrls.length }).map((_, index) => {
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
    </>
  );
}
