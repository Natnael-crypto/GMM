'use effect'

import { useEffect, useRef } from 'react'
import { Label } from '@/components/ui/label';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useAppSelector } from '@/lib/hooks';
import { useUpdateProfileContext } from '@/components/dashboard/profile/update-profile-context';
import { toast } from '@/components/ui/use-toast';
import { MarriageDiscussion, marriageDiscussionSchema } from '@/lib/schemas/marriage-discussion';
import { useUpdateMarriageDiscussionMutation } from '@/lib/user/api';


export default function MarriageDiscussionForm({ marriageDiscussion }: { marriageDiscussion?: MarriageDiscussion }) {
    const form = useForm<MarriageDiscussion>({
        resolver: zodResolver(marriageDiscussionSchema),
        defaultValues: {
            marriageType: marriageDiscussion?.marriageType || '',
            marriageLocation: marriageDiscussion?.marriageLocation || '',
            marriageVenue: marriageDiscussion?.marriageVenue || '',
            marriageTimeline: marriageDiscussion?.marriageTimeline || '',
            familyInMarriageDiscussion: marriageDiscussion?.familyInMarriageDiscussion || '',
            dowry: marriageDiscussion?.dowry || '',
            weddingBudget: marriageDiscussion?.weddingBudget || '',
        }
    });

    useEffect(() => {
        form.reset(marriageDiscussion)
    }, [form, marriageDiscussion]);

    const user = useAppSelector((state) => state.auth.user);
    const marriageDiscussionFormRef = useRef<HTMLFormElement>(null);

    const { registerForm, setSaving } = useUpdateProfileContext()
    const [updateMarriageDiscussion, updateResult] = useUpdateMarriageDiscussionMutation();

    useEffect(() => {
        if (marriageDiscussionFormRef && marriageDiscussionFormRef.current) {
            registerForm('marriageDiscussionForm', marriageDiscussionFormRef.current);
        }
    }, [marriageDiscussionFormRef, registerForm]);

    const onSubmit = (data: MarriageDiscussion) => {
        updateMarriageDiscussion({ userId: user!.id, marriageDiscussion: data });
    }

    useEffect(() => {
        if (updateResult.isSuccess) {
            toast({
                title: 'Success',
                description: 'Marriage discussion preferences are updated successfully',
            });
        }
    }, [updateResult])

    useEffect(() => {
        setSaving(updateResult.isLoading);
    }, [updateResult, setSaving])

    return (
        <Form {...form}>
            <form
                ref={marriageDiscussionFormRef}
                onSubmit={form.handleSubmit(onSubmit)}
                className="grid grid-cols-12 gap-x-3 gap-y-3 py-5">
                <div className="space-y-1 col-span-4">
                    <Label className="font-normal text-xs line-clamp-1">Marriage Type</Label>
                    <FormField
                        name='marriageType'
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Select onValueChange={field.onChange} value={field.value}>
                                        <SelectTrigger className="shadow text-muted-foreground bg-background text-xs rounded-sm h-8 ring-transparent ring-offset-transparent">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem className="text-xs max-w-80" value="Simple Ceremony (modest and straightforward wedding with minimal extravagance)">Simple Ceremony (modest and straightforward wedding with minimal extravagance)</SelectItem>
                                            <SelectItem className="text-xs max-w-80" value="Traditional Ceremony (wedding that adheres closely to tradition)">Traditional Ceremony (wedding that adheres closely to tradition)</SelectItem>
                                            <SelectItem className="text-xs max-w-80" value="Lavish Ceremony (grand and elaborate wedding celebration)">Lavish Ceremony (grand and elaborate wedding celebration)</SelectItem>
                                            <SelectItem className="text-xs max-w-80" value="Intimate Gathering (small, personal ceremony with close friends and family)">Intimate Gathering (small, personal ceremony with close friends and family)</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormMessage className="text-xs" />
                            </FormItem>)}
                    />

                </div>

                <div className="space-y-1 col-span-4">
                    <Label className="font-normal text-xs line-clamp-1">Marriage Location</Label>
                    <FormField
                        name='marriageLocation'
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Select onValueChange={field.onChange} value={field.value}>
                                        <SelectTrigger className="shadow text-muted-foreground bg-background text-xs rounded-sm h-8 ring-transparent ring-offset-transparent">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem className="text-xs max-w-80" value="Hometown Celebration (wedding to take place in my home city)">Hometown Celebration (wedding to take place in my home city)</SelectItem>
                                            <SelectItem className="text-xs max-w-80" value="Spouse Hometown (open to having the wedding in the city of my spouse)">Spouse Hometown (open to having the wedding in the city of my spouse)</SelectItem>
                                            <SelectItem className="text-xs max-w-80" value="Destination Wedding (want a wedding in a specific, or significant, location)">Destination Wedding (want a wedding in a specific, or significant, location)</SelectItem>
                                            <SelectItem className="text-xs max-w-80" value="Any Location (not tied to a specific location)">Any Location (not tied to a specific location)</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormMessage className="text-xs" />
                            </FormItem>)}
                    />
                </div>

                <div className="space-y-1 col-span-4">
                    <Label className="font-normal text-xs line-clamp-1">Marriage Venue</Label>
                    <FormField
                        name='marriageVenue'
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Select onValueChange={field.onChange} value={field.value}>
                                        <SelectTrigger className="shadow text-muted-foreground bg-background text-xs rounded-sm h-8 ring-transparent ring-offset-transparent">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem className="text-xs max-w-80" value="Mosque Ceremony (prefer a wedding held in a mosque)">Mosque Ceremony (prefer a wedding held in a mosque)</SelectItem>
                                            <SelectItem className="text-xs max-w-80" value="Wedding Hall Celebration (want a ceremony in a formal wedding hall)">Wedding Hall Celebration (want a ceremony in a formal wedding hall)</SelectItem>
                                            <SelectItem className="text-xs max-w-80" value="Outdoor Setting (an outdoor wedding, such as in a garden or on a beach)">Outdoor Setting (an outdoor wedding, such as in a garden or on a beach)</SelectItem>
                                            <SelectItem className="text-xs max-w-80" value="To Be Discussed (we can decide)">To Be Discussed (we can decide)</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormMessage className="text-xs" />
                            </FormItem>)}
                    />
                </div>

                <div className="space-y-1 col-span-4">
                    <Label className="font-normal text-xs line-clamp-1">Marriage Timeline</Label>
                    <FormField
                        name='marriageTimeline'
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Select onValueChange={field.onChange} value={field.value}>
                                        <SelectTrigger className="shadow text-muted-foreground bg-background text-xs rounded-sm h-8 ring-transparent ring-offset-transparent">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem className="text-xs max-w-80" value="Immediate (wedding as soon as possible)">Immediate (wedding as soon as possible)</SelectItem>
                                            <SelectItem className="text-xs max-w-80" value="Short-Term (3 - 6 months)">Short-Term (3 - 6 months)</SelectItem>
                                            <SelectItem className="text-xs max-w-80" value="Long-Term Planning (6 months to a year+)">Long-Term Planning (6 months to a year+)</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormMessage className="text-xs" />
                            </FormItem>)}
                    />
                </div>

                <div className="space-y-1 col-span-4">
                    <Label className="font-normal text-xs line-clamp-1">
                        Family in Marriage Discussion
                    </Label>
                    <FormField
                        name='familyInMarriageDiscussion'
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Select onValueChange={field.onChange} value={field.value}>
                                        <SelectTrigger className="shadow text-muted-foreground bg-background text-xs rounded-sm h-8 ring-transparent ring-offset-transparent">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem className="text-xs max-w-80" value="Significant Influence (family plays a major role in marriage decision-making)">Significant Influence (family plays a major role in marriage decision-making)</SelectItem>
                                            <SelectItem className="text-xs max-w-80" value="Moderate Input (some family input but it's my say in the final decision)">Moderate Input (some family input but it&apos;s my say in the final decision)</SelectItem>
                                            <SelectItem className="text-xs max-w-80" value="Limited Involvement (family involvement is minimal)">Limited Involvement (family involvement is minimal)</SelectItem>
                                            <SelectItem className="text-xs max-w-80" value="Independent Decision (marriage decision is mine and my family has no say)">Independent Decision (marriage decision is mine and my family has no say)</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormMessage className="text-xs" />
                            </FormItem>)}
                    />
                </div>

                <div className="space-y-1 col-span-4">
                    <Label className="font-normal text-xs line-clamp-1">
                        Dowry/Mahr Expectation
                    </Label>
                    <FormField
                        name='dowry'
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Select onValueChange={field.onChange} value={field.value}>
                                        <SelectTrigger className="shadow text-muted-foreground bg-background text-xs rounded-sm h-8 ring-transparent ring-offset-transparent">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem className="text-xs max-w-80" value="Symbolic (Minimal, symbolic Mahr, does not have to be money)">Symbolic (Minimal, symbolic Mahr, does not have to be money)</SelectItem>
                                            <SelectItem className="text-xs max-w-80" value="Moderate (Mahr of moderate value to be discussed)">Moderate (Mahr of moderate value to be discussed)</SelectItem>
                                            <SelectItem className="text-xs max-w-80" value="Substantial Mahr (A significant Mahr to be discussed)">Substantial Mahr (A significant Mahr to be discussed)</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormMessage className="text-xs" />
                            </FormItem>)}
                    />
                </div>

                <div className="space-y-1 col-span-4">
                    <Label className="font-normal text-xs line-clamp-1">Wedding Budget</Label>
                    <FormField
                        name='weddingBudget'
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Select onValueChange={field.onChange} value={field.value}>
                                        <SelectTrigger className="shadow text-muted-foreground bg-background text-xs rounded-sm h-8 ring-transparent ring-offset-transparent">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem className="text-xs max-w-80" value="Economical: $5,000 - $10,000">Economical: $5,000 - $10,000</SelectItem>
                                            <SelectItem className="text-xs max-w-80" value="Moderate: $10,000 - $20,000">Moderate: $10,000 - $20,000</SelectItem>
                                            <SelectItem className="text-xs max-w-80" value="Flexible: $20,000 - $30,000">Flexible: $20,000 - $30,000</SelectItem>
                                            <SelectItem className="text-xs max-w-80" value="High-End: $30,000+">High-End: $30,000+</SelectItem>

                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormMessage className="text-xs" />
                            </FormItem>)}
                    />
                </div>
            </form>
        </Form>
    )
}
