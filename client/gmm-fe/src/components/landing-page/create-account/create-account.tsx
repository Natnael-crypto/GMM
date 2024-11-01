import { Button, buttonVariants } from '@/components/ui/button';
import React from 'react';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';
import { cva } from 'class-variance-authority';
import { CreateAccountProps } from '@/types';
import { Link } from '@/lib/navigation';
import { AccountStatus } from '@/lib/schemas/user';

const createAccountVariants = cva('py-8 text-center', {
  variants: {
    variant: {
      default: 'border-t border-b text-secondary',
      filled: 'bg-primary text-primary-foreground',
    },
    margin: {
      default: 'mx-6 sm:mx-16 md:mx-24 lg:mx-52 my-8',
      wide: 'my-8 py-8 px-8',
    },
  },
  defaultVariants: {
    variant: 'default',
    margin: 'default',
  },
});

export default function CreateAccount({
  variant,
  margin,
  user,
}: CreateAccountProps) {
  const t = useTranslations('Landing.createAccount');

  const title = user ? t('loggedInTitle') : t('loggedOutTitle');
  const cta = user ? t('loggedInCta') : t('loggedOutCta');

  return (
    <div className={cn(createAccountVariants({ variant, margin }))}>
      <h2 className="text-xl lg:text-2xl">{title}</h2>
      <Link
        href={
          !user
            ? '/signup'
            : user.accountStatus === AccountStatus.INCOMPLETE_REGISTRATION
            ? '/registration'
            : '/dashboard'
        }
        className={cn(
          buttonVariants({ variant: 'default' }),
          'mt-3 font-bold cta',
          variant === 'filled'
            ? 'bg-primary-foreground text-primary'
            : 'bg-primary text-primary-foreground'
        )}
      >
        {cta}
      </Link>
    </div>
  );
}
