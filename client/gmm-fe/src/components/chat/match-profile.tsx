'use client'

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
import React, { useEffect, useState } from 'react';
import { useCreateDownloadUrlMutation } from '@/lib/user/api'
import { Link } from '@/lib/navigation';
import { cn } from '@/lib/utils';
import { Carousel, CarouselApi, CarouselContent, CarouselItem } from '../ui/carousel';
import { CarouselNext, CarouselPrevious } from '../ui/previous-button';
import ProfileImages from '../dashboard/components/profile-image-card';

export default function MatchProfile({ matchedUser }: { matchedUser: User }) {
  return (
    <div className="bg-[#f0f8f8] rounded-lg overflow-hidden h-full flex flex-col items-center"
      style={{
        height: 'calc(100vh - 1.50rem)',
      }}>
      <h1 className="font-semibold text-primary-foreground bg-primary w-full text-center p-1">
        Your Match
      </h1>

      <div className="m-6 flex flex-col item-center justify-between h-full">
        <div className='space-y-3'>
          <ProfileImages user={matchedUser} />

          <div className="flex gap-2 flex-wrap items-center justify-center">
            <Link href="" className={cn(buttonVariants({ variant: 'default' }), "bg-secondary text-primary-foreground text-[0.6rem] h-fit flex justify-center items-center gap-2 p-[0.3rem] px-[0.4rem]")}>
              <FontAwesomeIcon icon={faUser} />
              <span>View Profile</span>
            </Link>
            <Link href="/dashboard/compatibility/basic-information" className={cn(buttonVariants({ variant: 'default' }), "bg-secondary text-primary-foreground text-[0.6rem] h-fit flex justify-center items-center gap-2 p-[0.3rem] px-[0.4rem]")}>
              <FontAwesomeIcon icon={faPeopleArrows} />
              <span>Compatibility</span>
            </Link>
            <Link href="/dashboard" className={cn(buttonVariants({ variant: 'default' }), "bg-secondary text-primary-foreground text-[0.6rem] h-fit flex justify-center items-center gap-2 p-[0.3rem] px-[0.4rem]")}>
              <FontAwesomeIcon icon={faHome} />
              <span>Dashboard</span>
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
