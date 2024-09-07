import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@radix-ui/react-label';
import { useTranslations } from 'next-intl';
import React from 'react';

export default function FamilyIntroduction() {
  const t = useTranslations('Dashboard.updateProfile.familyIntroduction');

  return (
    <div>
      <div className="pb-8 px-6 sm:px-16 md:px-24 lg:px-52">
        <div className="grid grid-cols-12 gap-x-3 gap-y-3 py-4">
          <div className="space-y-1 col-span-4">
            <Label className="font-normal text-xs line-clamp-1">
              {t('guardianInformation.fullName')}
            </Label>
            <Input
              className="text-muted-foreground bg-background text-xs shadow rounded-sm"
              placeholder="Some name"
            />
          </div>

          <div className="space-y-1 col-span-4">
            <Label className="font-normal text-xs line-clamp-1">
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

          <div className="space-y-1 col-span-4">
            <Label className="font-normal text-xs line-clamp-1">
              Guardian&apos;s Full Name
            </Label>
            <Input
              className="text-muted-foreground bg-background text-xs shadow rounded-sm"
              placeholder="1234567890"
            />
          </div>

          <div className="space-y-1 col-span-6">
            <Label className="font-normal text-xs line-clamp-1">Guardian&apos;s Email</Label>
            <Input
              type="file"
              className="text-muted-foreground bg-background text-xs shadow rounded-sm"
              placeholder="email@email.com"
            />
          </div>

          <div className="space-y-1 col-span-6">
            <Label className="font-normal text-xs line-clamp-1">
              {t('idVerification.id')}
            </Label>
            <Input
              className="text-muted-foreground bg-background text-xs shadow rounded-sm"
              type="file"
            />
          </div>

          <h1 className="text-xl font-bold text-secondary border-b p-1 col-span-12">
            {t('idVerification.title')}
          </h1>

          <div className="space-y-1 col-span-6">
            <Label className="font-normal text-xs line-clamp-1">
              {t('idVerification.phoneNumber')}
            </Label>
            <Input
              className="text-muted-foreground bg-background text-xs shadow rounded-sm"
              placeholder="1234567890"
            />
          </div>

          <div className="space-y-1 col-span-6">
            <Label className="font-normal text-xs line-clamp-1">
              {t('idVerification.id')}
            </Label>
            <Input
              className="text-muted-foreground bg-background text-xs shadow rounded-sm"
              type="file"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
