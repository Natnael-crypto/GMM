'use client';

import ReceiptPdf from '@/components/auth/checkout/receipt-pdf';
import { buttonVariants } from '@/components/ui/button';
import { useGetSubscriptionHistoryQuery } from '@/lib/checkout/api';
import { useAppSelector } from '@/lib/hooks';
import { toTierName } from '@/lib/schemas/checkout';
import { cn } from '@/lib/utils';
import { PDFDownloadLink } from '@react-pdf/renderer';

import { useTranslations } from 'next-intl';
import React from 'react';

export default function Billing() {
  const t = useTranslations(
    'Dashboard.updateProfile.marriageDiscussion.optionalVerifiable'
  );

  const user = useAppSelector((state) => state.auth.user);
  const { data: subscriptionHistory, isLoading } =
    useGetSubscriptionHistoryQuery(user?.id ?? '', {
      skip: !user,
    });

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
                      fileName={`GMM-Invoice-${new Date(history.periodStart)
                        .toLocaleString('en-GB', {
                          year: 'numeric',
                          month: '2-digit',
                          day: '2-digit',
                        })
                        .replaceAll('/', '-')}.pdf`}
                      document={<ReceiptPdf user={user!} payment={history} />}
                      className={cn(
                        buttonVariants({
                          variant: 'outline',
                        }),
                        'text-xs text-secondary h-6 cursor-pointer'
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
      </div>
    </div>
  );
}
