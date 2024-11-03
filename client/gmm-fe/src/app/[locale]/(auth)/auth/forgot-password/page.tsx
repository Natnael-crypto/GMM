import Image from 'next/image';
import React from 'react';
import ForgotPasswordForm from '@/components/auth/password-reset/forgot-password-form';
import { Link } from '@/lib/navigation';

export default function ForgotPassword() {
  return (
    <div className="flex flex-col items-center">
      <div className="w-40 md:w-60 mb-10">
        <Link href="/">
          <Image
            className="w-full overflow-hidden"
            src="/assets/guardian-logo-color.png"
            width={537}
            height={70}
            alt="Guardian logo"
          />
        </Link>
      </div>

      <ForgotPasswordForm />
    </div>
  );
}
