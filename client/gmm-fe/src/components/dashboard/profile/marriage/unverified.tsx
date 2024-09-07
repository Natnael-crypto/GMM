import { faXmarkCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useTranslations } from 'next-intl';
import React from 'react';

export default function Unverified() {
  const t = useTranslations(
    'Dashboard.updateProfile.marriageDiscussion.optionalVerifiable'
  );
  return (
    <div className="flex flex-col text-[0.6rem] text-secondary items-center justify-center gap-1">
      <FontAwesomeIcon className="text-xs" icon={faXmarkCircle} />
      <span className="font-bold">{t('unverified')}</span>
    </div>
  );
}
