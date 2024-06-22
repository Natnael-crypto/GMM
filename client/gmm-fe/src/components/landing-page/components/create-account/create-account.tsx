import { Button } from '@/components/ui/button';
import React from 'react';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';
import { cva } from 'class-variance-authority';
import { CreateAccountProps } from '@/types';

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

export default function CreateAccount({ variant, margin }: CreateAccountProps) {
  const t = useTranslations('Landing.createAccount');

  return (
    <div className={cn(createAccountVariants({ variant, margin }))}>
      <h2 className="text-xl lg:text-2xl">{t('title')}</h2>
      <Button
        variant="default"
        className={cn(
          'mt-3 font-bold',
          variant === 'filled'
            ? 'bg-primary-foreground text-primary'
            : 'bg-primary text-primary-foreground'
        )}
      >
        {t('cta')}
      </Button>
    </div>
  );
}
