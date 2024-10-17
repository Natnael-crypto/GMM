'use client';

import React from 'react';
import {
  FamilyIntroduction,
  familyIntroductionSchema,
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

export default function FemaleCheckoutForm() {
  const t = useTranslations('Dashboard.updateProfile.familyIntroduction');

  const form = useForm<FamilyIntroduction>({
    resolver: zodResolver(familyIntroductionSchema),
    defaultValues: {
      guardianFirstName: '',
      guardianLastName: '',
      relationshipToGuardian: '',
      guardianPhoneNumber: '',
      guardianEmail: '',
    },
  });

  const onSubmit = (data: FamilyIntroduction) => {
    //
  };

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

            <div className="space-y-1 col-span-4">
              <Label>{t('guardianInformation.phoneNumber')}</Label>
              <FormField
                name="guardianPhoneNumber"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        className="text-muted-foreground bg-background text-xs rounded-sm"
                      />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
