'use client';

import FamilyIntroductionForm from '@/components/dashboard/profile/family-introduction/family-introduction-form';
import Loading from '@/components/ui/loading';
import { useAppSelector } from '@/lib/hooks';
import Unverified from '@/components/dashboard/profile/marriage/unverified';
import Verified from '@/components/dashboard/profile/marriage/verfied';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Link } from '@/lib/navigation';
import { useGetFamilyIntroductionQuery } from '@/lib/user/api';
import { useTranslations } from 'next-intl';

export default function FamilyIntroductionPage() {
  const user = useAppSelector((state) => state.auth.user);
  const { data: familyIntroduction, isLoading: isFamilyIntroductionLoading } =
    useGetFamilyIntroductionQuery(user?.id ?? '', { skip: !user });
  const t = useTranslations('Dashboard.updateProfile.marriageDiscussion');

  return (
    <div>
      {isFamilyIntroductionLoading && (
        <div className="w-full flex justify-center">
          <Loading />
        </div>
      )}
      <FamilyIntroductionForm familyIntroduction={familyIntroduction} />

      <div className="pb-8 px-6 sm:px-16 md:px-[3rem] lg:px-[5rem] 2xl:px-[15rem] 3xl:px-[20rem] ">
        <div className="grid grid-cols-12 gap-x-3 gap-y-3 py-5">
          <h1 className="text-xl font-bold text-secondary border-b p-1 col-span-12">
            {t('optionalVerifiable.title')}
          </h1>

          <div className="space-y-3 col-span-12">
            <p className="text-muted-foreground">
              {t('optionalVerifiable.p1')}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-y-3 gap-x-3 text-xs ">
          <div className="col-span-1">
            <Unverified />
          </div>
          <div className="col-span-10 grid grid-cols-4">
            <p className="col-span-3  flex items-center">
            <strong>{t('optionalVerifiable.annualIncome').substring(0,19)}</strong> :{t('optionalVerifiable.annualIncome').substring(19)}
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
            <strong>{t('optionalVerifiable.annualTax').substring(0 ,21 )} </strong>: {t('optionalVerifiable.annualTax').substring(21)}
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
      
              <strong>{t('optionalVerifiable.fullCredit').substring(0 , 25)} {" "}</strong> : {t('optionalVerifiable.fullCredit').substring(25)}
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
              <strong>{t('optionalVerifiable.drivingRecord').substring(0 , 16)} </strong>
              : {t('optionalVerifiable.drivingRecord').substring(16)}
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
              <strong>{t('optionalVerifiable.nationality').substring(0 , 21)} </strong>
              : {t('optionalVerifiable.nationality').substring(21)}
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
              <strong>{t('optionalVerifiable.maritalHistory').substring(0 , 32)} </strong>
               {t('optionalVerifiable.maritalHistory').substring(32)}
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
            <p className="col-span-4 flex items-center">
              <strong>{t('optionalVerifiable.criminalBackgroundCheck').substring(0 , 24)} </strong>: {t('optionalVerifiable.criminalBackgroundCheck').substring(24)}
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
              <strong>{t('optionalVerifiable.divorced').substring(0 , 24)} </strong>
              : {t('optionalVerifiable.divorced').substring(24)}
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
            <p className="col-span-4 flex items-center">
              <strong>{t('optionalVerifiable.custody').substring(0 , 32)} </strong>
              : {t('optionalVerifiable.custody').substring(32)}
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
    </div>
  );
}
