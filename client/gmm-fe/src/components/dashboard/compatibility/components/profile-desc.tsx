import { User } from '@/lib/schemas/user';
import {
  faLocationDot,
  faUpDown,
  faWeightScale,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import React from 'react';

export default function ProfileDescription({ user }: { user: User }) {
  return (
    <div className="w-full h-full rounded-se-3xl rounded-es-3xl overflow-hidden bg-muted p-5 space-y-3">
      <h1 className="text-xl font-bold text-muted-foreground">
        {user.firstName} {user.lastName} <span className="text-sm">(35)</span>
      </h1>

      <div className="space-y-2 font-thin">
        <p className="flex item-center gap-2 bg-[#00000066] rounded-lg truncate text-xs px-2 shadow-lg w-fit text-white">
          <Image
            className="w-4 h-4"
            width={512}
            height={512}
            src={`/icons/lang/en.svg`}
            alt="Language Flag"
          />
          <span>{user.nationality} Nationality / Passport</span>
        </p>
        <p className="flex item-center gap-2 bg-[#00000066] rounded-lg truncate text-xs px-2 shadow-lg w-fit text-white">
          <span>
            <FontAwesomeIcon icon={faLocationDot} />
          </span>
          <span>{user.city}, {user.country}</span>
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
