import * as React from 'react';

import { cn } from '@/lib/utils';
import { Label } from './label';
import { buttonVariants } from './button';
import { useTranslations } from 'next-intl';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    const t = useTranslations('common');

    if (type === 'file') {
      return (
        <Label
          className={cn(
            'relative flex items-center h-8 w-full rounded-md border border-input bg-background px-3 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'
          )}
        >
          <input type={type} ref={ref} className="hidden" {...props} />
          <span className="text-xs text-muted-foreground">
            {t('fileUploadPlaceholder')}
          </span>
          <div
            className={cn(
              buttonVariants({
                variant: 'outline',
                size: 'sm',
              }),
              'h-full absolute right-0 text-secondary-foreground bg-secondary font-bold text-[0.6rem] px-8'
            )}
          >
            {t('upload')}
          </div>
        </Label>
      );
    }

    return (
      <input
        type={type}
        className={cn(
          'flex h-8 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = 'Input';

export { Input };
