'use client'

import { useUpdateProfileContext } from '@/components/dashboard/profile/update-profile-context';
import BasicInformationForm from '@/components/registration/basic-information-form';
import FamilyForm from '@/components/registration/family-form';
import PhotoUploader from '@/components/registration/photo-uploader';
import VideoUploader from '@/components/registration/video-uploader';
import { Button } from '@/components/ui/button';
import { useAppSelector } from '@/lib/hooks';
import { useRouter } from '@/lib/navigation';
import React, { useEffect } from 'react';

export default function Registration() {
  const { onSave } = useUpdateProfileContext();

  // const user = useAppSelector((state) => state.auth.user);
  // const router = useRouter()

  // useEffect(() => {
  //   if (user && user.age) {
  //     router.push('/dashboard');
  //   }
  // }, [user, router])

  return (
    <div className="space-y-5">
      <h1 className="text-2xl font-medium text-center">Account Registration</h1>
      <div className="grid grid-cols-3 gap-x-3">
        <div className="col-span-1 space-y-5">
          <PhotoUploader />
          <VideoUploader />
        </div>
        <div className="col-span-2 space-y-10">
          <BasicInformationForm />
          <FamilyForm />
          <div className="flex justify-end">
            <Button className="bg-primary text-primary-foreground" onClick={onSave}>
              Submit
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
