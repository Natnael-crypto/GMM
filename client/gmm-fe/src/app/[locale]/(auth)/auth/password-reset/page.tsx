import Image from 'next/image';
import React from 'react';
import { redirect } from '@/lib/navigation';
import ResetPasswordForm from '@/components/auth/password-reset/password-reset-form';

export default function ResetPassword({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  if (!searchParams) {
    return redirect('/login');
  }

  const token = searchParams?.['token'];

  if (Array.isArray(token)) {
    return redirect('/login');
  }

  if (!token) {
    return redirect('/login');
  }

  return (
    <div className="flex flex-col items-center">
      <div className="w-40 md:w-60 mb-10">
        <Image
          className="w-full overflow-hidden logo"
          src="/assets/guardian-logo-color.png"
          width={537}
          height={70}
          alt="Guardian logo"
        />
      </div>

      <ResetPasswordForm token={token as string} />
    </div>
  );
}
