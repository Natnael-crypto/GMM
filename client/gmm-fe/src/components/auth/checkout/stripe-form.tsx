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
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { Checkout, checkoutSchema } from '@/lib/schemas/checkout';
import { zodResolver } from '@hookform/resolvers/zod';
import { countries, User } from '@/lib/schemas/user';
import { toast } from '@/components/ui/use-toast';
import { constants } from '@/config';
import AutoComplete from '@/components/ui/searchable-select';

const cityOptions = Object.keys(countries).flatMap((country) =>
  countries[country].map((city) => ({
    label: `${city}, ${country}`,
    value: `${city}, ${country}`,
  }))
);

export default function StripeForm({ user }: { user: User }) {
  const t = useTranslations('Auth.checkout');
  const stripe = useStripe();
  const elements = useElements();
  const fullName = `${user.firstName} ${user.lastName}`;
  const form = useForm<Checkout>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      name: fullName,
      addressOne: '',
      addressTwo: '',
      city: user.city,
      postcode: '',
      region: '',
    },
  });

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
        <div className="space-y-1">
          <FormLabel className="text-md">{t('billingInfo.title')}</FormLabel>
          <div>
            <FormField
              name="name"
              render={({ field }) => (
                <FormItem>
                  <Input
                    placeholder={t('billingInfo.name')}
                    className="text-xs placeholder:text-xs rounded-none rounded-t-md "
                    {...field}
                  />

                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
            <FormField
              name="addressOne"
              render={({ field }) => (
                <FormItem>
                  <Input
                    placeholder={t('billingInfo.addressOne')}
                    className="text-xs placeholder:text-xs rounded-none border-t-0 ring-transparent ring-offset-transparent"
                    {...field}
                  />

                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
            <FormField
              name="addressTwo"
              render={({ field }) => (
                <FormItem>
                  <Input
                    placeholder={t('billingInfo.addressTwo')}
                    className="text-xs placeholder:text-xs rounded-none border-t-0 ring-transparent ring-offset-transparent"
                    {...field}
                  />

                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />

            <FormField
              name="city"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <AutoComplete
                    onChange={field.onChange}
                    selectedOption={field.value}
                    options={cityOptions}
                    placeholder={t('billingInfo.city')}
                    className="text-xs placeholder:text-xs rounded-none border-t-0 ring-transparent ring-offset-transparent h-8"
                  />
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />

            <FormField
              name="postcode"
              render={({ field }) => (
                <FormItem>
                  <Input
                    placeholder={t('billingInfo.postcode')}
                    className="text-xs placeholder:text-xs rounded-none border-t-0 ring-transparent ring-offset-transparent"
                    {...field}
                  />

                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />

            <FormField
              name="region"
              render={({ field }) => (
                <FormItem>
                  <Input
                    placeholder={t('billingInfo.region')}
                    className="text-xs placeholder:text-xs rounded-none rounded-b-md  border-t-0 ring-transparent ring-offset-transparent"
                    {...field}
                  />

                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <PaymentElement options={paymentElementOptions} />

          <div className="w-full flex flex-col items-center gap-3">
            <Button
              disabled={isLoading || !stripe || !elements}
              id="submit"
              type="submit"
              className="w-52 h-9 bg-primary text-primary-foreground font-bold"
            >
              {isLoading ? <Loading /> : t('processPayment')}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
