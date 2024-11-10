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
    <div className="mt-5 relative">
      <div className="gmm-other-platforms-sections">
        <div className="gmm-other-platforms-container my-5 grid lg:grid-cols-2 gap-4">
          <div className="gmm-other-platforms-slides bg-muted lg-rounded-br-[3rem]">
            {/* Card Slides */}
            <OtherPlatform selected={current} setSelected={setCurrent} next={next} prev={prev}>
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
          <div className="gmm-other-platforms-icons">
            {/* Title */}
            <h1 className="text-center sm:text-start z-20 flex flex-col lg:ps-0">
              <span className="z-20 uppercase font-bold text-primary">
                {t('title')}
              </span>
              <span className="z-20 text-lg sm:text-xl md:text-2xl lg:text-3xl text-accent">
                {t.rich('subtitle', {
                  bold: (text) => (
                    <span className="font-bold">{text}</span>
                  ),
                })}
              </span>
            </h1>
            {/* Cards */}
            <MobileOtherPlatformsCards />
            <div className="hidden sm:block overflow-auto no-scrollbar z-20">
              <div className="gmm-other-platforms-icons-grid grid gap-3 lg:gap-y-5 py-2 md:py-0 mt-6 z-10">
                <OtherPlatformCard
                  imageSrc="/assets/puzzle-piece-solid.svg"
                  imageClassName="gmm-card-icon"
                  isActive={current === 0}
                  onClick={() => handleCardClick(0)}
                >
                  {t.rich('card.endlessSearching', {
                    br: () => <br />,
                  })}
                </OtherPlatformCard>
                <OtherPlatformCard
                  imageSrc="/assets/comment-slash-solid.svg"
                  imageClassName="gmm-card-icon"
                  isActive={current === 1}
                  onClick={() => handleCardClick(1)}
                >
                  {t.rich('card.noOneOnOneChats', {
                    br: () => <br />,
                  })}
                </OtherPlatformCard>
                <OtherPlatformCard
                  imageSrc="/assets/ban-solid.svg"
                  imageClassName="gmm-card-icon"
                  isActive={current === 2}
                  onClick={() => handleCardClick(2)}
                >
                  {t.rich('card.noFamilyInvolvement', {
                    br: () => <br />,
                  })}
                </OtherPlatformCard>
                <OtherPlatformCard
                  imageSrc="/assets/repeat-solid.svg"
                  imageClassName="gmm-card-icon"
                  isActive={current === 3}
                  onClick={() => handleCardClick(3)}
                >
                  {t.rich('card.noMatchGuarantee', {
                    br: () => <br />,
                  })}
                </OtherPlatformCard>
                
                <OtherPlatformCard
                  imageSrc="/assets/user-large-slash-solid.svg"
                  imageClassName="gmm-card-icon"
                  isActive={current === 4}
                  onClick={() => handleCardClick(4)}
                >
                  {t.rich('card.noTrueHalalApproach', {
                    br: () => <br />,
                  })}
                </OtherPlatformCard>
            
                <OtherPlatformCard
                  imageSrc="/assets/heart-crack-solid.svg"
                  imageClassName="gmm-card-icon"
                  isActive={current === 5}
                  onClick={() => handleCardClick(5)}
                >
                  {t.rich('card.terribleHealth', {
                    br: () => <br />,
                  })}
                </OtherPlatformCard>
                <OtherPlatformCard
                  imageSrc="/assets/comments-dollar-solid.svg"
                  imageClassName="gmm-card-icon"
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
      
      

        </div>
      </div>
    </div>
  );
}
