'use server';

import { cookies } from 'next/headers';
import { constants } from '@/config';
import { SignUp, SignUpWithLink } from '@/lib/schemas/auth';
import { cookieNames } from '@/types/cookie-names';
import { jwtDecode } from 'jwt-decode';

export const signUp = async (data: SignUp) => {
  const response = await fetch(`${constants.apiBaseUrl}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.password,
      confirmPassword: data.confirmPassword,
    }),
  });

  const res = await response.json();

  if (!response.ok) {
    return {
      status: response.status,
      message: res?.message ?? "Couldn't sign up. Please try again later.",
    };
  }

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

export const signUpWithLink = async (data: SignUpWithLink) => {
  let email;

  try {
    email = (jwtDecode(data.token) as any).email;
  } catch (e) {
    console.log(e);
    return { status: 400, message: 'Invalid registration link' };
  }

  if (!email) {
    return { status: 400, message: 'Invalid registration link' };
  }
  const response = await fetch(
    `${constants.apiBaseUrl}/auth/guardian-registration`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstname: data.firstName,
        lastname: data.lastName,
        token: data.token,
        password: data.password,
      }),
    }
  );

  const res = await response.json();

  if (!response.ok) {
    return {
      status: response.status,
      message: res.data.otpVerificationKey.message,
    };
  }

  cookies().set({
    name: cookieNames.userIdentifier,
    value: email,
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
