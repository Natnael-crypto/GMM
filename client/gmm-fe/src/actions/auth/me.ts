'use server';

import { cookies } from 'next/headers';
import { constants } from '@/config';
import { cookieNames } from '@/types/cookie-names';

export const getMe = async () => {
  const response = await fetch(`${constants.apiBaseUrl}/users/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${cookies().get(cookieNames.accessToken)}`,
    },
  });

  const res = await response.json();

  if (!response.ok) {
    return { status: 400, message: 'Invalid token' };
  }

  return {
    status: 200,
    message: res,
  };
};
