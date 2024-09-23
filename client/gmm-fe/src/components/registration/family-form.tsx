import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useTranslations } from 'next-intl';
import { FamilyIntroduction, familyIntroductionSchema } from "@/lib/schemas/family-introduction";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useEffect, useRef } from 'react';
import { useUpdateProfileContext } from '@/components/dashboard/profile/update-profile-context';
import { useUpdateFamilyIntroductionMutation } from '@/lib/user/api';
import { useAppSelector } from '@/lib/hooks';
import { toast } from '@/components/ui/use-toast';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';

export default function FamilyIntroductionForm({ familyIntroduction }: { familyIntroduction?: FamilyIntroduction }) {
  const t = useTranslations('Dashboard.updateProfile.familyIntroduction');

  const form = useForm<FamilyIntroduction>({
    resolver: zodResolver(familyIntroductionSchema),
    defaultValues: {
      guardianFullName: familyIntroduction?.guardianFullName ?? '',
      relationshipToGuardian: familyIntroduction?.relationshipToGuardian ?? '',
      guardianPhoneNumber: familyIntroduction?.guardianPhoneNumber ?? '',
      guardianEmail: familyIntroduction?.guardianEmail ?? '',
    },
  })


  useEffect(() => {
    form.reset(familyIntroduction)
  }, [form, familyIntroduction])

  const user = useAppSelector(state => state.auth.user);

  const familyIntroductionFormRef = useRef<HTMLFormElement>(null);

  const { registerForm, setSaving } = useUpdateProfileContext()
  const [updateFamilyIntroduction, updateResult] = useUpdateFamilyIntroductionMutation();

  useEffect(() => {
    if (familyIntroductionFormRef && familyIntroductionFormRef.current) {
      registerForm('familyIntroductionForm', familyIntroductionFormRef.current);
    }
  }, [familyIntroductionFormRef, registerForm]);

  const onSubmit = (data: FamilyIntroduction) => {
    updateFamilyIntroduction({ userId: user!.id, familyIntroduction: data });
  }

  useEffect(() => {
    if (updateResult.isSuccess) {
      toast({
        title: 'Success',
        description: 'Family information updated successfully',
      });
    }
  }, [updateResult])

  useEffect(() => {
    setSaving(updateResult.isLoading);
  }, [updateResult, setSaving])

  return (
    <Form {...form}>
      <form
        ref={familyIntroductionFormRef}
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="col-span-2 flex justify-between items-center border-b border-b-secondary pb-1">
          <h1 className="text-primary text-lg font-bold">
            Family/Guardian Introduction
          </h1>
          <span className="text-destructive font-bold text-xs">
            Please Answer All Questions Accurately
          </span>
        </div>
        <div className="grid grid-cols-12 gap-x-3 gap-y-3 py-4">
          <div className="space-y-1 col-span-4">
            <Label className="font-normal text-xs line-clamp-1">
              {t('guardianInformation.fullName')}
            </Label>
            <FormField
              name="guardianFullName"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      className="text-muted-foreground bg-background text-xs shadow rounded-sm"
                    />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
          </div>

          <div className="space-y-1 col-span-4">
            <Label className="font-normal text-xs line-clamp-1">
              {t('guardianInformation.relationship')}
            </Label>
            <FormField
              name='relationshipToGuardian'
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="shadow text-muted-foreground bg-background text-xs rounded-sm h-8 ring-transparent ring-offset-transparent">
                        <SelectValue />
                      </SelectTrigger>

                      <SelectContent>
                        <SelectItem value="Father/Mother (parental involvement)">Father/Mother (parental involvement)</SelectItem>
                        <SelectItem value="Brother (above 18, subject to approval)">Brother (above 18, subject to approval)</SelectItem>
                        <SelectItem value="Paternal/Maternal Uncle (no father or brother)">Paternal/Maternal Uncle (no father or brother)</SelectItem>
                        <SelectItem value="Paternal/Maternal Aunts (no father or brother)">Paternal/Maternal Aunts (no father or brother)</SelectItem>
                        <SelectItem value="Imam/Mosque (Imam/mufti is my guardian/family contact)">Imam/Mosque (Imam/mufti is my guardian/family contact)</SelectItem>
                        <SelectItem value="Revert Care appoint guardian/wali (option only for reverts subject to interview and approval)">Revert Care appoint guardian/wali (option only for reverts subject to interview and approval)</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>)}
            />
          </div>

          <div className="space-y-1 col-span-4">
            <Label className="font-normal text-xs line-clamp-1">
              {t('guardianInformation.phoneNumber')}
            </Label>
            <FormField
              name="guardianPhoneNumber"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      className="text-muted-foreground bg-background text-xs shadow rounded-sm"
                    />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
          </div>

          <div className="space-y-1 col-span-6">
            <Label className="font-normal text-xs line-clamp-1">{t('guardianInformation.email')}{" "}
              {/* {user && (!user.guardian || user.guardian.email !== form.watch('guardianEmail')) && <span className='text-xs font-medium italic'>(Pending Approval)</span>} */}
            </Label>
            <FormField
              name="guardianEmail"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={Boolean(user?.guardian)}
                      className="text-muted-foreground bg-background text-xs shadow rounded-sm"
                    />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
          </div>


          <h1 className="text-xl font-bold text-secondary border-b p-1 col-span-12">
            {t('idVerification.title')}
          </h1>

          <div className="space-y-1 col-span-6">
            <Label className="font-normal text-xs line-clamp-1">
              {t('idVerification.phoneNumber')}
            </Label>
            <Input
              className="text-muted-foreground bg-background text-xs shadow rounded-sm"
              placeholder="1234567890"
            />
          </div>

          <div className="space-y-1 col-span-6">
            <Label className="font-normal text-xs line-clamp-1">
              {t('idVerification.id')}
            </Label>
            <Input
              className="text-muted-foreground bg-background text-xs shadow rounded-sm"
              type="file"
            />
          </div>
        </div>
      </form>
    </Form >
  )
}
