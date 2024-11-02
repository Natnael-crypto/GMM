import { Card } from '@/components/ui/card';
import React from 'react';
import { OtpForm } from './otp-form';

export default function OtpCard({
  userIdentifier,
}: {
  userIdentifier: string;
}) {
  return (
    <div className="flex flex-col items-center justify-self-center">
      <Card className="w-full sm:min-w-96 sm:w-1/4 bg-background p-8 py-6">
        <OtpForm userIdentifier={userIdentifier} />
      </Card>

      <div className="w-full sm:min-w-96 sm:w-1/4 bg-background text-wrap flex flex-col items-center gap-3 mt-6">
        
        <p className="text-xs font-semibold text-center text-muted-foreground">
          Copyright &copy; 2024 Guardian/Wali Project. All Rights Reserved.{' '}
        </p>
      </div>
    </div>
  );
}
