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
    <div className="py-6 px-6 sm:px-16 md:px-24 bg-tertiary text-tertiary-foreground flex justify-between items-center">
      <div className="sm:flex sm:items-center sm:justify-between">
            <Image
            className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse"
            src="/assets/guardian-logo-footer.png"
            width={537}
            height={70}
            alt="Guardian logo"
            />
            <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
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
      <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
      <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
        Copyright &copy; {(new Date().getFullYear())} Guardian/Wali Project. All Rights Reserved.{' '}
      </span>
    </div>
  );
}
