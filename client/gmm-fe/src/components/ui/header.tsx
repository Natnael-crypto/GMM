import React from 'react';
import LanguageSelector from './language-selector';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';

export default function Header() {
  return (
    <div
      className="py-3 px-6 sm:px-16 md:px-24 lg:px-52
    bg-primary text-primary-foreground 
    flex justify-between items-center"
    >
      <div className="w-40 md:w-60">
        <Image
          className="w-full overflow-hidden"
          src="/assets/guardian-logo-footer.png"
          width={537}
          height={70}
          alt="Guardian logo"
        />
      </div>

      <div className="flex gap-2 items-center">
        <LanguageSelector />
        <FontAwesomeIcon icon={faBell} />
      </div>
    </div>
  );
}
