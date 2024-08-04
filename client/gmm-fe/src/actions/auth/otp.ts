'use server';

import { cookies } from 'next/headers';
import { constants } from '@/config';
import { Otp } from '@/lib/schemas/auth';
import { cookieNames } from '@/types/cookie-names';

export const verifyOtp = async (data: Otp) => {
  const userIdentifier = cookies().get(cookieNames.userIdentifier)?.value;
  const otpVerificationKey = cookies().get(
    cookieNames.otpVerificationKey
  )?.value;

  const response = await fetch(`${constants.apiBaseUrl}/otp/verify`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      otp: data.otp,
      check: userIdentifier,
      verificationKey: otpVerificationKey,
    }),
  });

  if (!response.ok) {
    return { status: 400, message: 'An error occurred' };
  }

  cookies().delete(cookieNames.otpVerificationKey);

  return { status: 200 };
};
