'use client'

import Image from 'next/image';
import React from 'react';
import { useGetDownloadUrlQuery } from '@/lib/user/api';
import { User } from '@/lib/schemas/user';

export default function ProfileCard({ user }: { user: User }) {
  const { data: imageUrl } = useGetDownloadUrlQuery(user?.pictures ? user?.pictures[0] : '', { skip: (!user?.pictures || !user?.pictures[0]) });

  return (
    <div className="flex gap-4">
      <div className="rounded-full w-16 aspect-square overflow-hidden">
        {imageUrl && <Image
          src={imageUrl}
          className="object-contain w-full h-[12rem] object-top"
          width={297}
          height={384}
          alt="Hero image"
        />}
      </div>

      <div className="flex flex-col gap-1">
        <h1 className="font-bold text-xl text-muted-foreground">
          {user?.firstName} {user?.lastName}
        </h1>

        <span>User ID #11223344</span>
        <span>{user?.email}</span>
      </div>
    </div>
  );
}
