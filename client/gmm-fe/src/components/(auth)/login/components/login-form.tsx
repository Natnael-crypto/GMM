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
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { loginFormSchema } from '@/types/forms';
import Link from 'next/link';
import OrSeparator from '../../components/or-separator';
import ExternalAuthenticator from '../../components/external-authenticator';
import { useLocale, useTranslations } from 'next-intl';

export function LoginForm() {
  const t = useTranslations('Auth.login');
  const locale = useLocale();

  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  function onSubmit(data: z.infer<typeof loginFormSchema>) {
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
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    className="text-sm placeholder:text-xs"
                    placeholder={t('email')}
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    className="text-sm placeholder:text-xs"
                    placeholder={t('password')}
                    type="password"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
        </div>
        <div className="w-full flex flex-col items-center gap-3">
          <Button
            type="submit"
            className="w-52 h-9 bg-primary text-primary-foreground font-bold"
          >
            {t('cta')}
          </Button>
          <Link
            href={`/${locale}/signup`}
            className="text-xs text-primary font-semibold"
          >
            {t('forgotPassword')}
          </Link>

          <OrSeparator />

          <ExternalAuthenticator />

          <div className="text-xs">
            {t('dontHaveAccount')}{' '}
            <Link
              href={`/${locale}/signup`}
              className="text-xs text-primary font-semibold"
            >
              {t('signup')}
            </Link>
          </div>
        </div>
      </form>
    </Form>
  );
}
