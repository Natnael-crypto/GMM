import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { faPeopleRoof, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import React from 'react';

export default function FamilyDiscussion() {
  return (
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
              Guardian&apos;s Full Name:{' '}
              <span className="font-bold">Some name</span>
            </span>
            <span>
              Relationship to Guardian:{' '}
              <span className="font-bold">
                Revert care (Appoint for me a guardian)
              </span>
            </span>
            <span>
              Guardian&apos;s Phone Number:{' '}
              <span className="font-bold">+1-123-456-7890</span>
            </span>
            <span>
              Guardian&apos;s Email:{' '}
              <span className="font-bold">email@email.com</span>
            </span>
            <div className="flex justify-between">
              <span>
                Guardian&apos;s ID:{' '}
                <span className="font-bold">Driver License</span>
              </span>

              <Link
                className={cn(
                  buttonVariants({
                    variant: 'outline',
                    size: 'sm',
                  }),
                  'rounded-full text-xs text-secondary h-6'
                )}
                href=""
              >
                View Document
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-12 py-3">
        <div className="col-span-1">
          <FontAwesomeIcon icon={faUser} size="xl" className="text-primary" />
        </div>
        <div className="col-span-11 space-y-3 ">
          <h1 className="font-bold">Applicant&apos;s Information</h1>
          <div className="flex flex-col gap-2 text-sm">
            <span>
              Applicant&apos;s Phone Number:{' '}
              <span className="font-bold">+1-123-456-7890</span>
            </span>

            <div className="flex justify-between">
              <span>
                Applicant&apos;s ID:{' '}
                <span className="font-bold">Citizenship Card</span>
              </span>

              <Link
                className={cn(
                  buttonVariants({
                    variant: 'outline',
                    size: 'sm',
                  }),
                  'rounded-full text-xs text-secondary h-6'
                )}
                href=""
              >
                View Document
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
