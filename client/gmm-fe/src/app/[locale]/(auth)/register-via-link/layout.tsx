import Sidebar from '@/components/dashboard/components/sidebar';
import Footer from '@/components/ui/footer';
import Header from '@/components/ui/header';

import React from 'react';

export default function GuardianRegistrationLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <Header />
            <div className="bg-gray-100">
                <div className="px-6 sm:px-16 md:px-[3rem] lg:px-[5rem] 2xl:px-[15rem] 3xl:px-[20rem] py-6 space-y-8">
                    <div className="grid grid-cols-4 gap-5">
                        {/* <Sidebar /> */}
                        <div className="col-span-3">{children}</div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}
