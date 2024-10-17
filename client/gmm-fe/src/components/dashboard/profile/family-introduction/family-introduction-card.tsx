import Unverified from '@/components/dashboard/profile/marriage/unverified';
import Verified from '@/components/dashboard/profile/marriage/verfied';
import { buttonVariants } from '@/components/ui/button';
import { Link } from '@/lib/navigation';
import { cn } from '@/lib/utils';
import { faPeopleRoof, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useTranslations } from 'next-intl';
import React from 'react';

export default function FamilyIntroductionCard() {
  const t = useTranslations('Dashboard.updateProfile.marriageDiscussion');

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
                <span className="font-bold">Some name</span>
              </span>
              <span>
                Relationship:{' '}
                <span className="font-bold">
                  Revert care (Appoint for me a guardian)
                </span>
              </span>
              <span>
                Phone Number:{' '}
                <span className="font-bold">+1-123-456-7890</span>
              </span>
              <span>
                Email:{' '}
                <span className="font-bold">email@email.com</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
