'use client';

import { resendOtp, sendOtp } from '@/actions/auth/otp';
import { Button, buttonVariants } from '@/components/ui/button';
import { useAppSelector } from '@/lib/hooks';
import { Link } from '@/lib/navigation';
import { cn } from '@/lib/utils';
import { useRouter } from '@/lib/navigation';
import { toast } from '../ui/use-toast';


export default function GuardianProfile() {
  const user = useAppSelector((state) => state.auth.user);
  const router = useRouter();
  
  async function handleSendOtp() {
    try {
      const res = await sendOtp('phone' , user?.phoneNumber);

      if (res.status === 200) {
        toast({
          title: 'OTP Sent',
          description: `We have Sent the OTP to your phone.`,
        });
        router.replace('/otp');
      } else {
        toast({
          title: 'OTP Sent',
          description: 'An error occurred. Please try again later.',
        });
      }
    } catch (e) {
      console.log(e);
      toast({
        title: 'OTP Sent',
        description: 'An error occurred. Please try again later.',
      });
    }
  }

  return (
    <div className="rounded-xl bg-background shadow-lg p-5 space-y-4 text-sm">
      <div className="flex justify-between items-end">
        <h1 className="text-xl">Profile Information</h1>
      </div>

      <div className="divide-y space-y-2">
        <div className="flex justify-between items-center py-2 pt-3">
          <div className="flex flex-col gap-1">
            <span className="font-bold">First Name</span>
            <span>{user?.firstName}</span>
          </div>
        </div>

        <div className="flex justify-between items-center py-2 pt-3">
          <div className="flex flex-col gap-1">
            <span className="font-bold">Last Name</span>
            <span>{user?.lastName}</span>
          </div>
        </div>

        <div className="flex justify-between items-center py-2 pt-3">
          <div className="flex flex-col gap-1">
            <span className="font-bold">Email Address</span>
            <span className="flex gap-3 items-center">
              {user?.email}{' '}
              <span className="text-primary gap-1 flex items-center justify-center">
                <span>(Verified)</span>
              </span>
            </span>
          </div>
        </div>

        <div className="flex justify-between items-center py-2 pt-3">
          <div className="flex flex-col gap-1">
            <span className="font-bold">Phone Number</span>
            <span className="flex gap-3 items-center">
              {user?.phoneNumber}{' '}
              {/* <span className="text-primary gap-1 flex items-center justify-center">
                <span>(Verified)</span>
              </span> */}
              <span className="text-destructive gap-1 flex items-center justify-center">
                <span>(Not Verified!)</span>
              </span>
            </span>
          </div>

          <Button className="bg-primary text-primary-foreground h-7 text-xs"
          onClick={handleSendOtp}
          >
            Click Here to Verify Your Phone Number
          </Button>
        </div>

        <div className="flex justify-between items-center py-2 pt-3">
          <div className="flex flex-col gap-1">
            <span className="font-bold">Relationship to User</span>
            <span className="flex gap-3 items-center">Father</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between md:items-center py-2 pt-3">
          <div className="flex flex-col gap-1">
            <span className="font-bold">
              Password{' '}
              <span className="text-[0.6rem] font-normal">
                (Last updated May 20, 2024)
              </span>
            </span>
            <span>**********</span>
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <Link
              href="/auth/forgot-password"
              className={cn(
                buttonVariants({ variant: 'outline' }),
                'text-secondary h-7 text-xs'
              )}
            >
              Change Password
            </Link>
          </div>
        </div>

        <div className="flex justify-between items-center py-2 pt-3">
          <div className="flex flex-col gap-1">
            <span className="font-bold">Government Issued ID</span>
            <span className="flex gap-3 items-center">
              {/* <span className="text-primary gap-1 flex items-center justify-center">
                <span>(Verified)</span>
              </span> */}
              <span className="text-destructive gap-1 flex items-center justify-center">
                <span>Not Verified!</span>
              </span>
            </span>
          </div>

          <Button className="bg-primary text-primary-foreground h-7 text-xs">
            Please Upload
          </Button>
        </div>

        <div className="h-24"></div>
      </div>
    </div>
  );
}
