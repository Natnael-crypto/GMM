import { useTranslations } from 'next-intl';
import React from 'react';
import Card from './card';

export default function HowItWorks() {
  const t = useTranslations('Landing.howItWorks');
  return (
    <div className="mx-6 sm:mx-16 md:mx-24 lg:mx-52 mt-8 pt-8 border-t text-center ">
      <h2 className="text-2xl ">{t('title')}</h2>

      <div className="flex gap-5 my-8 justify-center">
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
  );
}
