import { useTranslations } from 'next-intl';
import React from 'react';
import Card from './card';

export default function HowItWorks() {
  const t = useTranslations('Landing.howItWorks');
  return (
    <>
      <div className="h-[1px] mt-8  bg-border mx-6 sm:mx-16 md:mx-24 lg:mx-52"></div>
      <div className="flex flex-col items-center justify-center pt-8 text-center">
        <h2 className="text-2xl ">{t('title')}</h2>

        <div
          className="overflow-auto lg:overflow-visible w-full
      no-scrollbar "
        >
          <div
            className="m-auto grid grid-cols-4 w-[55rem] gap-x-5 
      px-5
      lg:my-8 
      justify-center
      py-8 lg:py-0"
          >
            <Card imageSrc="/assets/icon_sign-up-for-an-account.svg" number={1}>
              {t('step1')}
            </Card>
            <Card imageSrc="/assets/icon_complete-profile.svg" number={2}>
              {t('step2')}
            </Card>
            <Card
              imageSrc="/assets/icon_match-and-follow-guided-match-making-process.svg"
              imageClassName="w-32"
              number={3}
            >
              {t('step3')}
            </Card>
            <Card imageSrc="/assets/icon_get-married.svg" number={4}>
              {t('step4')}
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}
