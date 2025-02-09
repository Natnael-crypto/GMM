import { buttonVariants } from '@/components/ui/button';
import { useAppSelector } from '@/lib/hooks';
import { Link } from '@/lib/navigation';
import { AccountStatus } from '@/lib/schemas/user';
import { cn } from '@/lib/utils';
import { useGetLivenessVerificationStatusQuery } from '@/lib/verification/api';
import { VerificationStatus } from '@/lib/verification/types';
import {
  faCircleCheck,
  faCircleXmark,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

export default function PendingApprovalMessage() {
  const user = useAppSelector((state) => state.auth.user);
  const { data: verificationStatus } = useGetLivenessVerificationStatusQuery(
    undefined,
    {
      skip: !user,
    }
  );

  return (
    <div
      className={cn(
        'flex flex-col justify-center items-center gap-5',
        user?.accountStatus === AccountStatus.DENIED
          ? 'text-destructive'
          : 'text-primary '
      )}
    >
      <FontAwesomeIcon
        icon={
          user?.accountStatus === AccountStatus.DENIED
            ? faCircleXmark
            : faCircleCheck
        }
        className="text-6xl"
      />
      <span className="text-xl font-bold text-center">
        {user?.accountStatus === AccountStatus.DENIED
          ? 'Your application has been denied'
          : 'Your application has been submitted for review'}
      </span>

      <div className="text-md font-bold text-center text-secondary flex flex-col gap-4 px-3">
        {user?.accountStatus === AccountStatus.DENIED ? (
          <>
            <p className="px-8">
              Please review your application and resubmit it for approval.
            </p>
            <p className="flex justify-center">
              <Link
                href="/registration"
                className={cn(buttonVariants({ variant: 'outline' }), 'w-fit')}
              >
                Registration
              </Link>
            </p>
          </>
        ) : (
          <>
            <p>
              An email receipt including the details about your order has been
              sent to the email address provided.
            </p>
            <p>Please keep it for your records.</p>
          </>
        )}

        {verificationStatus !== VerificationStatus.APPROVED && (
          <div className="my-8 py-8 border-t">
            <p className="flex flex-col items-center gap-2">
              <Link
                href="/face-liveness"
                className={buttonVariants({ variant: 'outline' })}
              >
                Selfie Verification
              </Link>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
