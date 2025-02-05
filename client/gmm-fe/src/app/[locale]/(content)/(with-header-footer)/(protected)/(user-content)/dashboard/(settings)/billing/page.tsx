'use client';

import ReceiptPdf from '@/components/auth/checkout/receipt-pdf';
import { buttonVariants } from '@/components/ui/button';
import Loading from '@/components/ui/loading';
import {
  useGetCurrentSubscriptionQuery,
  useGetSubscriptionHistoryQuery,
  useSetAutoRenewalMutation,
} from '@/lib/checkout/api';
import { useAppSelector } from '@/lib/hooks';
import { toTierName } from '@/lib/schemas/checkout';
import { cn } from '@/lib/utils';
import { PDFDownloadLink } from '@react-pdf/renderer';
import React, { useEffect, useState } from 'react';

export default function Billing() {
  const user = useAppSelector((state) => state.auth.user);
  const { data: subscriptionHistory, isLoading } =
    useGetSubscriptionHistoryQuery(user?.id ?? '', {
      skip: !user,
    });

  const { data: subscription, isLoading: isSubscriptionLoading } =
    useGetCurrentSubscriptionQuery(user?.id ?? '', { skip: !user });

  const [setAutoRenewal, result] = useSetAutoRenewalMutation();
  const [autoRenew, setAutoRenew] = useState(subscription?.autoRenew);

  useEffect(() => {
    if (subscription) {
      setAutoRenew(subscription.autoRenew);
    }
  }, [subscription]);

  const handleAutoRenewal = async () => {
    if (!subscription || !user || result?.isLoading) return;

    try {
      setAutoRenew((prev) => !prev);
      await setAutoRenewal({
        autoRenew: !autoRenew,
        userId: user!.id,
      }).unwrap();
    } catch (error) {
      console.log(error);
      setAutoRenew(subscription?.autoRenew);
    }
  };

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

      <div className="mt-5 py-5 border-t">
        <div className="flex justify-between items-center">
          <span className="font-medium">
            Subscription Auto Renewal{' '}
            <span
              className={cn(
                'text-xs',
                autoRenew ? 'text-primary' : 'text-muted-foreground'
              )}
            >
              {isSubscriptionLoading || !subscription
                ? ''
                : autoRenew
                ? '(Enabled)'
                : '(Disabled)'}
            </span>
          </span>

          {isSubscriptionLoading || !subscription ? (
            <div className="scale-50">
              <Loading />
            </div>
          ) : (
            <div
              className={cn(
                'w-10 rounded-full p-[0.2rem] bg-[#f0f0f0] flex items-center transition-all duration-300 cursor-pointer',
                autoRenew ? 'justify-end bg-primary' : 'justify-start'
              )}
              onClick={handleAutoRenewal}
            >
              <div className="rounded-full bg-white shadow-lg w-4 aspect-square"></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
