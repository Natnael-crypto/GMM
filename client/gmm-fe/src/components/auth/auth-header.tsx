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
        className="gmm-reg-bg absolute w-full -z-10 bg-primary"
        style={{
          /*backgroundImage: 'url("/assets/pattern-bg_opacity-5.png")', */
          transform: localeDirection[locale] === 'rtl' ? 'scaleX(-1)' : '',
        }}
      ></div>

      <div
        className="gmm-reg-header py-6 px-6 sm:px-16 md:px-[3rem] lg:px-[5rem] 2xl:px-[15rem] 3xl:px-[20rem] flex justify-between items-center"
      >
        <div>
          <Link href="/">
            <Image
              className="w-full overflow-hidden logo"
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
