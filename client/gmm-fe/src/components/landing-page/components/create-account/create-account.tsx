import { Button } from '@/components/ui/button';
import React from 'react';
import { useTranslations } from 'next-intl';

export default function CreateAccount() {
  const t = useTranslations('Landing.createAccount');

  return (
    <div className="mx-6 sm:mx-16 md:mx-24 lg:mx-52 my-8 py-8 border-t border-b text-center ">
      <h2 className="text-2xl text-secondary">{t('title')}</h2>
      <Button
        variant="default"
        className="mt-3 bg-primary text-primary-foreground font-bold"
      >
        {t('cta')}
      </Button>
    </div>
  );
}
