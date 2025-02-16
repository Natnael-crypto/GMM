'use client';

import { useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Check, ChevronDownIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from '@/components/ui/use-toast';
import { HoverCard, HoverCardContent, HoverCardTrigger } from './hover-card';

export interface Option {
  value: string;
  label: string;
  icon?: React.ReactNode;
  selectedIcon?: React.ReactNode;
}

export interface MultiselectProps {
  label: string;
  options: Option[];
  placeholder?: string;
  className?: string;
  max?: number;
  onChange?: (value: string[]) => void;
  values?: string[];
  hideSearch?: boolean;
  disabled?: boolean;
}

export default function Multiselect({
  label,
  options,
  placeholder,
  className,
  max,
  values,
  onChange,
  disabled,
  hideSearch = false,
}: MultiselectProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const map = new Map<string, string>();
  options.forEach((option) => map.set(option.value, option.label));

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOptionSelect = (option: Option) => {
    if (!values) {
      if (onChange) {
        onChange([option.value]);
      }
    } else if (values.includes(option.value)) {
      if (onChange) {
        onChange(values.filter((v) => v !== option.value));
      }
    } else if (max && values.length >= max) {
      toast({
        title: label,
        description: `You can only select up to ${max} options`,
      });
    } else {
      if (onChange) {
        onChange([...values, option.value]);
      }
    }
  };

  if (disabled) {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <button
            className={cn(
              'flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-md ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 [&>span]:text-start',
              className
            )}
            disabled
          >
            <span>
              {values && values.length > 0
                ? `${values.map((value) => map.get(value)).join(', ')}`
                : placeholder}
            </span>
            <ChevronDownIcon className="h-4 w-4" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <DropdownMenu
          onOpenChange={(open) => {
            if (open) {
              setSearchTerm('');
            }
          }}
        >
          <DropdownMenuTrigger asChild>
            <button
              className={cn(
                'flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-md ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 [&>span]:text-start overflow-hidden',
                className
              )}
            >
              <HoverCard>
                <HoverCardTrigger className="w-full text-start overflow-hidden">
                  <span className="line-clamp-1 truncate">
                    {values && values.length > 0
                      ? `${values.map((value) => map.get(value)).join(', ')}`
                      : placeholder}
                  </span>
                </HoverCardTrigger>
                <HoverCardContent className="flex flex-col items-start gap-2 max-h-[50vh] overflow-auto">
                  <h1 className="font-bold mb-2">{label}</h1>
                  {values && values.length > 0
                    ? values.map((value, index) => (
                        <span
                          key={`${value}_${index}`}
                          className="text-sm text-start"
                        >
                          {map.get(value)}
                        </span>
                      ))
                    : placeholder}
                </HoverCardContent>
              </HoverCard>

              <ChevronDownIcon className="h-4 w-4" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="p-4 max-w-96">
            <div className="flex flex-col gap-4">
              {!hideSearch && (
                <Input
                  type="search"
                  placeholder="Search options..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full"
                />
              )}
              <div className="flex flex-col gap-2 max-h-56 overflow-auto no-scrollbar">
                {filteredOptions.map((option) => (
                  <div
                    key={option.value}
                    onClick={() => handleOptionSelect(option)}
                    className="flex items-center justify-between cursor-pointer"
                  >
                    <div className="flex items-center gap-3 hover:bg-accent hover:text-accent-foreground w-full p-1 rounded-sm">
                      <span
                        className={cn(
                          'w-5',
                          values && values.includes(option.value)
                            ? 'opacity-100'
                            : 'opacity-0'
                        )}
                      >
                        {option.selectedIcon ?? <Check className="h-4 w-4" />}
                      </span>

                      <span className="text-md font-medium flex gap-x-4 items-center">
                        {option.icon} {option.label}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
