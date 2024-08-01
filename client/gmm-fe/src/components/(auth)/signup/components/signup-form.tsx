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

import Link from 'next/link';
import ExternalAuthenticator from '../../components/external-authenticator';
import OrSeparator from '../../components/or-separator';
import { useTranslations } from 'next-intl';
import { SignUp, SignUpSchema } from '@/lib/schemas/auth';
import { Checkbox } from '@/components/ui/checkbox';
import { signUp } from '@/actions/auth/signup';
import { useRouter } from '@/lib/navigation';
import { useToast } from '@/components/ui/use-toast';
import { useState } from 'react';
import Loading from '@/components/ui/loading';

export function SignUpForm() {
  const { replace } = useRouter();
  const [isSignUpInProgress, setSignUpInProgress] = useState(false);

  const form = useForm<SignUp>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      agreeToTerms: false,
    },
  });

  const { toast } = useToast();

  const t = useTranslations('Auth');

  async function onSubmit(data: SignUp) {
    setSignUpInProgress(true);

    const response = await signUp(data);

    if (response.status === 200) {
      toast({
        title: 'Sign Up',
        description: response.message,
      });
      replace('otp');
    } else {
      toast({
        title: 'Error',
        description: response.message,
        variant: 'destructive',
      });
    }

    setSignUpInProgress(false);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-5">
        <div className="space-y-2">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    className="text-sm placeholder:text-xs"
                    placeholder={t('signup.firstName')}
                    autoComplete="given-name"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    autoComplete="family-name"
                    className="text-sm placeholder:text-xs"
                    placeholder={t('signup.lastName')}
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    autoComplete="email"
                    className="text-sm placeholder:text-xs"
                    placeholder={t('signup.email')}
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
                    autoComplete="new-password"
                    className="text-sm placeholder:text-xs"
                    placeholder={t('signup.password')}
                    type="password"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    className="text-sm placeholder:text-xs"
                    placeholder={t('signup.confirmPassword')}
                    type="password"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="agreeToTerms"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center gap-3 pt-2">
                  <FormControl className="relative">
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>

                  <FormLabel className="text-xs text-muted-foreground">
                    I agree to terms and conditions
                  </FormLabel>
                </div>

                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
        </div>
        <div className="w-full flex flex-col items-center gap-3">
          <Button
            type="submit"
            className="w-52 h-9 bg-primary text-primary-foreground font-bold"
            disabled={isSignUpInProgress}
          >
            {isSignUpInProgress ? <Loading /> : t('signup.cta')}
          </Button>

          <OrSeparator />

          <ExternalAuthenticator />

          <div className="text-xs">
            {t('signup.alreadyHaveAccount')}{' '}
            <Link
              href="/en/login"
              className="text-xs text-primary font-semibold"
            >
              {t('login.cta')}
            </Link>
          </div>
        </div>
      </form>
    </Form>
  );
}
