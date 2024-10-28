import { User } from '@/lib/schemas/user';
import {
  MaleExpectedWorldlyLifestyle,
  FemaleExpectedWorldlyLifestyle,
} from '@/lib/schemas/worldly-lifestyle';
import { useGetExpectedWorldlyLifestyleQuery } from '@/lib/user/api';
import {
  faBabyCarriage,
  faBriefcase,
  faChildren,
  faHandHoldingDollar,
  faHouse,
  faLocationDot,
  faPerson,
} from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import FieldViewer from '../field-viewer';

const maleFields = (lifestyle: MaleExpectedWorldlyLifestyle) => [
  {
    icon: faPerson,
    label: 'Decision Making & Leadership',
    value: lifestyle?.decisionMakingAndLeadership,
  },
  {
    icon: faHandHoldingDollar,
    label: "Financial Support of Wife's Education",
    value: lifestyle?.willFinanciallySupportWifeEducation,
  },
  {
    icon: faBriefcase,
    label: 'Money in Marriage',
    value: lifestyle?.moneyInMarriage,
  },
  {
    icon: faLocationDot,
    label: 'Wife Relocation',
    value: lifestyle?.wifeRelocation,
  },
  {
    icon: faHouse,
    label: 'Family',
    value: [
      {
        label: 'Joint Family',
        value: lifestyle?.jointFamily,
      },
      {
        label: "Wife Living with Husband's Parents",
        value: lifestyle?.wifeOpenToLiveWithHusbandsParents,
      },
      {
        label: 'Separate Living Accommodations',
        value: lifestyle?.haveTheirHomeSeparateFromTheirFamilies,
      },
      {
        label: "Husband Living with Wife's Family",
        value: lifestyle?.husbandOpenToLiveWithWifeFamily,
      },
    ],
  },
  {
    icon: faChildren,
    label: 'Children',
    value: [
      {
        label: "Accepting Wife's Children",
        value: lifestyle?.acceptWifesChildren,
      },
      {
        label: "Accepting Husband's Children",
        value: lifestyle?.acceptHusbandsChildren,
      },
    ],
  },
  {
    icon: faBabyCarriage,
    label: 'Having Children',
    value: [
      {
        label: 'Having Children',
        value: lifestyle?.havingChildren,
      },
      {
        label: 'Desired Number of Children',
        value: lifestyle?.desiredNumberOfChildren,
      },
      {
        label: 'Parenthood Timing After Marriage',
        value: lifestyle?.parenthoodTimingAfterMarriage,
      },
    ],
  },
];

const femaleFields = (lifestyle: FemaleExpectedWorldlyLifestyle) => [
  {
    icon: faPerson,
    label: 'Decision Making & Leadership',
    value: lifestyle?.decisionMakingAndLeadership,
  },
  {
    icon: faHandHoldingDollar,
    label: 'Money in Marriage',
    value: lifestyle?.moneyInMarriage,
  },
  {
    icon: faBriefcase,
    label: "Financial Support of Wife's Education",
    value: lifestyle?.willFinanciallySupportWifeEducation,
  },
  {
    icon: faLocationDot,
    label: 'Husband Relocation',
    value: lifestyle?.husbandRelocation,
  },
  {
    icon: faHouse,
    label: 'Family',
    value: [
      {
        label: 'Joint Family',
        value: lifestyle?.jointFamily,
      },
      {
        label: 'Living Accommodations',
        value: lifestyle?.husbandMustLiveAloneWithWife,
      },
      {
        label: "Husband Living with Wife's Family",
        value: lifestyle?.husbandWillingToLiveWithWifeFamily,
      },
    ],
  },
  {
    icon: faChildren,
    label: 'Children',
    value: [
      {
        label: "Accepting Wife's Children",
        value: lifestyle?.acceptWifesChildren,
      },
      {
        label: "Accepting Husband's Children",
        value: lifestyle?.acceptHusbandsChildren,
      },
    ],
  },
  {
    icon: faBabyCarriage,
    label: 'Having Children',
    value: [
      {
        label: 'Having Children',
        value: lifestyle?.havingChildren,
      },
      {
        label: 'Desired Number of Children',
        value: lifestyle?.desiredNumberOfChildren,
      },
      {
        label: 'Parenthood Timing After Marriage',
        value: lifestyle?.parenthoodTimingAfterMarriage,
      },
    ],
  },
];

export default function ExpectedWorldlyLifestyleCard({ user }: { user: User }) {
  const {
    data: expectedWorldlyLifestyle,
    isLoading,
    isSuccess,
    isError,
  } = useGetExpectedWorldlyLifestyleQuery(user?.id || '', {
    skip: !user,
  });

  if (user?.gender === 'Male') {
    return (
      <FieldViewer
        getFields={maleFields}
        title="Expected Worldly Lifestyle of Your Potential Spouse"
        entity={expectedWorldlyLifestyle as MaleExpectedWorldlyLifestyle}
      />
    );
  } else if (user?.gender === 'Female') {
    return (
      <FieldViewer
        getFields={femaleFields}
        title="Expected Worldly Lifestyle of Your Potential Spouse"
        entity={expectedWorldlyLifestyle as FemaleExpectedWorldlyLifestyle}
      />
    );
  }
}
