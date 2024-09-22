'use client'

import { signUpWithLink } from '@/actions/auth/signup';
import { Button, buttonVariants } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { useAppSelector } from '@/lib/hooks';
import { useRouter } from '@/lib/navigation';
import { SignUpWithLink, signUpWithLinkSchema } from '@/lib/schemas/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
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
import { Label } from '@/components/ui/label';
import { useSearchParams } from 'next/navigation';

export default function GuardianRegistrationPage() {
  const t = useTranslations('Auth');

  const { replace } = useRouter();

  const user = useAppSelector((state) => state.auth.user);
  const params = useSearchParams()

  console.log(params, params.get('token'))

  const form = useForm<SignUpWithLink>({
    resolver: zodResolver(signUpWithLinkSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      token: params.get('token') || '',
      password: '',
    },
  });

  async function onSubmit(data: SignUpWithLink) {
    const response = await signUpWithLink(data);

    if (response.status === 200) {
      toast({
        title: 'Sign Up',
        description: response.message,
      });
      replace('otp?account=guardian');
    } else {
      toast({
        title: 'Error',
        description: response.message,
        variant: 'destructive',
      });
    }
  }


  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="rounded-xl bg-background shadow-lg p-5 space-y-4 text-sm">
        <div className="flex justify-between items-end">
          <h1 className="text-xl">Guardian&apos;s Registration</h1>
          <span>User ID #11223344</span>
        </div>

        <div className="divide-y space-y-2">
          <div className="flex justify-between items-center py-2 pt-3">
            <div className="flex flex-col gap-1">
              <span className="font-bold">Full Name</span>

              <div className='flex gap-2'>
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
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center py-2 pt-3">
            <div className="flex flex-col gap-1">
              <span className="font-bold">Password</span>
              <div className='flex gap-2'>
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
                /></div>
            </div>


          </div>
          {/* <div className="flex justify-between items-center py-2 pt-3">
            <div className="flex flex-col gap-1">
              <span className="font-bold">Relationship to Applicant</span>
              <span className="flex gap-3 items-center">

                <span className="text-destructive text-[0.6rem] gap-1 flex items-center justify-center">
                </span>
              </span>
            </div>


          </div> */}

          <div className="flex justify-between items-center py-2 pt-3">
            <div className="flex flex-col gap-1">
              <span className="font-bold">Phone Number</span>

              <FormItem>
                <FormControl>
                  <Input
                    className="text-sm placeholder:text-xs"
                    placeholder='Phone number'
                  />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>

            </div>


          </div>

          <div className="flex justify-between items-center py-2 pt-3">
            <div className="flex flex-col gap-1">
              <span className="font-bold">Guardian ID</span>
              <span className="flex gap-3 items-center">
                {user?.phone}{' '}
                <span className="text-destructive text-[0.6rem] gap-1 flex items-center justify-center">
                  {/* <FontAwesomeIcon className="text-xs" icon={faXmarkCircle} />
                <span className="font-bold">{t('unverified')}</span> */}
                </span>
              </span>
            </div>

            <div className="flex gap-2">
              <label className={cn(buttonVariants({ variant: "outline" }), "text-secondary h-7 text-xs")}>
                Upload Document
                <input type='file' className='hidden' />
              </label>
              <label className={cn(buttonVariants({ variant: "outline" }), "text-secondary h-7 text-xs")}>
                View Document
                <input type='file' className='hidden' />
              </label>
            </div>
          </div>

          <div className="h-24">
            <Button className={cn(buttonVariants({ variant: "outline" }), "text-secondary h-7 text-xs")}>Register</Button>
          </div>
        </div>
      </form>
    </Form >
  );
}
