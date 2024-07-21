import ProfileImages from '@/components/dashboard/components/profile-image-card';
import { Button } from '@/components/ui/button';
import {
  faHome,
  faLocationDot,
  faPeopleArrows,
  faUpDown,
  faUser,
  faWeightScale,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import React from 'react';

export default function MatchProfile() {
  return (
    <div className="h-full bg-[#f0f8f8] rounded-lg overflow-hidden">
      <h1 className="font-semibold text-primary-foreground bg-primary w-full text-center p-1">
        Your Match
      </h1>

      <div className="p-5 flex flex-col item-center justify-between h-full pb-12">
        <div className=" rounded-se-3xl rounded-es-3xl overflow-hidden h-[20rem]">
          <Image
            src="/temp/woman.webp"
            className="object-cover w-full h-[20rem] object-top"
            width={297}
            height={384}
            alt="Hero image"
          />

          <div className="relative">
            <div className="absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-b from-transparent from-90%  to-muted-foreground"></div>
            <div className="absolute bottom-0 left-0 right-0 p-5 space-y-3">
              <h2 className="text-background font-semibold text-3xl">Zara</h2>

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

        <div className="flex gap-2 flex-wrap items-center justify-center">
          <Button className="bg-secondary text-primary-foreground text-[0.6rem] h-fit flex justify-center items-center gap-2">
            <FontAwesomeIcon icon={faUser} />
            <span>View Profile</span>
          </Button>
          <Button className="bg-secondary text-primary-foreground text-[0.6rem] h-fit flex justify-center items-center gap-2">
            <FontAwesomeIcon icon={faPeopleArrows} />
            <span>Check Compatibility</span>
          </Button>
          <Button className="bg-secondary text-primary-foreground text-[0.6rem] h-fit flex justify-center items-center gap-2">
            <FontAwesomeIcon icon={faHome} />
            <span>Go to Dashboard</span>
          </Button>
        </div>

        <Button className="bg-primary text-primary-foreground h-fit">
          Invite to Next Step
        </Button>
      </div>
    </div>
  );
}
