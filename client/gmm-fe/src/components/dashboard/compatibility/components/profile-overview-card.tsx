import React from 'react';
import ProfileImage from './profile-image';
import ProfileDescription from './profile-desc';
import { User } from '@/lib/schemas/user';

export default function ProfileOverview({ imageUrl, user }: { imageUrl: string, user: User }) {
  return (
    <div className="grid grid-cols-5 gap-x-5">
      <div className="col-span-2">
        <ProfileImage imageUrl={imageUrl} />
      </div>
      <div className="col-span-3">
        {user && <ProfileDescription user={user} />}
      </div>
    </div>
  );
}
