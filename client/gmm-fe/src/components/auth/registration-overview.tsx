import { useTranslations } from 'next-intl';
import React from 'react';
import OurApproachCard from '@/components/landing-page/approach/card';

export default function RegistrationOverview() {
  const approachT = useTranslations('Landing.ourApproach');
  const t = useTranslations('Auth');

  return (
    <div>
      <div className="text-center md:text-start lg:text-primary-foreground mt-8">
        <h1 className="text-2xl md:text-3xl lg:text-4xl">
          {t.rich('common.title', {
            bold: (text) => <span className="font-bold">{text}</span>,
          })}
        </h1>
        <h2 className="my-2 text-xl md:text-2xl lg:text-3xl font-">
          {t('common.subtitle')}
        </h2>
      </div>

      <div className="mt-20 overflow-auto no-scrollbar">
        <div className="col-count-[3]">
          <OurApproachCard
            className="border-none shadow-none hover-disabled bg-transparent inline-flex"
            imageSrc="/assets/icon_guided-matchmaking.svg"
            imageClassName="w-24 lg:w-28"
            isActive={false}
          >
            {approachT.rich('card.guidedMatching', {
              br: () => <br />,
            })}
          </OurApproachCard>
          <OurApproachCard
            className="border-none shadow-none hover-disabled bg-transparent inline-flex"
            imageSrc="/assets/icon_match-guarantee.svg"
            imageClassName="w-24 lg:w-28"
            isActive={false}
          >
            {approachT.rich('card.matchGuarantee', {
              br: () => <br />,
            })}
          </OurApproachCard>
          <OurApproachCard
            className="border-none shadow-none hover-disabled bg-transparent inline-flex"
            imageSrc="/assets/icon_never-pay-to-compete.svg"
            imageClassName="w-24 lg:w-28"
            isActive={false}
          >
            {approachT.rich('card.neverPayToCompete', {
              br: () => <br />,
            })}
          </OurApproachCard>
          <OurApproachCard
            className="border-none shadow-none hover-disabled bg-transparent inline-flex"
            imageSrc="/assets/icon_guardian-family-involvement.svg"
            imageClassName="w-20 lg:w-24"
            isActive={false}
          >
            {approachT.rich('card.guardianFamilyInvolvement', {
              br: () => <br />,
            })}
          </OurApproachCard>
          <OurApproachCard
            className="border-none shadow-none hover-disabled bg-transparent inline-flex"
            imageSrc="/assets/icon_1-on-1-chats.svg"
            imageClassName="w-24"
            isActive={false}
          >
            {approachT.rich('card.oneOnOneChats', {
              br: () => <br />,
            })}
          </OurApproachCard>
        </div>

      </div>
    </div>
  );
}
