'use client';

import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import Multiselect from '@/components/ui/multiselect';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PreferenceQuestion } from '@/lib/matchmaking/questions/preference';
import { cn } from '@/lib/utils';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { X } from 'lucide-react';

interface PreferenceFieldProps {
  allowAny: boolean;
  question: PreferenceQuestion;
  type: 'multiselect' | 'single';
  notFilter?: any;
  toggleNotFilter?: () => void;
  onChange: (value: any) => void;
}

export default function PreferenceField({
  allowAny,
  notFilter,
  toggleNotFilter,
  question,
  type,
  onChange,
}: PreferenceFieldProps) {
  const form = useFormContext();

  return (
    <div className={cn('space-y-2', question.width)}>
      <FormField
        name={question.name}
        control={form.control}
        render={({ field }) => (
          <>
            <div className="text-sm flex justify-between items-center">
              <span className="font-bold line-clamp-1">{question.label}</span>
              {question.options.length >= 2 && (
                <div className="flex gap-2">
                  {type === 'multiselect' && (
                    <Label
                      className="flex gap-1 items-center justify-center text-[0.65rem]"
                      onClick={() => {
                        if (toggleNotFilter) {
                          toggleNotFilter();
                        }

                        field.onChange([]);
                        if (onChange) {
                          onChange([]);
                        }
                      }}
                    >
                      <Input
                        type="checkbox"
                        className="p-0 m-0 h-fit"
                        checked={notFilter}
                      />
                      <span>Not</span>
                    </Label>
                  )}
                  {!notFilter && (
                    <Label
                      className="flex gap-1 items-center justify-center text-[0.65rem]"
                      onClick={() => {
                        field.onChange(null);
                        if (onChange) {
                          onChange(null);
                        }
                      }}
                    >
                      <Input
                        type="checkbox"
                        className="p-0 m-0 h-fit"
                        checked={allowAny}
                      />
                      <span>Any</span>
                    </Label>
                  )}
                  {type === 'multiselect' && notFilter && (
                    <Label
                      className="flex gap-1 items-center justify-center text-[0.7rem] bg-muted px-2 py-1 rounded-sm hover:bg-secondary hover:text-secondary-foreground cursor-pointer"
                      onClick={() => {
                        field.onChange([]);
                        if (onChange) {
                          onChange([]);
                        }
                      }}
                    >
                      <span>Clear</span>
                    </Label>
                  )}
                </div>
              )}
            </div>
            <FormItem>
              <FormControl>
                {type === 'multiselect' ? (
                  <Multiselect
                    label={
                      notFilter
                        ? `Not Preferred ${question.label} `
                        : `Preferred ${question.label}`
                    }
                    className="shadow text-muted-foreground bg-background text-sm rounded-sm h-8 ring-transparent ring-offset-transparent"
                    values={field.value as unknown as string[]}
                    onChange={(values) => {
                      field.onChange(values);
                      if (onChange) {
                        onChange(values);
                      }
                    }}
                    options={
                      notFilter
                        ? question.options.map((option) => ({
                            ...option,
                            selectedIcon: <X className="h-4 w-4" />,
                          }))
                        : question.options
                    }
                  />
                ) : (
                  <Select
                    onValueChange={field.onChange}
                    value={
                      field.value?.toString() === 'true'
                        ? 'true'
                        : field.value?.toString() === 'false'
                        ? 'false'
                        : ''
                    }
                  >
                    <SelectTrigger className="shadow text-muted-foreground bg-background text-md rounded-sm h-8 ring-transparent ring-offset-transparent">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {question.options.map((option, index) => (
                        <SelectItem
                          key={`${question.name}_${option.label}_${index}`}
                          className="text-sm max-w-80"
                          value={option.value}
                        >
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              </FormControl>
              <FormMessage className="text-sm" />
            </FormItem>
          </>
        )}
      />
    </div>
  );
}
