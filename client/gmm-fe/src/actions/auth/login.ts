'use server';

import { cookies } from 'next/headers';
import { constants } from '@/config';
import { Login } from '@/lib/schemas/auth';
import { cookieNames } from '@/types/cookie-names';

export const login = async (data: Login) => {
  const response = await fetch(`${constants.apiBaseUrl}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: data.email,
      password: data.password,
    }),
  });

  if (!response.ok) {
    console.log(response);
    return { message: 'An error occurred' };
  }

  const res = await response.json();

  cookies().set({
    name: cookieNames.accessToken,
    value: res,
    httpOnly: true,
    path: '/',
  });

  return {
    status: 200,
  };
};
