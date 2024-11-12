'use client';

import { FormField } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import React from 'react';
import { useFormContext } from 'react-hook-form';

interface MatchFilterSliderProps {
  label: string;
  defaultValue: any;
  min: number;
  max: number;
  name: string;
  allowAny: boolean;
  onChange?: () => void;
  render: (props: any) => React.ReactNode;
}

export default function MatchFilterSlider({
  label,
  defaultValue,
  render,
  name,
  min,
  max,
  allowAny,
  onChange,
}: MatchFilterSliderProps) {
  const form = useFormContext();

  return (
    <div className="space-y-2 col-span-10 md:col-span-3">
      <FormField
        name={name}
        control={form.control}
        render={({ field }) => (
          <>
            <Label
              className="text-md flex justify-between items-center"
              onClick={() => {
                field.onChange(defaultValue);
                if (onChange) {
                  onChange();
                }
              }}
            >
              <span className="font-bold line-clamp-1 ">{label}</span>
              <span className="flex gap-1 items-center justify-center text-[0.65rem]">
                <Input
                  type="checkbox"
                  className="p-0 m-0 h-fit"
                  checked={allowAny}
                  onChange={() => {}}
                />
                <span>Any</span>
              </span>
            </Label>
            <div className="px-2">
              <Slider
                value={field.value}
                onChange={(value) => {
                  field.onChange(value);
                  if (onChange) {
                    onChange();
                  }
                }}
                minValue={min}
                maxValue={max}
              />
            </div>
            {render(field)}
          </>
        )}
      />
    </div>
  );
}
