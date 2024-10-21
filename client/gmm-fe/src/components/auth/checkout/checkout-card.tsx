import { Card } from '@/components/ui/card';
import React from 'react';
import { CheckoutForm } from './checkout-form';
import { useLocale, useTranslations } from 'next-intl';

export default function CheckoutCard() {
  const t = useTranslations('Auth.checkout');

  return (
    <Card className="w-[22rem] bg-background p-5 mt-2 h-fit">
      <h1 className="text-lg md:text-xl text-primary font-bold mb-5">
        {t.rich('title', {
          bold: (text) => <span className="font-bold">{text}</span>,
        })}
      </h1>
      <CheckoutForm />
    </Card>
  );
}
