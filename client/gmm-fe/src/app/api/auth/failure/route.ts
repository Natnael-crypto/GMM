'use server';

import { constants } from '@/config';
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  return Response.redirect(constants.baseUrl + '/en/login');
}
