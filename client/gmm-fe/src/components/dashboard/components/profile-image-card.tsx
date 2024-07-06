import {
  faLocationDot,
  faUpDown,
  faWeightScale,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import React from 'react';

export default function ProfileImages() {
  return (
    <div className="relative rounded-se-3xl rounded-es-3xl overflow-hidden h-[26rem">
      <Image
        src="/temp/profile-pic-2.webp"
        className="object-cover w-full h-[26rem] object-top"
        width={297}
        height={384}
        alt="Hero image"
      />

      <div>
        <div className="absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-b from-transparent from-90%  to-muted-foreground"></div>
        <div className="absolute bottom-0 left-0 right-0 p-5 space-y-3">
          <h2 className="text-background font-semibold text-3xl">Muzaffar</h2>

          <div className="space-y-2 font-thin">
            <p className="flex gap-2 bg-[#ffffffbb] rounded-full truncate text-xs font-semibold px-2 shadow-lg">
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

            <div className="flex gap-2">
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
        </div>
      </div>
    </div>
  );
}
