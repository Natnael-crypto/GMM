'use client';

import { useTranslations } from 'next-intl';

import { useAppSelector } from '@/lib/hooks';
import { useCallback, useEffect, useState } from 'react';
import {
  useCreatePaymentIntentMutation,
  useUpdatePaymentIntentMutation,
} from '@/lib/checkout/api';

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
import PromoCodeForm from './promo-code-form';

const stripePromise = loadStripe(constants.stripe.publicKey);

export function CheckoutForm() {
  const t = useTranslations('Auth.checkout');

  const user = useAppSelector((state) => state.auth.user);
  const [createPaymentIntent, createResult] = useCreatePaymentIntentMutation();
  const [updatePaymentIntent, updateResult] = useUpdatePaymentIntentMutation();

  const [selectedOption, setSelectedOption] = useState<string | null>(
    '3_months'
  );
  const [showFemaleOptions, setShowFemaleOptions] = useState(false);
  const [clientSecret, setClientSecret] = useState<string | undefined>(
    undefined
  );
  const [paymentIntentId, setPaymentIntentId] = useState<string | undefined>(
    undefined
  );
  const [promoCodeId, setPromoCodeId] = useState<string | undefined>(undefined);

  const onPlanChange = useCallback(
    async (plan: string) => {
      if (plan === 'free') {
        setSelectedOption(plan);
        return;
      }

      try {
        if (user) {
          if (clientSecret && paymentIntentId) {
            const updatedIntent = await updatePaymentIntent({
              plan,
              paymentIntentId,
              promoCodeId,
            }).unwrap();

            setClientSecret(updatedIntent.clientSecret);
          } else {
            const newIntent = await createPaymentIntent({
              plan,
              promoCodeId,
            }).unwrap();
            setClientSecret(newIntent.clientSecret);
            setPaymentIntentId(newIntent.paymentIntentId);
          }

          setSelectedOption(plan);
        }
      } catch (error) {
        console.error(error);
      }
    },
    [
      clientSecret,
      createPaymentIntent,
      paymentIntentId,
      updatePaymentIntent,
      user,
      promoCodeId,
    ]
  );

  const onPromoCodeApply = useCallback(
    async (promoCodeId: string) => {
      try {
        if (user) {
          if (clientSecret && paymentIntentId) {
            const updatedIntent = await updatePaymentIntent({
              plan: selectedOption ?? '3_months',
              paymentIntentId,
              promoCodeId,
            }).unwrap();

            setClientSecret(updatedIntent.clientSecret);
          } else {
            const newIntent = await createPaymentIntent({
              plan: selectedOption ?? '3_months',
              promoCodeId,
            }).unwrap();
            setClientSecret(newIntent.clientSecret);
            setPaymentIntentId(newIntent.paymentIntentId);
          }

          setPromoCodeId(promoCodeId);
        }
      } catch (error) {
        console.error(error);
      }
    },
    [
      selectedOption,
      clientSecret,
      createPaymentIntent,
      paymentIntentId,
      updatePaymentIntent,
      user,
    ]
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

  // Initial plan selection
  useEffect(() => {
    if (user && !clientSecret) {
      if (
        user.gender === 'Female' &&
        user.currentCountry !== 'Morocco' &&
        user.currentCountry !== 'Algeria'
      ) {
        setShowFemaleOptions(true);
        onPlanChange('free');
      } else {
        onPlanChange('3_months');
      }
    }
  }, [user, onPlanChange, clientSecret, setShowFemaleOptions]);

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
    clientSecret,
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

        {!showFemaleOptions && <PromoCodeForm onApply={onPromoCodeApply} />}
      </div>

      {user?.gender === 'Female' &&
        user?.currentCountry !== 'Algeria' &&
        user?.currentCountry !== 'Morocco' &&
        !user?.guardian && (
          <div className="flex items-center gap-2 mt-6 font-medium text-xs">
            <Checkbox
              checked={showFemaleOptions}
              onClick={handleGuardianCheckbox}
            />{' '}
            <span>Add Guardian</span>
          </div>
        )}

      {user && clientSecret && !showFemaleOptions ? (
        <Elements options={options} stripe={stripePromise}>
          <StripeForm
            user={user}
            isLoading={createResult.isLoading || updateResult.isLoading}
          />
        </Elements>
      ) : (
        !showFemaleOptions && (
          <div className="flex items-center justify-center p-4">
            <Loading />
          </div>
        )
      )}

      {selectedOption === 'free' && showFemaleOptions && <FemaleCheckoutForm />}
    </div>
  );
}
