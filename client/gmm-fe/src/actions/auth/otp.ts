'use server';

import { cookies } from 'next/headers';
import { constants } from '@/config';
import { Otp } from '@/lib/schemas/auth';
import { cookieNames } from '@/types/cookie-names';
import { revalidatePath } from 'next/cache';

export const verifyOtp = async (data: Otp) => {
  const userIdentifier = cookies().get(cookieNames.userIdentifier)?.value;
  const otpVerificationKey = cookies().get(
    cookieNames.otpVerificationKey
  )?.value;

  const response = await fetch(
    `${constants.apiBaseUrl}/auth/otp/verification`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        otp: data.otp,
        email: userIdentifier,
        verificationKey: otpVerificationKey,
      }),
    }
  );

  if (!response.ok) {
    return { status: 400, message: 'An error occurred' };
  }

  const { accessToken, refreshToken } = await response.json();

  cookies().set({
    name: cookieNames.accessToken,
    value: accessToken,
    httpOnly: true,
    sameSite: 'strict',
    secure: true,
    expires: new Date(Date.now() + constants.accessTokenMaxAge),
  });

  cookies().set({
    name: cookieNames.refreshToken,
    value: refreshToken,
    httpOnly: true,
    sameSite: 'strict',
    secure: true,
    expires: new Date(Date.now() + constants.accessTokenMaxAge),
  });

  cookies().delete(cookieNames.otpVerificationKey);

  return { status: 200, token: accessToken };
};

export const resendOtp = async () => {
  const userIdentifier = cookies().get(cookieNames.userIdentifier)?.value;

  const response = await fetch(`${constants.apiBaseUrl}/auth/otp`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: userIdentifier,
    }),
  });

  if (!response.ok) {
    return { status: 400, message: 'An error occurred' };
  }

  const res = await response.json();

  cookies().set({
    name: cookieNames.otpVerificationKey,
    value: res.otpVerificationKey,
    sameSite: 'strict',
    httpOnly: true,
    path: '/',
  });

  return { status: 200 };
};
