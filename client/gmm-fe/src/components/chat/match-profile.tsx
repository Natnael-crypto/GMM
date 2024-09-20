import { Button, buttonVariants } from '@/components/ui/button';
import { User } from '@/lib/schemas/user';
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
import { useAppSelector } from '@/lib/hooks'
import { useGetDownloadUrlQuery } from '@/lib/user/api'
import { Link } from '@/lib/navigation';
import { cn } from '@/lib/utils';

export default function MatchProfile({ matchedUser }: { matchedUser: User }) {
  const user = useAppSelector((state) => state.auth.user);
  const { data: imageUrl } = useGetDownloadUrlQuery(matchedUser?.pictures ? matchedUser?.pictures[0] : '', { skip: (!matchedUser?.pictures || !matchedUser?.pictures[0]) });

  return (
    <div className="bg-[#f0f8f8] rounded-lg overflow-hidden h-full flex flex-col items-center">
      <h1 className="font-semibold text-primary-foreground bg-primary w-full text-center p-1">
        Your Match
      </h1>

      <div className="m-6 flex flex-col item-center justify-between h-full">
        <div className='space-y-3'>
          <div className="rounded-se-3xl rounded-es-3xl overflow-hidden h-[21rem]">
            {imageUrl && <Image
              src={imageUrl}
              className="object-cover w-full h-[21rem] object-top"
              width={1200}
              height={2000}
              alt="Hero image"
            />}

            <div className="relative">
              <div className="absolute bottom-0 left-0 right-0 p-5 space-y-3">
                <h2 className="text-background font-semibold text-2xl">{matchedUser.firstName}</h2>

                <div className="space-y-2 font-thin">
                  <p className="flex gap-2 bg-[#ffffffbb] rounded-full truncate text-[0.6rem] font-semibold px-2 shadow-lg items-center">
                    <Image
                      className="w-4 h-4"
                      width={512}
                      height={512}
                      src={`/icons/lang/en.svg`}
                      alt="Language Flag"
                    />
                    <span>{matchedUser.nationality} Nationality / Passport</span>
                  </p>
                  <p className="flex item-center gap-2 bg-[#00000066] rounded-lg truncate text-xs px-2 shadow-lg w-fit text-white">
                    <span>
                      <FontAwesomeIcon icon={faLocationDot} />
                    </span>
                    <span>{matchedUser.city}, {matchedUser.country}</span>
                  </p>

                  <div className="flex gap-2">
                    <p className="flex item-center gap-2 bg-[#00000066] rounded-lg truncate text-xs px-2 shadow-lg w-fit text-white">
                      <span>
                        <FontAwesomeIcon icon={faUpDown} />
                      </span>
                      <span>{matchedUser.height} cm</span>
                    </p>
                    <p className="flex item-center gap-2 bg-[#00000066] rounded-lg truncate text-xs px-2 shadow-lg w-fit text-white">
                      <span>
                        <FontAwesomeIcon icon={faWeightScale} />
                      </span>
                      <span>{matchedUser.weight} kg </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-2 flex-wrap items-center justify-center">
            <Link href="" className={cn(buttonVariants({ variant: 'default' }), "bg-secondary text-primary-foreground text-[0.6rem] h-fit flex justify-center items-center gap-2 p-[0.3rem] px-[0.4rem]")}>
              <FontAwesomeIcon icon={faUser} />
              <span>View Profile</span>
            </Link>
            <Link href="/dashboard/compatibility/basic-information" className={cn(buttonVariants({ variant: 'default' }), "bg-secondary text-primary-foreground text-[0.6rem] h-fit flex justify-center items-center gap-2 p-[0.3rem] px-[0.4rem]")}>
              <FontAwesomeIcon icon={faPeopleArrows} />
              <span>Check Compatibility</span>
            </Link>
            <Link href="/dashboard" className={cn(buttonVariants({ variant: 'default' }), "bg-secondary text-primary-foreground text-[0.6rem] h-fit flex justify-center items-center gap-2 p-[0.3rem] px-[0.4rem]")}>
              <FontAwesomeIcon icon={faHome} />
              <span>Go to Dashboard</span>
            </Link>
          </div>
        </div>


        <div className='flex justify-center border-t pt-3'>
          <Button className="bg-primary text-primary-foreground h-8 w-fit text-xs">
            Invite to Next Step
          </Button>
        </div>
      </div>

    </div>
  );
}
