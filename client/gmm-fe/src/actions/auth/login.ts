'use server';

import { cookies } from 'next/headers';
import { constants } from '@/config';
import { Login } from '@/lib/schemas/auth';
import { cookieNames } from '@/types/cookie-names';

export const login = async (data: Login) => {
  let response = await fetch(`${constants.apiBaseUrl}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: data.email,
      password: data.password,
    }),
  });

  let res;

  try {
    res = await response.json();
  } catch (e) {
    return { status: 400, message: 'Invalid JSON response' };
  }

  if (!response.ok) {
    if (res.message) {
      return { status: 400, message: res.message };
    }
    return { status: 400, message: 'Unable to login' };
  }

  const { accessToken, refreshToken } = res;

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

  // get user data
  response = await fetch(`${constants.apiBaseUrl}/users/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  });

  try {
    res = await response.json();
  } catch (e) {
    return { status: 400, message: 'Invalid JSON response' };
  }

  if (!response.ok) {
    if (res.message) {
      return { status: 400, message: res.message };
    }
    return { status: 400, message: 'Unable to login' };
  }

  const userId = res.data.id;

  // get user subscription
  response = await fetch(
    `${constants.apiBaseUrl}/payments/current-subscription/${userId}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  try {
    res = await response.json();
  } catch (e) {
    return { status: 400, message: 'Invalid JSON response' };
  }

  if (!response.ok) {
    if (response.status == 404) {
      return { status: 200, token: accessToken, message: res.message };
    }
    return { status: 400, message: 'Unable to login' };
  }

  return {
    status: 200,
    token: accessToken,
    message: res.message,
    subscription: res.data,
  };
};

export const refreshToken = async () => {
  const refreshToken = cookies().get(cookieNames.refreshToken)?.value;

  if (!refreshToken) {
    return { status: 400, message: 'No refresh token found' };
  }

  let response = await fetch(`${constants.apiBaseUrl}/auth/refresh`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ refreshToken }),
  });

  let res;

  try {
    res = await response.json();
  } catch (e) {
    return { status: 400, message: 'Invalid JSON response' };
  }

  if (!response.ok) {
    if (res.message) {
      return { status: 400, message: res.message };
    }
    return { status: 400, message: 'Unable to refresh token' };
  }

  const { accessToken } = res;

  cookies().set({
    name: cookieNames.accessToken,
    value: accessToken,
    httpOnly: true,
    sameSite: 'strict',
    secure: true,
    expires: new Date(Date.now() + constants.accessTokenMaxAge),
  });

  return { status: 200, token: accessToken };
};
