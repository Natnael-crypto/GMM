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
import { useLocale, useTranslations } from 'next-intl';
import { Otp, OtpSchema } from '@/lib/schemas/auth';
import { verifyOtp } from '@/actions/auth/otp';
import { useRouter } from '@/lib/navigation';

export function OtpForm() {
  const t = useTranslations('Auth.otp');
  const locale = useLocale();
  const { replace } = useRouter();

  const form = useForm<Otp>({
    resolver: zodResolver(OtpSchema),
    defaultValues: {
      otp: '',
    },
  });

  async function onSubmit(data: Otp) {
    const res = await verifyOtp(data);

    if (res && res.status === 200) {
      replace('/login');
    } else {
      console.log('An error occurred');
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
            className="h-9 px-5 bg-primary text-primary-foreground font-bold text-xs"
          >
            {t('submit')}
          </Button>
          <Button
            variant={'outline'}
            className="h-9 text-xs text-muted-foreground"
          >
            {t('resend')}
          </Button>
        </div>

        <div className="text-xs text-muted-foreground">
          {t('resendDescription', { email: 'example@domain.com' })}
        </div>
      </form>
    </Form>
  );
}
