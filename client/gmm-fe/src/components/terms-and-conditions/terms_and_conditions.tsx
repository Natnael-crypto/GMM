// src/components/terms-and-conditions/TermsAndConditions.jsx
import React from 'react';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface TermsAndConditionsProps {
  translations: (key: string) => string;
}

export default function TermsAndConditions({ translations }: TermsAndConditionsProps) {
  return (
    <div className="flex flex-col items-center px-6 md:px-3 lg:px-0 py-6 lg:py-8 mt-4 lg:max-w-[80%] mx-auto">
      <h1 className="text-3xl font-bold text-center mb-6">{translations('title')}</h1>

      <SectionCard title={translations('introduction.title')}>
        <p className="text-muted-foreground">
          {translations('introduction.description')}
        </p>
      </SectionCard>

      <SectionCard title={translations('userResponsibilities.title')}>
        <p className="text-muted-foreground">
          {translations('userResponsibilities.description')}
        </p>
      </SectionCard>

      <SectionCard title={translations('limitations.title')}>
        <p className="text-muted-foreground">
          {translations('limitations.description')}
        </p>
      </SectionCard>

      <SectionCard title={translations('privacy.title')}>
        <p className="text-muted-foreground">
          {translations('privacy.description')}
        </p>
      </SectionCard>

      <SectionCard title={translations('modifications.title')}>
        <p className="text-muted-foreground">
          {translations('modifications.description')}
        </p>
      </SectionCard>
    </div>
  );
}

import { ReactNode } from 'react';

function SectionCard({ title, children }: { title: string; children: ReactNode }) {
  return (
    <Card className={cn('w-full mb-4 p-4 lg:p-6 shadow-none border-none')}>
      <h2 className="text-lg font-bold mb-2">{title}</h2>
      <div>{children}</div>
    </Card>
  );
}
