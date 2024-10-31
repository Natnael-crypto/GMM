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
    <div className="py-6 px-6 sm:px-16 md:px-24 lg:px-52 bg-tertiary text-tertiary-foreground items-center">
      <div className="footer-container block sm:flex w-full justify-between sm:items-center gap-8">
            <Link href="/">
              <Image
                className="logo flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse w-60"
                src="/assets/guardian-logo-footer.png"
                width={537}
                height={70}
                alt="Guardian logo"
              />
            </Link>
            <ul className="block sm:flex flex-wrap items-center mb-6 text-sm font-medium sm:mb-0">
                <li>
                    <Link href="" className="hover:underline me-4 md:me-6">Support</Link>
                </li>
                <li>
                    <Link href="" className="hover:underline me-4 md:me-6">FAQ</Link>
                </li>
                <li>
                    <Link href="" className="hover:underline me-4 md:me-6">Affiiates</Link>
                </li>
                <li>
                    <Link href="" className="hover:underline me-4 md:me-6">Terms of Use</Link>
                </li>
                <li>
                    <Link href="" className="hover:underline me-4 md:me-6">Privacy Policy</Link>
                </li>
                <li>
                    <Link href="" className="hover:underline">Community Guidelines</Link>
                </li>
            </ul>
        </div>
      <span className="block text-xs mt-4">
        Copyright &copy; {(new Date().getFullYear())} Guardian/Wali Project. All Rights Reserved.{' '}
      </span>
    </div>
  );
}
