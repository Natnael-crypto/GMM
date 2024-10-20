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
        className="absolute w-full h-[20rem] lg:h-[15rem] -z-10"
        style={{
          backgroundImage: 'url("/assets/hero-image-green.jpg")',
          transform: localeDirection[locale] === 'rtl' ? 'scaleX(-1)' : '',
        }}
      ></div>

      <div
        className="pt-8 px-6 sm:px-16 md:px-24 lg:px-52 
    flex justify-between items-center"
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
