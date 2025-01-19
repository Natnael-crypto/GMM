'use client';

import ReceiptPdf from '@/components/auth/checkout/receipt-pdf';
import { Button, buttonVariants } from '@/components/ui/button';
import { useGetSubscriptionHistoryQuery } from '@/lib/checkout/api';
import { useAppSelector } from '@/lib/hooks';
import { Link } from '@/lib/navigation';
import { PackageTier, toTierName } from '@/lib/schemas/checkout';
import { cn } from '@/lib/utils';
import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

export default function Billing() {
  const t = useTranslations(
    'Dashboard.updateProfile.marriageDiscussion.optionalVerifiable'
  );

  const [x, sx] = useState(1);

  const user = useAppSelector((state) => state.auth.user);
  const { data: subscriptionHistory, isLoading } =
    useGetSubscriptionHistoryQuery(user?.id ?? '', {
      skip: !user,
    });
  useEffect(() => {
    const yyy = setTimeout(() => {
      sx(Math.random());
    }, 1000);

    return () => {
      clearTimeout(yyy);
    };
  }, []);

  return (
    <div className="rounded-xl bg-background shadow-lg p-5 space-y-7 text-sm">
      <div className="flex justify-between items-end">
        <h1 className="text-xl">Billing Information</h1>
      </div>

      {/* {user && subscriptionHistory && (
        <PDFViewer className="w-full h-[70vh]" key={x}>
          <ReceiptPdf user={user} payment={subscriptionHistory[0]} />
        </PDFViewer>
      )} */}

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
              {subscriptionHistory?.map((history) => (
                <tr key={history.id}>
                  <td className="py-2">
                    {new Date(history.periodStart).toLocaleString('en-US', {
                      year: 'numeric',
                      month: '2-digit',
                      day: '2-digit',
                    })}
                  </td>
                  <td className="py-2">{toTierName(history.planId)}</td>
                  <td className="py-2">
                    <PDFDownloadLink
                      document={<ReceiptPdf user={user!} payment={history} />}
                      className={cn(
                        buttonVariants({
                          variant: 'outline',
                        }),
                        'text-xs text-secondary h-6'
                      )}
                    >
                      Download
                    </PDFDownloadLink>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* <div className="space-y-2">
          <h2 className="font-bold">Payment Method</h2>

          <div className="flex flex-col md:flex-row justify-between md:items-center gap-2">
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

            <div className="flex flex-col md:flex-row gap-2">
              <Button variant="outline" className="text-secondary h-6 text-xs">
                Add New Payment Method
              </Button>
              <Button variant="outline" className="text-secondary h-6 text-xs">
                Remove
              </Button>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
}
