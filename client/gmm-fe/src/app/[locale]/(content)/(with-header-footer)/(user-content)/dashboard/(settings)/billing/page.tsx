import { Button, buttonVariants } from '@/components/ui/button';
import { Link } from '@/lib/navigation';
import { cn } from '@/lib/utils';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import React from 'react';

export default function Billing() {
  const t = useTranslations(
    'Dashboard.updateProfile.marriageDiscussion.optionalVerifiable'
  );

  return (
    <div className="rounded-xl bg-background shadow-lg p-5 space-y-7 text-sm">
      <div className="flex justify-between items-end">
        <h1 className="text-xl">Billing Information</h1>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <h2 className="font-bold">Subscription History</h2>

          <table className="w-full text-xs">
            <thead className="text-[0.6rem] text-start">
              <tr>
                <th className="text-start font-normal border-b">Date</th>
                <th className="text-start font-normal border-b">
                  Package Tier
                </th>
                <th className="text-start font-normal border-b">Receipt</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              <tr>
                <td className="py-2">January 10, 2024</td>
                <td className="py-2">6 Month Subscription</td>
                <td className="py-2">
                  <Link
                    href=""
                    className={cn(
                      buttonVariants({
                        variant: 'outline',
                      }),
                      'text-xs text-secondary h-6'
                    )}
                  >
                    Download
                  </Link>
                </td>
              </tr>

              <tr className="py-2">
                <td className="py-2">June 10, 2024</td>
                <td className="py-2">6 Month Subscription</td>
                <td className="py-2">
                  <Link
                    href=""
                    className={cn(
                      buttonVariants({
                        variant: 'outline',
                      }),
                      'text-xs text-secondary h-6'
                    )}
                  >
                    Download
                  </Link>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="space-y-2">
          <h2 className="font-bold">Payment Method</h2>

          <div className="flex justify-between items-center">
            <div className="flex gap-2 items-center">
              <div className="border rounded-sm p-1">
                <Image
                  className="w-10 object-cover"
                  width={512}
                  height={512}
                  src={`/icons/payment/visa-inc.logo.svg`}
                  alt="Language Flag"
                />
              </div>

              <span className="text-xs">Visa ending in 1234</span>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" className="text-secondary h-6 text-xs">
                Add New Payment Method
              </Button>
              <Button variant="outline" className="text-secondary h-6 text-xs">
                Remove
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
