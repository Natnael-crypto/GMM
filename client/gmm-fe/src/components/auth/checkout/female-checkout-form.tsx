'use client';

import React, { useEffect } from 'react';
import {
  FamilyIntroduction,
  familyIntroductionSchema,
  guardianRegistration,
} from '@/lib/schemas/family-introduction';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Label } from '@radix-ui/react-label';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useTranslations } from 'next-intl';
import { useUpdateFamilyIntroductionMutation } from '@/lib/user/api';
import { useRouter } from '@/lib/navigation';
import { useAppSelector } from '@/lib/hooks';
import { Button } from '@/components/ui/button';
import Loading from '@/components/ui/loading';
import { useConfirmFreeSubscriptionMutation } from '@/lib/checkout/api';
import { toast } from '@/components/ui/use-toast';
import { PhoneInput } from '@/components/ui/phone-input';

export default function FemaleCheckoutForm() {
  const user = useAppSelector((state) => state.auth.user);

  const t = useTranslations('Dashboard.updateProfile.familyIntroduction');

  const form = useForm<FamilyIntroduction>({
    resolver: zodResolver(guardianRegistration),
    defaultValues: {
      guardianFirstName: '',
      guardianLastName: '',
      relationshipToGuardian: '',
      guardianPhoneNumber: '',
      guardianEmail: '',
    },
  });

  const router = useRouter();

  const [updateFamilyIntroduction, updateResult] =
    useUpdateFamilyIntroductionMutation();

  const [confirmFreeSubscription, freeSubscriptionResult] =
    useConfirmFreeSubscriptionMutation();

  const onSubmit = (data: FamilyIntroduction) => {
    if (updateResult.isLoading) return;
    if (!user) return;

    updateFamilyIntroduction({ userId: user.id, familyIntroduction: data });
  };

  useEffect(() => {
    if (updateResult.isSuccess) {
      confirmFreeSubscription()
        .unwrap()
        .then(() => {
          if (user?.registered) {
            router.replace('/dashboard');
          } else {
            router.replace('/registration');
          }
        })
        .catch((error) => {
          toast({
            title: 'Error',
            description: error.message,
          });
        });
      router.push('/dashboard');
    }
  }, [updateResult, router, confirmFreeSubscription, user]);

  return (
    <div className="space-y-10">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-3 py-4">
            <div className="space-y-1 col-span-4">
              <Label>{t('guardianInformation.firstName')}</Label>
              <FormField
                name="guardianFirstName"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
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
                        className="text-muted-foreground bg-background text-xs rounded-sm"
                      />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
            </div>

            <div className="space-y-1 col-span-4">
              <Label>{t('guardianInformation.lastName')}</Label>
              <FormField
                name="guardianLastName"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
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
                        className="text-muted-foreground bg-background text-xs rounded-sm"
                      />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
            </div>

            <div className="space-y-1 col-span-4">
              <Label>{t('guardianInformation.relationship')}</Label>
              <FormField
                name="relationshipToGuardian"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger className="text-muted-foreground bg-background text-xs rounded-sm h-8 ring-transparent ring-offset-transparent">
                          <SelectValue />
                        </SelectTrigger>

                        <SelectContent>
                          <SelectItem value="Father/Mother (parental involvement)">
                            Father/Mother (parental involvement)
                          </SelectItem>
                          <SelectItem value="Brother (above 18, min 12 years older)">
                            Brother (above 18, min 12 years older)
                          </SelectItem>
                          <SelectItem value="Paternal/Maternal Uncle (no father or brother)">
                            Paternal/Maternal Uncle (no father or brother)
                          </SelectItem>
                          <SelectItem value="Paternal/Maternal Aunts (no father or brother)">
                            Paternal/Maternal Aunts (no father or brother)
                          </SelectItem>
                          <SelectItem value="Imam/Mosque (Imam/mufti is my guardian/family contact)">
                            Imam/Mosque (Imam/mufti is my guardian/family
                            contact)
                          </SelectItem>
                          <SelectItem value="Revert Care appoint guardian/wali (option only for reverts subject to interview and approval)">
                            Revert Care appoint guardian/wali (option only for
                            reverts subject to interview and approval)
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
            </div>

            <div className="space-y-1 py-2 col-span-6">
              <Label>{t('guardianInformation.email')} </Label>
              <FormField
                name="guardianEmail"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        className="text-muted-foreground bg-background text-md shadow rounded-sm"
                      />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
            </div>

            <div className="space-y-1 col-span-4">
              <Label>{t('guardianInformation.phoneNumber')}</Label>
              <FormField
                name="guardianPhoneNumber"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <PhoneInput
                        {...field}
                        className="text-muted-foreground bg-background text-md rounded-sm"
                      />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <Button
            type="submit"
            className="h-9 bg-primary text-primary-foreground font-bold w-full"
            disabled={updateResult.isLoading}
          >
            {updateResult.isLoading ? <Loading /> : 'Submit'}
          </Button>
        </form>
      </Form>
    </div>
  );
}
