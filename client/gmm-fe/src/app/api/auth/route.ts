'use server';

import { cookieNames } from '@/types/cookie-names';
import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  return Response.json({
    token: cookies().get(cookieNames.accessToken)?.value,
  });
}
