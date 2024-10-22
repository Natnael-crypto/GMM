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

      <div className="pb-8 px-6 sm:px-16 md:px-24 lg:px-52 ">
        <div className="grid grid-cols-12 gap-x-3 gap-y-3 py-5">
          <h1 className="text-xl font-bold text-secondary border-b p-1 col-span-12">
            {t('optionalVerifiable.title')}
          </h1>

          <div className="hidden space-y-3 col-span-12">
            <p className="text-muted-foreground">
              {t('optionalVerifiable.p1')}
            </p>
            <p className="text-muted-foreground">
              {t('optionalVerifiable.p2')}
            </p>
          </div>
        </div>

        <div className="hidden grid-cols-12 gap-y-3 gap-x-3 text-xs">
          <div className="col-span-1">
            <Verified />
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
            <Verified />
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
            <Verified />
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
            <Verified />
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
            <Verified />
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
            <Verified />
          </div>
          <div className="col-span-10 grid grid-cols-4">
            <p className="col-span-3 flex items-center">
              {t('optionalVerifiable.stdTesting')}
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
            <Verified />
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
            <Verified />
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
    </div>
  );
}
