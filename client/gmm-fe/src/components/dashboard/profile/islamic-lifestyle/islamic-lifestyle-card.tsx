'use client';

import {
  FemaleIslamicLifestyle,
  MaleIslamicLifestyle,
} from '@/lib/schemas/islamic-lifestyle';
import { User } from '@/lib/schemas/user';
import { useGetIslamicLifestyleQuery } from '@/lib/user/api';
import {
  faBirthdayCake,
  faChildDress,
  faChildren,
  faCircleDollarToSlot,
  faComments,
  faFemale,
  faGraduationCap,
  faHandHoldingDollar,
  faHouse,
  faKaaba,
  faMosque,
  faPerson,
  faStar,
  faStarAndCrescent,
  faUtensils,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import FieldViewer from '../field-viewer';
import Loading from '@/components/ui/loading';

const maleFields = (lifestyle: MaleIslamicLifestyle) => [
  {
    icon: faMosque,
    label: 'Salah/Prayer',
    value: lifestyle?.salat,
  },
  {
    icon: faCircleDollarToSlot,
    label: 'Zakat',
    value: lifestyle?.zakat,
  },
  {
    icon: faUtensils,
    label: 'Food',
    value: lifestyle?.food,
  },
  {
    icon: faStarAndCrescent,
    label: 'Islam & Culture',
    value: lifestyle?.islamAndCulture,
  },
  {
    icon: faHandHoldingDollar,
    label: 'Money',
    value: 'Full Islamic Compliance',
  },
  {
    icon: faGraduationCap,
    label: 'Islamic Education',
    value: lifestyle?.islamicEducation,
  },
  {
    icon: faPerson,
    label: 'Appearance',
    value: lifestyle?.appearance,
  },
  {
    icon: faKaaba,
    label: 'Hajj & Umra',
    value: lifestyle?.hajjAndUmra,
  },
  {
    icon: faChildren,
    label: 'Children & Upbringing',
    value: 'Children in Islamic Setting',
  },
];

const femaleFields = (lifestyle: FemaleIslamicLifestyle) => [
  {
    icon: faMosque,
    label: 'Salah/Prayer',
    value: lifestyle?.salat,
  },
  {
    icon: faCircleDollarToSlot,
    label: 'Zakat',
    value: lifestyle?.zakat,
  },
  {
    icon: faUtensils,
    label: 'Food',
    value: lifestyle?.food,
  },
  {
    icon: faStarAndCrescent,
    label: 'Islam & Culture',
    value: lifestyle?.islamAndCulture,
  },
  {
    icon: faHandHoldingDollar,
    label: 'Money',
    value: 'Full Islamic Compliance',
  },
  {
    icon: faGraduationCap,
    label: 'Islamic Education',
    value: lifestyle?.islamicEducation,
  },
  {
    icon: faPerson,
    label: 'Appearance',
    value: lifestyle?.appearance,
  },
  {
    icon: faKaaba,
    label: 'Hajj & Umra',
    value: lifestyle?.hajjAndUmra,
  },
  {
    icon: faChildren,
    label: 'Children & Upbringing',
    value: lifestyle?.childrenAndUpbringing,
  },
  {
    icon: faBirthdayCake,
    label: 'Celebrating Birthdays',
    value: lifestyle?.celebratingBirthdays,
  },
  {
    icon: faStar,
    label: 'Celebrating Mawlid',
    value: lifestyle?.celebratingMawlid,
  },
  {
    icon: faFemale,
    label: 'Hijab',
    value: lifestyle?.hijab,
  },
];

export default function IslamicLifestyleCard({ user }: { user: User }) {
  const {
    data: islamicLifestyle,
    isLoading,
    isSuccess,
    isError,
  } = useGetIslamicLifestyleQuery(user?.id || '', {
    skip: !user,
  });

  if (user?.gender === 'Male') {
    return (
      <FieldViewer
        getFields={maleFields}
        entity={islamicLifestyle as MaleIslamicLifestyle}
      />
    );
  } else if (user?.gender === 'Female') {
    return (
      <FieldViewer
        getFields={femaleFields}
        entity={islamicLifestyle as FemaleIslamicLifestyle}
      />
    );
  }
}
