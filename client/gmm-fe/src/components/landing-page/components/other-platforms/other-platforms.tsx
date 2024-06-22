'use client';

import React, { useState } from 'react';
import OtherPlatformCard from './card';
import { useTranslations } from 'next-intl';
import OtherPlatformContent from './slide-content';
import OtherPlatform from './other-platform-slide';

export default function OtherPlatforms() {
  const t = useTranslations('Landing.otherPlatforms');

  const [current, setCurrent] = useState(0);

  const count = 7;

  const next = () => {
    setCurrent((prev) => (prev + 1) % count);
  };

  const prev = () => {
    setCurrent((prev) => (prev - 1 + count) % count);
  };

  return (
    <div className="sm:pl-12 md:pl-20 lg:pr-32 my-5 relative">
      <div className="flex flex-col lg:items-end z-10">
        {/* Title */}
        <h1 className="px-8 md:pl-0 lg:max-w-[30rem] md:mr-10 flex flex-col z-10 text-secondary">
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
          grid  
          grid-cols-7 lg:grid-cols-4 
          w-[84rem] lg:w-fit    
          px-6 md:px-0 lg:px-0 
          py-2 md:py-0   
          mt-6 z-10            
          gap-x-2 gap-y-5"
          >
            <OtherPlatformCard
              imageSrc="/assets/puzzle-piece-solid.svg"
              imageClassName="w-12"
              isActive={current === 0}
              onClick={() => setCurrent(0)}
            >
              {t.rich('card.endlessSearching', {
                br: () => <br />,
              })}
            </OtherPlatformCard>
            <OtherPlatformCard
              imageSrc="/assets/comment-slash-solid.svg"
              imageClassName="w-14"
              isActive={current === 1}
              onClick={() => setCurrent(1)}
            >
              {t.rich('card.noOneOnOneChats', {
                br: () => <br />,
              })}
            </OtherPlatformCard>
            <OtherPlatformCard
              imageSrc="/assets/ban-solid.svg"
              imageClassName="w-14"
              isActive={current === 2}
              onClick={() => setCurrent(2)}
            >
              {t.rich('card.noFamilyInvolvement', {
                br: () => <br />,
              })}
            </OtherPlatformCard>
            <OtherPlatformCard
              imageSrc="/assets/repeat-solid.svg"
              imageClassName="w-14"
              isActive={current === 3}
              onClick={() => setCurrent(3)}
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
                onClick={() => setCurrent(4)}
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
              onClick={() => setCurrent(5)}
            >
              {t.rich('card.terribleHealth', {
                br: () => <br />,
              })}
            </OtherPlatformCard>
            <OtherPlatformCard
              imageSrc="/assets/comments-dollar-solid.svg"
              imageClassName="w-14"
              isActive={current === 6}
              onClick={() => setCurrent(6)}
            >
              {t.rich('card.payment', {
                br: () => <br />,
              })}
            </OtherPlatformCard>
          </div>
        </div>
      </div>

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
