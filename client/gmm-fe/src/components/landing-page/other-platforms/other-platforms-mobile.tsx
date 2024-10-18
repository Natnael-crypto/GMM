import { cn } from '@/lib/utils';
import Image from 'next/image';
import { Card } from '@/components/ui/card';
import { OurApproachCardProps } from '@/types';
import React from 'react';
import { useTranslations } from 'next-intl';

export function OtherPlatformsCard({
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

export default function MobileOtherPlatformsCards() {
  const t = useTranslations('Landing.otherPlatforms');

  return (
    <div className="sm:hidden overflow-auto no-scrollbar">
      <div
        className="
        flex flex-col gap-y-4
        px-6 md:px-3 lg:px-0 
        py-2 md:py-0        
        mt-6 lg:w-full lg:max-w-[52%] z-10"
      >
        <OtherPlatformsCard
          imageSrc="/assets/puzzle-piece-solid.svg"
          imageClassName="w-24 lg:w-32"
          isActive={false}
          onClick={() => {}}
        >
          <div className="space-y-4">
            <h1
              className={cn(
                'text-lg w-full font-bold mt-5 text-center transition-colors duration-300 text-primary'
              )}
            >
              {t.rich('slide.endlessSearching.title', {
                br: () => ' ',
              })}
            </h1>

            <p className="text-muted-foreground mb-1">
              {t.rich('slide.endlessSearching.description', {
                bold: (text) => <span className="font-bold">{text}</span>,
              })}
            </p>
          </div>
        </OtherPlatformsCard>
        <OtherPlatformsCard
          imageSrc="/assets/comment-slash-solid.svg"
          imageClassName="w-24 lg:w-28"
          isActive={false}
          onClick={() => {}}
        >
          <div className="space-y-4">
            <h1
              className={cn(
                'text-lg w-full font-bold mt-5 text-center transition-colors duration-300 text-primary'
              )}
            >
              {t.rich('slide.noOneOnOneChats.title', {
                br: () => ' ',
              })}
            </h1>

            <p className="text-muted-foreground mb-1">
              {t.rich('slide.noOneOnOneChats.description', {
                bold: (text) => <span className="font-bold">{text}</span>,
              })}
            </p>
          </div>
        </OtherPlatformsCard>
        <OtherPlatformsCard
          imageSrc="/assets/ban-solid.svg"
          imageClassName="w-24 lg:w-28"
          isActive={false}
          onClick={() => {}}
        >
          <div className="space-y-4">
            <h1
              className={cn(
                'text-lg w-full font-bold mt-5 text-center transition-colors duration-300 text-primary'
              )}
            >
              {t.rich('slide.noFamilyInvolvement.title', {
                br: () => ' ',
              })}
            </h1>

            <p className="text-muted-foreground mb-1">
              {t.rich('slide.noFamilyInvolvement.description', {
                bold: (text) => <span className="font-bold">{text}</span>,
              })}
            </p>
          </div>
        </OtherPlatformsCard>
        <OtherPlatformsCard
          imageSrc="/assets/repeat-solid.svg"
          imageClassName="w-24"
          isActive={false}
          onClick={() => {}}
        >
          <div className="space-y-4">
            <h1
              className={cn(
                'text-lg w-full font-bold mt-5 text-center transition-colors duration-300 text-primary'
              )}
            >
              {t.rich('slide.noMatchGuarantee.title', {
                br: () => ' ',
              })}
            </h1>

            <p className="text-muted-foreground mb-1">
              {t.rich('slide.noMatchGuarantee.description', {
                bold: (text) => <span className="font-bold">{text}</span>,
              })}
            </p>
          </div>
        </OtherPlatformsCard>
        <OtherPlatformsCard
          imageSrc="/assets/user-large-slash-solid.svg"
          imageClassName="w-24 lg:w-32"
          isActive={false}
          onClick={() => {}}
        >
          <div className="space-y-4">
            <h1
              className={cn(
                'text-lg w-full font-bold mt-5 text-center transition-colors duration-300 text-primary'
              )}
            >
              {t.rich('slide.noTrueHalalApproach.title', {
                br: () => ' ',
              })}
            </h1>

            <p className="text-muted-foreground mb-1">
              {t.rich('slide.noTrueHalalApproach.description', {
                bold: (text) => <span className="font-bold">{text}</span>,
              })}
            </p>
          </div>
        </OtherPlatformsCard>
        <OtherPlatformsCard
          imageSrc="/assets/heart-crack-solid.svg"
          imageClassName="w-20 lg:w-24"
          isActive={false}
          onClick={() => {}}
        >
          <div className="space-y-4">
            <h1
              className={cn(
                'text-lg w-full font-bold mt-5 text-center transition-colors duration-300 text-primary'
              )}
            >
              {t.rich('slide.terribleHealth.title', {
                br: () => ' ',
              })}
            </h1>

            <p className="text-muted-foreground mb-1">
              {t.rich('slide.terribleHealth.description', {
                bold: (text) => <span className="font-bold">{text}</span>,
              })}
            </p>
          </div>
        </OtherPlatformsCard>
        <OtherPlatformsCard
          imageSrc="/assets/comments-dollar-solid.svg"
          imageClassName="w-20 lg:w-24"
          isActive={false}
          onClick={() => {}}
        >
          <div className="space-y-4">
            <h1
              className={cn(
                'text-lg w-full font-bold mt-5 text-center transition-colors duration-300 text-primary'
              )}
            >
              {t.rich('slide.payment.title', {
                br: () => ' ',
              })}
            </h1>

            <p className="text-muted-foreground mb-1">
              {t.rich('slide.terribleHealth.description', {
                bold: (text) => <span className="font-bold">{text}</span>,
              })}
            </p>
          </div>
        </OtherPlatformsCard>
      </div>
    </div>
  );
}
