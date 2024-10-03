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

export function ExpectedWorldlyLifestyleFormFemale({ expectedWorldlyLifestyle }: { expectedWorldlyLifestyle?: ExpectedWorldlyLifestyle }) {
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
                        <Label className="line-clamp-1 font-normal text-xs">Decision Making & Leadership</Label>
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
                                                <SelectItem className="text-xs max-w-80" value="Sole Decision-Maker (Husband as Primary decision-maker in the family)">Sole Decision-Maker (Husband as Primary decision-maker in the family)</SelectItem>
                                                <SelectItem className="text-xs max-w-80" value="Consultative Leader (Husband Leads by consulting with the wife on major decisions considering her views but has final say)">Consultative Leader (Husband Leads by consulting with the wife on major decisions considering her views but has final say)</SelectItem>
                                                <SelectItem className="text-xs max-w-80" value="Co-Leadership (Husband Shares leadership equally with the wife, jointly making decisions)">Co-Leadership (Husband Shares leadership equally with the wife, jointly making decisions)</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage className="text-xs" />
                                </FormItem>)}
                        />
                    </div>

                    <div className="space-y-1 col-span-3">
                        <Label className="line-clamp-1 font-normal text-xs">Financial Responsibility in Marriage</Label>
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
                                                <SelectItem className="text-xs max-w-80" value="Provider (Husband is the sole financial provider of the family and children)">Provider (Husband is the sole financial provider of the family and children)</SelectItem>
                                                <SelectItem className="text-xs max-w-80" value="Provider + Household Support (Husband must financially provide + help with the home and raising children)">Provider + Household Support (Husband must financially provide + help with the home and raising children)</SelectItem>
                                                <SelectItem className="text-xs max-w-80" value="Dual Income (Equally share in the financial, and family responsibilities)">Dual Income (Equally share in the financial, and family responsibilities)</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage className="text-xs" />
                                </FormItem>)}
                        />
                    </div>

                    <div className="space-y-1 col-span-3">
                        <Label className="line-clamp-1 font-normal text-xs">Expect Husband to Financially support wife&apos;s career, business or education</Label>
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
                                            <SelectContent>
                                                <SelectItem className="text-xs max-w-80" value="Yes">Yes</SelectItem>
                                                <SelectItem className="text-xs max-w-80" value="No">No</SelectItem>
                                                <SelectItem className="text-xs max-w-80" value="Maybe/Possibly">Maybe/Possibly</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage className="text-xs" />
                                </FormItem>)}
                        />
                    </div>

                    <div className="space-y-1 col-span-3">
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
                                                <SelectItem className="text-xs max-w-80" value="Needs Husband to relocate to her current city of residence: Yes">Yes</SelectItem>
                                                <SelectItem className="text-xs max-w-80" value="No">No</SelectItem>
                                                <SelectItem className="text-xs max-w-80" value="Maybe">Maybe</SelectItem>
                                                <SelectItem className="text-xs max-w-80" value="To be discussed">To be discussed</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage className="text-xs" />
                                </FormItem>)}
                        />
                    </div>

                    <div className="space-y-1 col-span-3">
                        <Label className="line-clamp-1 font-normal text-xs">Husband must have home separate from their respective families</Label>
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
                                                <SelectItem className="text-xs max-w-80" value="Husband must have home separate from their respective families: Yes">Yes</SelectItem>
                                                <SelectItem className="text-xs max-w-80" value="No">No</SelectItem>
                                                <SelectItem className="text-xs max-w-80" value="Maybe">Maybe</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage className="text-xs" />
                                </FormItem>)}
                        />
                    </div>

                    <div className="space-y-1 col-span-3">
                        <Label className="line-clamp-1 font-normal text-xs">
                            Husband must be willing to live with wife&apos;s family
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
                                                <SelectItem className="text-xs max-w-80" value="Husband must be willing to live with wife's family: Yes">Yes</SelectItem>
                                                <SelectItem className="text-xs max-w-80" value="No">No</SelectItem>
                                                <SelectItem className="text-xs max-w-80" value="Maybe/should consider it">Maybe/should consider it</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage className="text-xs" />
                                </FormItem>)}
                        />
                    </div>

                    <div className="space-y-1 col-span-3">
                        <Label className="line-clamp-1 font-normal text-xs">
                            Wife Open to Live with husband&apos;s Family (Joint family)
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
                                                <SelectItem className="text-xs max-w-80" value="Wife willing to live with husband's family (Joint family): Yes">Yes</SelectItem>
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
                        <Label className="line-clamp-1 font-normal text-xs">
                            Wants Children
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
                                                <SelectItem className="text-xs max-w-80" value="Wants Children: Yes">Yes</SelectItem>
                                                <SelectItem className="text-xs max-w-80" value="No">No</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage className="text-xs" />
                                </FormItem>)}
                        />
                    </div>

                    <div className="space-y-1 col-span-3">
                        <Label className="line-clamp-1 font-normal text-xs">Requires Husband to accept/financially be responsible for wife&apos;s children from previous marriage</Label>
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
                                                <SelectItem className="text-xs max-w-80" value="Requires Husband to accept/financially be responsible for wife's children from previous marriage: Yes">Yes</SelectItem>
                                                <SelectItem className="text-xs max-w-80" value="No">No</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage className="text-xs" />
                                </FormItem>)}
                        />
                    </div>
                    {/*  */}
                    <div className="space-y-1 col-span-3">
                        <Label className="line-clamp-1 font-normal text-xs">Wife willing to accept/take care of husband&apos;s children from previous marriage</Label>
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
                                                <SelectItem className="text-xs max-w-80" value="Wife willing to accept/take care of husband's children from previous marriage: Yes">Yes</SelectItem>
                                                <SelectItem className="text-xs max-w-80" value="No">No</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage className="text-xs" />
                                </FormItem>)}
                        />
                    </div>

                    <div className="space-y-1 col-span-6">
                        <Label className="line-clamp-1 font-normal text-xs">
                            Having Children
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
                                                <SelectItem className="text-xs max-w-80" value="Having Children: Wants children">Wants children</SelectItem>
                                                <SelectItem className="text-xs max-w-80" value="Don't want children">Don&apos;t want children</SelectItem>
                                                <SelectItem className="text-xs max-w-80" value="Can't Have Children (medical reason)">Can&apos;t Have Children (medical reason)</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage className="text-xs" />
                                </FormItem>)}
                        />
                    </div>

                    <div className="space-y-1 col-span-6">
                        <Label className="line-clamp-1 font-normal text-xs">
                            Number of Children
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
                                            <SelectContent>
                                                <SelectItem className="text-xs max-w-80" value="Not specified (whatever Allah Azawajal wills)">Not specified (whatever Allah Azawajal wills)</SelectItem>
                                                <SelectItem className="text-xs max-w-80" value="1+">1+</SelectItem>
                                                <SelectItem className="text-xs max-w-80" value="2+">2+</SelectItem>
                                                <SelectItem className="text-xs max-w-80" value="3+">3+</SelectItem>
                                                <SelectItem className="text-xs max-w-80" value="4+">4+</SelectItem>
                                                <SelectItem className="text-xs max-w-80" value="5 or more Insha’Allah">5 or more Insha’Allah</SelectItem>
                                                <SelectItem className="text-xs max-w-80" value="To be discussed">To be discussed</SelectItem>
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
                            name='willingToAcceptWifeChildren'
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
                                                <SelectItem className="text-xs max-w-80" value="4 years">4 years</SelectItem>
                                                <SelectItem className="text-xs max-w-80" value="To be discussed">To be discussed</SelectItem>
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
