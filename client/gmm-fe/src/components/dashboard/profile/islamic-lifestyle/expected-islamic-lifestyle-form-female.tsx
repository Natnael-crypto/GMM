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

import { useUpdateExpectedIslamicLifestyleMutation } from '@/lib/user/api';
import { toast } from '@/components/ui/use-toast';
import { useUpdateProfileContext } from '@/components/dashboard/profile/update-profile-context';

export default function ExpectedIslamicLifestyleFormFemale({ expectedIslamicLifestyle }: { expectedIslamicLifestyle?: ExpectedIslamicLifestyle }) {
    const form = useForm<ExpectedIslamicLifestyle>({
        resolver: zodResolver(expectedIslamicLifestyleSchema),
        defaultValues: {
            salat: expectedIslamicLifestyle?.salat ?? '',
            hijab: expectedIslamicLifestyle?.hijab ?? '',
            appearance: expectedIslamicLifestyle?.appearance ?? '',
            familyStructure: expectedIslamicLifestyle?.familyStructure ?? '',
            childrenAndUpbringing: expectedIslamicLifestyle?.childrenAndUpbringing ?? '',
            socialMedia: expectedIslamicLifestyle?.socialMedia ?? '',
            nonMehramContact: expectedIslamicLifestyle?.nonMehramContact ?? '',
            obedienceToHusband: expectedIslamicLifestyle?.obedienceToHusband ?? '',
            obedienceToInLaws: expectedIslamicLifestyle?.obedienceToInLaws ?? ''
        }
    });

    useEffect(() => {
        form.reset(expectedIslamicLifestyle)
    }, [form, expectedIslamicLifestyle]);

    const user = useAppSelector((state) => state.auth.user);
    const expectedIslamicLifestyleFormRef = useRef<HTMLFormElement>(null);

    const { registerForm, setSaving } = useUpdateProfileContext()
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
        setSaving(updateResult.isLoading);
    }, [updateResult, setSaving])

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
                        <Label className="font-normal text-xs line-clamp-1">Salat/Prayers</Label>
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
                                                <SelectItem value="Must Pray Full Daily Prayers + Sunnah (Husband to perform all obligatory and Sunnah prayers)">Must Pray Full Daily Prayers + Sunnah (Husband to perform all obligatory and Sunnah prayers)</SelectItem>
                                                <SelectItem value="Fardh Only (Husband to perform mandatory salat/prayers as a minimum requirement)">Fardh Only (Husband to perform mandatory salat/prayers as a minimum requirement)</SelectItem>
                                                <SelectItem value="Flexible Approach (As long as husband says he's a Muslim, it does not matter if he prays or not)">Flexible Approach (As long as husband says he&apos;s a Muslim, it does not matter if he prays or not)</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage className="text-xs" />
                                </FormItem>)}
                        />
                    </div>

                    <div className="space-y-1 col-span-4">
                        <Label className="font-normal text-xs line-clamp-1">Hijab Acceptance</Label>
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
                                                <SelectItem value="Advanced Hijab (husband accepts wife's choice to wear Niqab/burqa)">Advanced Hijab (husband accepts wife&apos;s choice to wear Niqab/burqa)</SelectItem>
                                                <SelectItem value="Minimum Hijab (husband accepts wife choice to wear Basic loose Islamic clothing. Face and hands visible)">Minimum Hijab (husband accepts wife choice to wear Basic loose Islamic clothing. Face and hands visible)</SelectItem>
                                                <SelectItem value="Partial Hijab (husband accepts wife will wear Headscarf/turban revealing neck. Tight clothing showing shape of body)">Partial Hijab (husband accepts wife will wear Headscarf/turban revealing neck. Tight clothing showing shape of body)</SelectItem>
                                                <SelectItem value="No Hijab (husband accepts wife will not wear Hijab after marriage)">No Hijab (husband accepts wife will not wear Hijab after marriage)</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage className="text-xs" />
                                </FormItem>)}
                        />
                    </div>

                    <div className="space-y-1 col-span-4">
                        <Label className="font-normal text-xs line-clamp-1">
                            Social Media
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
                                                <SelectItem value="No Social Media (Husband accepts wife's choice to not use or delete social media after marriage)">No Social Media (Husband accepts wife&apos;s choice to not use or delete social media after marriage)</SelectItem>
                                                <SelectItem value="Private Profile (Husband accepts wife's decision to maintain private social media without showing herself)">Private Profile (Husband accepts wife&apos;s decision to maintain private social media without showing herself)</SelectItem>
                                                <SelectItem value="Restricted Use (Husband accepts minimal social media activity, with the hijab)">Restricted Use (Husband accepts minimal social media activity, with the hijab)</SelectItem>
                                                <SelectItem value="Unrestricted Use (Husband accepts no limits on wife's social media use)">Unrestricted Use (Husband accepts no limits on wife&apos;s social media use)</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage className="text-xs" />
                                </FormItem>)}
                        />
                    </div>

                    <div className="space-y-1 col-span-4">
                        <Label className="font-normal text-xs line-clamp-1">
                            Wife’s Non-Mehram Contact
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
                                                <SelectItem value="Mehram Contacts Only (Interacting only with mahrams, no male cousins or male best friends)">Mehram Contacts Only (Interacting only with mahrams, no male cousins or male best friends)</SelectItem>
                                                <SelectItem value="Restricting After-Marriage (Currently in touch with non-mahram family. Will cut non-mahram contact after marriage, no male cousins or male best friends)">Restricting After-Marriage (Currently in touch with non-mahram family. Will cut non-mahram contact after marriage, no male cousins or male best friends)</SelectItem>
                                                <SelectItem value="Limited Non-Mahram contact (Will remain in contact with non-mahram male cousins and male friends in public or supervision)">Limited Non-Mahram contact (Will remain in contact with non-mahram male cousins and male friends in public or supervision)</SelectItem>
                                                <SelectItem value="No Restrictions (Will maintain non-mahram family/friendships without any specific conditions)">No Restrictions (Will maintain non-mahram family/friendships without any specific conditions)</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage className="text-xs" />
                                </FormItem>)}
                        />
                    </div>

                    <div className="space-y-1 col-span-4">
                        <Label className="font-normal text-xs line-clamp-1">Husband&apos;s Non-Mehram Contact</Label>
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
                                                <SelectItem value="Mehram Contact (Husband to only have interactions with mahrams, no female cousins or female best friends)">Mehram Contact (Husband to only have interactions with mahrams, no female cousins or female best friends)</SelectItem>
                                                <SelectItem value="Restrict After-Marriage (Husband to stop contact with non-mahram family after marriage, no female cousins or female best friends)">Restrict After-Marriage (Husband to stop contact with non-mahram family after marriage, no female cousins or female best friends)</SelectItem>
                                                <SelectItem value="Limited Non-Mahram Contact (Husband may contact with non-mahram female cousins and friends only in public)">Limited Non-Mahram Contact (Husband may contact with non-mahram female cousins and friends only in public)</SelectItem>
                                                <SelectItem value="No Restrictions (Husband may maintain non-mahram family and friendships)">No Restrictions (Husband may maintain non-mahram family and friendships)</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage className="text-xs" />
                                </FormItem>)}
                        />
                    </div>

                    <div className="space-y-1 col-span-4">
                        <Label className="font-normal text-xs line-clamp-1">Wife&apos;s Makeup/Perfume</Label>
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
                                                <SelectItem value="No Makeup/Perfume Outside (Husband to accept wife's choice not to wear makeup or perfume when going outside)">No Makeup/Perfume Outside (Husband to accept wife&apos;s choice not to wear makeup or perfume when going outside)</SelectItem>
                                                <SelectItem value="Makeup with Hijab/Niqab, No Perfume (Husband to accept wife's choice to wear makeup with hijab, no perfume in public)">Makeup with Hijab/Niqab, No Perfume (Husband to accept wife&apos;s choice to wear makeup with hijab, no perfume in public)</SelectItem>
                                                <SelectItem value="Subtle Makeup, Light Perfume (Husband to accept wife's choice to wear a little unnoticeable amount of makeup with light perfume when outside)">Subtle Makeup, Light Perfume (Husband to accept wife&apos;s choice to wear a little unnoticeable amount of makeup with light perfume when outside)</SelectItem>
                                                <SelectItem value="Full Makeup, Any Perfume (Husband to accept wife's choice to wear full face makeup and any choice of perfume)">Full Makeup, Any Perfume (Husband to accept wife&apos;s choice to wear full face makeup and any choice of perfume)</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage className="text-xs" />
                                </FormItem>)}
                        />
                    </div>

                    <div className="space-y-1 col-span-4">
                        <Label className="font-normal text-xs line-clamp-1">Husband Appearance</Label>
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
                                                <SelectItem value="Have a Beard (Husband must have a beard)">Have a Beard (Husband must have a beard)</SelectItem>
                                                <SelectItem value="No Beard by Choice (Personal preference)">No Beard by Choice (Personal preference)</SelectItem>
                                                <SelectItem value="No Beard, Medical Reasons (No beard due to medical conditions or issues)">No Beard, Medical Reasons (No beard due to medical conditions or issues)</SelectItem>
                                                <SelectItem value="Does not matter (Indifferent to beard)">Does not matter (Indifferent to beard)</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage className="text-xs" />
                                </FormItem>)}
                        />
                    </div>

                    <div className="space-y-1 col-span-4">
                        <Label className="font-normal text-xs line-clamp-1">Children Upbringing</Label>
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
                                                <SelectItem value="Islamic Education Priority (Children must have Islamic school/mosque environment)">Islamic Education Priority (Children must have Islamic school/mosque environment)</SelectItem>
                                                <SelectItem value="Joint Decision (Open to discussing children's Islamic education with husband)">Joint Decision (Open to discussing children&apos;s Islamic education with husband)</SelectItem>
                                                <SelectItem value="Undecided (Not decided yet about the Islamic education of children)">Undecided (Not decided yet about the Islamic education of children)</SelectItem>
                                                <SelectItem value="Secular Upbringing (Islamic education not a priority. Children not to attend Islamic school or masjid)">Secular Upbringing (Islamic education not a priority. Children not to attend Islamic school or masjid)</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage className="text-xs" />
                                </FormItem>)}
                        />
                    </div>

                    <div className="space-y-1 col-span-4">
                        <Label className="font-normal text-xs line-clamp-1">Polygyny/Family Structure</Label>
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
                                                <SelectItem value="Monogamous (Wife prefers to be the only wife)">Monogamous (Wife prefers to be the only wife)</SelectItem>
                                                <SelectItem value="Polygynous (Acceptable for husband having more than one wife)">Polygynous (Acceptable for husband having more than one wife)</SelectItem>
                                                <SelectItem value="Open (Willing to discuss the possibility of husband having multiple wives)">Open (Willing to discuss the possibility of husband having multiple wives)</SelectItem>
                                                <SelectItem value="Undecided (Not making any decisions on husband having multiple wives at this time)">Undecided (Not making any decisions on husband having multiple wives at this time)</SelectItem>
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
