'use client';

import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { Link } from '@/lib/navigation';
import React from 'react';
import { useParams } from 'next/navigation';
import { useAppSelector } from '@/lib/hooks';

export default function NoMatchCard() {
  const user = useAppSelector((state) => state.auth.user);

  return (
    <div className="bg-[#e8f3db] rounded-se-3xl rounded-es-3xl overflow-hidden py-5 p-8 text-sm space-y-4  text-muted-foreground">
      <div className="flex flex-col items-center gap-4">
        <div className="w-24">
          <Image
            className="w-full"
            src={'/assets/woman-hijab.svg'}
            width={221}
            height={234}
            alt=""
          />
        </div>
        <h1 className="text-bold font-bold text-xl">No Match Found!</h1>
        <p className="text-center">
          You can get better matches by making sure that you have{' '}
          <span className="font-bold underline">
            completed all sections of your profile
          </span>{' '}
          with accurate information.
        </p>

        <div className="flex flex-col justify-center">
          <span className="text-center">Do you need any help?</span>
          <span className="text-center">
            <Link href="" className="font-semibold text-primary">
              Watch this video
            </Link>{' '}
            or visit our{' '}
            <Link href="" className="font-semibold text-primary">
              Help Center
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
}
