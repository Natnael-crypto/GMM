import Unverified from '@/components/dashboard/profile/marriage/components/unverified';
import Verified from '@/components/dashboard/profile/marriage/components/verfied';
import { buttonVariants } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import React from 'react';

export default function MarriageDiscussion() {
  const t = useTranslations('Dashboard.updateProfile.marriageDiscussion');
  return (
    <div>
      <div className="pb-8 px-6 sm:px-16 md:px-24 lg:px-52">
        <div className="grid grid-cols-12 gap-x-3 gap-y-3 py-5">
          <div className="space-y-1 col-span-4">
            <Label className="font-normal text-xs">Marriage Type</Label>
            <Select>
              <SelectTrigger className="shadow text-muted-foreground bg-background text-xs rounded-sm h-8 ring-transparent ring-offset-transparent">
                <SelectValue placeholder="Intimate Gathering ..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="complete">Intimate Gathering</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1 col-span-4">
            <Label className="font-normal text-xs">Marriage Location</Label>
            <Select>
              <SelectTrigger className="shadow text-muted-foreground bg-background text-xs rounded-sm h-8 ring-transparent ring-offset-transparent">
                <SelectValue placeholder="Enhanced Devotion (Embracing...)" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="web-and-graphic-designer">
                  Enhanced Devotion (Embracing...
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1 col-span-4">
            <Label className="font-normal text-xs">Marriage Venue</Label>
            <Select>
              <SelectTrigger className="shadow text-muted-foreground bg-background text-xs rounded-sm h-8 ring-transparent ring-offset-transparent">
                <SelectValue placeholder="Ramadan + Sunnah (Fasts in Ramadan)" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="apartment-rent">
                  Ramadan + Sunnah (Fasts in Ramadan)
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1 col-span-4">
            <Label className="font-normal text-xs">Marriage Timeline</Label>
            <Select>
              <SelectTrigger className="shadow text-muted-foreground bg-background text-xs rounded-sm h-8 ring-transparent ring-offset-transparent">
                <SelectValue placeholder="Eligibility Based" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="apartment-rent">
                  Eligibility Based
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1 col-span-4">
            <Label className="font-normal text-xs">
              Family in Marriage Discussion
            </Label>
            <Select>
              <SelectTrigger className="shadow text-muted-foreground bg-background text-xs rounded-sm h-8 ring-transparent ring-offset-transparent">
                <SelectValue placeholder="Indifferent" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="indifferent">Indifferent</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1 col-span-4">
            <Label className="font-normal text-xs">
              Dowry/Mahr Expectation
            </Label>
            <Select>
              <SelectTrigger className="shadow text-muted-foreground bg-background text-xs rounded-sm h-8 ring-transparent ring-offset-transparent">
                <SelectValue placeholder="Combining Deen and Culture" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="honda">
                  Combining Deen and Culture
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1 col-span-4">
            <Label className="font-normal text-xs">Wedding Budget</Label>
            <Select>
              <SelectTrigger className="shadow text-muted-foreground bg-background text-xs rounded-sm h-8 ring-transparent ring-offset-transparent">
                <SelectValue placeholder="Full Islamic Compliance" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="bsc">Full Islamic Compliance</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-x-3 gap-y-3 py-5">
          <h1 className="text-xl font-bold text-secondary border-b p-1 col-span-12">
            {t('optionalVerifiable.title')}
          </h1>

          <div className="space-y-3 col-span-12 font-no">
            <p className="text-muted-foreground">
              {t('optionalVerifiable.p1')}
            </p>
            <p className="text-muted-foreground">
              {t('optionalVerifiable.p2')}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-y-3 gap-x-3 text-xs">
          <div className="col-span-1">
            <Verified />
          </div>
          <div className="col-span-10 grid grid-cols-4">
            <p className="col-span-3  flex items-center">
              {t('optionalVerifiable.annualIncome')}
            </p>
          </div>
          <div className="col-span-1">
            <Link
              href={''}
              className={cn(
                buttonVariants({
                  variant: 'outline',
                  size: 'sm',
                }),
                'rounded-full text-xs text-secondary h-6'
              )}
            >
              {t('optionalVerifiable.upload')}
            </Link>
          </div>

          {/*  */}
          <div className="col-span-1">
            <Verified />
          </div>
          <div className="col-span-10 grid grid-cols-4">
            <p className="col-span-3 flex items-center">
              {t('optionalVerifiable.annualTax')}
            </p>
          </div>
          <div className="col-span-1">
            <Link
              href={''}
              className={cn(
                buttonVariants({
                  variant: 'outline',
                  size: 'sm',
                }),
                'rounded-full text-xs text-secondary h-6'
              )}
            >
              {t('optionalVerifiable.upload')}
            </Link>
          </div>

          {/*  */}
          <div className="col-span-1">
            <Verified />
          </div>
          <div className="col-span-10 grid grid-cols-4">
            <p className="col-span-3 flex items-center">
              {t('optionalVerifiable.fullCredit')}
            </p>
          </div>
          <div className="col-span-1">
            <Link
              href={''}
              className={cn(
                buttonVariants({
                  variant: 'outline',
                  size: 'sm',
                }),
                'rounded-full text-xs text-secondary h-6'
              )}
            >
              {t('optionalVerifiable.upload')}
            </Link>
          </div>

          {/*  */}
          <div className="col-span-1">
            <Verified />
          </div>
          <div className="col-span-10 grid grid-cols-4">
            <p className="col-span-3 flex items-center">
              {t('optionalVerifiable.drivingRecord')}
            </p>
          </div>
          <div className="col-span-1">
            <Link
              href={''}
              className={cn(
                buttonVariants({
                  variant: 'outline',
                  size: 'sm',
                }),
                'rounded-full text-xs text-secondary h-6'
              )}
            >
              {t('optionalVerifiable.upload')}
            </Link>
          </div>

          {/*  */}
          <div className="col-span-1">
            <Verified />
          </div>
          <div className="col-span-10 grid grid-cols-4">
            <p className="col-span-3 flex items-center">
              {t('optionalVerifiable.nationality')}
            </p>
          </div>
          <div className="col-span-1">
            <Link
              href={''}
              className={cn(
                buttonVariants({
                  variant: 'outline',
                  size: 'sm',
                }),
                'rounded-full text-xs text-secondary h-6'
              )}
            >
              {t('optionalVerifiable.upload')}
            </Link>
          </div>

          {/*  */}
          <div className="col-span-1">
            <Verified />
          </div>
          <div className="col-span-10 grid grid-cols-4">
            <p className="col-span-3 flex items-center">
              {t('optionalVerifiable.stdTesting')}
            </p>
          </div>
          <div className="col-span-1">
            <Link
              href={''}
              className={cn(
                buttonVariants({
                  variant: 'outline',
                  size: 'sm',
                }),
                'rounded-full text-xs text-secondary h-6'
              )}
            >
              {t('optionalVerifiable.upload')}
            </Link>
          </div>

          {/*  */}
          <div className="col-span-1">
            <Verified />
          </div>
          <div className="col-span-10 grid grid-cols-4">
            <p className="col-span-3 flex items-center">
              {t('optionalVerifiable.criminalBackgroundCheck')}
            </p>
          </div>
          <div className="col-span-1">
            <Link
              href={''}
              className={cn(
                buttonVariants({
                  variant: 'outline',
                  size: 'sm',
                }),
                'rounded-full text-xs text-secondary h-6'
              )}
            >
              {t('optionalVerifiable.upload')}
            </Link>
          </div>

          {/*  */}
          <div className="col-span-1">
            <Unverified />
          </div>
          <div className="col-span-10 grid grid-cols-4">
            <p className="col-span-3 flex items-center">
              {t('optionalVerifiable.divorced')}
            </p>
          </div>
          <div className="col-span-1">
            <Link
              href={''}
              className={cn(
                buttonVariants({
                  variant: 'outline',
                  size: 'sm',
                }),
                'rounded-full text-xs text-secondary h-6'
              )}
            >
              {t('optionalVerifiable.upload')}
            </Link>
          </div>

          {/*  */}
          <div className="col-span-1">
            <Verified />
          </div>
          <div className="col-span-10 grid grid-cols-4">
            <p className="col-span-3 flex items-center">
              {t('optionalVerifiable.custody')}
            </p>
          </div>
          <div className="col-span-1">
            <Link
              href={''}
              className={cn(
                buttonVariants({
                  variant: 'outline',
                  size: 'sm',
                }),
                'rounded-full text-xs text-secondary h-6'
              )}
            >
              {t('optionalVerifiable.upload')}
            </Link>
          </div>
          {/*  */}
        </div>
      </div>
    </div>
  );
}
