import { FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Multiselect from '@/components/ui/multi-select'
import AutoComplete, { Option } from '@/components/ui/searchable-select'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'
import React from 'react'
import { useFormContext } from 'react-hook-form'

export enum FieldType {
    TEXT = 'text',
    SELECT = 'select',
    AUTOCOMPLETE = 'autocomplete',
    MULTISELECT = 'multiselect',
    STRING = 'string',
    NUMBER = 'number',
}

export type FieldOption = {
    value: string,
    label: string,
} | string

export interface FieldProps {
    type: FieldType,
    label: string,
    name: string,
    options?: FieldOption[],
    className?: string
}

export default function Field(props: FieldProps) {
    const form = useFormContext()

    let body;

    let options: Option[] = []
    if (props.options) {
        if (props.options[0] && typeof props.options[0] === 'object') {
            options = props.options as Option[]
        } else {
            options = (props.options as string[])?.map((option) => ({ value: option, label: option })) ?? []
        }
    }

    switch (props.type) {
        case FieldType.SELECT:
            body = <FormField
                name={props.name}
                control={form.control}
                render={({ field }) => (
                    <FormItem>
                        <FormControl>
                            <Select onValueChange={field.onChange} value={field.value}>
                                <SelectTrigger className="shadow text-muted-foreground bg-background text-xs rounded-sm h-8 ring-transparent ring-offset-transparent">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    {props.options?.map((option) => {
                                        if (typeof option === 'object') {
                                            return <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                                        } else {
                                            return <SelectItem key={option} value={option}>{option}</SelectItem>
                                        }
                                    })}
                                </SelectContent>
                            </Select>
                        </FormControl>
                        <FormMessage className="text-xs" />
                    </FormItem>)}
            />
            break;

        case FieldType.AUTOCOMPLETE:
            body = <FormField
                name={props.name}
                control={form.control}
                render={({ field }) => (
                    <FormItem>
                        <FormControl>
                            <AutoComplete onChange={field.onChange} selectedOption={field.value} options={options} placeholder='' className="shadow text-muted-foreground bg-background text-xs rounded-sm h-8 ring-transparent ring-offset-transparent" />
                        </FormControl>
                        <FormMessage className="text-xs" />
                    </FormItem>)}
            />
            break;

        case FieldType.MULTISELECT:
            body = <FormField
                name={props.name}
                control={form.control}
                render={({ field }) => (
                    <FormItem>
                        <FormControl>
                            <Multiselect onChange={field.onChange} selectedOptions={field.value} title={props.label} max={3} initOptions={options} placeholder='Select' className="shadow text-muted-foreground bg-background text-xs rounded-sm h-8 ring-transparent ring-offset-transparent" />
                        </FormControl>
                        <FormMessage className="text-xs" />
                    </FormItem>)}
            />
            break

        case FieldType.TEXT:
            body = <FormField
                name={props.name}
                control={form.control}
                render={({ field }) => (
                    <FormItem>
                        <FormControl>
                            <Textarea
                                {...field}
                                className="text-muted-foreground bg-background text-xs shadow rounded-sm"
                            />
                        </FormControl>
                        <FormMessage className="text-xs" />
                    </FormItem>)}
            />
            break

        case FieldType.STRING:
            body = <FormField
                name={props.name}
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
                    </FormItem>)}
            />

        case FieldType.NUMBER:
            body = <FormField
                name={props.name}
                control={form.control}
                render={({ field }) => (
                    <FormItem>
                        <FormControl>
                            <Input
                                {...field}
                                type='number'
                                className="text-muted-foreground bg-background text-xs shadow rounded-sm"
                            />
                        </FormControl>
                        <FormMessage className="text-xs" />
                    </FormItem>)}
            />

        default:
            body = null
    }

    return <div className={cn("flex flex-col justify-end gap-1 col-span-12 md:col-span-4", props.className)}>
        <Label className="font-normal text-xs">{props.label}</Label>
        {body}
    </div>
}
