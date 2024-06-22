'use client';

import React, { useState } from 'react';
import OurApproachCard from './card';
import { useTranslations } from 'next-intl';
import OurApproachSlideContent from './slide-content';
import OurApproachSlide from './approach-slide';

export default function OurApproach() {
  const t = useTranslations('Landing.ourApproach');

  const [current, setCurrent] = useState(0);

  const count = 5;

  const next = () => {
    setCurrent((prev) => (prev + 1) % count);
  };

  const prev = () => {
    setCurrent((prev) => (prev - 1 + count) % count);
  };

  return (
    <div className="pl-6 sm:pl-12 md:pl-20 lg:pl-40 my-5 relative">
      <div>
        {/* Title */}
        <h1 className="flex flex-col ">
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
        <div className="grid grid-cols-3 gap-x-3 gap-y-5 mt-6 w-fit z-10">
          <OurApproachCard
            imageSrc="/assets/icon_guided-matchmaking.svg"
            imageClassName="w-36"
            isActive={current === 0}
            onClick={() => setCurrent(0)}
          >
            {t.rich('card.guidedMatching', {
              br: () => <br />,
            })}
          </OurApproachCard>
          <OurApproachCard
            imageSrc="/assets/icon_match-guarantee.svg"
            imageClassName="w-28"
            isActive={current === 1}
            onClick={() => setCurrent(1)}
          >
            {t.rich('card.matchGuarantee', {
              br: () => <br />,
            })}
          </OurApproachCard>
          <OurApproachCard
            imageSrc="/assets/icon_1-on-1-chats.svg"
            imageClassName="w-24"
            isActive={current === 2}
            onClick={() => setCurrent(2)}
          >
            {t.rich('card.oneOnOneChats', {
              br: () => <br />,
            })}
          </OurApproachCard>
          <OurApproachCard
            imageSrc="/assets/icon_never-pay-to-compete.svg"
            isActive={current === 3}
            onClick={() => setCurrent(3)}
          >
            {t.rich('card.neverPayToCompete', {
              br: () => <br />,
            })}
          </OurApproachCard>
          <OurApproachCard
            imageSrc="/assets/icon_guardian-family-involvement.svg"
            imageClassName="w-24"
            isActive={current === 4}
            onClick={() => setCurrent(4)}
          >
            {t.rich('card.guardianFamilyInvolvement', {
              br: () => <br />,
            })}
          </OurApproachCard>
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
