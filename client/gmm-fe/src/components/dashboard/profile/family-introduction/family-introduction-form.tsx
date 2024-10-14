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
import { useUpdateProfileContext } from '../update-profile-context';
import { useUpdateFamilyIntroductionMutation } from '@/lib/user/api';
import { useAppSelector } from '@/lib/hooks';
import { toast } from '@/components/ui/use-toast';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { useSendRequestMutation } from '@/lib/guardian/api';

export default function FamilyIntroductionForm({ familyIntroduction }: { familyIntroduction?: FamilyIntroduction }) {
    const t = useTranslations('Dashboard.updateProfile.familyIntroduction');

    const user = useAppSelector(state => state.auth.user);


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
        if (user && user.guardian) {
            form.reset({
                ...familyIntroduction,
                guardianEmail: user.guardian.email,
            });
        } else {
            form.reset(familyIntroduction);
        }
    }, [form, familyIntroduction, user])

    const familyIntroductionFormRef = useRef<HTMLFormElement>(null);

    const { registerForm, setSaving } = useUpdateProfileContext()
    const [updateFamilyIntroduction, updateResult] = useUpdateFamilyIntroductionMutation();
    const [sendGuardianRequest, sendGuardianRequestResult] = useSendRequestMutation();

    useEffect(() => {
        if (familyIntroductionFormRef && familyIntroductionFormRef.current) {
            registerForm('familyIntroductionForm', familyIntroductionFormRef.current);
        }
    }, [familyIntroductionFormRef, registerForm]);

    const onSubmit = async (data: FamilyIntroduction) => {
        return
        updateFamilyIntroduction({ userId: user!.id, familyIntroduction: data });

        try {
            const result = await sendGuardianRequest({ guardianEmail: data.guardianEmail }).unwrap();

            if (result) {
                toast({
                    title: 'Success',
                    description: 'Guardian request sent successfully',
                });
            }
        } catch (error) {
            console.error(error);
        }

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
                className="pb-8 px-6 sm:px-16 md:px-24 lg:px-52">
                <div className="grid grid-cols-12 gap-x-3 gap-y-3 py-4">
                    <div className="space-y-1 col-span-4">
                        <Label>
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
                                            disabled
                                            className="text-muted-foreground bg-background text-xs shadow rounded-sm"
                                        />
                                    </FormControl>
                                    <FormMessage className="text-xs" />
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="space-y-1 col-span-4">
                        <Label>
                            {t('guardianInformation.relationship')}
                        </Label>
                        <FormField
                            name='relationshipToGuardian'
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Select onValueChange={field.onChange} value={field.value}>
                                            <SelectTrigger className="shadow text-muted-foreground bg-background text-xs rounded-sm h-8 ring-transparent ring-offset-transparent" disabled>
                                                <SelectValue />
                                            </SelectTrigger>

                                            <SelectContent>
                                                <SelectItem value="Father/Mother (parental involvement)">Father/Mother (parental involvement)</SelectItem>
                                                <SelectItem value="Brother (above 18, min 12 years older)">Brother (above 18, min 12 years older)</SelectItem>
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
                        <Label>
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
                                            disabled
                                            className="text-muted-foreground bg-background text-xs shadow rounded-sm"
                                        />
                                    </FormControl>
                                    <FormMessage className="text-xs" />
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="space-y-1 col-span-6">
                        <Label>{t('guardianInformation.email')}{" "}
                            {user && (!user.guardian || user.guardian.email !== form.watch('guardianEmail')) && <span className='text-xs font-medium italic'>(Pending Approval)</span>}
                        </Label>
                        <FormField
                            name="guardianEmail"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            disabled
                                            className="text-muted-foreground bg-background text-xs shadow rounded-sm"
                                        />
                                    </FormControl>
                                    <FormMessage className="text-xs" />
                                </FormItem>
                            )}
                        />
                    </div>

                    {/* <div className="space-y-1 col-span-6">
                        <Label>
                            {t('idVerification.id')}
                        </Label>
                        <Input
                            className="text-muted-foreground bg-background text-xs shadow rounded-sm"
                            type="file"
                        />
                    </div> */}

                    <h1 className="text-xl font-bold text-secondary border-b p-1 col-span-12">
                        {t('idVerification.title')}
                    </h1>

                    <div className="space-y-1 col-span-6">
                        <Label>
                            {t('idVerification.phoneNumber')}
                        </Label>
                        <Input
                            className="text-muted-foreground bg-background text-xs shadow rounded-sm"
                            placeholder="1234567890"
                            disabled
                        />
                    </div>

                    <div className="space-y-1 col-span-6">
                        <Label>
                            {t('idVerification.id')}
                        </Label>
                        <Input
                            className="text-muted-foreground bg-background text-xs shadow rounded-sm"
                            type="file"
                            disabled
                        />
                    </div>
                </div>
            </form>
        </Form >
    )
}
