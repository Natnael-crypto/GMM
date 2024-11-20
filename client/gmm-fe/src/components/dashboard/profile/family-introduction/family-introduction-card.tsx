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
      <div className="rounded-se-3xl rounded-es-3xl overflow-hidden bg-card p-5 px-8">
        <h1 className="text-secondary font-bold text-xl pb-3">
          Guardian&apos;s Information
        </h1>
        {user.email !== familyIntroduction?.guardianEmail ? (
          <div className="grid grid-cols-12 py-3">
            <div className="col-span-3 sm:col-span-2 md:col-span-1 text-center">
              <FontAwesomeIcon
                icon={faPeopleRoof}
                size="2xl"
                className="text-primary"
              />
            </div>
            <div className="col-span-9 sm:col-span-10 md:col-span-11 space-y-3 mt-1">
              <div className="flex flex-col gap-2 text-md mt-1">
                <p>
                  Full Name:{' '}
                  <span className="font-bold">
                    {familyIntroduction?.guardianFirstName}{' '}
                    {familyIntroduction?.guardianLastName}
                  </span>
                </p>
                <p>
                  Relationship:{' '}
                  <span className="font-bold">
                    {familyIntroduction?.relationshipToGuardian}
                  </span>
                </p>
                <p>
                  Phone Number:{' '}
                  <span className="font-bold">
                    {familyIntroduction?.guardianPhoneNumber}
                  </span>
                </p>
                <p>
                  Email:{' '}
                  <span className="font-bold">
                    {familyIntroduction?.guardianEmail}
                  </span>
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-12 py-3"></div>
        )}
      </div>
      <div className="rounded-se-3xl rounded-es-3xl overflow-hidden bg-card p-5 px-8">
        <h1 className="text-secondary font-bold text-xl pb-3">
          Optional Verifiables <span className="text-md">- Coming Soon</span>
        </h1>
      </div>
    </div>
  );
}
