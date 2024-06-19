'use client';

import * as React from 'react';
import Image from 'next/image';
import { useLocale } from 'next-intl';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Input } from '@/components/ui/input';
import { faChevronDown, faSearch } from '@fortawesome/free-solid-svg-icons';
import { languages } from '@/config';
import { LanguageSelectorProps } from '@/types';
import { usePathname, useRouter } from '@/lib/navigation';

export default function LanguageSelector({
  className,
  text = '',
}: LanguageSelectorProps) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState('');

  const switchLocale = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      {/* Header */}
      <PopoverTrigger asChild>
        <Button
          variant="default"
          role="combobox"
          aria-expanded={open}
          className={cn(
            'w-[250px] justify-end bg-transparent font-bold flex gap-3',
            className
          )}
        >
          <span>{text}</span>
          <span className="flex items-center">
            <div className="w-6 h-6 rounded-full overflow-clip">
              <Image
                className="w-full h-full object-cover"
                width={512}
                height={512}
                src={`/icons/lang/${locale}.svg`}
                alt="Language Flag"
              />
            </div>

            <FontAwesomeIcon
              icon={faChevronDown}
              className={cn(
                'ml-2 h-3 w-3 shrink-0 opacity-80 transition-transform duration-200 ease-in-out',
                open ? 'rotate-180' : 'transform rotate-0'
              )}
            />
          </span>
        </Button>
      </PopoverTrigger>

      {/* Content */}
      <PopoverContent className="w-[250px] p-2 border-none rounded-xl">
        <div className="relative">
          <Input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Select Your Language"
            className="placeholder:text-muted-foreground placeholder:font-light pr-8"
          />
          <FontAwesomeIcon
            icon={faSearch}
            className="absolute top-[50%] right-2 -translate-y-[50%]"
          />
        </div>

        <div className="mt-1 flex flex-col h-60 overflow-auto no-scrollbar">
          {languages
            .filter((language) =>
              language.label.toLowerCase().includes(value.toLowerCase())
            )
            .map((language) => (
              <Button
                key={language.value}
                onClick={() => {
                  switchLocale(language.value);
                  setOpen(false);
                }}
                className="w-full justify-start bg-background hover:bg-muted text-muted-foreground font-normal grid grid-cols-5"
              >
                <span className="col-span-1">
                  {locale === language.value && (
                    <div className="w-6 h-6 rounded-full overflow-clip">
                      <Image
                        className="w-full h-full object-cover"
                        width={512}
                        height={512}
                        src={`/icons/lang/${locale}.svg`}
                        alt="Language Flag"
                      />
                    </div>
                  )}
                </span>
                <span className="col-span-3 text-start">{language.label}</span>
              </Button>
            ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
