import React from 'react';
import Image from 'next/image';
import LanguageSelector from '@/components/ui/language-selector';
import { useLocale } from 'next-intl';
import { localeDirection } from '@/config';

export default function Header() {
  const locale = useLocale();

  return (
    <div className="relative bg-primary ">
      <div
        className="py-4 px-6 sm:px-16 md:px-24 lg:px-52 
    flex justify-between items-center"
      >
        <div className="w-40 md:w-60">
          <Image
            className="w-full overflow-hidden"
            src="/assets/guardian-logo.png"
            width={537}
            height={70}
            alt="Guardian logo"
          />
        </div>

        <div className="flex gap-2 items-center">
          <LanguageSelector />
        </div>
      </div>
    </div>
  );
}
