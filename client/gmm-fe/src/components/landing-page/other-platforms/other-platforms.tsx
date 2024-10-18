'use client';

import React, { useEffect, useState } from 'react';
import OtherPlatformCard from './card';
import { useTranslations } from 'next-intl';
import OtherPlatformContent from './slide-content';
import OtherPlatform from './other-platform-slide';
import MobileOtherPlatformsCards from './other-platforms-mobile';

export default function OtherPlatforms() {
  const t = useTranslations('Landing.otherPlatforms');

  const [current, setCurrent] = useState(0);
  const [animation, setAnimationInterval] = useState<NodeJS.Timeout | null>(
    null
  );

  const count = 7;

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
  };

  return (
    <div className="lg:pe-[6%] my-5 relative">
      <div className="flex flex-col lg:items-end z-10">
        {/* Title */}
        <h1 className="text-center sm:text-start px-8 lg:max-w-[30rem] lg:ps-0 md:ps-20 md:me-10 flex flex-col z-20 text-secondary">
          <span className="z-20 uppercase font-bold text-primary">
            {t('title')}
          </span>
          <span className="z-20 text-lg sm:text-xl md:text-2xl lg:text-3xl">
            {t.rich('subtitle', {
              bold: (text) => (
                <span className="font-bold text-accent">{text}</span>
              ),
            })}
          </span>
        </h1>

        {/* Cards */}
        <div className="hidden sm:block overflow-auto no-scrollbar z-20">
          <div
            className="
          grid
          grid-cols-7 lg:grid-cols-4 
          w-[84rem] lg:w-fit    
          px-6 md:ps-5 lg:px-0 
          py-2 md:py-0   
          mt-6 z-10            
          gap-x-2 gap-y-5"
          >
            <OtherPlatformCard
              imageSrc="/assets/puzzle-piece-solid.svg"
              imageClassName="w-12"
              isActive={current === 0}
              onClick={() => handleCardClick(0)}
            >
              {t.rich('card.endlessSearching', {
                br: () => <br />,
              })}
            </OtherPlatformCard>
            <OtherPlatformCard
              imageSrc="/assets/comment-slash-solid.svg"
              imageClassName="w-14"
              isActive={current === 1}
              onClick={() => handleCardClick(1)}
            >
              {t.rich('card.noOneOnOneChats', {
                br: () => <br />,
              })}
            </OtherPlatformCard>
            <OtherPlatformCard
              imageSrc="/assets/ban-solid.svg"
              imageClassName="w-14"
              isActive={current === 2}
              onClick={() => handleCardClick(2)}
            >
              {t.rich('card.noFamilyInvolvement', {
                br: () => <br />,
              })}
            </OtherPlatformCard>
            <OtherPlatformCard
              imageSrc="/assets/repeat-solid.svg"
              imageClassName="w-14"
              isActive={current === 3}
              onClick={() => handleCardClick(3)}
            >
              {t.rich('card.noMatchGuarantee', {
                br: () => <br />,
              })}
            </OtherPlatformCard>
            <div className="lg:col-start-2">
              <OtherPlatformCard
                imageSrc="/assets/user-large-slash-solid.svg"
                imageClassName="w-14"
                isActive={current === 4}
                onClick={() => handleCardClick(4)}
              >
                {t.rich('card.noTrueHalalApproach', {
                  br: () => <br />,
                })}
              </OtherPlatformCard>
            </div>
            <OtherPlatformCard
              imageSrc="/assets/heart-crack-solid.svg"
              imageClassName="w-14"
              isActive={current === 5}
              onClick={() => handleCardClick(5)}
            >
              {t.rich('card.terribleHealth', {
                br: () => <br />,
              })}
            </OtherPlatformCard>
            <OtherPlatformCard
              imageSrc="/assets/comments-dollar-solid.svg"
              imageClassName="w-14"
              isActive={current === 6}
              onClick={() => handleCardClick(6)}
            >
              {t.rich('card.payment', {
                br: () => <br />,
              })}
            </OtherPlatformCard>
          </div>
        </div>
      </div>

      <MobileOtherPlatformsCards />

      <OtherPlatform
        selected={current}
        setSelected={setCurrent}
        next={next}
        prev={prev}
      >
        <OtherPlatformContent title={t('slide.endlessSearching.title')}>
          <>
            {t.rich('slide.endlessSearching.description', {
              bold: (text) => <span className="font-bold">{text}</span>,
            })}
          </>
        </OtherPlatformContent>

        <OtherPlatformContent title={t('slide.noOneOnOneChats.title')}>
          <>
            {t.rich('slide.noOneOnOneChats.description', {
              bold: (text) => <span className="font-bold">{text}</span>,
            })}
          </>
        </OtherPlatformContent>

        <OtherPlatformContent title={t('slide.noFamilyInvolvement.title')}>
          <>
            {t.rich('slide.noFamilyInvolvement.description', {
              bold: (text) => <span className="font-bold">{text}</span>,
            })}
          </>
        </OtherPlatformContent>

        <OtherPlatformContent title={t('slide.noMatchGuarantee.title')}>
          <>
            {t.rich('slide.noMatchGuarantee.description', {
              bold: (text) => <span className="font-bold">{text}</span>,
            })}
          </>
        </OtherPlatformContent>

        <OtherPlatformContent title={t('slide.noTrueHalalApproach.title')}>
          <>
            {t.rich('slide.noTrueHalalApproach.description', {
              bold: (text) => <span className="font-bold">{text}</span>,
            })}
          </>
        </OtherPlatformContent>

        <OtherPlatformContent title={t('slide.terribleHealth.title')}>
          <>
            {t.rich('slide.terribleHealth.description', {
              bold: (text) => <span className="font-bold">{text}</span>,
            })}
          </>
        </OtherPlatformContent>

        <OtherPlatformContent title={t('slide.payment.title')}>
          <>
            {t.rich('slide.payment.description', {
              bold: (text) => <span className="font-bold">{text}</span>,
            })}
          </>
        </OtherPlatformContent>
      </OtherPlatform>
    </div>
  );
}
