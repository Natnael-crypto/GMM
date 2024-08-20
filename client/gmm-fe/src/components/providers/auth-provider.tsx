'use client';

import { useGetUserQuery } from '@/lib/auth/api';
import { setToken, setUser } from '@/lib/auth/slice';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import React, { useEffect } from 'react';

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useAppDispatch();
  const token = useAppSelector((state) => state.auth.token);

  const { data: user, error } = useGetUserQuery(undefined, {
    skip: !token,
  });

  useEffect(() => {
    if (error) {
      dispatch(setToken(null));
    }

    if (user) {
      dispatch(setUser(user));
    }
  }, [user, error, dispatch]);

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
