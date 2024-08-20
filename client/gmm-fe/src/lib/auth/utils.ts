import { cookieNames } from '@/types/cookie-names';
import { cookies } from 'next/headers';
import { constants } from '@/config';

export const getLoggedInUser = async () => {
  const response = await fetch(`${constants.apiBaseUrl}/users/me`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${cookies().get(cookieNames.accessToken)?.value}`,
    },
  });

  if (response.ok) {
    return await response.json();
  }

  return null;
};
