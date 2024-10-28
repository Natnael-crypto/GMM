'use client';

import UpdateProfileStepper from '@/components/dashboard/components/stepper/update-profile-stepper';
import Banner from '@/components/dashboard/profile/banner';
import { UpdateProfileProvider } from '@/components/dashboard/profile/update-profile-context';
import UpdateProfileFooter from '@/components/dashboard/profile/update-profile-footer';
import UpdateProfileHeader from '@/components/dashboard/profile/update-profile-header';
import Footer from '@/components/ui/footer';
import { usePathname } from '@/lib/navigation';
import { useParams } from 'next/navigation';

export default function UpdateProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const params = useParams<{ userId: string }>();

  const basicInfoPath = `/dashboard/profile/${params.userId}/basic-information`;
  const worldlyLifestylePath = `/dashboard/profile/${params.userId}/worldly-lifestyle`;
  const islamicLifestylePath = `/dashboard/profile/${params.userId}/islamic-lifestyle`;
  const marriagePath = `/dashboard/profile/${params.userId}/marriage`;
  const familyPath = `/dashboard/profile/${params.userId}/family`;

  const pageNames: Record<string, string> = {
    [basicInfoPath]: 'Basic Information',
    [worldlyLifestylePath]: 'Worldly Lifestyle',
    [islamicLifestylePath]: 'Islamic Lifestyle',
    [marriagePath]: 'Marriage Discussion',
    [familyPath]: 'Family Introduction',
  };

  return (
    <UpdateProfileProvider>
      <div className="relative h-screen overflow-auto no-scrollbar">
        <div className="pt-6 px-6 sm:px-16 md:px-24 lg:px-52 space-y-8 mb-4">
          <UpdateProfileHeader editLink={pathname.slice(0, -5)} />
          <div className="flex items-center justify-center">
            <h1 className="text-2xl">Update Profile</h1>
          </div>
        </div>

        <div className="sticky top-0 backdrop-blur-md pb-10 pt-3 z-50">
          <UpdateProfileStepper />
        </div>

        <div className="px-6 sm:px-16 md:px-24 lg:px-52 mt-3">
          <Banner />
        </div>
        <div>{children}</div>

        <div className="py-6 px-6 sm:px-16 md:px-24 lg:px-52 space-y-8 mb-4">
          <UpdateProfileFooter editLink={pathname.slice(0, -5)} />
        </div>
        <Footer />
      </div>
    </UpdateProfileProvider>
  );
}
