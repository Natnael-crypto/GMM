'use client';

import { Card } from '@/components/ui/card';
import React from 'react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { passwordResetSchema, PasswordResetSchema } from '@/lib/schemas/auth';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useResetPasswordMutation } from '@/lib/auth/api';
import { toast } from '@/components/ui/use-toast';
import { useRouter } from '@/lib/navigation';
import { Button } from '@/components/ui/button';
import Loading from '@/components/ui/loading';

export default function ResetPasswordForm({ token }: { token: string }) {
  const form = useForm<PasswordResetSchema>({
    resolver: zodResolver(passwordResetSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  const router = useRouter();

  const [resetPassword, resetPasswordResult] = useResetPasswordMutation();

  const onSubmit = async (data: PasswordResetSchema) => {
    try {
      const result = await resetPassword({
        newPassword: data.password,
        token,
      }).unwrap();

      toast({
        title: 'Password Reset Successful',
      });

      router.push('/login');
    } catch (e) {
      toast({
        title: 'Password Reset Failed',
      });
    }
  };

  return (
    <div className="flex flex-col items-center justify-self-center">
      <Card className="w-full sm:min-w-96 sm:w-1/4 bg-background p-8 py-6">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-5"
          >
            <div className="space-y-2">
              <FormLabel>New Password</FormLabel>
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        autoComplete="new-password"
                        className="text-sm placeholder:text-xs"
                        placeholder="New Password"
                        type="password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
            </div>
            <div className="space-y-2">
              <FormLabel>Confirm Password</FormLabel>
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        className="text-sm placeholder:text-xs"
                        placeholder="Confirm Password"
                        type="password"
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
                disabled={resetPasswordResult.isLoading}
              >
                {resetPasswordResult.isLoading ? <Loading /> : 'Reset Password'}
              </Button>
            </div>
          </form>
        </Form>
      </Card>

      <div className="w-full sm:min-w-96 sm:w-1/4 bg-background text-wrap flex flex-col items-center gap-3 mt-6">
        
        <p className="text-xs font-semibold text-center text-muted-foreground">
          Copyright &copy; 2024 Guardian/Wali Project. All Rights Reserved.{' '}
        </p>
      </div>
    </div>
  );
}
