import React from 'react';
import OurApproachCard from './card';
import { useTranslations } from 'next-intl';
import OurApproachSlideContent from './slide-content';
import OurApproachSlide from './approach-slide';

export default function OurApproach() {
  const t = useTranslations('Landing.ourApproach');

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
          >
            {t.rich('card.guidedMatching', {
              br: () => <br />,
            })}
          </OurApproachCard>
          <OurApproachCard
            imageSrc="/assets/icon_match-guarantee.svg"
            imageClassName="w-28"
          >
            {t.rich('card.matchGuarantee', {
              br: () => <br />,
            })}
          </OurApproachCard>
          <OurApproachCard
            imageSrc="/assets/icon_1-on-1-chats.svg"
            imageClassName="w-24"
          >
            {t.rich('card.oneOnOneChats', {
              br: () => <br />,
            })}
          </OurApproachCard>
          <OurApproachCard imageSrc="/assets/icon_never-pay-to-compete.svg">
            {t.rich('card.neverPayToCompete', {
              br: () => <br />,
            })}
          </OurApproachCard>
          <OurApproachCard
            imageSrc="/assets/icon_guardian-family-involvement.svg"
            imageClassName="w-24"
          >
            {t.rich('card.guardianFamilyInvolvement', {
              br: () => <br />,
            })}
          </OurApproachCard>
        </div>
      </div>

      <OurApproachSlide>
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
