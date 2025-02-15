import { convertDateToAge } from '@/lib/format';
import { countryToCountryCode, User } from '@/lib/schemas/user';
import {
  faLocationDot,
  faUpDown,
  faWeightScale,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import flags from 'react-phone-number-input/flags';

export default function ProfileDescription({ user }: { user: User }) {
  const code = countryToCountryCode[user.nationality] as keyof typeof flags;
  const NationalityFlag = flags[code];

  return (
    <div className="w-full h-full rounded-se-3xl rounded-es-3xl overflow-hidden p-5 space-y-3">
      <h1 className="gmm-pic-name font-bold">
        {user.firstName}{' '}
        {user && user.dateOfBirth && (
          <span className="gmm-pic-age">
            ({convertDateToAge(user.dateOfBirth)})
          </span>
        )}
      </h1>

      <div className="gmm-pic-info space-y-2 font-bold">
        <p className="flex item-center gap-2 bg-[#CDEBFF] rounded-full truncate px-2 py-2 font-bold shadow-lg w-fit">
          {NationalityFlag && <NationalityFlag title={user.nationality} />}
          <span className="primary-info">{user.nationality} Nationality / Passport</span>
        </p>
        <p className="flex item-center gap-2 bg-[#CDEBFF] rounded-full truncate px-2 py-2 font-bold shadow-lg w-fit">
          <span>
            <FontAwesomeIcon icon={faLocationDot} />
          </span>
          <span className="primary-info">{user.city}</span>
        </p>

        <div className="gmm-pic-info flex gap-2">
          <p className="flex item-center gap-2 border border-accent rounded-full truncate px-2 py-2 font-bold shadow-lg w-fit">
            <span>
              <FontAwesomeIcon icon={faUpDown} />
            </span>
            <span className="secondary-info">Height: {user.height} cm</span>
          </p>

          <p className="flex item-center gap-2 border border-accent rounded-full truncate px-2 py-2 font-bold shadow-lg w-fit">
            <span>
              <FontAwesomeIcon icon={faWeightScale} />
            </span>
            <span className="secondary-info">Weight: {user.weight} kg </span>
          </p>
        </div>
      </div>
    </div>
  );
}
