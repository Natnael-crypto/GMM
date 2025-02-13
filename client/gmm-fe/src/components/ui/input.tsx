import * as React from 'react';

import { cn } from '@/lib/utils';
import { Label } from './label';
import { buttonVariants } from './button';
import { useTranslations } from 'next-intl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    const t = useTranslations('common');

    const [show, setShow] = React.useState(false);

    if (type === 'file') {
      return (
        <Label
          className={cn(
            'relative flex items-center h-8 w-full rounded-md border border-input bg-background px-3 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer'
          )}
        >
          <input type={type} ref={ref} className="hidden" {...props} />
          <span className="text-md text-muted-foreground">
            {t('fileUploadPlaceholder')}
          </span>
          <div
            className={cn(
              buttonVariants({
                variant: 'outline',
                size: 'sm',
              }),
              'h-full absolute right-0 text-secondary-foreground bg-secondary font-bold text-[0.6rem] px-8 cta'
            )}
          >
            {t('upload')}
          </div>
        </Label>
      );
    } else if (type === 'password') {
      return (
        <div className="relative">
          <div
            className="absolute w-8 h-8 right-0 top-1/2 -translate-y-1/2 flex items-center justify-center text-xs cursor-pointer"
            onClick={() => setShow((show) => !show)}
          >
            <FontAwesomeIcon icon={show ? faEye : faEyeSlash} />
          </div>
          <input
            type={show ? 'text' : type}
            className={cn(
              'flex h-8 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
              className
            )}
            ref={ref}
            {...props}
          />
        </div>
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
