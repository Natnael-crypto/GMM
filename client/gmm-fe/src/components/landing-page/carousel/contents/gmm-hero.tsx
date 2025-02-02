import { buttonVariants } from '@/components/ui/button';
import { auth } from '@/lib/auth/utils';
import { Role } from '@/lib/schemas/role';
import { AccountStatus } from '@/lib/schemas/user';
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
    <div className="hero-container grid md:grid-cols-2 gap-4">
      {/* Hero content */}
      <div className="hero-slide-content py-8 gap-8 flex flex-col h-full">
        {/* Hero image */}
        <div className="z-20">
          <Image
            className="w-full overflow-hidden logo"
            src="/assets/guardian-logo.png"
            width={537}
            height={70}
            alt="Guardian logo"
          />
        </div>
        {/* Hero text */}
        <div className="z-20">
          <h1 className="lg:leading-[3.3rem] font-bold text-primary-foreground text-wrap">
            {t('hero.title')}
          </h1>
          <h2 className="text-white mt-3 text-wrap">{t('hero.subtitle')}</h2>
        </div>

        {/* Call to action */}
        <div className="flex gap-4 z-50">
          {session ? (
            <Link
              href={
                session.user.roleId === Role.Guardian
                  ? `/${locale}/guardian`
                  : session.user.accountStatus ===
                    AccountStatus.INCOMPLETE_REGISTRATION
                  ? `/${locale}/registration`
                  : `/${locale}/dashboard`
              }
              className={cn(
                buttonVariants({ variant: 'default' }),
                'font-bold px-14 cta'
              )}
            >
              {t('hero.getStarted')}
            </Link>
          ) : (
            <Link
              href={`/${locale}/login`}
              className={cn(
                buttonVariants({ variant: 'default' }),
                'font-bold px-14 cta'
              )}
            >
              {t('hero.cta')}
            </Link>
          )}
        </div>
      </div>
      <span className="hero-slide-image"></span>
    </div>
  );
}
