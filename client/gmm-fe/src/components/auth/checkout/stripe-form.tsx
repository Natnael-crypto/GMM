'use client';

import React, { useState } from 'react';
import {
  PaymentElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import { Layout } from '@stripe/stripe-js';
import { Button } from '@/components/ui/button';
import { useLocale, useTranslations } from 'next-intl';
import Loading from '@/components/ui/loading';
import { Form } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { User } from '@/lib/schemas/user';
import { toast } from '@/components/ui/use-toast';
import { constants } from '@/config';

export default function StripeForm({
  user,
  isLoading: isParentLoading,
}: {
  user: User;
  isLoading?: boolean;
}) {
  const t = useTranslations('Auth.checkout');
  const stripe = useStripe();
  const elements = useElements();
  const form = useForm();

  const locale = useLocale();

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${constants.baseUrl}/${locale}/checkout/success`,
      },
    });

    if (error.type === 'card_error' || error.type === 'validation_error') {
      toast({
        title: 'Error',
        description: error.message,
      });
    } else {
      toast({
        title: 'Error',
        description: 'An unknown error occurred',
      });
    }

    setIsLoading(false);
  };

  const paymentElementOptions: {
    layout: Layout;
  } = {
    layout: 'tabs',
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="w-full space-y-5 mt-4"
      >
        <div className="flex flex-col gap-4">
          <PaymentElement options={paymentElementOptions} />

          <div className="w-full flex flex-col items-center gap-3">
            <Button
              disabled={isLoading || !stripe || !elements || isParentLoading}
              id="submit"
              type="submit"
              className="w-52 h-9 bg-primary text-primary-foreground font-bold"
            >
              {isLoading || isParentLoading ? <Loading /> : t('processPayment')}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
