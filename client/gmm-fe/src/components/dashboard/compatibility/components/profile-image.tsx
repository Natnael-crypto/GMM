import Image from 'next/image';
import React from 'react';

export default function ProfileImage({ imageUrl }: { imageUrl: string }) {
  return (
    <div className="w-full rounded-se-3xl rounded-es-3xl overflow-hidden">
      <Image
        src={imageUrl}
        className="object-cover w-full h-[12rem] object-top"
        width={297}
        height={384}
        alt="Hero image"
      />
    </div>
  );
}
