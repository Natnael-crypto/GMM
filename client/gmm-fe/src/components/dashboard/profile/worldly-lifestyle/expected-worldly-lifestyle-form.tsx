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
            roleOfWife: expectedWorldlyLifestyle?.roleOfWife || '',
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
                Expected Worldly Lifestyle of Your Potential Spouses
            </h1>

            <Form {...form} >
                <form
                    ref={expectedWorldlyLifestyleFormRef}
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="grid grid-cols-12 gap-x-3 gap-y-4 py-5">
                    <div className="space-y-1 col-span-3">
                        <Label className="line-clamp-1 font-normal text-xs">Role of Wife</Label>
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
                                                <SelectItem className="text-xs max-w-80" value="Homemaker (Cleaning, Cooking, Kids, Husband)">Homemaker (Cleaning, Cooking, Kids, Husband)</SelectItem>
                                                <SelectItem className="text-xs max-w-80" value="Homemaker + Assisting In laws">Homemaker + Assisting In laws</SelectItem>
                                                <SelectItem className="text-xs max-w-80" value="Homemaker + May study from home">Homemaker + May study from home</SelectItem>
                                                <SelectItem className="text-xs max-w-80" value="Homemakers may work from Home">Homemakers may work from Home</SelectItem>
                                                <SelectItem className="text-xs max-w-80" value="May work or study outside home">May work or study outside home</SelectItem>
                                                <SelectItem className="text-xs max-w-80" value="Requires wife to work or study">Requires wife to work or study</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage className="text-xs" />
                                </FormItem>)}
                        />
                    </div>

                    <div className="space-y-1 col-span-2">
                        <Label className="line-clamp-1 font-normal text-xs">Wife&apos;s Career</Label>
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
                                                <SelectItem className="text-xs max-w-80" value="Yes">Yes</SelectItem>
                                                <SelectItem className="text-xs max-w-80" value="No">No</SelectItem>
                                                <SelectItem className="text-xs max-w-80" value="Possibly/May consider it">Possibly/May consider it</SelectItem>
                                                <SelectItem className="text-xs max-w-80" value="Requires wife to have Career/Business">Requires wife to have Career/Business</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage className="text-xs" />
                                </FormItem>)}
                        />
                    </div>

                    <div className="space-y-1 col-span-2">
                        <Label className="line-clamp-1 font-normal text-xs">Dual Income</Label>
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
                                                <SelectItem className="text-xs max-w-80" value="Yes">Yes</SelectItem>
                                                <SelectItem className="text-xs max-w-80" value="No">No</SelectItem>
                                                <SelectItem className="text-xs max-w-80" value="Possibly/May Consider it">Possibly/May Consider it</SelectItem>
                                                <SelectItem className="text-xs max-w-80" value="Requires wife to contribute financially to home expenses">Requires wife to contribute financially to home expenses</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage className="text-xs" />
                                </FormItem>)}
                        />
                    </div>

                    <div className="space-y-1 col-span-2">
                        <Label className="line-clamp-1 font-normal text-xs">Relocation</Label>
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
                                                <SelectItem className="text-xs max-w-80" value="Yes">Yes</SelectItem>
                                                <SelectItem className="text-xs max-w-80" value="No">No</SelectItem>
                                                <SelectItem className="text-xs max-w-80" value="Maybe">Maybe</SelectItem>
                                                <SelectItem className="text-xs max-w-80" value="Unsure about relocation">Unsure about relocation</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage className="text-xs" />
                                </FormItem>)}
                        />
                    </div>

                    <div className="space-y-1 col-span-3">
                        <Label className="line-clamp-1 font-normal text-xs">Joint Family</Label>
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
                                                <SelectItem className="text-xs max-w-80" value="Yes (My wife must live with my brother(s) and their wifes in same home)">Yes (My wife must live with my brother(s) and their wifes in same home)</SelectItem>
                                                <SelectItem className="text-xs max-w-80" value="Maybe (this is a possibility in the future where my brothers and their wives may live in the same home)">Maybe (this is a possibility in the future where my brothers and their wives may live in the same home)</SelectItem>
                                                <SelectItem className="text-xs max-w-80" value="No (my wife will not live with my brother(s) and their wifes in same home)">No (my wife will not live with my brother(s) and their wifes in same home)</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage className="text-xs" />
                                </FormItem>)}
                        />
                    </div>

                    <div className="space-y-1 col-span-4">
                        <Label className="line-clamp-1 font-normal text-xs">
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
                                                <SelectItem className="text-xs max-w-80" value="Yes">Yes</SelectItem>
                                                <SelectItem className="text-xs max-w-80" value="No">No</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage className="text-xs" />
                                </FormItem>)}
                        />
                    </div>

                    <div className="space-y-1 col-span-4">
                        <Label className="line-clamp-1 font-normal text-xs">
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
                                                <SelectItem className="text-xs max-w-80" value="Yes">Yes</SelectItem>
                                                <SelectItem className="text-xs max-w-80" value="No">No</SelectItem>
                                                <SelectItem className="text-xs max-w-80" value="Maybe/Will consider it">Maybe/Will consider it</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage className="text-xs" />
                                </FormItem>)}
                        />
                    </div>

                    <div className="space-y-1 col-span-4">
                        <Label className="line-clamp-1 font-normal text-xs">
                            Husband Expects Wife to Live with His Family
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
                                                <SelectItem className="text-xs max-w-80" value="Yes">Yes</SelectItem>
                                                <SelectItem className="text-xs max-w-80" value="No">No</SelectItem>
                                                <SelectItem className="text-xs max-w-80" value="Maybe/Will consider it">Maybe/Will consider it</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage className="text-xs" />
                                </FormItem>)}
                        />
                    </div>

                    <div className="space-y-1 col-span-3">
                        <Label className="line-clamp-1 font-normal text-xs">Having Children</Label>
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
                                                <SelectItem className="text-xs max-w-80" value="Wants children">Wants children</SelectItem>
                                                <SelectItem className="text-xs max-w-80" value="Don't want children">Don&apos;t want children</SelectItem>
                                                <SelectItem className="text-xs max-w-80" value="Can't Have Children (medical reason)">Can&apos;t Have Children (medical reason)</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage className="text-xs" />
                                </FormItem>)}
                        />
                    </div>

                    <div className="space-y-1 col-span-3">
                        <Label className="line-clamp-1 font-normal text-xs">Number of Children</Label>
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
                                                <SelectItem className="text-xs max-w-80" value="0">Not specified (whatever Allah Azawajal wills)</SelectItem>
                                                <SelectItem className="text-xs max-w-80" value="1">1+</SelectItem>
                                                <SelectItem className="text-xs max-w-80" value="2">2+</SelectItem>
                                                <SelectItem className="text-xs max-w-80" value="3">3+</SelectItem>
                                                <SelectItem className="text-xs max-w-80" value="4">4+</SelectItem>
                                                <SelectItem className="text-xs max-w-80" value="5">5 or more Insha&apos;Allah</SelectItem>
                                                <SelectItem className="text-xs max-w-80" value="6">To be discussed</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage className="text-xs" />
                                </FormItem>)}
                        />
                    </div>

                    <div className="space-y-1 col-span-6">
                        <Label className="line-clamp-1 font-normal text-xs">
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
                                                <SelectItem className="text-xs max-w-80" value="Immediately">Immediately</SelectItem>
                                                <SelectItem className="text-xs max-w-80" value="After 8 months">After 8 months</SelectItem>
                                                <SelectItem className="text-xs max-w-80" value="1 year">1 year</SelectItem>
                                                <SelectItem className="text-xs max-w-80" value="2 years">2 years</SelectItem>
                                                <SelectItem className="text-xs max-w-80" value="3 years">3 years</SelectItem>
                                                <SelectItem className="text-xs max-w-80" value="4 year">4 year</SelectItem>
                                                <SelectItem className="text-xs max-w-80" value="To be discussed">To be discussed</SelectItem>
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

                    <div className="space-y-1 col-span-5">
                        <Label className="line-clamp-1 font-normal text-xs">
                            Requires wife to accept/take care of children
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
                                                <SelectItem className="text-xs max-w-full" value="Yes">Yes</SelectItem>
                                                <SelectItem className="text-xs max-w-full" value="No">No</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage className="text-xs" />
                                </FormItem>)}
                        />
                    </div>

                    <div className="space-y-1 col-span-5">
                        <Label className="line-clamp-1 font-normal text-xs">
                            Willing to accept/take care of wife&apos;s children
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
                                                <SelectItem className="text-xs max-w-full" value="Yes">Yes</SelectItem>
                                                <SelectItem className="text-xs max-w-full" value="No">No</SelectItem>
                                                <SelectItem className="text-xs max-w-full" value="Maybe">Maybe</SelectItem>

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
