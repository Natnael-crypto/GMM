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
import { useForm } from 'react-hook-form';
import { toast } from '@/components/ui/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAppSelector } from '@/lib/hooks';
import { IslamicLifestyle, islamicLifestyleSchema } from '@/lib/schemas/islamic-lifestyle';
import { useUpdateIslamicLifestyleMutation } from '@/lib/user/api';
import { useUpdateProfileContext } from '@/components/dashboard/profile/update-profile-context';

export default function IslamicLifestyleForm({ islamicLifestyle }: { islamicLifestyle?: IslamicLifestyle }) {
    const form = useForm<IslamicLifestyle>({
        resolver: zodResolver(islamicLifestyleSchema),
        defaultValues: {
            salat: islamicLifestyle?.salat || '',
            ramadan: islamicLifestyle?.ramadan || '',
            fasting: islamicLifestyle?.fasting || '',
            zakat: islamicLifestyle?.zakat || '',
            food: islamicLifestyle?.food || '',
            islamAndCulture: islamicLifestyle?.islamAndCulture || '',
            islamicEducation: islamicLifestyle?.islamicEducation || '',
            appearance: islamicLifestyle?.appearance || '',
            hajjAndUmrah: islamicLifestyle?.hajjAndUmrah || '',
            childrenAndUpbringing: islamicLifestyle?.childrenAndUpbringing || 0,
        }
    });

    useEffect(() => {
        form.reset(islamicLifestyle)
    }, [form, islamicLifestyle]);

    const user = useAppSelector((state) => state.auth.user);
    const islamicLifestyleFormRef = useRef<HTMLFormElement>(null);

    const { registerForm, setSaving } = useUpdateProfileContext()
    const [updateIslamicLifestyle, updateResult] = useUpdateIslamicLifestyleMutation();

    useEffect(() => {
        if (islamicLifestyleFormRef && islamicLifestyleFormRef.current) {
            registerForm('islamicLifestyleForm', islamicLifestyleFormRef.current);
        }
    }, [islamicLifestyleFormRef, registerForm]);

    const onSubmit = async (data: IslamicLifestyle) => {
        await updateIslamicLifestyle({ userId: user!.id, islamicLifestyle: data });
    }

    useEffect(() => {
        if (updateResult.isSuccess) {
            toast({
                title: 'Success',
                description: 'Islamic lifestyle updated successfully',
            });
        }
    }, [updateResult])

    useEffect(() => {
        setSaving(updateResult.isLoading);
    }, [updateResult, setSaving])

    return (
        <div className="py-8 px-6 sm:px-16 md:px-24 lg:px-52">
            <h1 className="text-xl font-bold text-secondary border-b p-1">
                Your Current Islamic Lifestyle <span className='text-xs'>(that you live)</span>
            </h1>

            <Form {...form}>
                <form
                    ref={islamicLifestyleFormRef}
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="grid grid-cols-12 gap-x-3 gap-y-3 py-5">
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
                                                <SelectItem className="text-sm max-w-80" value="Fardh and Sunnah (Performs 5 Fardh along with Sunnah prayers daily)">Fardh and Sunnah (Performs 5 Fardh along with Sunnah prayers daily)</SelectItem>
                                                <SelectItem className="text-sm max-w-80" value="Complete Fardh (Observes all 5 Fardh prayers daily)">Complete Fardh (Observes all 5 Fardh prayers daily)</SelectItem>
                                                <SelectItem className="text-sm max-w-80" value="Frequent (Prays 3 or more times daily)">Frequent (Prays 3 or more times daily)</SelectItem>
                                                <SelectItem className="text-sm max-w-80" value="Occasional (Prays 2 or more times daily)">Occasional (Prays 2 or more times daily)</SelectItem>
                                                <SelectItem className="text-sm max-w-80" value="Irregular (Prays at least once daily)">Irregular (Prays at least once daily)</SelectItem>
                                                <SelectItem className="text-sm max-w-80" value="Weekly (Only on Fridays)">Weekly (Only on Fridays)</SelectItem>
                                                <SelectItem className="text-sm max-w-80" value="Does not pray/Non-Muslim (Does not perform Salat)">Does not pray/Non-Muslim (Does not perform Salat)</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage className="text-xs" />
                                </FormItem>)}
                        />
                    </div>

                    <div className="space-y-1 col-span-4">
                        <Label className="font-normal text-xs">Ramadan</Label>
                        <FormField
                            name='ramadan'
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Select onValueChange={field.onChange} value={field.value}>
                                            <SelectTrigger className="shadow text-muted-foreground bg-background text-xs rounded-sm h-8 ring-transparent ring-offset-transparent">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="Enhanced Devotion (Embracing Ramadan, increasing worship, and abandoning haram)" className="text-sm max-w-80">Enhanced Devotion (Embracing Ramadan, increasing worship, and abandoning haram)</SelectItem>
                                                <SelectItem value="Basic Observance (Only obligatory acts of prayer & fasting, maintaining usual habits)" className="text-sm max-w-80">Basic Observance (Only obligatory acts of prayer & fasting, maintaining usual habits)</SelectItem>
                                                <SelectItem value="Outside Ramadan Routine (Treating Ramadan like any other day, without additional religious or lifestyle changes)" className="text-sm max-w-80">Outside Ramadan Routine (Treating Ramadan like any other day, without additional religious or lifestyle changes)</SelectItem>
                                            </SelectContent>
                                        </Select></FormControl>
                                    <FormMessage className="text-xs" />
                                </FormItem>)}
                        />
                    </div>

                    <div className="space-y-1 col-span-4">
                        <Label className="font-normal text-xs">Fasting</Label>
                        <FormField
                            name='fasting'
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Select onValueChange={field.onChange} value={field.value}>
                                            <SelectTrigger className="shadow text-muted-foreground bg-background text-xs rounded-sm h-8 ring-transparent ring-offset-transparent">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem className="text-sm max-w-80" value="Ramadan Only (Fasts solely during Ramadan)">Ramadan Only (Fasts solely during Ramadan)</SelectItem>
                                                <SelectItem className="text-sm max-w-80" value="Ramadan + Sunnah (Fasts in Ramadan and on Mondays & Thursdays)">Ramadan + Sunnah (Fasts in Ramadan and on Mondays & Thursdays)</SelectItem>
                                                <SelectItem className="text-sm max-w-80" value="No Fasting (Does not Fast at all)">No Fasting (Does not Fast at all)</SelectItem>

                                            </SelectContent>
                                        </Select></FormControl>
                                    <FormMessage className="text-xs" />
                                </FormItem>)}
                        />
                    </div>

                    <div className="space-y-1 col-span-4">
                        <Label className="font-normal text-xs">Zakat</Label>
                        <FormField
                            name='zakat'
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Select onValueChange={field.onChange} value={field.value}>
                                            <SelectTrigger className="shadow text-muted-foreground bg-background text-xs rounded-sm h-8 ring-transparent ring-offset-transparent">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem className="text-sm max-w-80" value="Annual Contributor (Gives Zakat annually, as a regular practice)">Annual Contributor (Gives Zakat annually, as a regular practice)</SelectItem>
                                                <SelectItem className="text-sm max-w-80" value="Eligibility-Based (Gives Zakat only when financially eligible)">Eligibility-Based (Gives Zakat only when financially eligible)</SelectItem>
                                                <SelectItem className="text-sm max-w-80" value="Constrained by Poverty (Does not give due to personal financial hardships)">Constrained by Poverty (Does not give due to personal financial hardships)</SelectItem>
                                                <SelectItem className="text-sm max-w-80" value="Non-Giver (Chooses not to give Zakat or is exempt for other reasons)">Non-Giver (Chooses not to give Zakat or is exempt for other reasons)</SelectItem>
                                            </SelectContent>
                                        </Select></FormControl>
                                    <FormMessage className="text-xs" />
                                </FormItem>)}
                        />
                    </div>

                    <div className="space-y-1 col-span-4">
                        <Label className="font-normal text-xs">Food</Label>
                        <FormField
                            name='food'
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Select onValueChange={field.onChange} value={field.value}>
                                            <SelectTrigger className="shadow text-muted-foreground bg-background text-xs rounded-sm h-8 ring-transparent ring-offset-transparent">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem className="text-sm max-w-80" value="Strictly Halal (Eats only halal)">Strictly Halal (Eats only halal)</SelectItem>
                                                <SelectItem className="text-sm max-w-80" value="Preferably Halal (Prefers halal unless unavailable)">Preferably Halal (Prefers halal unless unavailable)</SelectItem>
                                                <SelectItem className="text-sm max-w-80" value="Indifferent (Does not consider halal or haram in food choices)">Indifferent (Does not consider halal or haram in food choices)</SelectItem>
                                            </SelectContent>
                                        </Select></FormControl>
                                    <FormMessage className="text-xs" />
                                </FormItem>)}
                        />
                    </div>

                    <div className="space-y-1 col-span-4">
                        <Label className="font-normal text-xs">Islam & Culture</Label>
                        <FormField
                            name='islamAndCulture'
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Select onValueChange={field.onChange} value={field.value}>
                                            <SelectTrigger className="shadow text-muted-foreground bg-background text-xs rounded-sm h-8 ring-transparent ring-offset-transparent">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem className="text-sm max-w-80" value="Deen Over Culture (Prioritizes Islamic principles over cultural practices)">Deen Over Culture (Prioritizes Islamic principles over cultural practices)</SelectItem>
                                                <SelectItem className="text-sm max-w-80" value="Combining Deen and Culture (Attempts to integrate Islamic teachings with cultural norms)">Combining Deen and Culture (Attempts to integrate Islamic teachings with cultural norms)</SelectItem>
                                                <SelectItem className="text-sm max-w-80" value="Culture-Focused Islamic Inclusion (Follows cultural norms, includes Islamic elements occasionally)">Culture-Focused Islamic Inclusion (Follows cultural norms, includes Islamic elements occasionally)</SelectItem>
                                                <SelectItem className="text-sm max-w-80" value="Culture-Prioritized (Cultural practices dominant, limited Islamic influence)">Culture-Prioritized (Cultural practices dominant, limited Islamic influence)</SelectItem>
                                            </SelectContent>
                                        </Select></FormControl>
                                    <FormMessage className="text-xs" />
                                </FormItem>)}
                        />
                    </div>

                    <div className="space-y-1 col-span-4">
                        <Label className="font-normal text-xs">Money</Label>
                        {/* <FormField
                            name='salat'
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl> */}
                        <Select value='Full Islamic Compliance (Non-interest finance, strict halal earning and halal spending)'>
                            <SelectTrigger className="shadow text-muted-foreground bg-background text-xs rounded-sm h-8 ring-transparent ring-offset-transparent">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem className="text-sm max-w-80" value="Full Islamic Compliance (Non-interest finance, strict halal earning and halal spending)">Full Islamic Compliance (Non-interest finance, strict halal earning and halal spending)</SelectItem>
                                <SelectItem className="text-sm max-w-80" value="Mixed Adherence (Strict Halal income. Riba/Interest financing: Student Loans, Car, Home, Credit Cards etc)">Mixed Adherence (Strict Halal income. Riba/Interest financing: Student Loans, Car, Home, Credit Cards etc)</SelectItem>
                                <SelectItem className="text-sm max-w-80" value="Indifferent Approach (Not following halal/haram guidelines in earnings, financing and spending)">Indifferent Approach (Not following halal/haram guidelines in earnings, financing and spending)</SelectItem>

                            </SelectContent>
                        </Select>
                        {/* </FormControl>
                                    <FormMessage className="text-xs" />
                                </FormItem>)}
                        /> */}
                    </div>

                    <div className="space-y-1 col-span-4">
                        <Label className="font-normal text-xs">Islamic Education</Label>
                        <FormField
                            name='islamicEducation'
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Select onValueChange={field.onChange} value={field.value}>
                                            <SelectTrigger className="shadow text-muted-foreground bg-background text-xs rounded-sm h-8 ring-transparent ring-offset-transparent">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem className="text-sm max-w-80" value="Self-Study & Qur'an Translation (Independent study, occasional mosque lectures, listening/reading Qur'an translations)">Self-Study & Qur&apos;an Translation (Independent study, occasional mosque lectures, listening/reading Qur&apos;an translations)</SelectItem>
                                                <SelectItem className="text-sm max-w-80" value="Direct Scholar Guidance (Studying under a scholar or imam)">Direct Scholar Guidance (Studying under a scholar or imam)</SelectItem>
                                                <SelectItem className="text-sm max-w-80" value="Institute Education (Enrolled in Islamic institutes for certification/diploma courses)">Institute Education (Enrolled in Islamic institutes for certification/diploma courses)</SelectItem>
                                                <SelectItem className="text-sm max-w-80" value="University Level Studies (Pursuing higher education in Islamic studies: Bachelors, Masters, PhD)">University Level Studies (Pursuing higher education in Islamic studies: Bachelors, Masters, PhD)</SelectItem>
                                            </SelectContent>
                                        </Select></FormControl>
                                    <FormMessage className="text-xs" />
                                </FormItem>)}
                        />
                    </div>

                    <div className="space-y-1 col-span-4">
                        <Label className="font-normal text-xs">Appearance (Beard)</Label>
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
                                                <SelectItem className="text-sm max-w-80" value="Have a Beard">Have a Beard</SelectItem>
                                                <SelectItem className="text-sm max-w-80" value="No Beard by Choice (personal preference)">No Beard by Choice (personal preference)</SelectItem>
                                                <SelectItem className="text-sm max-w-80" value="No Beard, Medical Reasons (Lacks a beard due to medical conditions or issues)">No Beard, Medical Reasons (Lacks a beard due to medical conditions or issues)</SelectItem>
                                            </SelectContent>
                                        </Select></FormControl>
                                    <FormMessage className="text-xs" />
                                </FormItem>)}
                        />
                    </div>

                    <div className="space-y-1 col-span-4">
                        <Label className="font-normal text-xs">Hajj & Umrah</Label>
                        <FormField
                            name='hajjAndUmrah'
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Select onValueChange={field.onChange} value={field.value}>
                                            <SelectTrigger className="shadow text-muted-foreground bg-background text-xs rounded-sm h-8 ring-transparent ring-offset-transparent">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem className="text-sm max-w-80" value="Completed Pilgrimage">Completed Pilgrimage</SelectItem>
                                                <SelectItem className="text-sm max-w-80" value="Planning with Priority (Intends to perform Hajj/Umrah soon, high priority)">Planning with Priority (Intends to perform Hajj/Umrah soon, high priority)</SelectItem>
                                                <SelectItem className="text-sm max-w-80" value="Future Consideration (Plans to perform Hajj/Umrah in the future)">Future Consideration (Plans to perform Hajj/Umrah in the future)</SelectItem>
                                                <SelectItem className="text-sm max-w-80" value="No Plans (Currently no plans to perform Hajj or Umrah)">No Plans (Currently no plans to perform Hajj or Umrah)</SelectItem>
                                            </SelectContent>
                                        </Select></FormControl>
                                    <FormMessage className="text-xs" />
                                </FormItem>)}
                        />
                    </div>

                    <div className="space-y-1 col-span-4">
                        <Label className="font-normal text-xs">Children & Upbringing</Label>
                        <FormField
                            name='childrenAndUpbringing'
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Select onValueChange={field.onChange} value={field.value?.toString()}>
                                            <SelectTrigger className="shadow text-muted-foreground bg-background text-xs rounded-sm h-8 ring-transparent ring-offset-transparent">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem className="text-sm max-w-80" value="1">Children in Islamic Setting (Prioritizes Islamic education/environment for children)</SelectItem>
                                                <SelectItem className="text-sm max-w-80" value="2">Plans for Islamic Setting (Intends to provide Islamic setting for future children)</SelectItem>
                                                <SelectItem className="text-sm max-w-80" value="3">Children in Mixed Setting (Combines Islamic and non-Islamic environments for children)</SelectItem>
                                                <SelectItem className="text-sm max-w-80" value="4">Undecided for Future Children (No children yet, undecided about their future environment)</SelectItem>
                                                <SelectItem className="text-sm max-w-80" value="5">Non-Islamic Setting for Children (Does not prioritize Islamic environment for children)</SelectItem>
                                            </SelectContent>
                                        </Select></FormControl>
                                    <FormMessage className="text-xs" />
                                </FormItem>)}
                        />
                    </div>
                </form>
            </Form>
        </div>

    )
}
