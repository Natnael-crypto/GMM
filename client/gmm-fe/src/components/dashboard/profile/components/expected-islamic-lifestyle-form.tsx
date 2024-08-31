'use client'

import { useEffect, useRef } from 'react'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { ExpectedIslamicLifestyle, expectedIslamicLifestyleSchema } from '@/lib/schemas/islamic-lifestyle';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useAppSelector } from '@/lib/hooks';
import { useUpdateProfileContext } from '../../components/update-profile-context';
import { useUpdateExpectedIslamicLifestyleMutation } from '@/lib/user/api';
import { toast } from '@/components/ui/use-toast';

export default function ExpectedIslamicLifestyleForm({ expectedIslamicLifestyle }: { expectedIslamicLifestyle?: ExpectedIslamicLifestyle }) {
    const form = useForm<ExpectedIslamicLifestyle>({
        resolver: zodResolver(expectedIslamicLifestyleSchema),
        defaultValues: {
            salat: '',
            hijab: '',
            appearance: '',
            familyStructure: '',
            childrenAndUpbringing: '',
            socialMedia: '',
            nonMehramContact: '',
            obedienceToHusband: '',
            obedienceToInLaws: ''
        }
    });

    useEffect(() => {
        form.reset(expectedIslamicLifestyle)
    }, [form, expectedIslamicLifestyle]);

    const user = useAppSelector((state) => state.auth.user);
    const expectedIslamicLifestyleFormRef = useRef<HTMLFormElement>(null);

    const { registerForm } = useUpdateProfileContext()
    const [updateExpectedIslamicLifestyle, updateResult] = useUpdateExpectedIslamicLifestyleMutation();

    useEffect(() => {
        if (expectedIslamicLifestyleFormRef && expectedIslamicLifestyleFormRef.current) {
            registerForm('expectedIslamicLifestyleForm', expectedIslamicLifestyleFormRef.current);
        }
    }, [expectedIslamicLifestyleFormRef, registerForm]);

    const onSubmit = (data: ExpectedIslamicLifestyle) => {
        updateExpectedIslamicLifestyle({ userId: user!.id, expectedIslamicLifestyle: data });
    }


    useEffect(() => {
        if (updateResult.isSuccess) {
            toast({
                title: 'Success',
                description: 'Expected Islamic lifestyle updated successfully',
            });
        }
    }, [updateResult])


    return (
        <div className="bg-muted w-full py-4 px-6 sm:px-16 md:px-24 lg:px-52">
            <h1 className="text-xl font-bold text-primary border-b p-1">
                Expected Islamic Lifestyle of Your Potential Spouses
            </h1>

            <Form {...form}>
                <form
                    ref={expectedIslamicLifestyleFormRef}
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="grid grid-cols-12 gap-x-3 gap-y-4 py-5">
                    <div className="space-y-1 col-span-4">
                        <Label className="font-normal text-xs">Salat/Prayers</Label>
                        <FormField
                            name='salat'
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Select onValueChange={field.onChange} value={field.value}>
                                            <SelectTrigger className="shadow text-muted-foreground bg-background text-xs rounded-sm h-8 ring-transparent ring-offset-transparent">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="Wife Must Pray Full Daily Prayers + Sunnah (Expects all obligatory and Sunnah prayers)">Wife Must Pray Full Daily Prayers + Sunnah (Expects all obligatory and Sunnah prayers)</SelectItem>
                                                <SelectItem value="Wife May Pray Fardh Only (Expect at least mandatory salat/prayers as a minimum requirement)">Wife May Pray Fardh Only (Expect at least mandatory salat/prayers as a minimum requirement)</SelectItem>
                                                <SelectItem value="Support Prayer Journey (Husband willing to support wife for prayer)">Support Prayer Journey (Husband willing to support wife for prayer)</SelectItem>
                                                <SelectItem value="Flexible Approach (As long as she says she's a Muslim, it does not matter if she prays or not)">Flexible Approach (As long as she says she&apos;s a Muslim, it does not matter if she prays or not)</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage className="text-xs" />
                                </FormItem>)}
                        />
                    </div>

                    <div className="space-y-1 col-span-4">
                        <Label className="font-normal text-xs">Hijab</Label>
                        <FormField
                            name='hijab'
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Select onValueChange={field.onChange} value={field.value}>
                                            <SelectTrigger className="shadow text-muted-foreground bg-background text-xs rounded-sm h-8 ring-transparent ring-offset-transparent">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="Wife must do Advanced Hijab (Niqab or burqa, possibly with gloves, often with eyes not visible)">Wife must do Advanced Hijab (Niqab or burqa, possibly with gloves, often with eyes not visible)</SelectItem>
                                                <SelectItem value="Wife must do Minimum Hijab (Basic Islamic attire with long dress/skirt, or loose clothing with long sleeves. Face and hands visible)">Wife must do Minimum Hijab (Basic Islamic attire with long dress/skirt, or loose clothing with long sleeves. Face and hands visible)</SelectItem>
                                                <SelectItem value="Wife may do Partial Hijab (Headscarf like a turban revealing neck. Tight clothing showing shape of body)">Wife may do Partial Hijab (Headscarf like a turban revealing neck. Tight clothing showing shape of body)</SelectItem>
                                                <SelectItem value="No Hijab (Don't need or want wife to wear Hijab)">No Hijab (Don&apos;t need or want wife to wear Hijab)</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage className="text-xs" />
                                </FormItem>)}
                        />
                    </div>

                    <div className="space-y-1 col-span-4">
                        <Label className="font-normal text-xs">
                            Appearance (Makeup/Perfume)
                        </Label>
                        <FormField
                            name='appearance'
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Select onValueChange={field.onChange} value={field.value}>
                                            <SelectTrigger className="shadow text-muted-foreground bg-background text-xs rounded-sm h-8 ring-transparent ring-offset-transparent">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="No Makeup or Perfume Outside (Wife may not wear makeup or perfume when going outside)">No Makeup or Perfume Outside (Wife may not wear makeup or perfume when going outside)</SelectItem>
                                                <SelectItem value="Makeup with Hijab/Niqab, No Perfume (Wife may wear makeup but with Hijab/niqab and no perfume in public)">Makeup with Hijab/Niqab, No Perfume (Wife may wear makeup but with Hijab/niqab and no perfume in public)</SelectItem>
                                                <SelectItem value="Subtle Makeup, Light Perfume (Wife may wear a little unnoticeable amount of makeup with light perfume when outside)">Subtle Makeup, Light Perfume (Wife may wear a little unnoticeable amount of makeup with light perfume when outside)</SelectItem>
                                                <SelectItem value="Full Makeup, Any Perfume (Wife may wear full face makeup and any choice of perfume)">Full Makeup, Any Perfume (Wife may wear full face makeup and any choice of perfume)</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage className="text-xs" />
                                </FormItem>)}
                        />
                    </div>

                    <div className="space-y-1 col-span-4">
                        <Label className="font-normal text-xs">
                            Polygyny/Family Structure
                        </Label>
                        <FormField
                            name='familyStructure'
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Select onValueChange={field.onChange} value={field.value}>
                                            <SelectTrigger className="shadow text-muted-foreground bg-background text-xs rounded-sm h-8 ring-transparent ring-offset-transparent">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="Monogamous (Prefers only one wife)">Monogamous (Prefers only one wife)</SelectItem>
                                                <SelectItem value="Polygynous (Prefers to have more than one wife in the future)">Polygynous (Prefers to have more than one wife in the future)</SelectItem>
                                                <SelectItem value="Open (Requiring future wife to discuss the possibility of husband having multiple wives)">Open (Requiring future wife to discuss the possibility of husband having multiple wives)</SelectItem>
                                                <SelectItem value="Undecided (Not making any decisions on having multiple wives at this time)">Undecided (Not making any decisions on having multiple wives at this time)</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage className="text-xs" />
                                </FormItem>)}
                        />
                    </div>

                    <div className="space-y-1 col-span-4">
                        <Label className="font-normal text-xs">Children Upbringing</Label>
                        <FormField
                            name='childrenAndUpbringing'
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Select onValueChange={field.onChange} value={field.value}>
                                            <SelectTrigger className="shadow text-muted-foreground bg-background text-xs rounded-sm h-8 ring-transparent ring-offset-transparent">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="Islamic Education/Environment Priority (Children must have Islamic school/mosque environment)">Islamic Education/Environment Priority (Children must have Islamic school/mosque environment)</SelectItem>
                                                <SelectItem value="Joint Decision (Open to discussing children's Islamic education with future wife)">Joint Decision (Open to discussing children&apos;s Islamic education with future wife)</SelectItem>
                                                <SelectItem value="Undecided (Has not decided yet about the Islamic education of children)">Undecided (Has not decided yet about the Islamic education of children)</SelectItem>
                                                <SelectItem value="Secular Upbringing (Prefers children not to attend Islamic school or masjid; Islamic education not a priority)">Secular Upbringing (Prefers children not to attend Islamic school or masjid; Islamic education not a priority)</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage className="text-xs" />
                                </FormItem>)}
                        />
                    </div>

                    <div className="space-y-1 col-span-4">
                        <Label className="font-normal text-xs">Social Media</Label>
                        <FormField
                            name='socialMedia'
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Select onValueChange={field.onChange} value={field.value}>
                                            <SelectTrigger className="shadow text-muted-foreground bg-background text-xs rounded-sm h-8 ring-transparent ring-offset-transparent">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="No Social Media (Prefers a wife who does not use social media or will delete her social media presence)">No Social Media (Prefers a wife who does not use social media or will delete her social media presence)</SelectItem>
                                                <SelectItem value="Private Profile (Comfortable with social media use, provided she does not show her face)">Private Profile (Comfortable with social media use, provided she does not show her face)</SelectItem>
                                                <SelectItem value="Restricted Use (Will accept minimal social media activity, with adherence to Islamic principles such as hijab)">Restricted Use (Will accept minimal social media activity, with adherence to Islamic principles such as hijab)</SelectItem>
                                                <SelectItem value="Unrestricted Use (Have no issues with regular social media activity, regardless of Islamic adherence)">Unrestricted Use (Have no issues with regular social media activity, regardless of Islamic adherence)</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage className="text-xs" />
                                </FormItem>)}
                        />
                    </div>

                    <div className="space-y-1 col-span-4">
                        <Label className="font-normal text-xs">Non-Mehram Contract</Label>
                        <FormField
                            name='nonMehramContact'
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Select onValueChange={field.onChange} value={field.value}>
                                            <SelectTrigger className="shadow text-muted-foreground bg-background text-xs rounded-sm h-8 ring-transparent ring-offset-transparent">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="Mehram Contacts Only (prefers future wife to interact only with her mahrams: father, brothers, son. No Male cousins or male best friends)">Mehram Contacts Only (prefers future wife to interact only with her mahrams: father, brothers, son. No Male cousins or male best friends)</SelectItem>
                                                <SelectItem value="Restrictive Post-Marriage (Understanding of current family dynamic. Expect all Non-Mehram contact to stop after marriage. No Male cousins or male best friends)">Restrictive Post-Marriage (Understanding of current family dynamic. Expect all Non-Mehram contact to stop after marriage. No Male cousins or male best friends)</SelectItem>
                                                <SelectItem value="Limited Non-Mahram Contact (Accepts contact with non-mahram male cousins and male friends with public or supervised interactions)">Limited Non-Mahram Contact (Accepts contact with non-mahram male cousins and male friends with public or supervised interactions)</SelectItem>
                                                <SelectItem value="No Restrictions (Open to his wife maintaining non-mahram family or friendships without any specific conditions)">No Restrictions (Open to his wife maintaining non-mahram family or friendships without any specific conditions)</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage className="text-xs" />
                                </FormItem>)}
                        />
                    </div>

                    <div className="space-y-1 col-span-4">
                        <Label className="font-normal text-xs">Obedience to Husband</Label>
                        <FormField
                            name='obedienceToHusband'
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Select onValueChange={field.onChange} value={field.value}>
                                            <SelectTrigger className="shadow text-muted-foreground bg-background text-xs rounded-sm h-8 ring-transparent ring-offset-transparent">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="Obedience Expected (Prefers a wife who adheres to his decisions)">Obedience Expected (Prefers a wife who adheres to his decisions)</SelectItem>
                                                <SelectItem value="Final Say (Husband has final say, while valuing wife's input)">Final Say (Husband has final say, while valuing wife&apos;s input)</SelectItem>
                                                <SelectItem value="Mutual Compromise (Both spouses compromise and decide together)">Mutual Compromise (Both spouses compromise and decide together)</SelectItem>
                                                <SelectItem value="Valuing Opinions (Will Prioritize the wife's opinions in decision-making)">Valuing Opinions (Will Prioritize the wife&apos;s opinions in decision-making)</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage className="text-xs" />
                                </FormItem>)}
                        />
                    </div>

                    <div className="space-y-1 col-span-4">
                        <Label className="font-normal text-xs">Obedience to In-laws</Label>
                        <FormField
                            name='obedienceToInLaws'
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Select onValueChange={field.onChange} value={field.value}>
                                            <SelectTrigger className="shadow text-muted-foreground bg-background text-xs rounded-sm h-8 ring-transparent ring-offset-transparent">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="Full Obedience (Complete respect and adherence to in-laws' guidance and decisions)">Full Obedience (Complete respect and adherence to in-laws&apos; guidance and decisions)</SelectItem>
                                                <SelectItem value="Moderate (Respect in-laws)">Moderate (Respect in-laws)</SelectItem>
                                                <SelectItem value="Independent Relationship (Minimal involvement of in-laws)">Independent Relationship (Minimal involvement of in-laws)</SelectItem>
                                                <SelectItem value="Mutual Respect and Boundaries (Mutual respect with maintaining clear personal boundaries)">Mutual Respect and Boundaries (Mutual respect with maintaining clear personal boundaries)</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage className="text-xs" />
                                </FormItem>)}
                        />
                    </div>
                </form>
            </Form>
        </div>
    )
}
