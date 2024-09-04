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
import RadioButton from './radio-button';
import { Checkout, CheckoutSchema } from '@/lib/schemas/checkout';
import { useAppSelector } from '@/lib/hooks';
import { useEffect } from 'react';
import { useCreateCheckoutMutation } from '@/lib/checkout/api';
import { useRouter } from '@/lib/navigation';

export function CheckoutForm() {
  const t = useTranslations('Auth.checkout');
  const user = useAppSelector((state) => state.auth.user);
  const [createCheckout, result] = useCreateCheckoutMutation();
  const router = useRouter()

  const form = useForm<Checkout>({
    resolver: zodResolver(CheckoutSchema),
    defaultValues: {
      email: '',
      membershipPackage: '',
      name: '',
      addressOne: '',
      addressTwo: '',
      city: '',
      postcode: '',
      region: '',
      country: '',
      cardNumber: '',
      cardExpiryDate: '',
      cvc: '',
    },
  });

  useEffect(() => {
    if (user) {
      form.reset({
        email: user.email,
        name: user.firstName ? user.firstName + ' ' + user.lastName : '',
      });
    }
  }, [form, user]);

  async function onSubmit(data: Checkout) {
    const response = await createCheckout({ plan: data.membershipPackage }).unwrap();

    localStorage.setItem('gmm-checkout-type', data.membershipPackage);
    localStorage.setItem('gmm-checkout-status', 'pending');

    router.push(response.url)
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
