import { Card } from '@/components/ui/card';
import Link from 'next/link';
import React from 'react';
import { LoginForm } from './login-form';
import { useLocale, useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';

export default function LoginCard() {
  const t = useTranslations('Auth');
  const locale = useLocale();

  return (
    <Card className="md:w-[22rem] bg-background px-8 py-6 mt-2 h-fit">
      <div className="flex gap-5 justify-evenly mb-6 text-muted-foreground">
        <Link
          href={`/${locale}/login`}
          className={cn('border-primary pb-1', 'border-b-[3px]')}
        >
          {t('login.title')}
        </Link>
        <Link
          href={`/${locale}/signup`}
          className={cn('border-primary pb-1')}
        >
          {t('signup.title')}
        </Link>
      </div>
      <LoginForm />
    </Card>
  );
}
