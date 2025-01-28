'use client';

import React, { useEffect } from 'react';

import { Amplify } from 'aws-amplify';
import '@aws-amplify/ui-react/styles.css';
import { FaceLivenessDetector } from '@aws-amplify/ui-react-liveness';
import { Loader, Theme, ThemeProvider, useTheme } from '@aws-amplify/ui-react';

import awsexports from '@/aws-exports';
import {
  useCreateLivenessSessionMutation,
  useGetLivenessVerificationStatusQuery,
  useLazyGetLivenessVerificationStatusQuery,
} from '@/lib/verification/api';
import { useAppSelector } from '@/lib/hooks';
import { VerificationStatus } from '@/lib/verification/types';
import { useRouter } from '@/lib/navigation';
import { toast } from '@/components/ui/use-toast';

Amplify.configure(awsexports);

export default function FaceLivenessDetection() {
  const user = useAppSelector((state) => state.auth.user);
  const [createSession, { data: sessionId, isLoading }] =
    useCreateLivenessSessionMutation();

  const [getLivenessVerificationStatus] =
    useLazyGetLivenessVerificationStatusQuery();

  const { data: status, isLoading: isStatusLoading } =
    useGetLivenessVerificationStatusQuery(undefined, {
      skip: !user,
    });

  const router = useRouter();

  useEffect(() => {
    if (user && !sessionId && !isStatusLoading) {
      if (status === VerificationStatus.APPROVED) {
        toast({
          title: 'You have completed the verification process',
        });
        router.replace('/dashboard');
        return;
      }
      createSession();
    }
  }, [user, createSession, sessionId, status, isStatusLoading, router]);

  const handleAnalysisComplete: () => Promise<void> = async () => {
    const data = await getLivenessVerificationStatus().unwrap();

    if (data === VerificationStatus.APPROVED) {
      toast({ title: 'Verification successful' });
    } else {
      toast({
        title: 'Verification failed. Please try again.',
        variant: 'destructive',
      });
    }

    router.replace('/dashboard');
  };

  const { tokens } = useTheme();
  const theme: Theme = {
    name: 'Face Liveness Theme',

    tokens: {
      colors: {
        overlay: {
          primary: {
            value: tokens.colors.black.value,
          },
          secondary: {
            value: tokens.colors.black.value,
          },
        },
        background: {
          primary: {
            value: '#197149',
          },
          secondary: {
            value: '#0b3e27',
          },
          tertiary: {
            value: '#1d1d1d',
          },
        },
        border: {
          primary: {
            value: tokens.colors.transparent.value,
          },
        },
        font: {
          primary: {
            value: tokens.colors.white.value,
          },
        },
      },
    },
  };

  return (
    <ThemeProvider theme={theme}>
      {isLoading || !sessionId || isStatusLoading ? (
        <div className="flex justify-center items-center h-screen">
          <Loader />
        </div>
      ) : (
        <div
          className="bg-primary"
          style={{
            width: '100vw',
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <FaceLivenessDetector
            sessionId={sessionId}
            region="us-east-1"
            onAnalysisComplete={handleAnalysisComplete}
            onError={(error) => {
              console.error(error);
            }}
          />
        </div>
      )}
    </ThemeProvider>
  );
}
