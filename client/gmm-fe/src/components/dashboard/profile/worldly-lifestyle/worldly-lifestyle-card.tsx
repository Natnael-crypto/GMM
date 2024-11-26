'use client';

import { User } from '@/lib/schemas/user';
import { WorldlyLifestyle } from '@/lib/schemas/worldly-lifestyle';
import { useGetWorldlyLifestyleQuery } from '@/lib/user/api';
import {
  faBriefcase,
  faCar,
  faCreditCard,
  faGraduationCap,
  faHandHoldingDollar,
  faHeartbeat,
  faHouse,
} from '@fortawesome/free-solid-svg-icons';
import FieldViewer from '../field-viewer';
import { useUserData } from '@/lib/hooks/use-user-data';

const getFields = (worldlyLifestyle?: WorldlyLifestyle) => [
  {
    icon: faBriefcase,
    label: 'Employment',
    value: worldlyLifestyle?.employmentType,
  },
  {
    icon: faHandHoldingDollar,
    label: 'Annual Income',
    value:
      worldlyLifestyle?.annualIncome && worldlyLifestyle?.annualIncomeCurrency
        ? worldlyLifestyle?.annualIncome +
          ' ' +
          worldlyLifestyle?.annualIncomeCurrency
        : undefined,
  },
  {
    icon: faGraduationCap,
    label: 'Current Occupation Title',
    value: worldlyLifestyle?.currentOccupationTitle,
  },
  {
    icon: faCar,
    label: 'Vehicle',
    value: worldlyLifestyle
      ? `${worldlyLifestyle.vehicleYear} ${worldlyLifestyle.vehicleMake} ${worldlyLifestyle.vehicleModel}`
      : null,
  },
  {
    icon: faCreditCard,
    label: 'Debts',
    value: [
      {
        label: 'Applicable Debts',
        value: worldlyLifestyle?.applicableDebts,
      },
      {
        label: 'Current Debts',
        value: worldlyLifestyle?.currentDebts.join(', '),
      },
      {
        label: 'Approximate Debts',
        value: worldlyLifestyle
          ? `${worldlyLifestyle.approximateDebt} ${worldlyLifestyle.approximateDebtCurrency}`
          : null,
      },
      {
        label: 'Paying Interest/Riba on Debts',
        value: worldlyLifestyle?.payingInterestOnDebts,
      },
    ],
  },
  {
    icon: faHouse,
    label: 'Living Accommodation',
    value: [
      {
        label: 'Type of Residence',
        value: worldlyLifestyle?.typeOfResidence,
      },
      { label: 'Living Situation', value: worldlyLifestyle?.livingSituation },
      {
        label: 'Present Family Members',
        value: worldlyLifestyle?.presentFamilyMembers,
      },
      {
        label: 'Number of Siblings',
        value: worldlyLifestyle
          ? `${
              worldlyLifestyle.numberOfSiblings === 0
                ? 'No'
                : worldlyLifestyle.numberOfSiblings
            } Siblings`
          : null,
      },
      {
        label: 'Pets',
        value: worldlyLifestyle ? worldlyLifestyle.pets : null,
      },
    ],
  },
  {
    icon: faHeartbeat,
    label: 'Health Conditions',
    value: [
      {
        label: 'Major Pre-Existing Health Conditions and/or Disability',
        value: worldlyLifestyle?.majorPreexistingHealthCondition,
      },
      {
        label: 'Mobility Assistance Required',
        value: worldlyLifestyle?.mobilityAssistantRequirement,
      },
      {
        label: 'Pre-existing Health Conditions and/or Disabilities Description',
        value:
          worldlyLifestyle?.majorPreexistingHealthCondition === 'Yes'
            ? worldlyLifestyle?.preexistingHealthConditionDescription
            : null,
      },
    ],
  },
];

export default function WorldlyLifestyleCard({ user }: { user: User }) {
  const {
    data: worldlyLifestyle,
    isLoading,
    isSuccess,
    isError,
  } = useGetWorldlyLifestyleQuery(user?.id || '', {
    skip: !user,
  });

  const { form: worldlyLifestyleForm, formData: worldlyLifestyleData } =
    useUserData(user, 'worldly-lifestyle');

  console.log(worldlyLifestyleForm.displayTemplate);

  const buildFields = (worldlyLifestyleData: any): any[] => {
    const grouped: any = {};

    for (const obj of worldlyLifestyleData) {
      const field = obj.field;
      const item = {
        iconName: field.icon,
        label: field.label,
        value: field.options?.filter(
          (option: any) => option.value === obj.value
        )?.[0]?.label,
      };

      if (field.group) {
        if (!grouped[field.group]) {
          grouped[field.group] = {
            iconName: field.icon,
            label: field.group,
            value: [],
            order: field.order,
          };
        }

        grouped[field.group].value.push(item);
        grouped[field.group].order = Math.min(
          grouped[field.group].order,
          field.order
        );
      } else {
        grouped[field.label] = { ...item, order: field.order };
      }
    }

    return Object.values(grouped).sort((a: any, b: any) => a.order - b.order);
  };

  return (
    <>
      {worldlyLifestyleData && (
        <FieldViewer
          title="Your Current Worldly Lifestyle (that you live)"
          getFields={buildFields}
          entity={worldlyLifestyleData}
        />
      )}
      {worldlyLifestyle && (
        <FieldViewer
          title="Your Current Worldly Lifestyle (that you live)"
          getFields={getFields}
          entity={worldlyLifestyle}
        />
      )}
    </>
  );
}
