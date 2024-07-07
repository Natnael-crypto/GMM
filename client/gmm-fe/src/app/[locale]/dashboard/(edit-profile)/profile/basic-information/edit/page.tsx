import ProfileImages from '@/components/dashboard/components/profile-image-card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import React from 'react';

export default function UpdateBasicInformation() {
  return (
    <div className="grid grid-cols-3 gap-x-5 py-8 text-xs">
      <div className="col-span-1">
        <ProfileImages />
      </div>

      <div className="col-span-2 grid grid-cols-4 gap-x-5 gap-y-4 h-fit">
        <div className="col-span-2 flex gap-5 items-center h-fit">
          <Label className="text-nowrap font-normal text-xs">First Name</Label>
          <Input
            className="bg-muted text-muted-foreground border-none"
            placeholder="Muzaffar"
            disabled
          />
        </div>

        <div className="col-span-2 flex gap-5 items-center h-fit">
          <Label className="text-nowrap font-normal text-xs">Last Name</Label>
          <Input
            className="bg-muted text-muted-foreground border-none"
            placeholder="Sohail"
            disabled
          />
        </div>

        <div className="space-y-1">
          <Label className="font-normal text-xs">Age (Year)</Label>
          <Input
            className="text-muted-foreground bg-background text-xs shadow rounded-sm"
            placeholder="1988"
          />
        </div>

        <div className="space-y-1">
          <Label className="font-normal text-xs">Gender</Label>
          <Input
            className="text-muted-foreground bg-background text-xs shadow rounded-sm"
            placeholder="Male"
          />
        </div>

        <div className="space-y-1">
          <Label className="font-normal text-xs">Height</Label>
          <Input
            className="text-muted-foreground bg-background text-xs shadow rounded-sm"
            placeholder={`5'17"`}
          />
        </div>

        <div className="space-y-1">
          <Label className="font-normal text-xs">Weight</Label>
          <Input
            className="text-muted-foreground bg-background text-xs shadow rounded-sm"
            placeholder="90 kg"
          />
        </div>

        <div className="space-y-1 col-span-2">
          <Label className="font-normal text-xs">Country of Origin</Label>
          <Input
            className="text-muted-foreground bg-background text-xs shadow rounded-sm"
            placeholder="90 kg"
          />
        </div>
        <div className="space-y-1 col-span-2">
          <Label className="font-normal text-xs">Skin Color</Label>
          <Input
            className="text-muted-foreground bg-background text-xs shadow rounded-sm"
            placeholder="Brown"
          />
        </div>
        <div className="space-y-1 col-span-4">
          <Label className="font-normal text-xs">Language(s) - Max 3</Label>
          <Input
            className="text-muted-foreground bg-background text-xs shadow rounded-sm"
            placeholder="English"
          />
        </div>
        <div className="space-y-1 col-span-2">
          <Label className="font-normal text-xs">Nationality/Passport</Label>
          <Input
            className="text-muted-foreground bg-background text-xs shadow rounded-sm"
            placeholder="Pakistan"
          />
        </div>
        <div className="space-y-1 col-span-2">
          <Label className="font-normal text-xs">Current City</Label>
          <Input
            className="text-muted-foreground bg-background text-xs shadow rounded-sm"
            placeholder="Toronto"
          />
        </div>
        <div className="space-y-1 col-span-2">
          <Label className="font-normal text-xs">Marital Status</Label>
          <Input
            className="text-muted-foreground bg-background text-xs shadow rounded-sm"
            placeholder="Never Married"
          />
        </div>

        <div className="space-y-1 col-span-2">
          <Label className="font-normal text-xs">Do you have children?</Label>
          <Input
            className="text-muted-foreground bg-background text-xs shadow rounded-sm"
            placeholder="No"
          />
        </div>

        <div className="col-span-4 grid grid-cols-8 gap-x-5 ">
          <div className="space-y-1 col-span-2">
            <Label className="font-normal text-xs">Number of children</Label>
            <Input
              className="text-muted-foreground bg-background text-xs shadow rounded-sm"
              placeholder="0"
            />
          </div>

          <div className="space-y-1 col-span-3">
            <Label className="font-normal text-xs">Age of Oldest Child</Label>
            <Input
              className="text-muted-foreground bg-background text-xs shadow rounded-sm"
              placeholder="N/A"
            />
          </div>
          <div className="space-y-1 col-span-3">
            <Label className="font-normal text-xs">Age of Youngest Child</Label>
            <Input
              className="text-muted-foreground bg-background text-xs shadow rounded-sm"
              placeholder="N/A"
            />
          </div>
        </div>

        <div className="col-span-4 grid grid-cols-8 gap-x-5 ">
          <div className="space-y-1 col-span-2">
            <Label className="font-normal text-xs">Sunni-Madhaib</Label>
            <Input
              className="text-muted-foreground bg-background text-xs shadow rounded-sm"
              placeholder="Hanafi"
            />
          </div>

          <div className="space-y-1 col-span-3">
            <Label className="font-normal text-xs">Religious Practice</Label>
            <Input
              className="text-muted-foreground bg-background text-xs shadow rounded-sm"
              placeholder="Practicing/Fardh"
            />
          </div>
          <div className="space-y-1 col-span-3">
            <Label className="font-normal text-xs">
              Born/Reverted to Islam
            </Label>
            <Input
              className="text-muted-foreground bg-background text-xs shadow rounded-sm"
              placeholder="Born Muslim"
            />
          </div>
        </div>

        <div className="space-y-1">
          <Label className="font-normal text-xs">Drinks</Label>
          <Input
            className="text-muted-foreground bg-background text-xs shadow rounded-sm"
            placeholder="No"
          />
        </div>
        <div className="space-y-1">
          <Label className="font-normal text-xs text-nowrap">
            Drugs{' '}
            <span className="text-[0.6rem] text-nowrap">
              (Including Cannabis)
            </span>
          </Label>
          <Input
            className="text-muted-foreground bg-background text-xs shadow rounded-sm"
            placeholder="No"
          />
        </div>
        <div className="space-y-1">
          <Label className="font-normal text-xs">
            Smokes <span className="text-[0.6rem]">(Vapping/Shisha)</span>
          </Label>
          <Input
            className="text-muted-foreground bg-background text-xs shadow rounded-sm"
            placeholder="No"
          />
        </div>
        <div className="space-y-1">
          <Label className="font-normal text-xs">Tattoo(s)</Label>
          <Input
            className="text-muted-foreground bg-background text-xs shadow rounded-sm"
            placeholder="No"
          />
        </div>
      </div>
    </div>
  );
}
