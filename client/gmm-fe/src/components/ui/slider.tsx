'use client';

import { Slider as NextSlider } from '@nextui-org/slider';
import React from 'react';

const Slider = React.forwardRef<
  React.ElementRef<typeof NextSlider>,
  React.ComponentPropsWithoutRef<typeof NextSlider>
>(({ className, ...props }, ref) => (
  <NextSlider
    aria-label={props['aria-label'] ?? 'slider'}
    size={props.size ?? 'md'}
    classNames={{
      filler: 'bg-primary',
      labelWrapper: 'mb-2',
      label: 'font-medium text-medium',
      value: 'font-medium text-small',
      thumb: [
        'transition-size h-5 w-5',
        'bg-[#ffffff] border border-2 border-primary',
        'data-[dragging=true]:shadow-lg data-[dragging=true]:shadow-black/20',
        'data-[dragging=true]:w-6 data-[dragging=true]:h-6 data-[dragging=true]:after:h-6 data-[dragging=true]:after:w-6',
      ],
      track: ['bg-[#dbdbdb]', 'rounded-full'],
      step: 'data-[in-range=true]:bg-black/30 dark:data-[in-range=true]:bg-white/50',
    }}
    color="success"
    className="w-full cursor-pointer"
    ref={ref}
    {...props}
  />
));
Slider.displayName = 'Slider';

export { Slider };
