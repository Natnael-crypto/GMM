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
import { useTranslations } from 'next-intl';

export default function Stepper() {
  const t = useTranslations('Dashboard.common.stepper');

  return (
    <div className="flex justify-center items-center">
      <StepperItem
        icon={
          <FontAwesomeIcon icon={faUser} className="text-background text-2xl" />
        }
        text={t('basicInformation')}
      />
      <StepperSeparator />
      <StepperItem
        icon={
          <FontAwesomeIcon
            icon={faHouse}
            className="text-background text-2xl"
          />
        }
        text={t('worldlyLifestyle')}
      />
      <StepperSeparator />
      <StepperItem
        icon={
          <FontAwesomeIcon
            icon={faMosque}
            className="text-background text-2xl"
          />
        }
        text={t('islamicLifestyle')}
      />
      <StepperSeparator />
      <StepperItem
        icon={
          <FontAwesomeIcon
            icon={faComments}
            className="text-background text-2xl"
          />
        }
        text={t('marriageDiscussion')}
      />
      <StepperSeparator />
      <StepperItem
        icon={
          <FontAwesomeIcon
            icon={faPeopleRoof}
            className="text-background text-2xl"
          />
        }
        text={t('familyIntroduction')}
      />
    </div>
  );
}
