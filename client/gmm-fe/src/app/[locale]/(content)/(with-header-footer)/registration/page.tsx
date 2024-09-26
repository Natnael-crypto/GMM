'use client'

import { useUpdateProfileContext } from '@/components/dashboard/profile/update-profile-context';
import BasicInformationForm from '@/components/registration/basic-information-form';

import { Button, buttonVariants } from '@/components/ui/button';
import Loading from '@/components/ui/loading';
import { cn } from '@/lib/utils';


export default function Registration() {
  const { onSave, isSaving } = useUpdateProfileContext();

  // const user = useAppSelector((state) => state.auth.user);
  // const router = useRouter()

  // useEffect(() => {
  //   if (user && user.age) {
  //     router.push('/dashboard');
  //   }
  // }, [user, router])

  return (
    <div className="space-y-5">
      <h1 className="text-2xl font-medium text-center">Account Registration</h1>

      <div className="space-y-10">
        <BasicInformationForm />
        <div className="flex justify-end">
          <Button
            onClick={onSave}
            className={cn(
              buttonVariants({
                variant: 'default',
                size: 'sm',
              }),
              'bg-primary rounded-full text-xs text-primary-foreground h-6'
            )}
            disabled={isSaving}
          >
            {isSaving ? <Loading /> : "Submit"}
          </Button>
        </div>
      </div>
    </div>
  );
}
