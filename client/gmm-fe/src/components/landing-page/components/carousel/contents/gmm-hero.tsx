import { Button } from '@/components/ui/button';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import React from 'react';

export default function GMMHero() {
  const t = useTranslations('Landing');

  return (
    <div className="relative">
      <div className="absolute -z-10 lg:z-0 lg:static lg:flex lg:w-full h-[85vh]">
        <Image
          src="/assets/hero-image-1.jpg"
          className="hidden sm:block object-cover w-full h-[85vh]"
          width={1920}
          height={670}
          alt="Hero image"
        />
        <Image
          src="/assets/hero-image-green.jpg"
          className="sm:hidden object-cover w-full h-[85vh]"
          width={1920}
          height={670}
          alt="Hero image"
        />
      </div>

      <div className="lg:absolute lg:top-0 lg:left-0 w-full h-full">
        {/* Hero content */}
        <div className="px-12 sm:px-16 md:px-24 lg:px-52 py-16 lg:w-9/12 gap-10 flex flex-col h-full">
          {/* Hero image */}
          <div className="w-40 md:w-60 lg:w-80">
            <Image
              className="w-full overflow-hidden"
              src="/assets/guardian-logo-footer.png"
              width={537}
              height={70}
              alt="Guardian logo"
            />
          </div>

          {/* Hero text */}
          <div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl lg:leading-[3.8rem] font-bold text-primary-foreground text-wrap">
              {t('hero.title')}
            </h1>
            <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font- text-white mt-4 text-wrap">
              {t('hero.subtitle')}
            </h2>
          </div>

          {/* Call to action */}
          <div className="flex gap-4 ">
            <Button variant="default" className="font-bold px-14">
              {t('hero.cta')}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
