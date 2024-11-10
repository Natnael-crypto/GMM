import GuardianServiceCard from './card';
import { useTranslations } from 'next-intl';
import React from 'react';

export default function GuardianServices() {
  const t = useTranslations('Landing.guardianServices');
  return (
    <div className="flex flex-col items-center justify-center px-6 text-center overflow-hidden">
      <h2 className="text-2xl font-bold text-secondary">{t('title')}</h2>

      <div className="overflow-auto lg:overflow-visible no-scrollbar w-full">
        <div
          className="gmm-services-container m-auto grid gap-8 my-8"
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
