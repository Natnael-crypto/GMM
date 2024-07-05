'use client';

import React, { useEffect, useState } from 'react';
import OurApproachCard from './card';
import { useTranslations } from 'next-intl';
import OurApproachSlideContent from './slide-content';
import OurApproachSlide from './approach-slide';

export default function OurApproach() {
  const t = useTranslations('Landing.ourApproach');

  const [current, setCurrent] = useState(0);
  const [animation, setAnimationInterval] = useState<NodeJS.Timeout | null>(
    null
  );

  const count = 5;

  const next = () => {
    setCurrent((prev) => (prev + 1) % count);
  };

  const prev = () => {
    setCurrent((prev) => (prev - 1 + count) % count);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      next();
    }, 5000);

    setAnimationInterval(interval);

    return () => clearInterval(interval);
  }, []);

  const handleCardClick = (index: number) => {
    setCurrent(index);
    if (animation) {
      clearInterval(animation);
    }
    const interval = setInterval(() => {
      next();
    }, 5000);
    setAnimationInterval(interval);
  };

  return (
    <div className="sm:ps-12 md:ps-20 lg:ps-40 my-5 relative">
      <div>
        {/* Title */}
        <h1 className="flex flex-col px-8 md:ps-0">
          <span className="uppercase font-bold text-primary">{t('title')}</span>
          <span className="text-lg sm:text-xl md:text-2xl lg:text-3xl">
            {t.rich('subtitle', {
              bold: (text) => (
                <span className="font-bold text-accent">{text}</span>
              ),
            })}
          </span>
        </h1>

        {/* Cards */}
        <div className="overflow-auto no-scrollbar">
          <div
            className=" 
        grid grid-cols-5 w-[60rem] gap-x-3
        lg:grid lg:grid-cols-3 lg:gap-y-5 
        px-6 md:px-0 lg:px-0 
        py-2 md:py-0        
        mt-6 lg:w-fit z-10"
          >
            <OurApproachCard
              imageSrc="/assets/icon_guided-matchmaking.svg"
              imageClassName="w-24 lg:w-36"
              isActive={current === 0}
              onClick={() => handleCardClick(0)}
            >
              {t.rich('card.guidedMatching', {
                br: () => <br />,
              })}
            </OurApproachCard>
            <OurApproachCard
              imageSrc="/assets/icon_match-guarantee.svg"
              imageClassName="w-24 lg:w-28"
              isActive={current === 1}
              onClick={() => handleCardClick(1)}
            >
              {t.rich('card.matchGuarantee', {
                br: () => <br />,
              })}
            </OurApproachCard>
            <OurApproachCard
              imageSrc="/assets/icon_1-on-1-chats.svg"
              imageClassName="w-24"
              isActive={current === 2}
              onClick={() => handleCardClick(2)}
            >
              {t.rich('card.oneOnOneChats', {
                br: () => <br />,
              })}
            </OurApproachCard>
            <OurApproachCard
              imageSrc="/assets/icon_never-pay-to-compete.svg"
              imageClassName="w-24 lg:w-36"
              isActive={current === 3}
              onClick={() => handleCardClick(3)}
            >
              {t.rich('card.neverPayToCompete', {
                br: () => <br />,
              })}
            </OurApproachCard>
            <OurApproachCard
              imageSrc="/assets/icon_guardian-family-involvement.svg"
              imageClassName="w-20 lg:w-24"
              isActive={current === 4}
              onClick={() => handleCardClick(4)}
            >
              {t.rich('card.guardianFamilyInvolvement', {
                br: () => <br />,
              })}
            </OurApproachCard>
          </div>
        </div>
      </div>

      <OurApproachSlide
        selected={current}
        setSelected={setCurrent}
        next={next}
        prev={prev}
      >
        <OurApproachSlideContent title={t('slide.guidedMatching.title')}>
          <>
            {t.rich('slide.guidedMatching.description', {
              bold: (text) => <span className="font-bold">{text}</span>,
            })}
          </>
        </OurApproachSlideContent>

        <OurApproachSlideContent title={t('slide.matchGuarantee.title')}>
          <>
            {t.rich('slide.matchGuarantee.description.p1', {
              bold: (text) => <span className="font-bold">{text}</span>,
            })}
          </>
          <>
            {t.rich('slide.matchGuarantee.description.p2', {
              bold: (text) => <span className="font-bold">{text}</span>,
            })}
          </>
        </OurApproachSlideContent>

        <OurApproachSlideContent title={t('slide.oneOnOneChats.title')}>
          <>
            {t.rich('slide.oneOnOneChats.description.p1', {
              bold: (text) => <span className="font-bold">{text}</span>,
            })}
          </>
          <>
            {t.rich('slide.oneOnOneChats.description.p2', {
              bold: (text) => <span className="font-bold">{text}</span>,
            })}
          </>
        </OurApproachSlideContent>

        <OurApproachSlideContent title={t('slide.neverPayToCompete.title')}>
          <>
            {t.rich('slide.neverPayToCompete.description', {
              bold: (text) => <span className="font-bold">{text}</span>,
            })}
          </>
        </OurApproachSlideContent>

        <OurApproachSlideContent
          title={t('slide.guardianFamilyInvolvement.title')}
        >
          <>
            {t.rich('slide.neverPayToCompete.description', {
              bold: (text) => <span className="font-bold">{text}</span>,
            })}
          </>
        </OurApproachSlideContent>
      </OurApproachSlide>
    </div>
  );
}
