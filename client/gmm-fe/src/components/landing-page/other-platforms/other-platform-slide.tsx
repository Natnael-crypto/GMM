import { localeDirection } from '@/config';
import { cn } from '@/lib/utils';
import { OtherPlatformSlideProps } from '@/types';
import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useLocale } from 'next-intl';
import React, { Children } from 'react';

export default function OtherPlatformSlide({
  children,
  selected,
  next,
  prev,
  setSelected,
}: OtherPlatformSlideProps) {
  const count = Children.count(children);
  const locale = useLocale();
  const dir = localeDirection[locale];

  return (
    <div
      className={cn(
        `hidden z-10 sm:flex flex-col justify-between h-full lg:rounded-bl-[3rem]`,
        dir === 'rtl' ? `lg:rounded-tl-[3rem]` : `lg:rounded-tr-[3rem]`
      )}
    >
      {Children.map(children, (child: any, index: number) => {
        if (index === selected) return child;
      })}

      <div
        className={cn(
          'flex items-center gap-2 text-gray-400 text-sm',
          dir === 'rtl' ? 'flex-row-reverse' : ''
        )}
      >
        <FontAwesomeIcon
          icon={faChevronLeft}
          className="cursor-pointer"
          onClick={dir === 'ltr' ? prev : next}
        />
        <div className="flex gap-1">
          {Array.from({ length: count }).map((_, index) => {
            return (
              <div
                key={index}
                className={`w-3 h-3 rounded-full cursor-pointer ${
                  index === selected ? 'bg-primary' : 'bg-accent opacity-50'
                }`}
                onClick={() => setSelected(index)}
              ></div>
            );
          })}
        </div>
        <FontAwesomeIcon
          icon={faChevronRight}
          className="cursor-pointer"
          onClick={dir === 'ltr' ? next : prev}
        />
      </div>
    </div>
  );
}
