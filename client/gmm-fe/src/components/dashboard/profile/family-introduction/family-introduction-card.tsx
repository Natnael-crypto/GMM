'use client';

import { faPeopleRoof } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useTranslations } from 'next-intl';
import React from 'react';
import { User } from '@/lib/schemas/user';
import { useGetFamilyIntroductionQuery } from '@/lib/user/api';

export default function FamilyIntroductionCard({ user }: { user: User }) {
  const t = useTranslations('Dashboard.updateProfile.marriageDiscussion');

  const { data: familyIntroduction, isLoading: isFamilyIntroductionLoading } =
    useGetFamilyIntroductionQuery(user?.id ?? '', { skip: !user });

  return (
    <div className="space-y-6">
      <div className="rounded-se-3xl rounded-es-3xl overflow-hidden bg-card p-5 px-8 divide-y">
        <div className="grid grid-cols-12 py-3">
          <div className="col-span-1">
            <FontAwesomeIcon
              icon={faPeopleRoof}
              size="xl"
              className="text-primary"
            />
          </div>
          <div className="col-span-11 space-y-3 ">
            <h1 className="font-bold">Guardian&apos;s Information</h1>
            <div className="flex flex-col gap-2 text-sm">
              <span>
                Full Name:{' '}
                <span className="font-bold">
                  {familyIntroduction?.guardianFirstName}{' '}
                  {familyIntroduction?.guardianLastName}
                </span>
              </span>
              <span>
                Relationship:{' '}
                <span className="font-bold">
                  {familyIntroduction?.relationshipToGuardian}
                </span>
              </span>
              <span>
                Phone Number:{' '}
                <span className="font-bold">
                  {familyIntroduction?.guardianPhoneNumber}
                </span>
              </span>
              <span>
                Email:{' '}
                <span className="font-bold">
                  {familyIntroduction?.guardianEmail}
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
