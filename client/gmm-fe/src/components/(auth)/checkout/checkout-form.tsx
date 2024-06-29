'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { checkoutForm } from '@/types/forms';
import { useLocale, useTranslations } from 'next-intl';
import RadioButton from './radio-button';

export function CheckoutForm() {
  const t = useTranslations('Auth.checkout');
  const locale = useLocale();

  const form = useForm<z.infer<typeof checkoutForm>>({
    resolver: zodResolver(checkoutForm),
    defaultValues: {
      email: '',
      membershipPackage: '',
    },
  });

  function onSubmit(data: z.infer<typeof checkoutForm>) {
    console.log({
      title: 'You submitted the following values:',
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-5">
        <div className="space-y-5 text-sm">
          <div className="space-y-1">
            <FormLabel className="text-xs">{t('email')}</FormLabel>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input className="text-sm placeholder:text-xs" {...field} />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
          </div>

          <div className="space-y-1">
            <div className="text-xs"> {t('selectMembership')}</div>

            <FormField
              control={form.control}
              name="membershipPackage"
              render={({ field }) => (
                <div className="grid grid-cols-2 gap-x-2 gap-y-5 py-3">
                  <RadioButton
                    field={field}
                    membershipPackage="monthlyPackage"
                  />
                  <RadioButton
                    field={field}
                    membershipPackage="threeMonthsPackage"
                  />
                  <RadioButton
                    field={field}
                    membershipPackage="sixMonthsPackage"
                  />
                  <RadioButton
                    field={field}
                    membershipPackage="twelveMonthsPackage"
                  />
                </div>
              )}
            />
          </div>

          <div className="space-y-1">
            <FormLabel className="text-xs">{t('billingInfo.title')}</FormLabel>
            <div>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder={t('billingInfo.name')}
                        className="text-sm placeholder:text-xs rounded-none rounded-t-md "
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="addressOne"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder={t('billingInfo.addressOne')}
                        className="text-sm placeholder:text-xs rounded-none border-t-0 ring-transparent ring-offset-transparent"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="addressTwo"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder={t('billingInfo.addressTwo')}
                        className="text-sm placeholder:text-xs rounded-none border-t-0 ring-transparent ring-offset-transparent"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
              <div className="flex">
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder={t('billingInfo.city')}
                          className="text-sm placeholder:text-xs rounded-none border-t-0 ring-transparent ring-offset-transparent"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="postcode"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder={t('billingInfo.postcode')}
                          className="text-sm placeholder:text-xs rounded-none border-t-0 ring-transparent ring-offset-transparent"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="region"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder={t('billingInfo.region')}
                        className="text-sm placeholder:text-xs rounded-none border-t-0 ring-transparent ring-offset-transparent"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="country"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder={t('billingInfo.country')}
                        className="text-sm placeholder:text-xs rounded-none rounded-b-md  border-t-0 ring-transparent ring-offset-transparent"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="space-y-1">
            <FormLabel className="text-xs">{t('cardInfo.title')}</FormLabel>
            <div>
              <FormField
                control={form.control}
                name="cardNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="1234 1234 1234"
                        className="text-sm placeholder:text-xs rounded-none rounded-t-md "
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />

              <div className="flex">
                <FormField
                  control={form.control}
                  name="cardExpiryDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="MM / YY"
                          className="text-sm placeholder:text-xs rounded-none border-t-0 ring-transparent ring-offset-transparent rounded-bl-md"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="cvc"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="CVC"
                          className="text-sm placeholder:text-xs rounded-none border-t-0 ring-transparent ring-offset-transparent rounded-br-md"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="w-full flex flex-col items-center gap-3">
          <Button
            type="submit"
            className="w-52 h-9 bg-primary text-primary-foreground font-bold"
          >
            {t('processPayment')}
          </Button>
        </div>
      </form>
    </Form>
  );
}
