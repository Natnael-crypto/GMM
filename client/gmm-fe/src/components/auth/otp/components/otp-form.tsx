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
import { Otp, OtpSchema } from '@/lib/schemas/auth';
import { resendOtp, sendOtp, verifyOtp } from '@/actions/auth/otp';
import { useRouter } from '@/lib/navigation';
import Loading from '@/components/ui/loading';
import { useToast } from '@/components/ui/use-toast';
import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { setToken } from '@/lib/auth/slice';

interface OtpFormProps {
  userIdentifier: string;
  verificationType: 'email' | 'phone';
}

export function OtpForm({ userIdentifier, verificationType }: OtpFormProps) {
  const t = useTranslations('Auth.otp');
  const { push, replace } = useRouter();
  const { toast } = useToast();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const params = useSearchParams();

  let des;
    if(verificationType === 'phone') {
      des = 'Phone number';
    }
    else {
      des = 'Email';
    }
  
  const [isOtpVerificationInProgress, setOtpVerificationInProgress] =
    useState(false);

  const form = useForm<Otp>({
    resolver: zodResolver(OtpSchema),
    defaultValues: {
      otp: '',
    },
  });

  async function onSubmit(data: Otp) {
    setOtpVerificationInProgress(true);
    
    let res;
    if (verificationType === 'phone' && user?.phoneNumber) {
      res = await verifyOtp(data, verificationType);
    }
    else {
      res = await verifyOtp(data , verificationType);
    }
    if (res.status === 200) {
      dispatch(setToken(res.token));
      if (verificationType === 'phone') {
        if (params.get('account') === 'guardian') {
          replace('/guardian/settings');
          return;
        }
        replace('dashboard/personal-info');
        return;

      } else {

        if (params.get('account') === 'guardian') {
          replace('/guardian/settings');
          return;
        }
        return push('/checkout');

      }
    } else {
      toast({
        title: 'OTP Verification',
        description: res.message,
      });
    }
    setOtpVerificationInProgress(false);
  }

  async function handleResendOtp() {
    try {

      let res;
      if (verificationType === 'phone' && user?.phoneNumber) {
        res = await resendOtp(verificationType, user?.phoneNumber);
      }
      else {
        res = await resendOtp(verificationType);
      }

      if (res.status === 200) {
        toast({
          title: 'OTP Resent',
          description: `We have resent the OTP to your ${verificationType}.`,
        });
      } else {
        toast({
          title: 'OTP Resent',
          description: 'An error occurred. Please try again later.',
        });
      }
    } catch (e) {
      console.log(e);
      toast({
        title: 'OTP Resent',
        description: 'An error occurred. Please try again later.',
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-5">
        <div className="space-y-2">
          <FormLabel>{t('title' , {title: verificationType})}</FormLabel>
          <FormField
            control={form.control}
            name="otp"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    className="text-sm placeholder:text-xs"
                    placeholder="000000"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
        </div>
        <div className="w-full flex items-center gap-3">
          <Button
            type="submit"
            className="h-9 px-5 bg-primary text-primary-foreground font-bold text-xs cta"
            disabled={isOtpVerificationInProgress}
          >
            {isOtpVerificationInProgress ? <Loading /> : t('submit')}
          </Button>
          <Button
            variant={'outline'}
            className="h-9 text-xs text-muted-foreground cta"
            type="button"
            onClick={handleResendOtp}
          >
            {t('resend')}
          </Button>
        </div>

        <div className="text-xs text-muted-foreground">
          {t('resendDescription', {email : userIdentifier,
            type : des
          } )}
        </div>
      </form>
    </Form>
  );
}
