import GuardianSerivceCard from './card';
import { useTranslations } from 'next-intl';
import React from 'react';

export default function GuardianServices() {
  const t = useTranslations('Landing.guardianServices');
  return (
    <div className="mx-6 sm:mx-16 md:mx-24 lg:mx-52 text-center ">
      <h2 className="text-2xl ">{t('title')}</h2>

      <div className="grid grid-cols-4 gap-5 my-8 justify-center">
        <GuardianSerivceCard>{t('bookConsultation')}</GuardianSerivceCard>
        <GuardianSerivceCard>{t('becomeImamOrMufti')}</GuardianSerivceCard>
        <GuardianSerivceCard>
          {t('becomeGuardianServiceProvider')}
        </GuardianSerivceCard>
        <GuardianSerivceCard>{t('exploreGuardianBlog')}</GuardianSerivceCard>
      </div>
    </div>
  );
}
