import { Card } from '@/components/ui/card';
import { GuardianServiceCardProps } from '@/types';
import React from 'react';

export default function GuardianServiceCard({
  children,
}: GuardianServiceCardProps) {
  return (
    <Card className="col bg-background text-secondary shadow-none border-secondary border-2 cursor-pointer hover:text-primary hover:border-primary flex items-center justify-center">
      {children}
    </Card>
  );
}
