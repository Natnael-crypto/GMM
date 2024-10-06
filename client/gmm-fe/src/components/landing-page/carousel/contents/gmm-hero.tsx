import { buttonVariants } from '@/components/ui/button';
import { localeDirection } from '@/config';
import { auth } from '@/lib/auth/utils';
import { cn } from '@/lib/utils';
import { getLocale, getTranslations } from 'next-intl/server';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export default async function GMMHero() {
  const t = await getTranslations('Landing');
  const locale = await getLocale();
  const session = await auth();

  return (
    <div className="relative">
      <div className="absolute -z-10 lg:z-0 lg:static lg:flex lg:w-full">
        <Image
          src="/assets/hero-image-1.jpg"
          className={cn(
            'hidden sm:block object-cover w-full h-[55vh]',
            localeDirection[locale] === 'rtl' ? '-scale-x-100' : ''
          )}
          width={1920}
          height={670}
          alt="Hero image"
        />
        <Image
          src="/assets/hero-image-green.jpg"
          className={cn(
            'sm:hidden object-cover w-full h-[55vh]',
            localeDirection[locale] === 'rtl' ? '-scale-x-100' : ''
          )}
          width={1920}
          height={670}
          alt="Hero image"
        />
      </div>

      <div className="lg:absolute lg:top-0 lg:left-0 w-full h-full">
        {/* Hero content */}
        <div className="px-12 sm:px-16 md:px-24 lg:px-48 py-16 lg:w-9/12 gap-8 flex flex-col h-full">
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
            <h1 className="text-3xl sm:text-4xl md:text-4xl lg:text-5xl lg:leading-[3.6rem] font-bold text-primary-foreground text-wrap">
              {t('hero.title')}
            </h1>
            <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font- text-white mt-4 text-wrap">
              {t('hero.subtitle')}
            </h2>
          </div>

          {/* Call to action */}
          <div className="flex gap-4 ">
            {session ? (
              <Link
                href={session.user.age == null ? `/${locale}/registration` : `/${locale}/dashboard`}
                className={cn(
                  buttonVariants({ variant: 'default' }),
                  'font-bold px-14'
                )}
              >
                {t('hero.getStarted')}
              </Link>
            ) : (
              <Link
                href={`/${locale}/login`}
                className={cn(
                  buttonVariants({ variant: 'default' }),
                  'font-bold px-14'
                )}
              >
                {t('hero.cta')}
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
