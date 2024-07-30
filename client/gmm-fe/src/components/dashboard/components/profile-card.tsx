import Image from 'next/image';
import React from 'react';

export default function ProfileCard() {
  return (
    <div className="flex gap-4">
      <div className="rounded-full w-16 aspect-square overflow-hidden">
        <Image
          src="/temp/profile-pic-2.webp"
          className="object-cover w-full h-[12rem] object-top"
          width={297}
          height={384}
          alt="Hero image"
        />
      </div>

      <div className="flex flex-col gap-1">
        <h1 className="font-bold text-xl text-muted-foreground">
          Muzaffar Sohail
        </h1>

        <span>User ID #11223344</span>
        <span>msohail@email.com</span>
      </div>
    </div>
  );
}
