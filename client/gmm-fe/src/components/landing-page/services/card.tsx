import { Card } from '@/components/ui/card';
import { GuardianServiceCardProps } from '@/types';
import React from 'react';

export default function GuardianServiceCard({
  children,
}: GuardianServiceCardProps) {
  return (
    <Card
      className="col text-sm font-bold      
    bg-background text-secondary hover:text-primary hover:border-primary     
    shadow-none border-secondary border-2 cursor-pointer flex items-center justify-center"
    >
      {children}
    </Card>
  );
}
