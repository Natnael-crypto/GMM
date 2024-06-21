import { OtherPlatformSlideProps } from '@/types';
import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Children } from 'react';

export default function OtherPlatformSlide({
  children,
  selected,
  next,
  prev,
  setSelected,
}: OtherPlatformSlideProps) {
  const count = Children.count(children);

  return (
    <div className="absolute left-0 top-0 bg-muted w-[48%] h-96 rounded-tr-[3rem] pt-[4.3rem] pb-3 pl-36 pr-44 flex flex-col justify-between">
      {Children.map(children, (child: any, index: number) => {
        if (index === selected) return child;
      })}

      <div className="flex items-center gap-2 text-gray-400 text-sm">
        <FontAwesomeIcon
          icon={faChevronLeft}
          className="cursor-pointer"
          onClick={prev}
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
          onClick={next}
        />
      </div>
    </div>
  );
}
