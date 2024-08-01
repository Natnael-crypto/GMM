import OtpCard from '@/components/(auth)/otp/components/otp-card';
import Image from 'next/image';
import React from 'react';

import { cookies } from 'next/headers';
import { cookieNames } from '@/types/cookie-names';
import { redirect } from '@/lib/navigation';

export default function Otp() {
  const userIdentifier = cookies().get(cookieNames.userIdentifier)?.value;
  const otpVerificationKey = cookies().get(
    cookieNames.otpVerificationKey
  )?.value;

  if (!userIdentifier || !otpVerificationKey) {
    return redirect('/signup');
  }

  return (
    <div className="flex flex-col items-center">
      <div className="w-40 md:w-60 mb-10">
        <Image
          className="w-full overflow-hidden"
          src="/assets/guardian-logo-color.png"
          width={537}
          height={70}
          alt="Guardian logo"
        />
      </div>

      <OtpCard userIdentifier={userIdentifier} />
    </div>
  );
}
