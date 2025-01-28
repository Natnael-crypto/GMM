'use client';

import Image from 'next/image';
import React from 'react';
import { Card } from '@/components/ui/card';
import { useAppSelector } from '@/lib/hooks';
import {
  useAcceptRequestMutation,
  useGetReceivedRequestsQuery,
} from '@/lib/guardian/api';
import Loading from '@/components/ui/loading';
import { Button } from '@/components/ui/button';

export default function GuardianRequests() {
  const user = useAppSelector((state) => state.auth.user);
  const { data: receivedRequests, isLoading } = useGetReceivedRequestsQuery(
    undefined,
    { skip: !user }
  );
  const [acceptRequest] = useAcceptRequestMutation();

  const handleAcceptRequest = async (id: number) => {
    try {
      await acceptRequest(id).unwrap();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="logo-wrapper mb-10">
        <Image
          className="w-full overflow-hidden logo"
          src="/assets/guardian-logo-color.png"
          width={640}
          height={75}
          alt="Guardian logo"
        />
      </div>

      <h1 className="font-bold pb-5">Guardian requests</h1>

      <Card className="w-full sm:min-w-96 sm:w-1/4 bg-background p-8 py-6">
        {isLoading && <Loading />}
        {receivedRequests &&
          receivedRequests.map((request) => (
            <div
              key={request.id}
              className="flex justify-between items-center py-2 pt-3"
            >
              <div className="flex flex-col gap-1">
                <span className="font-semibold">
                  {request.user.firstName} {request.user.lastName}
                </span>
                <span className="text-xs text-muted-foreground">
                  {request.user.email}
                </span>
              </div>
              <span className="text-xs text-muted-foreground">
                {request.status}
              </span>
              {request.status === 'pending' && (
                <Button
                  onClick={() => handleAcceptRequest(request.id)}
                  className="text-xs"
                >
                  Accept
                </Button>
              )}
            </div>
          ))}
      </Card>
    </div>
  );
}
