import { cookieNames, headerNames } from '@/types/cookie-names';
import { cookies } from 'next/headers';
import { constants } from '@/config';
import { Session } from './types';
import { AccountStatus, User } from '../schemas/user';
import { Role } from '../schemas/role';
import { headers } from 'next/headers';

export const loadUser = async (accessToken: string): Promise<User | null> => {
  const response = await fetch(`${constants.apiBaseUrl}/users/me`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (response.ok) {
    return (await response.json()).data;
  }

  return null;
};

export async function auth(): Promise<Session | null> {
  const accessToken =
    cookies().get(cookieNames.accessToken)?.value ||
    headers().get(headerNames.accessToken); // Check if the access token is recently refreshed and not yet set in the cookie
  const refreshToken = cookies().get(cookieNames.refreshToken)?.value;

  if (!accessToken && !refreshToken) {
    return null;
  }

  if (!accessToken) {
    return null;
  }

  const user = await loadUser(accessToken);
  if (!user) return null;

  return { user };
}

export function nextStep(user: User, isSubscribed: any) {
  // User
  if (user.roleId === Role.User) {
    if (user.accountStatus === AccountStatus.INCOMPLETE_REGISTRATION) {
      return '/registration';
    }

    return '/dashboard';
  }

  // Admin
  else if (user.roleId === Role.Admin) {
    return '/admin';
  }

  // Guardian
  else if (user.roleId === Role.Guardian) {
    return '/guardian';
  }
}

export function getPathname() {
  const headerList = headers();
  return headerList.get(headerNames.pathname);
}
