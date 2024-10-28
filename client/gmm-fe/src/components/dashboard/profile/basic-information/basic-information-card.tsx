'use client';

import { languages } from '@/config/locales';
import {  User } from '@/lib/schemas/user';
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
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

const languageMap: Record<string, string> = languages.reduce(
  (acc, lang) => ({ ...acc, [lang.value]: lang.label }),
  {}
);

const fields = (user: User) =>
  [
    {
      icon: faLanguage,
      label: 'Languages',
      value: user?.languages?.length
        ? user.languages.map((l) => languageMap[l]).join(', ')
        : null,
    },
    {
      icon: faChild,
      label: 'Number of Children',
      value: user?.numberOfChildren,
    },
    {
      icon: faChild,
      label: 'Age of Oldest Child',
      value: user?.ageOfOldestChild,
    },
    {
      icon: faChild,
      label: 'Age of Youngest Child',
      value: user?.ageOfYoungestChild,
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
      icon: faGlassMartiniAlt,
      label: 'Drinks',
      value: user?.drinks ? 'Yes' : 'No',
    },
    {
      icon: faPrescriptionBottleAlt,
      label: 'Drugs',
      value: user?.drugs ? 'Yes' : 'No',
    },
    {
      icon: faSmoking,
      label: 'Smokes',
      value: user?.smokes ? 'Yes' : 'No',
    },
    {
      icon: faPaintBrush,
      label: 'Tattoos',
      value: user?.tattoos ? 'Yes' : 'No',
    },

    {
      icon: faUser,
      label: 'Marital Status',
      value: user?.maritalStatus,
    },
  ].filter(
    (field) => field.value != null || field.value !== '' || field.value !== 0
  );

export default function BasicInformationCard({ user }: { user: User }) {
  const userFields = fields(user);

  return (
    <div className="rounded-se-3xl rounded-es-3xl overflow-hidden bg-muted text-sm">
      {userFields.map(({ icon, label, value }) => (
        <div key={label} className="grid grid-cols-12 py-3 px-8 odd:bg-[#fff]">
          <div className="col-span-1">
            <FontAwesomeIcon icon={icon} size="xl" className="text-primary" />
          </div>
          <div className="col-span-11  flex gap-2 items-center">
            <h1 className="">{label}</h1>
            <h1 className="font-bold">{value}</h1>
          </div>
        </div>
      ))}
    </div>
  );
}
