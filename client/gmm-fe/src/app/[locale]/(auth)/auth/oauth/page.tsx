'use client';

import Loading from '@/components/ui/loading';
import { toast } from '@/components/ui/use-toast';
import { setToken } from '@/lib/auth/slice';
import { useRouter } from '@/lib/navigation';
import { useSearchParams } from 'next/navigation';
import { useDispatch } from 'react-redux';

export default function OAuthPage() {
  const params = useSearchParams();
  const router = useRouter();
  const dispatch = useDispatch();

  const status = params.get('status');
  const token = params.get('token');

  if (!token) {
    router.replace('/login');
  } else if (status === 'auth_failed') {
    toast({
      title: 'Authentication failed',
      description: 'Please try again',
      variant: 'destructive',
    });
    router.replace('/login');
  } else {
    toast({
      title: 'Welcome Back!',
    });
    dispatch(setToken(token));
    router.replace('/');
  }

  return (
    <div className="w-full h-screen flex flex-col gap-5 items-center justify-center">
      <h1 className="text-lg text-center font-bold text-primary">
        Logging you in
      </h1>
      <Loading />
    </div>
  );
}
