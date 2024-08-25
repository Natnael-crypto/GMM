'use server';

import { cookies } from 'next/headers';
import { constants } from '@/config';
import { SignUp } from '@/lib/schemas/auth';
import { cookieNames } from '@/types/cookie-names';

export const signUp = async (data: SignUp) => {
  const response = await fetch(`${constants.apiBaseUrl}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      firstname: data.firstName,
      lastname: data.lastName,
      email: data.email,
      password: data.password,
      confirmPassword: data.confirmPassword,
    }),
  });

  const res = await response.json();
  if (!response.ok) {
    return {
      status: response.status,
      message: res.data.otpVerificationKey.message,
    };
  }

  console.log(res);

  cookies().set({
    name: cookieNames.userIdentifier,
    value: data.email,
    httpOnly: true,
    path: '/',
  });

  cookies().set({
    name: cookieNames.otpVerificationKey,
    value: res.data.otpVerificationKey.otpDetails,
    httpOnly: true,
    path: '/',
  });

  return {
    status: 200,
    message: res.message,
  };
};
