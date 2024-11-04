import { cn } from '@/lib/utils';
import Image from 'next/image';
import { Card } from '@/components/ui/card';
import { OurApproachCardProps } from '@/types';
import React from 'react';
import { useTranslations } from 'next-intl';

export function OurApproachCard({
  className,
  imageSrc,
  imageClassName,
  children,
  onClick,
}: OurApproachCardProps) {
  return (
    <Card
      className={cn(
        'z-20 flex flex-col items-center w-full cursor-pointer transition-colors duration-300 shadow-none border-none',
        className
      )}
      onClick={onClick}
    >
      <div className={cn('w-20 lg:mt-5 overflow-hidden', imageClassName)}>
        <Image
          className={cn('w-full overflow-hidden object-cover')}
          src={imageSrc}
          width={200}
          height={104}
          alt=""
        />
      </div>

      {children}
    </Card>
  );
}

export default function MobileApproachCards() {
  const t = useTranslations('Landing.ourApproach');

  return (
    <div className="sm:hidden overflow-auto no-scrollbar">
      <div
        className="
        flex flex-col gap-y-4
        px-6 md:px-3 lg:px-0 
        py-2 md:py-0        
        mt-6 lg:w-full lg:max-w-[52%] z-10"
      >
        <OurApproachCard
          imageSrc="/assets/icon_guided-matchmaking.svg"
          imageClassName=""
          isActive={false}
          onClick={() => {}}
        >
          <div className="space-y-4">
            <h1
              className={cn(
                'text-lg w-full h-16 font-bold mt-5 text-center transition-colors duration-300 text-primary'
              )}
            >
              {t.rich('card.guidedMatching', {
                br: () => ' ',
              })}
            </h1>

            <p className="text-muted-foreground mb-1">
              {t.rich('slide.guidedMatching.description', {
                bold: (text) => <span className="font-bold">{text}</span>,
              })}
            </p>
          </div>
        </OurApproachCard>
        <OurApproachCard
          imageSrc="/assets/icon_match-guarantee.svg"
          imageClassName=""
          isActive={false}
          onClick={() => {}}
        >
          <div className="space-y-4">
            <h1
              className={cn(
                'text-lg w-full h-16 font-bold mt-5 text-center transition-colors duration-300 text-primary'
              )}
            >
              {t.rich('card.matchGuarantee', {
                br: () => ' ',
              })}
            </h1>

            <p className="text-muted-foreground mb-1">
              {t.rich('slide.matchGuarantee.description.p1', {
                bold: (text) => <span className="font-bold">{text}</span>,
              })}
            </p>
            <p className="text-muted-foreground mb-1">
              {t.rich('slide.matchGuarantee.description.p2', {
                bold: (text) => <span className="font-bold">{text}</span>,
              })}
            </p>
          </div>
        </OurApproachCard>
        <OurApproachCard
          imageSrc="/assets/icon_1-on-1-chats.svg"
          imageClassName=""
          isActive={false}
          onClick={() => {}}
        >
          <div className="space-y-4">
            <h1
              className={cn(
                'text-lg w-full h-16 font-bold mt-5 text-center transition-colors duration-300 text-primary'
              )}
            >
              {t.rich('card.oneOnOneChats', {
                br: () => ' ',
              })}
            </h1>

            <p className="text-muted-foreground mb-1">
              {t.rich('slide.oneOnOneChats.description.p1', {
                bold: (text) => <span className="font-bold">{text}</span>,
              })}
            </p>
            <p className="text-muted-foreground mb-1">
              {t.rich('slide.oneOnOneChats.description.p2', {
                bold: (text) => <span className="font-bold">{text}</span>,
              })}
            </p>
          </div>
        </OurApproachCard>
        <OurApproachCard
          imageSrc="/assets/icon_never-pay-to-compete.svg"
          imageClassName=""
          isActive={false}
          onClick={() => {}}
        >
          <div className="space-y-4">
            <h1
              className={cn(
                'text-lg w-full h-16 font-bold mt-5 text-center transition-colors duration-300 text-primary'
              )}
            >
              {t.rich('card.neverPayToCompete', {
                br: () => ' ',
              })}
            </h1>

            <p className="text-muted-foreground mb-1">
              {t.rich('slide.neverPayToCompete.description', {
                bold: (text) => <span className="font-bold">{text}</span>,
              })}
            </p>
          </div>
        </OurApproachCard>
        <OurApproachCard
          imageSrc="/assets/icon_guardian-family-involvement.svg"
          imageClassName=""
          isActive={false}
          onClick={() => {}}
        >
          <div className="space-y-4">
            <h1
              className={cn(
                'text-lg w-full h-16 font-bold mt-5 text-center transition-colors duration-300 text-primary'
              )}
            >
              {t.rich('card.guardianFamilyInvolvement', {
                br: () => ' ',
              })}
            </h1>

            <p className="text-muted-foreground mb-1">
              {t.rich('slide.guardianFamilyInvolvement.description', {
                bold: (text) => <span className="font-bold">{text}</span>,
              })}
            </p>
          </div>
        </OurApproachCard>
      </div>
    </div>
  );
}
