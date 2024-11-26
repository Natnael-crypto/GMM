'use client';

import { languages } from '@/config/locales';
import { User } from '@/lib/schemas/user';
import {
  faUser,
  faLanguage,
  faChild,
  faQuran,
  faMosque,
  faHandHoldingHeart,
  faGlassMartiniAlt,
  faPrescriptionBottleAlt,
  faSmoking,
  faPaintBrush,
  faFlag,
} from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import FieldViewer from '../field-viewer';

const languageMap: Record<string, string> = languages.reduce(
  (acc, lang) => ({ ...acc, [lang.value]: lang.label }),
  {}
);

const tattooOptionsMap: Record<string, string> = {
  NONE: 'None',
  MINIMAL: 'Minimal, not visible',
  SMALL: 'Small, visible or concealed',
  LARGE: 'Large or multiple tattoos',
  DOESNT_MATTER: 'Doesn’t matter',
};

const fields = (user?: User) =>
  [
    {
      icon: faFlag,
      label: 'Country of Origin',
      value: user?.country,
    },
    {
      icon: faUser,
      label: 'Marital Status',
      value: user?.maritalStatus,
    },
    {
      icon: faChild,
      label: 'Number of Children',
      value: user?.numberOfChildren,
    },
    {
      icon: faChild,
      label: 'Age of Child',
      value: user?.numberOfChildren === 1 ? user?.ageOfYoungestChild : null,
    },
    {
      icon: faChild,
      label: 'Age of Oldest Child',
      value:
        user?.numberOfChildren && user?.numberOfChildren >= 1
          ? user?.ageOfOldestChild
          : null,
    },
    {
      icon: faChild,
      label: 'Age of Youngest Child',
      value:
        user?.numberOfChildren && user?.numberOfChildren >= 1
          ? user?.ageOfYoungestChild
          : null,
    },
    {
      icon: faQuran,
      label: 'Sunni Madhaib',
      value: user?.sunniMadhaib,
    },
    {
      icon: faMosque,
      label: 'Religious Practice',
      value: user?.religiousPractice,
    },
    {
      icon: faHandHoldingHeart,
      label: 'Born or Revert to Islam',
      value: user?.bornOrRevertToIslam,
    },
    {
      icon: faLanguage,
      label: 'Languages',
      value: user?.languages?.length
        ? user.languages.map((l) => languageMap[l]).join(', ')
        : null,
    },
    {
      icon: faGlassMartiniAlt,
      label: 'Drinks/Alcohol',
      value: user?.drinks ? 'Yes' : 'No',
    },
    {
      icon: faSmoking,
      label: 'Smokes (Vapes/Shisha)',
      value: user?.smokes ? 'Yes' : 'No',
    },
    {
      icon: faPaintBrush,
      label: 'Tattoos',
      value: user?.tattoos ? tattooOptionsMap[user.tattoos] : null,
    },
    {
      icon: faPrescriptionBottleAlt,
      label: 'Drugs (Cannabis/Cocaine)',
      value: user?.drugs ? 'Yes' : 'No',
    },
  ].filter((field) => field.value && field.value !== '' && field.value !== 0);

export default function BasicInformationCard({ user }: { user: User }) {
  return (
    <FieldViewer title="Basic Information" getFields={fields} entity={user} />
  );
}
