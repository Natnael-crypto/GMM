import React from 'react';
import GMMHero from './contents/gmm-hero';

export default function HeroCarousel() {
  return (
    <div className='w-full overflow-y-hidden bg-primary -z-40'>
      <GMMHero />
    </div>
  );
}
