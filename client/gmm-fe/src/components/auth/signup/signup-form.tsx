'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { format } from 'date-fns';
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
import { cn } from '@/lib/utils';
import Link from 'next/link';
import ExternalAuthenticator from '@/components/auth/external-authenticator';
import OrSeparator from '@/components/auth/or-separator';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from '@/components/ui/use-toast';
import Loading from '@/components/ui/loading';
import { signUp } from '@/actions/auth/signup';
import { useRouter } from '@/lib/navigation';
import { SignUp, SignUpSchema } from '@/lib/schemas/auth';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { CalendarIcon } from 'lucide-react';
import { getEighteenYearsAgo } from '@/lib/format';

export function SignUpForm() {
  const { replace } = useRouter();
  const [isSignUpInProgress, setSignUpInProgress] = useState(false);

  const form = useForm<SignUp>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      gender: 'Male',
      dateOfBirth: getEighteenYearsAgo(),
      bornOrRevertToIslam: '',
      password: '',
      confirmPassword: '',
      agreeToTerms: false,
    },
  });

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

  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

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
                    className="text-sm placeholder:text-md"
                    placeholder={t('signup.firstName')}
                    autoComplete="given-name"
                    {...field}
                    onChange={(e) => {
                      if (
                        /[0-9\(\)\[\]\{\}\+\-\*/%=!@#$^&_|`~<>.,?":;'\\]/.test(
                          e.target.value
                        )
                      ) {
                        return;
                      }
                      field.onChange(e.target.value);
                    }}
                  />
                </FormControl>
                <FormMessage className="text-md" />
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
                    className="text-sm placeholder:text-md"
                    placeholder={t('signup.lastName')}
                    {...field}
                    onChange={(e) => {
                      if (
                        /[0-9\(\)\[\]\{\}\+\-\*/%=!@#$^&_|`~<>.,?":;'\\]/.test(
                          e.target.value
                        )
                      ) {
                        return;
                      }
                      field.onChange(e.target.value);
                    }}
                  />
                </FormControl>
                <FormMessage className="text-md" />
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
                    className="text-sm placeholder:text-md"
                    placeholder={t('signup.email')}
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-md" />
              </FormItem>
            )}
          />
          <FormField
            name="gender"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="text-md text-muted-foreground bg-background rounded-sm h-8 ring-transparent ring-offset-transparent">
                      <SelectValue placeholder="Gender" className="text-md" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem className="text-md max-w-80" value="Male">
                        Male
                      </SelectItem>
                      <SelectItem className="text-md max-w-80" value="Female">
                        Female
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage className="text-md" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="dateOfBirth"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={'outline'}
                        className={cn(
                          'w-full pl-3 text-left font-normal h-8 rounded-sm text-md text-muted-foreground'
                        )}
                      >
                        {field.value ? (
                          format(field.value, 'PPP')
                        ) : (
                          <span>Date of Birth</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <div className="relative h-72 overflow-auto p-2">
                      <Select
                        onValueChange={(value) => {
                          field.onChange(new Date(value));
                        }}
                      >
                        <SelectTrigger className="z-50 sticky top-0 bg-background h-10 py-1">
                          <SelectValue placeholder="Select Year" />
                        </SelectTrigger>
                        <SelectContent position="popper">
                          {Array.from(
                            { length: 100 },
                            (_, i) => getEighteenYearsAgo().getFullYear() - i
                          ).map((year) => (
                            <SelectItem key={year} value={year.toString()}>
                              {year}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>

                      <Calendar
                        key={field.value?.toString() ?? 'date_of_birth'}
                        mode="single"
                        selected={field.value}
                        onSelect={(value) => {
                          field.onChange(value);
                          setIsCalendarOpen(false);
                        }}
                        disabled={(date) =>
                          date > getEighteenYearsAgo() ||
                          date < new Date('1900-01-01')
                        }
                        defaultMonth={field.value}
                      />
                    </div>
                  </PopoverContent>
                </Popover>

                <FormMessage className="text-md" />
              </FormItem>
            )}
          />

          <FormField
            name="bornOrRevertToIslam"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="text-muted-foreground bg-background text-md rounded-sm h-8 ring-transparent ring-offset-transparent">
                      <SelectValue placeholder="Born or Revert to Islam" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem className="text-md" value="Born Muslim">
                        Born Muslim
                      </SelectItem>
                      <SelectItem className="text-md" value="Reverted to Islam">
                        Reverted to Islam
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage className="text-md" />
              </FormItem>
            )}
          />

          <div className="text-sm pt-2 pb-3 text-center">
            The above fields can not be updated after sign up. Please verify
            your details before proceeding.
          </div>

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    autoComplete="new-password"
                    className="text-sm placeholder:text-md"
                    placeholder={t('signup.password')}
                    type="password"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-md" />
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
                    className="text-sm placeholder:text-md"
                    placeholder={t('signup.confirmPassword')}
                    type="password"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-md" />
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

                  <FormLabel className="text-sm text-muted-foreground">
                    I agree to <Link href="" className="text-sm text-primary font-semibold">terms and conditions</Link>
                  </FormLabel>
                </div>

                <FormMessage className="text-md" />
              </FormItem>
            )}
          />
        </div>
        <div className="w-full flex flex-col items-center gap-3">
          <Button
            type="submit"
            className="w-52 h-9 bg-primary text-primary-foreground font-bold cta"
            disabled={isSignUpInProgress}
          >
            {isSignUpInProgress ? <Loading /> : t('signup.cta')}
          </Button>

          <OrSeparator />

          <ExternalAuthenticator />

          <div className="text-sm">
            {t('signup.alreadyHaveAccount')}{' '}
            <Link
              href="/en/login"
              className="text-sm text-primary font-semibold"
            >
              {t('login.cta')}
            </Link>
          </div>
        </div>
      </form>
    </Form>
  );
}
