'use server';

import { constants } from '@/config';
import { cookieNames } from '@/types/cookie-names';
import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const accessToken = request.headers.get(cookieNames.accessToken);

  if (!accessToken) {
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

  return Response.redirect(constants.baseUrl);
}
