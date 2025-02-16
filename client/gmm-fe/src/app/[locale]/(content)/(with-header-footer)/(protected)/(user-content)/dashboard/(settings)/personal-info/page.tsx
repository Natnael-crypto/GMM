'use client';

import { resendOtp, sendOtp } from '@/actions/auth/otp';
import { Button, buttonVariants } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { useAppSelector , useAppDispatch } from '@/lib/hooks';
import { Link , useRouter} from '@/lib/navigation';
import { PhoneVerificationStatus } from '@/lib/schemas/user';
import { cn } from '@/lib/utils';
import { useTranslations } from 'next-intl';
import { setUser } from '@/lib/auth/slice';


import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { useUpdateUserMutation } from '@/lib/user/api';
import { useState } from 'react';

export default function PersonalInfo() {
  const t = useTranslations(
    'Dashboard.updateProfile.marriageDiscussion.optionalVerifiable'
  );

  const user = useAppSelector((state) => state.auth.user);
  const router = useRouter();

    const [showDialog, setShowDialog] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [phoneError, setPhoneError] = useState('');
    const [updateUser] = useUpdateUserMutation();
    const dispatch = useAppDispatch();
  
  
  
    async function handleSendOtp() {
      try {
        const res = await sendOtp('phone', user?.phoneNumber);
  
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
  
  
    async function handleUpdatePhoneNumber() {
      if (!isValidPhoneNumber(phoneNumber)) {
        setPhoneError('Please enter a valid phone number');
        return;
      }
      
      
      try {
        setShowDialog(false);
        var data: any = {... user}
        data.phoneNumber = phoneNumber

        const res = await updateUser({ user: data });


        if (res.data) {
        dispatch(setUser({ ...user, ...res.data }));  
          toast({
            title: 'Phone Number Updated',
            description: `Your phone number has been updated.`,
          });
          
          handleSendOtp();
        } else {
          toast({
            title: 'Update Failed',
            description: 'An error occurred. Please try again later.',
          });
        }
      } catch (e) {
        console.log(e);
        toast({
          title: 'Update Failed',
          description: 'An error occurred. Please try again later.',
        });
      }
    }


    function handleVerifyPhoneNumber() {
      if (user?.phoneNumber) {
        handleSendOtp();
      } else {
        setShowDialog(true);
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

          {/* <Button variant="outline" className="text-secondary h-7 text-xs">
            Re-Send Verification
          </Button> */}
        </div>
        
        <div className="flex justify-between items-center py-2 pt-3">
          <div className="flex flex-col gap-1">
            <span className="font-bold">Phone Number</span>
            <span className="flex gap-3 items-center">
              {user?.phoneNumber}{' '}
              {user?.phoneVerificationStatus === PhoneVerificationStatus.VERIFIED && <span className="text-primary gap-1 flex items-center justify-center">
                <span>(Verified)</span>
              </span>}
              
            {user?.phoneVerificationStatus === PhoneVerificationStatus.UNVERIFIED &&  <span className="text-destructive gap-1 flex items-center justify-center">
                <span>(Not Verified!)</span>
              </span>
            }
            </span>
          </div>

          {user?.phoneVerificationStatus === PhoneVerificationStatus.UNVERIFIED &&
            <Button className="bg-primary text-primary-foreground h-7 text-xs"
              onClick={handleVerifyPhoneNumber}
            >
              Click Here to Verify Your Phone Number
            </Button>
          }
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

        <div className="h-24"></div>
      </div>
      {showDialog && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-lg font-bold mb-4">Enter Phone Number</h2>
            <input
              type="text"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="border p-2 mb-4 w-full"
              placeholder="Ex: +1234567890"
            />
            {phoneError && <p className="text-red-500 text-sm">{phoneError}</p>}
            <div className="flex justify-end gap-2">
              <Button className="bg-primary text-primary-foreground h-7 text-xs" onClick={handleUpdatePhoneNumber}>
                Submit
              </Button>
              <Button className="bg-secondary text-secondary-foreground h-7 text-xs" onClick={() => setShowDialog(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
