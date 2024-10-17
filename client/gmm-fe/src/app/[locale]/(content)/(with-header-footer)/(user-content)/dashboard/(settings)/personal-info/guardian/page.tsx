'use client';

import { Button } from '@/components/ui/button';
import { useAppSelector } from '@/lib/hooks';
import { useTranslations } from 'next-intl';

export default function PersonalInfo() {
  const t = useTranslations(
    'Dashboard.updateProfile.marriageDiscussion.optionalVerifiable'
  );

  const user = useAppSelector((state) => state.auth.user);

  return (
    <div className="rounded-xl bg-background shadow-lg p-5 space-y-4 text-sm">
      <div className="flex justify-between items-end">
        <h1 className="text-xl">Guardian&apos;s Profile Information</h1>
        <span>User ID #11223344</span>
      </div>

      <div className="divide-y space-y-2">
        <div className="flex justify-between items-center py-2 pt-3">
          <div className="flex flex-col gap-1">
            <span className="font-bold">Full Name</span>
            <span>
              {user?.firstName} {user?.lastName}
            </span>
          </div>
        </div>

        <div className="flex justify-between items-center py-2 pt-3">
          <div className="flex flex-col gap-1">
            <span className="font-bold">Email Address</span>
            <span className="flex gap-3 items-center">
              {user?.email}{' '}
              <span className="text-destructive text-[0.6rem] gap-1 flex items-center justify-center">
                {/* <FontAwesomeIcon className="text-xs" icon={faXmarkCircle} />
                <span className="font-bold">{t('unverified')}</span> */}
              </span>
            </span>
          </div>
        </div>
        <div className="flex justify-between items-center py-2 pt-3">
          <div className="flex flex-col gap-1">
            <span className="font-bold">Relationship</span>
            <span className="flex gap-3 items-center">
              {user?.email}{' '}
              <span className="text-destructive text-[0.6rem] gap-1 flex items-center justify-center">
                {/* <FontAwesomeIcon className="text-xs" icon={faXmarkCircle} />
                <span className="font-bold">{t('unverified')}</span> */}
              </span>
            </span>
          </div>
        </div>

        <div className="flex justify-between items-center py-2 pt-3">
          <div className="flex flex-col gap-1">
            <span className="font-bold">Phone Number</span>
            <span className="flex gap-3 items-center">
              {user?.phoneNumber}{' '}
              <span className="text-destructive text-[0.6rem] gap-1 flex items-center justify-center">
                {/* <FontAwesomeIcon className="text-xs" icon={faXmarkCircle} />
                <span className="font-bold">{t('unverified')}</span> */}
              </span>
            </span>
          </div>
        </div>

        <div className="flex justify-between items-center py-2 pt-3">
          <div className="flex flex-col gap-1">
            <span className="font-bold">Guardian ID</span>
            <span className="flex gap-3 items-center">
              {user?.phoneNumber}{' '}
              <span className="text-destructive text-[0.6rem] gap-1 flex items-center justify-center">
                {/* <FontAwesomeIcon className="text-xs" icon={faXmarkCircle} />
                <span className="font-bold">{t('unverified')}</span> */}
              </span>
            </span>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" className="text-secondary h-7 text-xs">
              Upload Document
            </Button>
            <Button variant="outline" className="text-secondary h-7 text-xs">
              View Document
            </Button>
          </div>
        </div>

        <div className="h-24"></div>
      </div>
    </div>
  );
}
