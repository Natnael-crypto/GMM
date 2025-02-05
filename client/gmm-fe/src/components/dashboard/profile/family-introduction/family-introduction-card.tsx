'use client';

import { useTranslations } from 'next-intl';
import React from 'react';
import { User } from '@/lib/schemas/user';
import { useGetFamilyIntroductionQuery } from '@/lib/user/api';
import { Link } from '@/lib/navigation';
import Unverified from '../marriage/unverified';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';

export default function FamilyIntroductionCard({ user }: { user: User }) {
  const t = useTranslations('Dashboard.updateProfile.marriageDiscussion');

  const { data: familyIntroduction, isLoading: isFamilyIntroductionLoading } =
    useGetFamilyIntroductionQuery(user?.id ?? '', { skip: !user });

  return (
    <div className="space-y-6">
      <h1 className="text-secondary font-bold text-xl pb-3">
        Guardian&apos;s Information
      </h1>

      <p className="rounded-se-3xl rounded-es-3xl overflow-hidden bg-card p-5">
        <strong>Your People Contact My People!!! </strong>The 5th and final step
        of the Guardian Muslim Marriage Guided Matchmaking Process. When you and
        your potential spouse reach this step, your Guardian Family
        Member’s/Imam’s contact information will be exchanged with your match’s
        Guardian Family Member’s/Imam’s contact information to initiate family
        contact.
      </p>

      {familyIntroduction && (
        <div className="flex flex-wrap gap-16 w-full">
          <div className="flex flex-col gap-3">
            <h1 className="text-secondary font-extrabold text-nowrap">
              Full Name
            </h1>

            {familyIntroduction && (
              <p className="text-nowrap flex gap-2 font-bold text-sm text-white bg-[#1d7f9a] w-fit px-4 py-1 rounded-full shadow-lg">
                {familyIntroduction?.guardianFirstName}{' '}
                {familyIntroduction?.guardianLastName}
              </p>
            )}
          </div>
          <div className="flex flex-col gap-3">
            <h1 className="text-secondary font-extrabold text-nowrap">
              Relationship
            </h1>

            {familyIntroduction && (
              <p className="text-nowrap flex gap-2 font-bold text-sm text-white bg-[#1d7f9a] w-fit px-4 py-1 rounded-full shadow-lg">
                {familyIntroduction?.relationshipToGuardian}
              </p>
            )}
          </div>
          <div className="flex flex-col gap-3">
            <h1 className="text-secondary font-extrabold text-nowrap">
              Phone Number
            </h1>

            {familyIntroduction && (
              <p className="text-nowrap flex gap-2 font-bold text-sm text-white bg-[#1d7f9a] w-fit px-4 py-1 rounded-full shadow-lg">
                {familyIntroduction?.guardianPhoneNumber}
              </p>
            )}
          </div>
          <div className="flex flex-col gap-3">
            <h1 className="text-secondary font-extrabold text-nowrap">Email</h1>

            {familyIntroduction && (
              <p className="text-nowrap flex gap-2 font-bold text-sm text-white bg-[#1d7f9a] w-fit px-4 py-1 rounded-full shadow-lg">
                {familyIntroduction?.guardianEmail}
              </p>
            )}
          </div>
        </div>
      )}

      <h1 className="text-secondary font-bold text-xl pb-3 border-t border-muted-foreground py-4">
        Proposals <span className="font-bold text-sm">- Coming Soon</span>
      </h1>

      <h1 className="text-secondary font-bold text-xl pb-3 border-t border-muted-foreground py-4">
        Optional Verifiables{' '}
        <span className="font-bold text-sm">- Coming Soon</span>
      </h1>

      <div className="hidden grid-cols-12 gap-y-3 gap-x-3 text-xs ">
        <div className="col-span-1">
          <Unverified />
        </div>
        <div className="col-span-10 grid grid-cols-4">
          <p className="col-span-3  flex items-center">
            {t('optionalVerifiable.annualIncome')}
          </p>
        </div>
        <div className="col-span-1">
          <Link
            href={''}
            className={cn(
              buttonVariants({
                variant: 'outline',
                size: 'sm',
              }),
              'rounded-full text-xs text-secondary h-6'
            )}
          >
            {t('optionalVerifiable.upload')}
          </Link>
        </div>

        {/*  */}
        <div className="col-span-1">
          <Unverified />
        </div>
        <div className="col-span-10 grid grid-cols-4">
          <p className="col-span-3 flex items-center">
            {t('optionalVerifiable.annualTax')}
          </p>
        </div>
        <div className="col-span-1">
          <Link
            href={''}
            className={cn(
              buttonVariants({
                variant: 'outline',
                size: 'sm',
              }),
              'rounded-full text-xs text-secondary h-6'
            )}
          >
            {t('optionalVerifiable.upload')}
          </Link>
        </div>
        {/*  */}
        <div className="col-span-1">
          <Unverified />
        </div>
        <div className="col-span-10 grid grid-cols-4">
          <p className="col-span-3 flex items-center">
            {t('optionalVerifiable.fullCredit')}
          </p>
        </div>
        <div className="col-span-1">
          <Link
            href={''}
            className={cn(
              buttonVariants({
                variant: 'outline',
                size: 'sm',
              }),
              'rounded-full text-xs text-secondary h-6'
            )}
          >
            {t('optionalVerifiable.upload')}
          </Link>
        </div>
        {/*  */}
        <div className="col-span-1">
          <Unverified />
        </div>
        <div className="col-span-10 grid grid-cols-4">
          <p className="col-span-3 flex items-center">
            {t('optionalVerifiable.drivingRecord')}
          </p>
        </div>
        <div className="col-span-1">
          <Link
            href={''}
            className={cn(
              buttonVariants({
                variant: 'outline',
                size: 'sm',
              }),
              'rounded-full text-xs text-secondary h-6'
            )}
          >
            {t('optionalVerifiable.upload')}
          </Link>
        </div>
        {/*  */}
        <div className="col-span-1">
          <Unverified />
        </div>
        <div className="col-span-10 grid grid-cols-4">
          <p className="col-span-3 flex items-center">
            {t('optionalVerifiable.nationality')}
          </p>
        </div>
        <div className="col-span-1">
          <Link
            href={''}
            className={cn(
              buttonVariants({
                variant: 'outline',
                size: 'sm',
              }),
              'rounded-full text-xs text-secondary h-6'
            )}
          >
            {t('optionalVerifiable.upload')}
          </Link>
        </div>
        {/*  */}
        <div className="col-span-1">
          <Unverified />
        </div>
        <div className="col-span-10 grid grid-cols-4">
          <p className="col-span-3 flex items-center">
            {t('optionalVerifiable.maritalHistory')}
          </p>
        </div>
        <div className="col-span-1">
          <Link
            href={''}
            className={cn(
              buttonVariants({
                variant: 'outline',
                size: 'sm',
              }),
              'rounded-full text-xs text-secondary h-6'
            )}
          >
            {t('optionalVerifiable.upload')}
          </Link>
        </div>
        {/*  */}
        <div className="col-span-1">
          <Unverified />
        </div>
        <div className="col-span-10 grid grid-cols-4">
          <p className="col-span-3 flex items-center">
            {t('optionalVerifiable.criminalBackgroundCheck')}
          </p>
        </div>
        <div className="col-span-1">
          <Link
            href={''}
            className={cn(
              buttonVariants({
                variant: 'outline',
                size: 'sm',
              }),
              'rounded-full text-xs text-secondary h-6'
            )}
          >
            {t('optionalVerifiable.upload')}
          </Link>
        </div>
        {/*  */}
        <div className="col-span-1">
          <Unverified />
        </div>
        <div className="col-span-10 grid grid-cols-4">
          <p className="col-span-3 flex items-center">
            {t('optionalVerifiable.divorced')}
          </p>
        </div>
        <div className="col-span-1">
          <Link
            href={''}
            className={cn(
              buttonVariants({
                variant: 'outline',
                size: 'sm',
              }),
              'rounded-full text-xs text-secondary h-6'
            )}
          >
            {t('optionalVerifiable.upload')}
          </Link>
        </div>
        {/*  */}
        <div className="col-span-1">
          <Unverified />
        </div>
        <div className="col-span-10 grid grid-cols-4">
          <p className="col-span-3 flex items-center">
            {t('optionalVerifiable.custody')}
          </p>
        </div>
        <div className="col-span-1">
          <Link
            href={''}
            className={cn(
              buttonVariants({
                variant: 'outline',
                size: 'sm',
              }),
              'rounded-full text-xs text-secondary h-6'
            )}
          >
            {t('optionalVerifiable.upload')}
          </Link>
        </div>
        {/*  */}
      </div>
    </div>
  );
}
