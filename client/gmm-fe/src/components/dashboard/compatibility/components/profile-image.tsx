import AntiRightClick from '@/components/anti-right-click/anti-right-click';
import DynamicBlur from '@/components/ui/dynamic-blur';
import React from 'react';

export default function ProfileImage({
  imageUrl,
  blur,
}: {
  imageUrl: string;
  blur: boolean;
}) {
  return (
    <AntiRightClick>
      <div className="w-full rounded-se-3xl rounded-es-3xl overflow-hidden">
        <DynamicBlur
          src={imageUrl}
          className="object-cover w-full h-[12rem] object-top"
          width={297}
          height={384}
          alt="Hero image"
          alwaysBlur={blur}
        />
      </div>
    </AntiRightClick>

  );
}
