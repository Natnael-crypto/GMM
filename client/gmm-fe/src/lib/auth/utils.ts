import { cookieNames } from '@/types/cookie-names';
import { cookies } from 'next/headers';
import { constants } from '@/config';
import { Session } from './types';

export async function auth(): Promise<Session | null> {
  const response = await fetch(`${constants.apiBaseUrl}/users/me`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${cookies().get(cookieNames.accessToken)?.value}`,
    },
  });

  if (response.ok) {
    return { user: await response.json() };
  }

  return null;
}
