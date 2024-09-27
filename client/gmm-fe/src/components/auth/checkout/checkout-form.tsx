'use client';


import { useTranslations } from 'next-intl';

import { useAppSelector } from '@/lib/hooks';
import { useEffect, useState } from 'react';
import { useCreatePaymentIntentMutation } from '@/lib/checkout/api';


import { Appearance, loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { constants } from '@/config';
import StripeForm from './stripe-form';
import { StripeElementsOptions } from '@stripe/stripe-js';
import Loading from '@/components/ui/loading';
import { RadioButton } from './radio-button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

const stripePromise = loadStripe(constants.stripe.publicKey);

export function CheckoutForm() {
  const t = useTranslations('Auth.checkout');

  const user = useAppSelector((state) => state.auth.user);
  const [createPaymentIntent, result] = useCreatePaymentIntentMutation();

  const [selectedOption, setSelectedOption] = useState<string | null>('3_months');

  const onPlanChange = async (plan: string) => {
    try {
      await createPaymentIntent(plan).unwrap();
      setSelectedOption(plan);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (user) {
      onPlanChange('3_months');
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const appearance: Appearance = {
    theme: 'flat',
    variables: {
      borderRadius: '0.3rem',
      fontSizeXs: '0.875rem',
      fontSizeLg: '0.875rem',
      fontSizeSm: '0.875rem',
      fontSizeBase: '0.875rem',
      fontSizeXl: '0.875rem',
      focusOutline: 'none',
      focusBoxShadow: 'none',
      colorBackground: 'white',
    },
    rules: {
      '.Input': {
        border: '1px solid #E0E6EB',
        height: '1rem',
      },
      '.Label': {
        display: 'none'
      }
    }
  };

  const options: StripeElementsOptions = {
    clientSecret: result?.data?.clientSecret,
    appearance,
  };

  return (
    <div>
      <div className="space-y-5 text-sm">
        <div className="space-y-1">
          <Label className="text-xs">{t('email')}</Label>
          <Input className="text-sm placeholder:text-xs" value={user?.email ?? ''} disabled />
        </div>

        <div className="space-y-1">
          <div className="text-xs"> {t('selectMembership')}</div>

          <div className="grid grid-cols-2 gap-x-2 gap-y-5 px-3">
            <RadioButton
              name="monthlyPackage"
              value="1_month"
              selected={selectedOption === '1_month'}
              onClick={() => onPlanChange('1_month')}
            />
            <RadioButton
              name="threeMonthsPackage"
              value="3_months"
              selected={selectedOption === '3_months'}
              onClick={() => onPlanChange('3_months')}
            />
            <RadioButton
              name="sixMonthsPackage"
              value="6_months"
              selected={selectedOption === '6_months'}
              onClick={() => onPlanChange('6_months')}
            />
            <RadioButton
              name="twelveMonthsPackage"
              value="12_months"
              selected={selectedOption === '12_months'}
              onClick={() => onPlanChange('12_months')}
            />
          </div>
        </div>
      </div>

      {user && result && result.data ? (
        <Elements key={result.data.clientSecret} options={options} stripe={stripePromise}>
          <StripeForm user={user} />
        </Elements>
      ) : <div className="flex items-center justify-center p-4"><Loading /></div>}
    </div>
  );
}
