'use client';

import React from 'react';
import StepperItem from './stepper-item';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faComments,
  faHouse,
  faMosque,
  faPeopleRoof,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import StepperSeparator from './stepper-separator';
import { useLocale, useTranslations } from 'next-intl';
import { usePathname } from '@/lib/navigation';
import { useParams } from 'next/navigation';

export default function ProfileStepper() {
  const t = useTranslations('Dashboard.common.stepper');
  const locale = useLocale();
  const pathname = usePathname();
  const params = useParams<{ userId: string }>();

  const isActive = (href: string) => pathname === href;

  return (
    <div className="flex justify-center items-center">
      <StepperItem
        href={`/${locale}/dashboard/profile/${params.userId}/basic-information`}
        icon={
          <FontAwesomeIcon icon={faUser} className="text-background text-2xl" />
        }
        text={t('basicInformation')}
        className={
          isActive(`/dashboard/profile/${params.userId}/basic-information`) ? 'bg-primary' : ''
        }
      />
      <StepperSeparator />
      <StepperItem
        href={`/${locale}/dashboard/profile/${params.userId}/worldly-lifestyle`}
        icon={
          <FontAwesomeIcon
            icon={faHouse}
            className="text-background text-2xl"
          />
        }
        text={t('worldlyLifestyle')}
        className={
          isActive(`/dashboard/profile/${params.userId}/worldly-lifestyle`) ? 'bg-primary' : ''
        }
      />
      <StepperSeparator />
      <StepperItem
        href={`/${locale}/dashboard/profile/${params.userId}/islamic-lifestyle`}
        icon={
          <FontAwesomeIcon
            icon={faMosque}
            className="text-background text-2xl"
          />
        }
        text={t('islamicLifestyle')}
        className={
          isActive(`/dashboard/profile/${params.userId}/islamic-lifestyle`) ? 'bg-primary' : ''
        }
      />
      <StepperSeparator />
      <StepperItem
        href={`/${locale}/dashboard/profile/${params.userId}/marriage`}
        icon={
          <FontAwesomeIcon
            icon={faComments}
            className="text-background text-2xl"
          />
        }
        text={t('marriageDiscussion')}
        className={isActive(`/dashboard/profile/${params.userId}/marriage`) ? 'bg-primary' : ''}
      />
      <StepperSeparator />
      <StepperItem
        href={`/${locale}/dashboard/profile/${params.userId}/family`}
        icon={
          <FontAwesomeIcon
            icon={faPeopleRoof}
            className="text-background text-2xl"
          />
        }
        text={t('familyIntroduction')}
        className={isActive(`/dashboard/profile/${params.userId}/family`) ? 'bg-primary' : ''}
      />
    </div>
  );
}
