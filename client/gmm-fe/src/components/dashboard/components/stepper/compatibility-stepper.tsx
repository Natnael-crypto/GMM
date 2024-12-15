'use client';

import React from 'react';
import StepperItem from './stepper-item';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faComments,
  faHouse,
  faMosque,
  faPeopleRoof,
} from '@fortawesome/free-solid-svg-icons';
import StepperSeparator from './stepper-separator';
import { useLocale, useTranslations } from 'next-intl';
import { usePathname } from '@/lib/navigation';

export default function CompatibilityStepper() {
  const t = useTranslations('Dashboard.common.stepper');
  const locale = useLocale();
  const pathname = usePathname();

  const isActive = (href: string) => pathname === href;

  return (
    <div className="flex justify-center items-center">
      <StepperItem
        href={`/${locale}/dashboard/compatibility/worldly-lifestyle`}
        icon={
          <FontAwesomeIcon
            icon={faHouse}
            className="text-background text-2xl"
          />
        }
        text={t('worldlyLifestyle')}
        className={
          isActive('/dashboard/compatibility/worldly-lifestyle')
            ? 'bg-primary'
            : ''
        }
      />
      <StepperSeparator />
      <StepperItem
        href={`/${locale}/dashboard/compatibility/islamic-lifestyle`}
        icon={
          <FontAwesomeIcon
            icon={faMosque}
            className="text-background text-2xl"
          />
        }
        text={t('islamicLifestyle')}
        className={
          isActive('/dashboard/compatibility/islamic-lifestyle')
            ? 'bg-primary'
            : ''
        }
      />
      <StepperSeparator />
      <StepperItem
        href={`/${locale}/dashboard/compatibility/marriage`}
        icon={
          <FontAwesomeIcon
            icon={faComments}
            className="text-background text-2xl"
          />
        }
        text={t('marriageDiscussion')}
        className={
          isActive('/dashboard/compatibility/marriage') ? 'bg-primary' : ''
        }
      />
    </div>
  );
}
