'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import React from 'react';

export default function Profile() {
  return (
    <Avatar className="rounded-full">
      <AvatarImage />
      <AvatarFallback className="text-sm font-medium w-full h-full rounded-full">
        <div className="rounded-full bg-gray-500  w-6 h-6"></div>
      </AvatarFallback>
    </Avatar>
  );
}
