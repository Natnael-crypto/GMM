'use client';

import UpdateProfileStepper from '@/components/dashboard/components/stepper/update-profile-stepper';
import Banner from '@/components/dashboard/profile/banner';
import { UpdateProfileProvider } from '@/components/dashboard/profile/update-profile-context';
import UpdateProfileHeader from '@/components/dashboard/profile/update-profile-header';
import { usePathname } from '@/lib/navigation';

const pageNames: Record<string, string> = {
  '/dashboard/profile/basic-information': 'Basic Information',
  '/dashboard/profile/worldly-lifestyle': 'Worldly Lifestyle',
  '/dashboard/profile/islamic-lifestyle': 'Islamic Lifestyle',
  '/dashboard/profile/marriage': 'Marriage Discussion',
  '/dashboard/profile/family': 'Family Introduction',
};

export default function UpdateProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <UpdateProfileProvider>
      <>
        <div className="pb-6 relative h-screen overflow-auto no-scrollbar">
          <div className="pt-6 px-6 sm:px-16 md:px-24 lg:px-52 space-y-8 mb-4">
            <UpdateProfileHeader
              editLink={pathname.slice(0, -5)}
              pageName={pageNames[pathname]}
            />
            <div className="flex items-center justify-center">
              <h1 className="text-2xl">Update Profile</h1>
            </div>
          </div>

          <div className='sticky top-0 backdrop-blur-md pb-10 pt-3 z-50'>
            <UpdateProfileStepper />
          </div>

          <div className="px-6 sm:px-16 md:px-24 lg:px-52 mt-3">
            <Banner />
          </div>
          <div>{children}</div>
        </div>
      </>
    </UpdateProfileProvider>
  );
}
