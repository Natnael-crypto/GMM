'use client';

import * as React from 'react';
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
import { Avatar } from '@/components/ui/avatar';
import { AvatarImage } from '@radix-ui/react-avatar';
import { languages } from '@/config';

export default function LanguageSelector() {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState('');
  const [selected, setSelected] = React.useState('en');

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="default"
          role="combobox"
          aria-expanded={open}
          className="w-[250px] justify-end bg-tertiary font-bold flex gap-3"
        >
          <span>Language</span>
          <span className="flex items-center">
            <Avatar className="w-5 h-5">
              <AvatarImage src={`/locale-flags/${selected}.png`} />
            </Avatar>
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
      <PopoverContent className="w-[250px] p-2 border-none">
        <div className="relative">
          <Input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Select Your Language"
            className="placeholder:text-muted-foreground/50 placeholder:font-light pr-8"
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
                  setSelected(language.value);
                  setOpen(false);
                }}
                className="w-full justify-start bg-background text-muted-foreground font-light grid grid-cols-5"
              >
                <span className="col-span-1">
                  {selected === language.value && (
                    <Avatar className="w-6 h-6">
                      <AvatarImage
                        src={`/locale-flags/${language.value}.png`}
                      />
                    </Avatar>
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
