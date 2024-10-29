import {
  faMosque,
  faChildDress,
  faComments,
  faUsers,
  faBookOpen,
  faHandHoldingHeart,
  faMoneyBillWave,
} from '@fortawesome/free-solid-svg-icons';
import {
  FemaleExpectedIslamicLifestyle,
  MaleExpectedIslamicLifestyle,
} from '@/lib/schemas/islamic-lifestyle';
import FieldViewer from '../field-viewer';
import { useGetExpectedIslamicLifestyleQuery } from '@/lib/user/api';
import { User } from '@/lib/schemas/user';

const maleFields = (lifestyle?: MaleExpectedIslamicLifestyle) => [
  {
    icon: faMosque,
    label: 'Salat/Prayer',
    value: lifestyle?.salat,
  },
  {
    icon: faHandHoldingHeart,
    label: 'Obedience',
    value: lifestyle?.obedience,
  },
  {
    icon: faChildDress,
    label: 'Hijab',
    value: lifestyle?.hijab,
  },
  {
    icon: faMoneyBillWave,
    label: 'Appearance',
    value: lifestyle?.appearance,
  },
  {
    icon: faUsers,
    label: 'Polygyny/Family Structure',
    value: lifestyle?.polygyny,
  },
  {
    icon: faBookOpen,
    label: 'Islamic Education',
    value: lifestyle?.islamicEducation,
  },
  {
    icon: faComments,
    label: 'Social Media',
    value: lifestyle?.socialMedia,
  },
  {
    icon: faHandHoldingHeart,
    label: 'Wife Non-Mehram Contact',
    value: lifestyle?.wifeNonMehramContact,
  },
  {
    icon: faHandHoldingHeart,
    label: 'Husband Non-Mehram Contact',
    value: lifestyle?.husbandNonMehramContact,
  },
  {
    icon: faHandHoldingHeart,
    label: 'Obedience to In-Laws',
    value: lifestyle?.obedienceToInLaws,
  },
];

const femaleFields = (lifestyle?: FemaleExpectedIslamicLifestyle) => [
  {
    icon: faMosque,
    label: 'Salat/Prayer',
    value: lifestyle?.salat,
  },
  {
    icon: faChildDress,
    label: 'Hijab',
    value: lifestyle?.hijab,
  },
  {
    icon: faUsers,
    label: 'Polygyny/Family Structure',
    value: lifestyle?.polygyny,
  },
  {
    icon: faBookOpen,
    label: 'Children Upbringing',
    value: lifestyle?.childrenUpbringing,
  },
  {
    icon: faHandHoldingHeart,
    label: 'Non-Mehram Contact',
    value: lifestyle?.wifeNonMehramContact,
  },
  {
    icon: faHandHoldingHeart,
    label: 'Obedience to Husband',
    value: lifestyle?.husbandNonMehramContact,
  },
  {
    icon: faHandHoldingHeart,
    label: 'Obedience to In-laws',
    value: lifestyle?.husbandAppearance,
  },
  {
    icon: faComments,
    label: 'Social Media',
    value: lifestyle?.socialMedia,
  },
  {
    icon: faMoneyBillWave,
    label: 'Appearance (Makeup/Perfume)',
    value: lifestyle?.wifeAppearance,
  },
];

export default function ExpectedIslamicLifestyleCard({ user }: { user: User }) {
  const {
    data: expectedIslamicLifestyle,
    isLoading,
    isSuccess,
    isError,
  } = useGetExpectedIslamicLifestyleQuery(user?.id || '', {
    skip: !user,
  });

  if (user?.gender === 'Male') {
    return (
      <FieldViewer
        getFields={maleFields}
        title="Expected Islamic Lifestyle of Your Potential Spouse"
        entity={expectedIslamicLifestyle as MaleExpectedIslamicLifestyle}
      />
    );
  } else if (user?.gender === 'Female') {
    return (
      <FieldViewer
        getFields={femaleFields}
        title="Expected Islamic Lifestyle of Your Potential Spouse"
        entity={expectedIslamicLifestyle as FemaleExpectedIslamicLifestyle}
      />
    );
  }
}
