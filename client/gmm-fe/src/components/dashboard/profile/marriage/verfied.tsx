import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useTranslations } from 'next-intl';
import React from 'react';

export default function Verified() {
  const t = useTranslations(
    'Dashboard.updateProfile.marriageDiscussion.optionalVerifiable'
  );
  return (
    <div className="flex flex-col text-[0.6rem] text-primary items-center justify-center gap-1">
      <FontAwesomeIcon className="text-xs" icon={faCheckCircle} />
      <span className="font-bold">{t('verified')}</span>
    </div>
  );
}
