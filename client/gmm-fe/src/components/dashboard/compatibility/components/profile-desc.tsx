import { convertDateToAge } from '@/lib/format';
import { countryToCountryCode, User } from '@/lib/schemas/user';
import {
  faLocationDot,
  faUpDown,
  faWeightScale,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import React from 'react';
import flags from 'react-phone-number-input/flags';

export default function ProfileDescription({ user }: { user: User }) {
  const code = countryToCountryCode[user.nationality] as keyof typeof flags;
  const NationalityFlag = flags[code];

  return (
    <div className="w-full h-full rounded-se-3xl rounded-es-3xl overflow-hidden bg-muted p-5 space-y-3">
      <h1 className="text-xl font-bold text-muted-foreground">
        {user.firstName} {user.lastName}{' '}
        {user && user.dateOfBirth && (
          <span className="text-sm">
            ({convertDateToAge(user.dateOfBirth)})
          </span>
        )}
      </h1>

      <div className="space-y-2 font-thin">
        <p className="flex item-center gap-2 bg-[#00000066] rounded-lg truncate text-xs px-2 shadow-lg w-fit text-white">
          {NationalityFlag && <NationalityFlag title={user.nationality} />}
          <span>{user.nationality} Nationality / Passport</span>
        </p>
        <p className="flex item-center gap-2 bg-[#00000066] rounded-lg truncate text-xs px-2 shadow-lg w-fit text-white">
          <span>
            <FontAwesomeIcon icon={faLocationDot} />
          </span>
          <span>
            {user.city}, {user.country}
          </span>
        </p>

        <p className="flex item-center gap-2 bg-[#00000066] rounded-lg truncate text-xs px-2 shadow-lg w-fit text-white">
          <span>
            <FontAwesomeIcon icon={faUpDown} />
          </span>
          <span>{user.height} cm</span>
        </p>

        <p className="flex item-center gap-2 bg-[#00000066] rounded-lg truncate text-xs px-2 shadow-lg w-fit text-white">
          <span>
            <FontAwesomeIcon icon={faWeightScale} />
          </span>
          <span>{user.weight} kg </span>
        </p>
      </div>
    </div>
  );
}
