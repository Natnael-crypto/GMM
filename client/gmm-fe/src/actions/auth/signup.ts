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
      gender: data.gender,
      dateOfBirth: data.dateOfBirth,
      bornOrRevertToIslam: data.bornOrRevertToIslam,
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
    value: res.otpVerificationKey,
    httpOnly: true,
    sameSite: 'strict',
    path: '/',
  });

  return {
    status: 200,
    message:
      'We have sent a one time password to your email. Please check your email.',
  };
};

export const signUpWithLink = async (data: SignUpWithLink) => {
  let email;

  try {
    email = (jwtDecode(data.token) as any).email;
  } catch (e) {
    return { status: 400, message: 'Invalid registration link' };
  }

  if (!email) {
    return { status: 400, message: 'Invalid registration link' };
  }
  const response = await fetch(
    `${constants.apiBaseUrl}/auth/register?token=${data.token}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstName: data.firstName,
        lastName: data.lastName,
        password: data.password,
        phoneNumber: data.phoneNumber,
        email: email,
        dateOfBirth: data.dateOfBirth,
        bornOrRevertToIslam: 'Born Muslim',
        gender: data.gender,
        idCardImage: data.idCardImage,
      }),
    }
  );

  const res = await response.json();

  if (!response.ok) {
    return {
      status: response.status,
      message: 'Unable to register',
    };
  }

  return {
    status: 200,
    message: res.message,
  };
};
