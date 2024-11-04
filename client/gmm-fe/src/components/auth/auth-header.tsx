import React from 'react';
import Image from 'next/image';
import LanguageSelector from '@/components/ui/language-selector';
import { useLocale } from 'next-intl';
import { localeDirection } from '@/config';
import { Link } from '@/lib/navigation';

export default function AuthHeader() {
  const locale = useLocale();
  return (
    <div className="relative">
      <div
        className="absolute w-full h-[20rem] xl:h-[15rem] -z-10"
        style={{
          backgroundImage: 'url("/assets/hero-image-green.jpg")',
          transform: localeDirection[locale] === 'rtl' ? 'scaleX(-1)' : '',
        }}
      ></div>

      <div
        className="py-6 px-6 sm:px-16 md:px-[3rem] lg:px-[5rem] 2xl:px-[15rem] 3xl:px-[20rem] flex justify-between items-center"
      >
        <div className="w-40 md:w-60">
          <Link href="/" className="w-40 md:w-60">
            <Image
              className="w-full overflow-hidden"
              src="/assets/guardian-logo.png"
              width={537}
              height={70}
              alt="Guardian logo"
            />
          </Link>
        </div>

        <div className="flex gap-2 items-center">
          <LanguageSelector />
        </div>
      </div>
    </div>
  );
}
