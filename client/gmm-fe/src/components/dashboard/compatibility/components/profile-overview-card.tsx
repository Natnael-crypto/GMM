import React from 'react';
import ProfileImage from './profile-image';
import ProfileDescription from './profile-desc';

export default function ProfileOverview({ imageUrl }: { imageUrl: string }) {
  return (
    <div className="grid grid-cols-5 gap-x-5">
      <div className="col-span-2">
        <ProfileImage imageUrl={imageUrl} />
      </div>
      <div className="col-span-3">
        <ProfileDescription />
      </div>
    </div>
  );
}
