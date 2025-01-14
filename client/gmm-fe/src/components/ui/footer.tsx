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
    <div className="py-6 px-6 sm:px-16 md:px-[3rem] lg:px-[5rem] 2xl:px-[15rem] 3xl:px-[20rem] mt-6 bg-tertiary text-tertiary-foreground items-center">
      <div className="footer-container block sm:flex w-full justify-between sm:items-center gap-8">
            <Link href="/">
              <Image
                className="logo flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse w-60"
                src="/assets/guardian-logo.png"
                width={537}
                height={70}
                alt="Guardian logo"
              />
            </Link>
            <ul className="block sm:flex flex-wrap items-center mb-6 text-sm font-medium sm:mb-0">
            <li>
                    <Link href="/support" className="hover:underline me-4 md:me-6">Support</Link>
                </li>
                <li>
                    <Link href="/blog" className="hover:underline me-4 md:me-6">Blog</Link>
                </li>
                <li>
                    <Link href="/affiliates" className="hover:underline me-4 md:me-6">Affiliates</Link>
                </li>
                <li>
                    <Link href="/faq" className="hover:underline me-4 md:me-6">FAQ</Link>
                </li>
                <li>
                    <Link href="/terms" className="hover:underline me-4 md:me-6">Terms and Conditions</Link>
                </li>
                <li>
                    <Link href="/privacy-policy" className="hover:underline me-4 md:me-6">Privacy Policy</Link>
                </li>
            </ul>
        </div>
      <span className="block text-xs mt-6">
        Copyright &copy; {(new Date().getFullYear())} Guardian/Wali - Premium Guided Matchmaking
        For Sunni Muslims with Revert Care. {' '}
      </span>
    </div>
  );
}
