'use client'

import { useUpdateProfileContext } from '@/components/dashboard/profile/update-profile-context';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { toast } from '@/components/ui/use-toast';
import { useAppSelector } from '@/lib/hooks';
import { ExpectedWorldlyLifestyle, expectedWorldlyLifestyleSchema } from '@/lib/schemas/worldly-lifestyle';
import { useUpdateExpectedWorldlyLifestyleMutation } from '@/lib/user/api';
import { zodResolver } from '@hookform/resolvers/zod';

import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';

export function ExpectedWorldlyLifestyleForm({ expectedWorldlyLifestyle }: { expectedWorldlyLifestyle?: ExpectedWorldlyLifestyle }) {
    const form = useForm<ExpectedWorldlyLifestyle>({
        resolver: zodResolver(expectedWorldlyLifestyleSchema),
        defaultValues: {
            roleOfWife: expectedWorldlyLifestyle?.roleOfWife || '', //fixed
            wifeCareer: expectedWorldlyLifestyle?.wifeCareer || '',
            dualIncome: expectedWorldlyLifestyle?.dualIncome || '',
            relocation: expectedWorldlyLifestyle?.relocation || '',
            jointFamily: expectedWorldlyLifestyle?.jointFamily || '',
            coupleLivingAccomodation: expectedWorldlyLifestyle?.coupleLivingAccomodation || '',
            openToLiveWithWifeFamily: expectedWorldlyLifestyle?.openToLiveWithWifeFamily || '',
            expectWifeToLiveWithHisFamily: expectedWorldlyLifestyle?.expectWifeToLiveWithHisFamily || '',
            havingChildren: expectedWorldlyLifestyle?.havingChildren || '',
            numberOfChildren: expectedWorldlyLifestyle?.numberOfChildren || 0,
            parenthoodTimingAfterMarriage: expectedWorldlyLifestyle?.parenthoodTimingAfterMarriage || '',
            requireWifeToAcceptChildren: expectedWorldlyLifestyle?.requireWifeToAcceptChildren || '',
            willingToAcceptWifeChildren: expectedWorldlyLifestyle?.willingToAcceptWifeChildren || '',
        },
    });

    useEffect(() => {
        form.reset(expectedWorldlyLifestyle);
    }, [form, expectedWorldlyLifestyle])

    const user = useAppSelector((state) => state.auth.user);
    const expectedWorldlyLifestyleFormRef = React.useRef<HTMLFormElement>(null);

    const { registerForm, setSaving } = useUpdateProfileContext()
    const [updateExpectedWorldlyStyle, updateResult] = useUpdateExpectedWorldlyLifestyleMutation();

    React.useEffect(() => {
        if (expectedWorldlyLifestyleFormRef && expectedWorldlyLifestyleFormRef.current) {
            registerForm('expectedWorldlyLifestyle', expectedWorldlyLifestyleFormRef.current);
        }
    }, [expectedWorldlyLifestyleFormRef, registerForm]);

    const onSubmit = (data: ExpectedWorldlyLifestyle) => {
        updateExpectedWorldlyStyle({ userId: user!.id, expectedWorldlyLifestyle: data });
    }

    useEffect(() => {
        if (updateResult.isSuccess) {
            toast({
                title: 'Success',
                description: 'Worldly lifestyle updated successfully',
            });
        }
    }, [updateResult])

    useEffect(() => {
        setSaving(updateResult.isLoading);
    }, [updateResult, setSaving]);

    return (
        <div className="bg-muted w-full py-4 px-6 sm:px-16 md:px-24 lg:px-52">
            <h1 className="text-xl font-bold text-primary border-b p-1">
                Your Expected (After Marriage) Worldly Lifestyle from Your Potential Spouse
            </h1>

            <Form {...form} >
                <form
                    ref={expectedWorldlyLifestyleFormRef}
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="grid grid-cols-12 gap-x-3 gap-y-4 py-5">
                    <div className="space-y-1 col-span-3">
                        <Label className="font-normal text-xs">Decision Making & Leadership</Label>
                        <Select>
                            <SelectTrigger className="shadow text-muted-foreground bg-background text-xs rounded-sm h-8 ring-transparent ring-offset-transparent">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem className="text-sm max-w-80" value="Sole Decision-Maker (Husband is Primary decision-maker of the family)">Sole Decision-Maker (Husband is Primary decision-maker of the family)</SelectItem>
                                <SelectItem className="text-sm max-w-80" value="Consultative Leadership (Husband Leads by consulting the wife but has final say)">Consultative Leadership (Husband Leads by consulting the wife but has final say)</SelectItem>
                                <SelectItem className="text-sm max-w-80" value="Co-Leadership (Equal joint decision making)">Co-Leadership (Equal joint decision making)</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-1 col-span-3">
                        <Label className="font-normal text-xs">Role of Wife</Label>
                        <FormField
                            name='roleOfWife'
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Select onValueChange={field.onChange} value={field.value}>
                                            <SelectTrigger className="shadow text-muted-foreground bg-background text-xs rounded-sm h-8 ring-transparent ring-offset-transparent">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem className="text-sm max-w-80" value="Homemaker (Cleaning, Cooking, Kids, Husband)">Homemaker (Cleaning, Cooking, Kids, Husband)</SelectItem>
                                                <SelectItem className="text-sm max-w-80" value="Assist In-laws + Homemaker">Assist In-laws + Homemaker</SelectItem>
                                                <SelectItem className="text-sm max-w-80" value="Wife may study from home + Homemaker">Wife may study from home + Homemaker</SelectItem>
                                                <SelectItem className="text-sm max-w-80" value="Wife may work from Home + Homemaker">Wife may work from Home + Homemaker</SelectItem>
                                                <SelectItem className="text-sm max-w-80" value="Wife may work or study outside home">Wife may work or study outside home</SelectItem>
                                                <SelectItem className="text-sm max-w-80" value="Husband requires and expects wife to work or study">Husband requires and expects wife to work or study</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage className="text-xs" />
                                </FormItem>)}
                        />
                    </div>

                    <div className="space-y-1 col-span-6">
                        <Label className="font-normal text-xs">Will Financially Support wife&apos;s education, career or business</Label>
                        <FormField
                            name='wifeCareer'
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Select onValueChange={field.onChange} value={field.value}>
                                            <SelectTrigger className="shadow text-muted-foreground bg-background text-xs rounded-sm h-8 ring-transparent ring-offset-transparent">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem className="text-sm max-w-80" value="Yes">Yes</SelectItem>
                                                <SelectItem className="text-sm max-w-80" value="No">No</SelectItem>
                                                <SelectItem className="text-sm max-w-80" value="Possibly/May consider it">Possibly/May consider it</SelectItem>
                                                <SelectItem className="text-sm max-w-80" value="Requires wife to pursue education, Career or Business">Requires wife to pursue education, Career or Business</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage className="text-xs" />
                                </FormItem>)}
                        />
                    </div>

                    <div className="space-y-1 col-span-4">
                        <Label className="font-normal text-xs">Money in Marriage</Label>
                        <FormField
                            name='dualIncome'
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Select onValueChange={field.onChange} value={field.value}>
                                            <SelectTrigger className="shadow text-muted-foreground bg-background text-xs rounded-sm h-8 ring-transparent ring-offset-transparent">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent className='max-w-60'>
                                                <SelectItem className="text-sm max-w-80" value="Husband Sole Provider (Full financial maintenance of wife and children)">Husband Sole Provider (Full financial maintenance of wife and children)</SelectItem>
                                                <SelectItem className="text-sm max-w-80" value="Dual Income: (Husband & Wife equally share in financial responsibilities)">Dual Income: (Husband & Wife equally share in financial responsibilities)</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage className="text-xs" />
                                </FormItem>)}
                        />
                    </div>

                    <div className="space-y-1 col-span-4">
                        <Label className="font-normal text-xs">Wife must relocate to Husbands City</Label>
                        <FormField
                            name='relocation'
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Select onValueChange={field.onChange} value={field.value}>
                                            <SelectTrigger className="shadow text-muted-foreground bg-background text-xs rounded-sm h-8 ring-transparent ring-offset-transparent">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem className="text-sm max-w-80" value="Yes">Yes</SelectItem>
                                                <SelectItem className="text-sm max-w-80" value="No">No</SelectItem>
                                                <SelectItem className="text-sm max-w-80" value="Maybe">Maybe</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage className="text-xs" />
                                </FormItem>)}
                        />
                    </div>

                    <div className="space-y-1 col-span-4">
                        <Label className="font-normal text-xs">Wife & Joint Family</Label>
                        <FormField
                            name='jointFamily'
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Select onValueChange={field.onChange} value={field.value}>
                                            <SelectTrigger className="shadow text-muted-foreground bg-background text-xs rounded-sm h-8 ring-transparent ring-offset-transparent">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem className="text-sm max-w-80" value="Yes (wife to live with husbands brother(s) and their wives in the same home)">Yes (wife to live with husbands brother(s) and their wives in the same home)</SelectItem>
                                                <SelectItem className="text-sm max-w-80" value="Maybe (may require wife to live with husbands brother(s) and their wives in the same home)">Maybe (may require wife to live with husbands brother(s) and their wives in the same home)</SelectItem>
                                                <SelectItem className="text-sm max-w-80" value="No (wife will never be required to live with non-mehram in-laws)">No (wife will never be required to live with non-mehram in-laws)</SelectItem>

                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage className="text-xs" />
                                </FormItem>)}
                        />
                    </div>

                    <div className="space-y-1 col-span-4">
                        <Label className="font-normal text-xs">
                            Couple&apos;s Living Accommodation
                        </Label>
                        <FormField
                            name='coupleLivingAccomodation'
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Select onValueChange={field.onChange} value={field.value}>
                                            <SelectTrigger className="shadow text-muted-foreground bg-background text-xs rounded-sm h-8 ring-transparent ring-offset-transparent">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem className="text-sm max-w-80" value="Yes">Yes</SelectItem>
                                                <SelectItem className="text-sm max-w-80" value="No">No</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage className="text-xs" />
                                </FormItem>)}
                        />
                    </div>

                    <div className="space-y-1 col-span-4">
                        <Label className="font-normal text-xs">
                            Husband Open to Live with Wife&apos;s Family
                        </Label>
                        <FormField
                            name='openToLiveWithWifeFamily'
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Select onValueChange={field.onChange} value={field.value}>
                                            <SelectTrigger className="shadow text-muted-foreground bg-background text-xs rounded-sm h-8 ring-transparent ring-offset-transparent">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem className="text-sm max-w-80" value="Yes">Yes</SelectItem>
                                                <SelectItem className="text-sm max-w-80" value="No">No</SelectItem>
                                                <SelectItem className="text-sm max-w-80" value="Maybe/Will consider it">Maybe/Will consider it</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage className="text-xs" />
                                </FormItem>)}
                        />
                    </div>

                    <div className="space-y-1 col-span-4">
                        <Label className="font-normal text-xs">
                            Wife to live with husbands parents
                        </Label>
                        <FormField
                            name='expectWifeToLiveWithHisFamily'
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Select onValueChange={field.onChange} value={field.value}>
                                            <SelectTrigger className="shadow text-muted-foreground bg-background text-xs rounded-sm h-8 ring-transparent ring-offset-transparent">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem className="text-sm max-w-80" value="Yes">Yes</SelectItem>
                                                <SelectItem className="text-sm max-w-80" value="No">No</SelectItem>
                                                <SelectItem className="text-sm max-w-80" value="Possibly">Possibly</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage className="text-xs" />
                                </FormItem>)}
                        />
                    </div>

                    <div className="space-y-1 col-span-3">
                        <Label className="font-normal text-xs">Husband & Having Children</Label>
                        <FormField
                            name='havingChildren'
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Select onValueChange={field.onChange} value={field.value}>
                                            <SelectTrigger className="shadow text-muted-foreground bg-background text-xs rounded-sm h-8 ring-transparent ring-offset-transparent">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem className="text-sm max-w-80" value="Wants children">Wants children</SelectItem>
                                                <SelectItem className="text-sm max-w-80" value="Don't want children">Don&apos;t want children</SelectItem>
                                                <SelectItem className="text-sm max-w-80" value="Can't Have Children (medical reason)">Can&apos;t Have Children (medical reason)</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage className="text-xs" />
                                </FormItem>)}
                        />
                    </div>

                    <div className="space-y-1 col-span-4">
                        <Label className="font-normal text-xs">Husband Desired Number of Children</Label>
                        <FormField
                            name='numberOfChildren'
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Select onValueChange={field.onChange} value={field.value.toString()}>
                                            <SelectTrigger className="shadow text-muted-foreground bg-background text-xs rounded-sm h-8 ring-transparent ring-offset-transparent">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem className="text-sm max-w-80" value="0">Not specified (Tawakkul-Allah)</SelectItem>
                                                <SelectItem className="text-sm max-w-80" value="1">1+</SelectItem>
                                                <SelectItem className="text-sm max-w-80" value="2">2+</SelectItem>
                                                <SelectItem className="text-sm max-w-80" value="3">3+</SelectItem>
                                                <SelectItem className="text-sm max-w-80" value="4">4+ or more Insha&apos;Allah</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage className="text-xs" />
                                </FormItem>)}
                        />
                    </div>

                    <div className="space-y-1 col-span-5">
                        <Label className="font-normal text-xs">
                            Parenthood Timing After Marriage
                        </Label>
                        <FormField
                            name='parenthoodTimingAfterMarriage'
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Select onValueChange={field.onChange} value={field.value}>
                                            <SelectTrigger className="shadow text-muted-foreground bg-background text-xs rounded-sm h-8 ring-transparent ring-offset-transparent">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem className="text-sm max-w-80" value="Immediately">Immediately</SelectItem>
                                                <SelectItem className="text-sm max-w-80" value="After 8 months">8+ months</SelectItem>
                                                <SelectItem className="text-sm max-w-80" value="1 year">1+ year</SelectItem>
                                                <SelectItem className="text-sm max-w-80" value="2 years">2+ years</SelectItem>
                                                <SelectItem className="text-sm max-w-80" value="3 years">3+ years</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage className="text-xs" />
                                </FormItem>)}
                        />
                    </div>

                    <h2 className="col-span-12 font-bold mt-2">
                        Children from Previous Marriage
                    </h2>

                    <div className="space-y-1 col-span-8">
                        <Label className="font-normal text-xs">
                            Wife must accept responsibility of husbands children from previous marriage
                        </Label>
                        <FormField
                            name='requireWifeToAcceptChildren'
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Select onValueChange={field.onChange} value={field.value}>
                                            <SelectTrigger className="shadow text-muted-foreground bg-background text-xs rounded-sm h-8 ring-transparent ring-offset-transparent">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent className='max-w-80'>
                                                <SelectItem className="text-sm max-w-full" value="Yes">Yes</SelectItem>
                                                <SelectItem className="text-sm max-w-full" value="No">No</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage className="text-xs" />
                                </FormItem>)}
                        />
                    </div>

                    <div className="space-y-1 col-span-8">
                        <Label className="font-normal text-xs">
                            Husband willing to accept responsibility of wife&apos;s children from previous marriage.
                        </Label>
                        <FormField
                            name='willingToAcceptWifeChildren'
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Select onValueChange={field.onChange} value={field.value}>
                                            <SelectTrigger className="shadow text-muted-foreground bg-background text-xs rounded-sm h-8 ring-transparent ring-offset-transparent">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent className='max-w-80'>
                                                <SelectItem className="text-sm max-w-full" value="Yes">Yes</SelectItem>
                                                <SelectItem className="text-sm max-w-full" value="No">No</SelectItem>
                                                <SelectItem className="text-sm max-w-full" value="Maybe">Maybe</SelectItem>
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


    );
}
