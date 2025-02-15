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
  // const { data: verificationStatus } = useGetLivenessVerificationStatusQuery(
  //   undefined,
  //   {
  //     skip: !user,
  //   }
  // );

  if (
    user?.accountStatus === AccountStatus.APPROVED
    // &&verificationStatus !== VerificationStatus.APPROVED
  ) {
    return (
      <div
        className={
          'flex flex-col justify-center items-center gap-5 text-primary mt-8'
        }
      >
        <FontAwesomeIcon icon={faCircleCheck} className="text-6xl" />
        <span className="text-xl font-bold text-center">
          Your application has been approved!
        </span>

        <div className="text-md font-bold text-center text-secondary flex flex-col gap-4 px-3">
          <p className="px-8">
            Please complete liveness check to access your account.
          </p>

          <div className="hidden my-6 py-8 border-t">
            <p className="flex flex-col items-center gap-2">
              <Link
                href="/face-liveness"
                className={buttonVariants({ variant: 'outline' })}
              >
                Selfie Verification
              </Link>
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        'flex flex-col justify-center items-center gap-5',
        user?.accountStatus === AccountStatus.DENIED ||
          user?.accountStatus === AccountStatus.SUSPENDED
          ? 'text-destructive'
          : 'text-primary '
      )}
    >
      <FontAwesomeIcon
        icon={
          user?.accountStatus === AccountStatus.DENIED ||
          user?.accountStatus === AccountStatus.SUSPENDED
            ? faCircleXmark
            : faCircleCheck
        }
        className="text-6xl"
      />
      <span className="text-xl font-bold text-center">
        {user?.accountStatus === AccountStatus.DENIED
          ? 'Your application has been denied'
          : user?.accountStatus === AccountStatus.SUSPENDED
          ? 'Your account has been suspended'
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
        ) : user?.accountStatus === AccountStatus.SUSPENDED ? (
          <>
            <p>
              We have suspended your account. Please contact support for more
              information.
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

        {/* {verificationStatus !== VerificationStatus.APPROVED && (
          <div className="hidden my-8 py-8 border-t">
            <p className="flex flex-col items-center gap-2">
              <Link
                href="/face-liveness"
                className={buttonVariants({ variant: 'outline' })}
              >
                Selfie Verification
              </Link>
            </p>
          </div>
        )} */}
      </div>
    </div>
  );
}
