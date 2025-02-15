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
import { resendOtp, verifyOtp } from '@/actions/auth/otp';
import { useRouter } from '@/lib/navigation';
import Loading from '@/components/ui/loading';
import { useToast } from '@/components/ui/use-toast';
import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useAppDispatch } from '@/lib/hooks';
import { setToken } from '@/lib/auth/slice';

export function OtpForm({ userIdentifier }: { userIdentifier: string }) {
  const t = useTranslations('Auth.otp');
  const { push, replace } = useRouter();
  const { toast } = useToast();
  const dispatch = useAppDispatch();

  const params = useSearchParams();

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
    const res = await verifyOtp(data);

    if (res.status === 200) {
      dispatch(setToken(res.token));
      if (params.get('account') === 'guardian') {
        replace('/guardian');
        return;
      }
      return push('/registration');
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
      const res = await resendOtp();

      if (res.status === 200) {
        toast({
          title: 'OTP Resent',
          description: 'We have resent the OTP to your email.',
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
          <FormLabel>{t('title')}</FormLabel>
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
          {t('resendDescription', { email: userIdentifier })}
        </div>
      </form>
    </Form>
  );
}
