'use client';

import Image from 'next/image';
import React from 'react';
import { useGetDownloadUrlQuery } from '@/lib/user/api';
import { User } from '@/lib/schemas/user';

export default function ProfileCard({ user }: { user: User }) {
  const { data: imageUrl } = useGetDownloadUrlQuery(
    user?.pictures ? user?.pictures[0] : '',
    { skip: !user?.pictures || !user?.pictures[0] }
  );

  return (
    <div className="flex gap-4">
      <div className="rounded-full w-16 h-16 aspect-square overflow-hidden">
        {imageUrl && (
          <Image
            src={imageUrl}
            className="object-cover w-full h-full object-top"
            width={300}
            height={300}
            alt="Hero image"
          />
        )}
      </div>

      <div className="flex flex-col gap-1">
        <h1 className="font-bold text-xl text-muted-foreground">
          {user?.firstName} {user?.lastName}
        </h1>
      </div>
    </div>
  );
}
