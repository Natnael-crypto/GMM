'use client'

import { useUpdateProfileContext } from '@/components/dashboard/profile/update-profile-context';
import BasicInformationForm from '@/components/registration/basic-information-form';
import FamilyIntroductionForm from '@/components/registration/family-form';
import PhotoUploader from '@/components/registration/photo-uploader';
import VideoUploader from '@/components/registration/video-uploader';
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
      <div className="grid grid-cols-3 gap-x-3">
        <div className="col-span-1 space-y-5">
          <PhotoUploader />
          <VideoUploader />
        </div>
        <div className="col-span-2 space-y-10">
          <BasicInformationForm />
          <div className='w-full'>
            <FamilyIntroductionForm />
          </div>
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
    </div>
  );
}
