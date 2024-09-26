import React from 'react'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { useFormContext } from 'react-hook-form';

export default function ChildrenStatus() {
    const form = useFormContext()

    const hasChildren = form.watch('hasChildren') !== 'No kids';

    if (!hasChildren) return

    return (
        <div className="col-span-4 grid grid-cols-8 gap-x-5 gap-y-4">
            {hasChildren &&
                <div className="space-y-1 col-span-8 sm:col-span-2">
                    <Label className="font-normal text-xs line-clamp-1">Number of children</Label>
                    <FormField
                        name='numberOfChildren'
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Select onValueChange={field.onChange} value={field.value ? field.value.toString() : ''}>
                                        <SelectTrigger className="shadow text-muted-foreground bg-background text-xs rounded-sm h-8 ring-transparent ring-offset-transparent">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {
                                                Array.from({ length: 15 }, (_, i) => i).map(i => <SelectItem key={i} value={i.toString()}>{i}</SelectItem>)
                                            }
                                            <SelectItem value="15">More than 15</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormMessage className="text-xs" />
                            </FormItem>)}
                    />
                </div>
            }{hasChildren &&
                <div className="space-y-1 col-span-4 sm:col-span-3">
                    <Label className="font-normal text-xs line-clamp-1">Age of Oldest Child</Label>
                    <FormField
                        name='ageOfOldestChild'
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Select onValueChange={field.onChange} value={field.value ? field.value.toString() : ''}>
                                        <SelectTrigger className="shadow text-muted-foreground bg-background text-xs rounded-sm h-8 ring-transparent ring-offset-transparent">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent className='max-h-64'>
                                            {
                                                Array.from({ length: 83 }, (_, i) => i + 18).map(i => <SelectItem key={i} value={i.toString()}>{i}</SelectItem>)
                                            }
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormMessage className="text-xs" />
                            </FormItem>)}
                    />
                </div>
            }{hasChildren &&
                <div className="space-y-1 col-span-4 sm:col-span-3">
                    <Label className="font-normal text-xs line-clamp-1">Age of Youngest Child</Label>
                    <FormField
                        name='ageOfYoungestChild'
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Select onValueChange={field.onChange} value={field.value ? field.value.toString() : ''}>
                                        <SelectTrigger className="shadow text-muted-foreground bg-background text-xs rounded-sm h-8 ring-transparent ring-offset-transparent">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent className='max-h-64'>
                                            {
                                                Array.from({ length: 83 }, (_, i) => i + 18).map(i => <SelectItem key={i} value={i.toString()}>{i}</SelectItem>)
                                            }
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormMessage className="text-xs" />
                            </FormItem>)}
                    />
                </div>
            }
        </div>
    )
}
