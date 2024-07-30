import { Link } from '@/lib/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFacebookF,
  faInstagram,
  faTwitter,
} from '@fortawesome/free-brands-svg-icons';
import Image from 'next/image';
import React from 'react';

export default function Footer() {
  return (
    <div className="px-6 sm:px-16 md:px-24 lg:px-52 py-16 bg-tertiary text-tertiary-foreground md:grid md:grid-cols-12 text-sm">
      <div className="flex flex-col gap-10 md:col-span-6 lg:col-span-5 overflow-hidden">
        <div className="w-40 md:w-60">
          <Image
            className="w-full overflow-hidden"
            src="/assets/guardian-logo-footer.png"
            width={537}
            height={70}
            alt="Guardian logo"
          />
        </div>

        <p>
          Guardian/Wali Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Necessitatibus praesentium odio porro!
        </p>

        <p className="hidden md:block text-xs font-thin">
          Copyright &copy; {(new Date().getFullYear())} Guardian/Wali Project. All Rights Reserved.{' '}
        </p>
      </div>

      <div
        className="               
        md:mt-0
      md:col-start-8 md:col-span-5 
      lg:col-start-9 lg:col-span-4 
      flex flex-col justify-between md:items-end 
      text-xs"
      >
        <div className="flex gap-5 my-5 md:my-0">
          <Link href="">
            <FontAwesomeIcon icon={faInstagram} />
          </Link>
          <Link href="">
            <FontAwesomeIcon icon={faTwitter} />
          </Link>
          <Link href="">
            <FontAwesomeIcon icon={faFacebookF} />
          </Link>
        </div>

        <div
          className="
        flex flex-col gap-2 
        sm:grid sm:grid-cols-2        
        "
        >
          <div className="flex flex-col gap-2">
            <Link href="">Support</Link>
            <Link href="">FAQ</Link>
            <Link href="">Affiliates</Link>
          </div>
          <div className="flex flex-col gap-2">
            <Link href="">Term of Use</Link>
            <Link href="">Privacy of Policy</Link>
            <Link href="">Community Guidelines</Link>
          </div>
        </div>
      </div>

      <p className="md:hidden text-xs font-thin mt-5">
        Copyright &copy; {(new Date().getFullYear())} Guardian/Wali Project. All Rights Reserved.{' '}
      </p>
    </div>
  );
}
