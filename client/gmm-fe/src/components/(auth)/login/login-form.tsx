'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import Link from 'next/link';
import OrSeparator from '@/components/(auth)/or-separator';
import ExternalAuthenticator from '@/components/(auth)/external-authenticator';
import { useLocale, useTranslations } from 'next-intl';
import { Login, LoginSchema } from '@/lib/schemas/auth';
import { useState } from 'react';
import { login } from '@/actions/auth/login';
import { toast } from '@/components/ui/use-toast';
import { useRouter } from '@/lib/navigation';
import Loading from '@/components/ui/loading';
import { useSearchParams } from 'next/navigation';

export function LoginForm() {
  const t = useTranslations('Auth.login');
  const locale = useLocale();
  const [isLoginInProgress, setLoginInProgress] = useState(false);
  const { replace } = useRouter();
  const searchParams = useSearchParams();

  const form = useForm<Login>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  async function onSubmit(data: Login) {
    setLoginInProgress(true);

    const response = await login(data);

    if (response.status === 200) {
      toast({
        title: 'Welcome Back!',
        description: response.message,
      });

      if (localStorage.getItem('gmm-checkout-status') === 'success') {
        replace('/dashboard');
        return
      }

      replace(searchParams.get('redirect') ?? '/checkout');
    } else {
      toast({
        title: 'Error',
        description: response.message,
        variant: 'destructive',
      });
    }

    setLoginInProgress(false);
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
                    autoComplete="email"
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
                    autoComplete="current-password"
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
            disabled={isLoginInProgress}
          >
            {isLoginInProgress ? <Loading /> : t('cta')}
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
