import GuardianServiceCard from './card';
import { useTranslations } from 'next-intl';
import React from 'react';

export default function GuardianServices() {
  const t = useTranslations('Landing.guardianServices');
  return (
    <div className="flex flex-col items-center justify-center px-6 text-center overflow-hidden">
      <h2 className="text-2xl">{t('title')}</h2>

      <div className="overflow-auto lg:overflow-visible no-scrollbar w-full">
        <div
          className="m-auto
         grid grid-cols-4 gap-x-5 my-8 
         w-[60rem]
         "
        >
          <GuardianServiceCard>{t('bookConsultation')}</GuardianServiceCard>
          <GuardianServiceCard>{t('becomeImamOrMufti')}</GuardianServiceCard>
          <GuardianServiceCard>
            {t('becomeGuardianServiceProvider')}
          </GuardianServiceCard>
          <GuardianServiceCard>{t('exploreGuardianBlog')}</GuardianServiceCard>
        </div>
      </div>
    </div>
  );
}
