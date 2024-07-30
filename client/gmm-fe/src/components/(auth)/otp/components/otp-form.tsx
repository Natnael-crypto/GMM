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

export function OtpForm() {
  const t = useTranslations('Auth.otp');
  const locale = useLocale();

  const form = useForm<Otp>({
    resolver: zodResolver(OtpSchema),
    defaultValues: {
      otp: '',
    },
  });

  function onSubmit(data: Otp) {
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
