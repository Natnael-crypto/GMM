'use client';

import { useRef } from 'react';
import { Provider } from 'react-redux';
import { makeStore, AppStore } from '@/lib/store';
import AuthProvider from './auth-provider';
import { setupListeners } from '@reduxjs/toolkit/query';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';

export default function Providers({ children }: { children: React.ReactNode }) {
  const storeRef = useRef<AppStore>();

  if (!storeRef.current) {
    storeRef.current = makeStore();
    setupListeners(storeRef.current.dispatch);
  }

  return (
    <Provider store={storeRef.current}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <AuthProvider>{children}</AuthProvider>
      </LocalizationProvider>
    </Provider>
  );
}
