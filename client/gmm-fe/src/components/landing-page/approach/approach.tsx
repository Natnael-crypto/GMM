'use client';

import React, { useEffect, useState } from 'react';
import OurApproachCard from './card';
import { useTranslations } from 'next-intl';
import OurApproachSlideContent from './slide-content';
import OurApproachSlide from './approach-slide';
import MobileApproachCards from './approach-card-mobile';

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
  };

  return (
    <div className="mt-5 relative">
      <div className="gmm-approach-section">
        <div className="gmm-approach-container my-5 grid lg:grid-cols-2 gap-4">
          <div className="gmm-approach-icons">
            {/* Title */}
            <h1 className="text-center sm:text-start z-20 flex flex-col lg:ps-0">
              <span className="z-20 uppercase font-bold text-primary">
                {t('title')}
              </span>
              <span className="z-20 text-lg sm:text-xl md:text-2xl lg:text-3xl text-accent">
                {t.rich('subtitle', {
                  bold: (text) => <span className="font-bold">{text}</span>,
                })}
              </span>
            </h1>
            {/* Cards */}
            <MobileApproachCards />
            <div className="hidden sm:block overflow-auto no-scrollbar">
              <div className="gmm-approach-icons-grid grid gap-3 lg:gap-y-5 py-2 md:py-0 mt-6 z-10">
                <OurApproachCard
                  imageSrc="/assets/icon_guided-matchmaking.svg"
                  imageClassName="gmm-card-icon"
                  isActive={current === 0}
                  onClick={() => handleCardClick(0)}
                >
                  {t.rich('card.guidedMatching', {
                    br: () => <br />,
                  })}
                </OurApproachCard>
                <OurApproachCard
                  imageSrc="/assets/icon_match-guarantee.svg"
                  imageClassName="gmm-card-icon"
                  isActive={current === 1}
                  onClick={() => handleCardClick(1)}
                >
                  {t.rich('card.matchGuarantee', {
                    br: () => <br />,
                  })}
                </OurApproachCard>
                <OurApproachCard
                  imageSrc="/assets/icon_1-on-1-chats.svg"
                  imageClassName="gmm-card-icon"
                  isActive={current === 2}
                  onClick={() => handleCardClick(2)}
                >
                  {t.rich('card.oneOnOneChats', {
                    br: () => <br />,
                  })}
                </OurApproachCard>
                <OurApproachCard
                  imageSrc="/assets/icon_never-pay-to-compete.svg"
                  imageClassName="gmm-card-icon"
                  isActive={current === 3}
                  onClick={() => handleCardClick(3)}
                >
                  {t.rich('card.neverPayToCompete', {
                    br: () => <br />,
                  })}
                </OurApproachCard>
                <OurApproachCard
                  imageSrc="/assets/icon_guardian-family-involvement.svg"
                  imageClassName="gmm-card-icon"
                  isActive={current === 4}
                  onClick={() => handleCardClick(4)}
                >
                  {t.rich('card.guardianFamilyInvolvement', {
                    br: () => <br />,
                  })}
                </OurApproachCard>

                <OurApproachCard
                  imageSrc="/assets/icon-globally-connecting-muslims.svg"
                  imageClassName="gmm-card-icon"
                  isActive={current === 5}
                  onClick={() => handleCardClick(5)}
                >
                  {t.rich('card.globallyConnectingMuslims', {
                    br: () => <br />,
                  })}
                </OurApproachCard>

                <OurApproachCard
                  imageSrc="/assets/icon_guardian-family-involvement.svg"
                  imageClassName="gmm-card-icon"
                  isActive={current === 6}
                  onClick={() => handleCardClick(6)}
                >
                  {t.rich('card.loremIpsum', {
                    br: () => <br />,
                  })}
                </OurApproachCard>
              </div>
            </div>
          </div>
          <div className="gmm-approach-slides bg-muted lg:rounded-bl-[3rem]">
            {/* Card Slides */}
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

              <OurApproachSlideContent
                title={t('slide.neverPayToCompete.title')}
              >
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
                  {t.rich('slide.guardianFamilyInvolvement.description', {
                    bold: (text) => <span className="font-bold">{text}</span>,
                  })}
                </>
              </OurApproachSlideContent>

              <OurApproachSlideContent
                title={t('slide.globallyConnectingMuslims.title')}
              >
                <>
                  {t.rich('slide.globallyConnectingMuslims.description', {
                    bold: (text) => <span className="font-bold">{text}</span>,
                  })}
                </>
              </OurApproachSlideContent>

              <OurApproachSlideContent title={t('slide.loremIpsum.title')}>
                <>
                  {t.rich('slide.loremIpsum.description', {
                    bold: (text) => <span className="font-bold">{text}</span>,
                  })}
                </>
              </OurApproachSlideContent>
            </OurApproachSlide>
          </div>
        </div>
      </div>
    </div>
  );
}
