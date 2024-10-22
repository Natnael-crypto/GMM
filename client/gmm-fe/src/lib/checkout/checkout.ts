import { constants } from '@/config';
import { cookieNames } from '@/types/cookie-names';
import { cookies } from 'next/headers';

export async function loadUserSubscription(userId: string) {
  const accessToken = cookies().get(cookieNames.accessToken)?.value;

  const response = await fetch(
    `${constants.apiBaseUrl}/payments/current-subscription/${userId}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  if (!response.ok) {
    return null;
  }

  return await response.json();
}
