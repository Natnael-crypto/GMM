'use server';

import { constants } from '@/config';
import { cookieNames } from '@/types/cookie-names';
import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {

  const url = new URL(request.url);
  const accessToken = url.searchParams.get('accessToken');
  const refreshToken = url.searchParams.get('refreshToken');

  console.log('accessToken', accessToken);
  console.log('refreshToken', refreshToken);

  if (!accessToken || !refreshToken) {
    return Response.redirect(constants.baseUrl + '/en/login');
  }

  cookies().set({
    name: cookieNames.accessToken,
    value: accessToken,
    httpOnly: true,
    sameSite: 'strict',
    secure: true,
    expires: new Date(Date.now() + constants.accessTokenMaxAge),
  });

  cookies().set({
    name: cookieNames.refreshToken,
    value: refreshToken,
    httpOnly: true,
    sameSite: 'strict',
    secure: true,
    expires: new Date(Date.now() + constants.refreshTokenMaxAge),
  });

  return Response.redirect(constants.baseUrl);
}
