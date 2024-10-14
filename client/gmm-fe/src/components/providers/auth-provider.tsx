'use client';

import { setToken, setUser } from '@/lib/auth/slice';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { useLazyGetUserQuery } from '@/lib/auth/api';
import React, { useEffect } from 'react';

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useAppDispatch();
  const token = useAppSelector((state) => state.auth.token);

  const [trigger, result] = useLazyGetUserQuery();

  useEffect(() => {
    if (token) {
      trigger();
    }
  }, [trigger, token]);

  useEffect(() => {
    if (result.error) {
      dispatch(setToken(null));
    }

    if (result.data) {
      dispatch(setUser(result.data));
    }
  }, [result, dispatch]);

  useEffect(() => {
    fetch('/api/auth', {
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((data) => {
        dispatch(setToken(data.token));
      });
  }, [dispatch]);

  return children;
}
