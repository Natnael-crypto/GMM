import React from 'react';
import InteractiveCarousel from '@/components/ui/interactive-carousel';
import GMMHero from './contents/gmm-hero';
import { CarouselItem } from '@/components/ui/carousel';

export default function HeroCarousel() {
  return (
    <InteractiveCarousel itemCount={1}>
      <CarouselItem>
        <GMMHero />
      </CarouselItem>
    </InteractiveCarousel>
  );
}
