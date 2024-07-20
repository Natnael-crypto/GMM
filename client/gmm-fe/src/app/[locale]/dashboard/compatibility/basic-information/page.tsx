import ProfileOverview from '@/components/dashboard/compatibility/components/profile-overview-card';
import BasicInformationCard from '@/components/dashboard/profile/components/basic-information-card';
import {
  faLocationDot,
  faUpDown,
  faWeightScale,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';

import React from 'react';

export default function BasicInformation() {
  return (
    <div className="grid grid-cols-2 gap-5 mt-3">
      <div className="space-y-5">
        <ProfileOverview imageUrl={'/temp/profile-pic-2.webp'} />
        <BasicInformationCard />;
      </div>
      <div className="space-y-5">
        <ProfileOverview imageUrl="/temp/woman.webp" />
        <BasicInformationCard />;
      </div>
    </div>
  );
}
