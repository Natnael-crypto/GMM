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

  let res;

  try {
    res = await response.json();        
  } catch (e) {
    return { status: 400, message: 'Invalid JSON response' };
  }

  if (!response.ok) {
    if (res.error) {
      return { status: 400, message: res.error };
    }
    return { status: 400, message: 'Unable to login' };
  }

  cookies().set({
    name: cookieNames.accessToken,
    value: res.data.token,
    httpOnly: true,
    sameSite: 'strict',
    path: '/',
    expires: new Date(Date.now() + constants.accessTokenMaxAge),
  });

  return {
    status: 200,
    message: res.message,
  };
};
