import createMiddleware from 'next-intl/middleware';
import { constants, locales } from '@/config';
import { NextRequest, NextResponse } from 'next/server';
import { cookieNames } from './types/cookie-names';

export const intlMiddleware = createMiddleware({
  locales: locales,
  defaultLocale: 'en',
});

export const refreshTokenMiddleware = async (
  req: NextRequest,
  res: NextResponse
) => {
  const cookies = req.cookies;
  const accessToken = cookies.get(cookieNames.accessToken)?.value;
  const refreshToken = cookies.get(cookieNames.refreshToken)?.value;

  if (!refreshToken) {
    return res;
  }

  if (!accessToken) {
    const apiResponse = await fetch(`${constants.apiBaseUrl}/auth/refresh`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refreshToken }),
    });

    if (apiResponse.ok) {
      try {
        const { accessToken } = await apiResponse.json();

        res.cookies.set(cookieNames.accessToken, accessToken, {
          httpOnly: true,
          sameSite: 'strict',
          secure: true,
          expires: new Date(Date.now() + constants.accessTokenMaxAge),
        });
      } catch (e) {
        console.log(e);
      }
    }
  }

  return res;
};

export async function middleware(req: NextRequest) {
  const intlResponse = intlMiddleware(req);
  return await refreshTokenMiddleware(req, intlResponse);
}

export const config = {
  matcher: [
    '/',
    `/(en|sq|ar|bs|zh\-yue|zh\-guoyu|nl|tl|fr|de|id|it|ms\-MY|pt|ru|so|es|tr)/:path*`,
  ],
};
