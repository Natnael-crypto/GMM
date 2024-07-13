import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useTranslations } from 'next-intl';

import React from 'react';

export default function FamilyForm() {
  const t = useTranslations('Dashboard.updateProfile.familyIntroduction');

  return (
    <div className="grid grid-cols-2 gap-x-5 gap-y-4">
      <div className="col-span-2 flex justify-between items-center border-b border-b-secondary pb-1">
        <h1 className="text-primary text-lg font-bold">
          Family/Guardian Introduction
        </h1>
        <span className="text-destructive font-bold text-xs">
          Please Answer All Questions Accurately
        </span>
      </div>

      <div className="space-y-1 col-span-1">
        <Label className="font-normal text-xs">
          {t('guardianInformation.fullName')}
        </Label>
        <Input
          className="text-muted-foreground bg-background text-xs shadow rounded-sm"
          placeholder="Some name"
        />
      </div>

      <div className="space-y-1 col-span-1">
        <Label className="font-normal text-xs">
          {t('guardianInformation.relationship')}
        </Label>
        <Select>
          <SelectTrigger className="shadow text-muted-foreground bg-background text-xs rounded-sm h-8 ring-transparent ring-offset-transparent">
            <SelectValue placeholder="Revert Care (Appoint for me a guardian..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="web-and-graphic-designer">
              Revert Care (Appoint for me a guardian)
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-1 col-span-1">
        <Label className="font-normal text-xs">Guardian&apos;s Full Name</Label>
        <Input
          className="text-muted-foreground bg-background text-xs shadow rounded-sm"
          placeholder="1234567890"
        />
      </div>

      <div className="space-y-1 col-span-1">
        <Label className="font-normal text-xs">Guardian&apos;s Email</Label>
        <Input
          type="file"
          className="text-muted-foreground bg-background text-xs shadow rounded-sm"
          placeholder="email@email.com"
        />
      </div>

      <div className="space-y-1 col-span-2">
        <Label className="font-normal text-xs">{t('idVerification.id')}</Label>
        <Input
          className="text-muted-foreground bg-background text-xs shadow rounded-sm"
          type="file"
        />
      </div>

      <h1 className="text-xl font-bold text-secondary border-b p-1 col-span-2">
        {t('idVerification.title')}
      </h1>

      <div className="space-y-1 col-span-2">
        <Label className="font-normal text-xs">
          {t('idVerification.phoneNumber')}
        </Label>
        <Input
          className="text-muted-foreground bg-background text-xs shadow rounded-sm"
          placeholder="1234567890"
        />
      </div>

      <div className="space-y-1 col-span-2">
        <Label className="font-normal text-xs">{t('idVerification.id')}</Label>
        <Input
          className="text-muted-foreground bg-background text-xs shadow rounded-sm"
          type="file"
        />
      </div>
    </div>
  );
}
