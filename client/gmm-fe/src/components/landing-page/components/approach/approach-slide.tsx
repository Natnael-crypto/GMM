'use client';

import { OurApproachSlideProps } from '@/types';
import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Children, useState } from 'react';

export default function OurApproachSlide({ children }: OurApproachSlideProps) {
  const count = Children.count(children);
  const [current, setCurrent] = useState(0);

  const next = () => {
    setCurrent((prev) => (prev + 1) % count);
  };

  const prev = () => {
    setCurrent((prev) => (prev - 1 + count) % count);
  };

  return (
    <div className="absolute right-0 top-0 bg-muted w-1/2 h-96 rounded-bl-[3rem] pt-[4.3rem] pb-3 px-44 flex flex-col justify-between">
      {Children.map(children, (child, index) => {
        if (index === current) return child;
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
                  index === current ? 'bg-primary' : 'bg-accent opacity-50'
                }`}
                onClick={() => setCurrent(index)}
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
