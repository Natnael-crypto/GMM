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

import { useTranslations } from 'next-intl';
import StepperSeparator from '@/components/dashboard/components/stepper/stepper-separator';

export default function GuardianStepper({
  activeStep,
  onChange,
}: {
  activeStep: number;
  onChange: (step: number) => void;
}) {
  const t = useTranslations('Dashboard.common.stepper');

  return (
    <div className="flex justify-center items-center">
      <StepperItem
        onClick={() => onChange(0)}
        icon={
          <FontAwesomeIcon icon={faUser} className="text-background text-2xl" />
        }
        text={t('basicInformation')}
        className={activeStep === 0 ? 'bg-primary' : ''}
      />
      <StepperSeparator />
      <StepperItem
        onClick={() => onChange(1)}
        icon={
          <FontAwesomeIcon
            icon={faHouse}
            className="text-background text-2xl"
          />
        }
        text={t('worldlyLifestyle')}
        className={activeStep === 1 ? 'bg-primary' : ''}
      />
      <StepperSeparator />
      <StepperItem
        onClick={() => onChange(2)}
        icon={
          <FontAwesomeIcon
            icon={faMosque}
            className="text-background text-2xl"
          />
        }
        text={t('islamicLifestyle')}
        className={activeStep === 2 ? 'bg-primary' : ''}
      />
      <StepperSeparator />
      <StepperItem
        onClick={() => onChange(3)}
        icon={
          <FontAwesomeIcon
            icon={faComments}
            className="text-background text-2xl"
          />
        }
        text={t('marriageDiscussion')}
        className={activeStep === 3 ? 'bg-primary' : ''}
      />
      <StepperSeparator />
      <StepperItem
        onClick={() => onChange(4)}
        icon={
          <FontAwesomeIcon
            icon={faPeopleRoof}
            className="text-background text-2xl"
          />
        }
        text={t('familyIntroduction')}
        className={activeStep === 4 ? 'bg-primary' : ''}
      />
    </div>
  );
}
