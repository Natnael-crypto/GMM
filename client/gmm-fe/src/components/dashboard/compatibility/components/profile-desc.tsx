import {
  faLocationDot,
  faUpDown,
  faWeightScale,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import React from 'react';

export default function ProfileDescription() {
  return (
    <div className="w-full h-full rounded-se-3xl rounded-es-3xl overflow-hidden bg-muted p-5 space-y-3">
      <h1 className="text-xl font-bold text-muted-foreground">
        Muzaffar <span className="text-sm">(35)</span>
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
          <span>Pakistani Nationality / Passport</span>
        </p>
        <p className="flex item-center gap-2 bg-[#00000066] rounded-lg truncate text-xs px-2 shadow-lg w-fit text-white">
          <span>
            <FontAwesomeIcon icon={faLocationDot} />
          </span>
          <span>Toronto, Canada</span>
        </p>

        <p className="flex item-center gap-2 bg-[#00000066] rounded-lg truncate text-xs px-2 shadow-lg w-fit text-white">
          <span>
            <FontAwesomeIcon icon={faUpDown} />
          </span>
          <span>5&apos; 17&quot; (171 cm)</span>
        </p>

        <p className="flex item-center gap-2 bg-[#00000066] rounded-lg truncate text-xs px-2 shadow-lg w-fit text-white">
          <span>
            <FontAwesomeIcon icon={faWeightScale} />
          </span>
          <span>90 kg (198 lb)</span>
        </p>
      </div>
    </div>
  );
}
