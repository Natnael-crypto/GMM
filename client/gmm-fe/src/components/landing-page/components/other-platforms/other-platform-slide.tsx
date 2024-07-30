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
        `
      flex flex-col justify-between
    lg:absolute lg:start-0 lg:top-0
    mt-5
    px-8 md:px-20 lg:px-0 lg:pe-44 lg:ps-[8%]
    py-8 lg:py-0 lg:pb-3 lg:pt-[4.3rem]
    bg-muted 
    w-full lg:w-[48%] 
     lg:h-96`,
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
                className={`w-2 h-2 rounded-full cursor-pointer ${
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
