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

  const basicInfoPath = `/dashboard/profile/${params.userId}/basic-information/edit`;
  const worldlyLifestylePath = `/dashboard/profile/${params.userId}/worldly-lifestyle/edit`;
  const islamicLifestylePath = `/dashboard/profile/${params.userId}/islamic-lifestyle/edit`;
  const marriagePath = `/dashboard/profile/${params.userId}/marriage/edit`;
  const familyPath = `/dashboard/profile/${params.userId}/family/edit`;

  const nextPage: Record<string, string> = {
    [basicInfoPath]: worldlyLifestylePath,
    [worldlyLifestylePath]: islamicLifestylePath,
    [islamicLifestylePath]: marriagePath,
    [marriagePath]: familyPath,
  };

  return (
    <UpdateProfileProvider>
      <div className="relative h-screen overflow-auto no-scrollbar">
        <div className="pt-6 px-6 sm:px-16 md:px-[3rem] lg:px-[5rem] 2xl:px-[15rem] 3xl:px-[20rem] space-y-8 mb-4">
          <UpdateProfileHeader viewProfileLink={pathname.slice(0, -5)} />
          <div className="flex items-center justify-center">
            <h1 className="text-2xl">Update Profile</h1>
          </div>
        </div>

        <div className="sticky top-0 backdrop-blur-md pb-10 pt-3 z-50">
          <UpdateProfileStepper />
        </div>

        <div className="px-6 sm:px-16 md:px-[3rem] lg:px-[5rem] 2xl:px-[15rem] 3xl:px-[20rem] mt-3">
          <Banner />
        </div>
        <div>{children}</div>

        <div className="py-6 px-6 sm:px-16 md:px-[3rem] lg:px-[5rem] 2xl:px-[15rem] 3xl:px-[20rem] space-y-8 mb-4">
          <UpdateProfileFooter
            viewProfileLink={pathname.slice(0, -5)}
            nextLink={nextPage[pathname]}
          />
        </div>
        <Footer />
      </div>
    </UpdateProfileProvider>
  );
}
