'use client';

import { useUpdateProfileContext } from '@/components/dashboard/profile/update-profile-context';
import BasicInformationForm from '@/components/registration/basic-information-form';
import RegistrationSkeleton from '@/components/registration/registration-skeleton';

import { Button, buttonVariants } from '@/components/ui/button';
import Loading from '@/components/ui/loading';
import { useGetCurrentSubscriptionQuery } from '@/lib/checkout/api';
import { useAppSelector } from '@/lib/hooks';
import { useRouter } from '@/lib/navigation';
import { useGetFamilyIntroductionQuery } from '@/lib/user/api';
import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect } from 'react';

export default function Registration() {
  const { onSave, isSaving } = useUpdateProfileContext();
  const user = useAppSelector((state) => state.auth.user);
  const { data: familyIntroduction, isLoading: isFamilyIntroductionLoading } =
    useGetFamilyIntroductionQuery(user?.id ?? '', { skip: !user });
  const {
    data: currentSubscription,
    isLoading,
    isError,
  } = useGetCurrentSubscriptionQuery(user?.id ?? '', {
    skip: !user,
  });

  const router = useRouter();

  useEffect(() => {
    if (isError && !currentSubscription) {
      router.replace('/checkout');
    }
  }, [currentSubscription, isError, router]);

  return (
    <AnimatePresence mode="sync">
      {!currentSubscription || !user || isLoading ? (
        <RegistrationSkeleton />
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-5"
        >
          <h1 className="text-2xl font-medium text-center">
            Account Registration
          </h1>

          <div className="space-y-10">
            <BasicInformationForm familyIntroduction={familyIntroduction} />
            <div className="flex justify-end">
              <Button
                onClick={onSave}
                className={cn(
                  buttonVariants({
                    variant: 'default',
                    size: 'sm',
                  }),
                  'bg-primary rounded-full text-md text-primary-foreground h-6 cta'
                )}
                disabled={isSaving}
              >
                {isSaving ? <Loading /> : 'Submit'}
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
