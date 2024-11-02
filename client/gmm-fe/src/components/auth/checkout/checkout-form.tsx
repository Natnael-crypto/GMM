'use client';

import { useTranslations } from 'next-intl';

import { useAppSelector } from '@/lib/hooks';
import { useCallback, useEffect, useState } from 'react';
import { useCreatePaymentIntentMutation } from '@/lib/checkout/api';

import { Appearance, loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { constants } from '@/config';
import StripeForm from './stripe-form';
import { StripeElementsOptions } from '@stripe/stripe-js';
import Loading from '@/components/ui/loading';
import { RadioButton } from './radio-button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import FemaleCheckoutForm from './female-checkout-form';
import { Checkbox } from '@/components/ui/checkbox';

const stripePromise = loadStripe(constants.stripe.publicKey);

export function CheckoutForm() {
  const t = useTranslations('Auth.checkout');

  const user = useAppSelector((state) => state.auth.user);
  const [createPaymentIntent, result] = useCreatePaymentIntentMutation();

  const [selectedOption, setSelectedOption] = useState<string | null>(
    '3_months'
  );

  const [showFemaleOptions, setShowFemaleOptions] = useState(false);

  const onPlanChange = useCallback(
    async (plan: string) => {
      if (plan === 'free') {
        setSelectedOption(plan);
        return;
      }

      try {
        if (user) {
          await createPaymentIntent(plan).unwrap();
          setSelectedOption(plan);
        }
      } catch (error) {
        console.error(error);
      }
    },
    [createPaymentIntent, user]
  );

  const handleGuardianCheckbox = () => {
    setShowFemaleOptions((prev) => {
      if (prev) {
        onPlanChange('3_months');
      } else {
        onPlanChange('free');
      }
      return !prev;
    });
  };

  useEffect(() => {
    if (user) {
      if (user.gender === 'Female') {
        setShowFemaleOptions(true);
        onPlanChange('free');
      } else {
        onPlanChange('3_months');
      }
    }
  }, [user, onPlanChange, setShowFemaleOptions]);

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
      },
    },
  };

  const options: StripeElementsOptions = {
    clientSecret: result?.data?.clientSecret,
    appearance,
  };

  return (
    <div>
      <div className="space-y-5">
        <div className="space-y-1">
          <Label className="text-md">{t('email')}</Label>
          <Input
            className="text-sm placeholder:text-xs"
            value={user?.email ?? ''}
            disabled
          />
        </div>

        <div className="space-y-1">
          <div className="text-md font-bold"> {t('selectMembership')}</div>

          {!showFemaleOptions && (
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
          )}

          {showFemaleOptions && (
            <div className="grid grid-cols-2 gap-x-2 gap-y-5 px-3">
              <RadioButton
                name="freePackage"
                value="free"
                selected={selectedOption === 'free'}
                onClick={() => onPlanChange('free')}
              />
            </div>
          )}
        </div>
      </div>

      {user && result && result.data && !showFemaleOptions ? (
        <Elements
          key={result.data.clientSecret}
          options={options}
          stripe={stripePromise}
        >
          <StripeForm user={user} />
        </Elements>
      ) : (
        !showFemaleOptions && (
          <div className="flex items-center justify-center p-4">
            <Loading />
          </div>
        )
      )}

      {user?.gender === 'Female' && (
        <div className="flex items-center gap-2 mt-6 font-medium text-xs">
          <Checkbox
            checked={showFemaleOptions}
            onClick={handleGuardianCheckbox}
          />{' '}
          <span>Add Guardian</span>
        </div>
      )}

      {selectedOption === 'free' && showFemaleOptions && <FemaleCheckoutForm />}
    </div>
  );
}
