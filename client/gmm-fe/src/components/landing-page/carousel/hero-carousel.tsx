import React from 'react';
import InteractiveCarousel from '@/components/ui/interactive-carousel';
import GMMHero from './contents/gmm-hero';
import { CarouselItem } from '@/components/ui/carousel';

export default function HeroCarousel() {
  return (
    <InteractiveCarousel itemCount={3}>
      <CarouselItem>
        <GMMHero />
      </CarouselItem>
      <CarouselItem>
        <GMMHero />
      </CarouselItem>
      <CarouselItem>
        <GMMHero />
      </CarouselItem>
    </InteractiveCarousel>
  );
}
