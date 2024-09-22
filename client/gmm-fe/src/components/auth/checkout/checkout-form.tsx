'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

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
import { useTranslations } from 'next-intl';
import { RadioButton } from './radio-button';
import { Checkout, CheckoutSchema } from '@/lib/schemas/checkout';
import { useAppSelector } from '@/lib/hooks';
import { useEffect, useRef } from 'react';
import { useCreateCheckoutMutation } from '@/lib/checkout/api';
import { useRouter } from '@/lib/navigation';

export function CheckoutForm() {
  const t = useTranslations('Auth.checkout');
  const user = useAppSelector((state) => state.auth.user);
  const [createCheckout, result] = useCreateCheckoutMutation();
  const router = useRouter()

  const ref = useRef<HTMLInputElement>(null)

  const form = useForm<Checkout>({
    resolver: zodResolver(CheckoutSchema),
    defaultValues: {
      email: user?.email || '',
      membershipPackage: '3_months',
    },
  });

  useEffect(() => {
    if (user) {
      form.reset({
        email: user.email,
        membershipPackage: '3_months',
      });
      if (ref.current) {
        console.log('hhh')
        ref.current.click()
      }
    }
  }, [form, user]);

  async function onSubmit(data: Checkout) {
    const response = await createCheckout({ plan: data.membershipPackage }).unwrap();

    localStorage.setItem('gmm-checkout-type', data.membershipPackage);
    localStorage.setItem('gmm-checkout-status', 'pending');

    router.push(response.url)
  }

  console.log(form.getValues())
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
              name="membershipPackage"
              render={({ field }) => {
                return (
                  <>
                    <fieldset className="grid grid-cols-2 gap-x-2 gap-y-5 py-3">
                      <RadioButton
                        name="membershipPackage"
                        membershipPackage="monthlyPackage"
                        membershipPackageId="1_month"
                        field={field}
                      />
                      <RadioButton
                        ref={ref}
                        name="membershipPackage"
                        membershipPackage="threeMonthsPackage"
                        membershipPackageId="3_months"
                        field={field}
                      />
                      <RadioButton
                        name="membershipPackage"
                        membershipPackage="sixMonthsPackage"
                        membershipPackageId="6_months"
                        field={field}
                      />
                      <RadioButton
                        name="membershipPackage"
                        membershipPackage="twelveMonthsPackage"
                        membershipPackageId="12_months"
                        field={field}
                      />
                    </fieldset>
                    <FormMessage className="text-xs" />
                  </>
                );
              }}
            />
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
