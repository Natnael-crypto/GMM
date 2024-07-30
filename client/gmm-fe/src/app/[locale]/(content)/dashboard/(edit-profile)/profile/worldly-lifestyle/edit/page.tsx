import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

import React from 'react';

export default function WorldlyLifestyle() {
  return (
    <div>
      <div className="py-8 px-6 sm:px-16 md:px-24 lg:px-52">
        <h1 className="text-xl font-bold text-secondary border-b p-1">
          Currently Worldly Lifestyle
        </h1>

        <div className="grid grid-cols-12 gap-x-3 gap-y-4 py-5">
          <div className="space-y-1 col-span-4">
            <Label className="font-normal text-xs">Employment Type</Label>
            <Select>
              <SelectTrigger className="shadow text-muted-foreground bg-background text-xs rounded-sm h-8 ring-transparent ring-offset-transparent">
                <SelectValue placeholder="Self-Employed" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="employed">Employed</SelectItem>
                <SelectItem value="self-employed">Self-Employed</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1 col-span-3">
            <Label className="font-normal text-xs">Annual Income</Label>
            <div className="grid grid-cols-3 gap-0 shadow">
              <Select>
                <SelectTrigger className="col-span-2 text-muted-foreground bg-background text-xs  rounded-none rounded-ss-sm rounded-es-sm h-8 ring-transparent ring-offset-transparent">
                  <SelectValue placeholder="0-20,000" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">0-20,000</SelectItem>
                  <SelectItem value="light">0-20,000</SelectItem>
                  <SelectItem value="light">0-20,000</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="col-span-1 text-muted-foreground bg-background text-xs rounded-none rounded-ee-sm rounded-se-sm h-8 border-s-0 ring-transparent ring-offset-transparent">
                  <SelectValue placeholder="USD" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="usd">USD</SelectItem>
                  <SelectItem value="cad">CAD</SelectItem>
                  <SelectItem value="eur">EUR</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-1 col-span-5">
            <Label className="font-normal text-xs">
              Current Occupation Title
            </Label>
            <Select>
              <SelectTrigger className="shadow text-muted-foreground bg-background text-xs rounded-sm h-8 ring-transparent ring-offset-transparent">
                <SelectValue placeholder="Web & Graphic Designer" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="web-and-graphic-designer">
                  Web & Graphic Designer
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1 col-span-3">
            <Label className="font-normal text-xs">Type of Residence</Label>
            <Select>
              <SelectTrigger className="shadow text-muted-foreground bg-background text-xs rounded-sm h-8 ring-transparent ring-offset-transparent">
                <SelectValue placeholder="Apartment (Rent)" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="apartment-rent">Apartment (Rent)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1 col-span-3">
            <Label className="font-normal text-xs">Living Situation</Label>
            <Select>
              <SelectTrigger className="shadow text-muted-foreground bg-background text-xs rounded-sm h-8 ring-transparent ring-offset-transparent">
                <SelectValue placeholder="Living with kids" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="apartment-rent">Living with kids</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1 col-span-2">
            <Label className="font-normal text-xs">Vehicle Year</Label>
            <Select>
              <SelectTrigger className="shadow text-muted-foreground bg-background text-xs rounded-sm h-8 ring-transparent ring-offset-transparent">
                <SelectValue placeholder="2020" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2020">2020</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1 col-span-2">
            <Label className="font-normal text-xs">Vehicle Make</Label>
            <Select>
              <SelectTrigger className="shadow text-muted-foreground bg-background text-xs rounded-sm h-8 ring-transparent ring-offset-transparent">
                <SelectValue placeholder="Honda" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="honda">Honda</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1 col-span-2">
            <Label className="font-normal text-xs">Vehicle Model</Label>
            <Input
              className="text-muted-foreground bg-background text-xs shadow rounded-sm"
              placeholder="Civic"
            />
          </div>

          <div className="space-y-1 col-span-4">
            <Label className="font-normal text-xs">
              Education Qualification
            </Label>
            <Select>
              <SelectTrigger className="shadow text-muted-foreground bg-background text-xs rounded-sm h-8 ring-transparent ring-offset-transparent">
                <SelectValue placeholder="Bachelors Degree" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="bsc">Bachelors Degree</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1 col-span-2">
            <Label className="font-normal text-xs">Applicable Dept</Label>
            <Select>
              <SelectTrigger className="shadow text-muted-foreground bg-background text-xs rounded-sm h-8 ring-transparent ring-offset-transparent">
                <SelectValue placeholder="Yes" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Yes">Yes</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1 col-span-3">
            <Label className="font-normal text-xs">Current Debt</Label>
            <Select>
              <SelectTrigger className="shadow text-muted-foreground bg-background text-xs rounded-sm h-8 ring-transparent ring-offset-transparent">
                <SelectValue placeholder="Personal Loan" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="personal-loan">Personal Loan</SelectItem>
                <SelectItem value="car">Car</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1 col-span-3">
            <Label className="font-normal text-xs">Approximate Debt</Label>
            <Input
              className="text-muted-foreground bg-background text-xs shadow rounded-sm"
              placeholder="100,000 USD"
            />
          </div>

          <div className="space-y-1 col-span-3">
            <Label className="font-normal text-xs">
              Paying Interest/Riba on Debts?
            </Label>
            <Select>
              <SelectTrigger className="shadow text-muted-foreground bg-background text-xs rounded-sm h-8 ring-transparent ring-offset-transparent">
                <SelectValue placeholder="Yes" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Yes">Yes</SelectItem>
                <SelectItem value="No">No</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1 col-span-3">
            <Label className="font-normal text-xs">
              Present Family Members
            </Label>
            <Select>
              <SelectTrigger className="shadow text-muted-foreground bg-background text-xs rounded-sm h-8 ring-transparent ring-offset-transparent">
                <SelectValue placeholder="Both Parents Present" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="both-parents-present">
                  Both Parents Present
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1 col-span-2">
            <Label className="font-normal text-xs">Number of Siblings</Label>
            <Select>
              <SelectTrigger className="shadow text-muted-foreground bg-background text-xs rounded-sm h-8 ring-transparent ring-offset-transparent">
                <SelectValue placeholder="4" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1</SelectItem>
                <SelectItem value="2">2</SelectItem>
                <SelectItem value="3">3</SelectItem>
                <SelectItem value="4">4</SelectItem>
                <SelectItem value="5">5</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1 col-span-2">
            <Label className="font-normal text-xs">Pets</Label>
            <Select>
              <SelectTrigger className="shadow text-muted-foreground bg-background text-xs rounded-sm h-8 ring-transparent ring-offset-transparent">
                <SelectValue placeholder="0" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1</SelectItem>
                <SelectItem value="2">2</SelectItem>
                <SelectItem value="3">3</SelectItem>
                <SelectItem value="4">4</SelectItem>
                <SelectItem value="5">5</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <h2 className="col-span-12 font-bold mt-2">Health Conditions</h2>

          <div className="space-y-1 col-span-5">
            <Label className="font-normal text-xs">
              Major Pre-Existing Health Conditions and/or Disabilities
            </Label>
            <Select>
              <SelectTrigger className="shadow text-muted-foreground bg-background text-xs rounded-sm h-8 ring-transparent ring-offset-transparent">
                <SelectValue placeholder="Yes" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Yes">Yes</SelectItem>
                <SelectItem value="No">No</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1 col-span-3">
            <Label className="font-normal text-xs">
              Do your require mobility assistant?
            </Label>
            <Select>
              <SelectTrigger className="shadow text-muted-foreground bg-background text-xs rounded-sm h-8 ring-transparent ring-offset-transparent">
                <SelectValue placeholder="Yes" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Yes">Yes</SelectItem>
                <SelectItem value="No">No</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1 col-span-12">
            <Label className="font-normal text-xs">
              Describe your pre-existing conditions and/or disabilities
              (Example: STD, Disabilities, Cancer, etc)
            </Label>
            <Textarea
              className="text-muted-foreground bg-background text-xs shadow rounded-sm"
              placeholder="lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit voluptate velit esse cillum dolore fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident sunt culpa qui officia deserunt mollit anim id est laborum."
            />
          </div>
        </div>
      </div>

      <div className="bg-muted w-full py-4 px-6 sm:px-16 md:px-24 lg:px-52">
        <h1 className="text-xl font-bold text-primary border-b p-1">
          Expected Worldly Lifestyle of Your Potential Spouses
        </h1>

        <div className="grid grid-cols-12 gap-x-3 gap-y-4 py-5">
          <div className="space-y-1 col-span-3">
            <Label className="font-normal text-xs">Role of Wife</Label>
            <Select>
              <SelectTrigger className="shadow text-muted-foreground bg-background text-xs rounded-sm h-8 ring-transparent ring-offset-transparent">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="select">Select</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1 col-span-2">
            <Label className="font-normal text-xs">Wife&apos;s Career</Label>

            <Select>
              <SelectTrigger className="shadow text-muted-foreground bg-background text-xs rounded-sm h-8 ring-transparent ring-offset-transparent">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="select">Select</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1 col-span-2">
            <Label className="font-normal text-xs">Dual Income</Label>
            <Select>
              <SelectTrigger className="shadow text-muted-foreground bg-background text-xs rounded-sm h-8 ring-transparent ring-offset-transparent">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="web-and-graphic-designer">Select</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1 col-span-2">
            <Label className="font-normal text-xs">Relocation</Label>
            <Select>
              <SelectTrigger className="shadow text-muted-foreground bg-background text-xs rounded-sm h-8 ring-transparent ring-offset-transparent">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="web-and-graphic-designer">Select</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1 col-span-3">
            <Label className="font-normal text-xs">Joint Family</Label>
            <Select>
              <SelectTrigger className="shadow text-muted-foreground bg-background text-xs rounded-sm h-8 ring-transparent ring-offset-transparent">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="web-and-graphic-designer">Select</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1 col-span-4">
            <Label className="font-normal text-xs">
              Couple&apos;s Living Accommodation
            </Label>
            <Select>
              <SelectTrigger className="shadow text-muted-foreground bg-background text-xs rounded-sm h-8 ring-transparent ring-offset-transparent">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="web-and-graphic-designer">Select</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1 col-span-4">
            <Label className="font-normal text-xs">
              Husband Open to Live with Wife&apos;s Family
            </Label>
            <Select>
              <SelectTrigger className="shadow text-muted-foreground bg-background text-xs rounded-sm h-8 ring-transparent ring-offset-transparent">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="web-and-graphic-designer">Select</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1 col-span-4">
            <Label className="font-normal text-xs">
              Husband Expects Wife to Live with His Family
            </Label>
            <Select>
              <SelectTrigger className="shadow text-muted-foreground bg-background text-xs rounded-sm h-8 ring-transparent ring-offset-transparent">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="web-and-graphic-designer">Select</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1 col-span-3">
            <Label className="font-normal text-xs">Having Children</Label>
            <Select>
              <SelectTrigger className="shadow text-muted-foreground bg-background text-xs rounded-sm h-8 ring-transparent ring-offset-transparent">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="web-and-graphic-designer">Select</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1 col-span-3">
            <Label className="font-normal text-xs">Number of Children</Label>
            <Select>
              <SelectTrigger className="shadow text-muted-foreground bg-background text-xs rounded-sm h-8 ring-transparent ring-offset-transparent">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="web-and-graphic-designer">Select</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1 col-span-6">
            <Label className="font-normal text-xs">
              Parenthood Timing After Marriage
            </Label>
            <Select>
              <SelectTrigger className="shadow text-muted-foreground bg-background text-xs rounded-sm h-8 ring-transparent ring-offset-transparent">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="web-and-graphic-designer">Select</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <h2 className="col-span-12 font-bold mt-2">
            Children from Previous Marriage
          </h2>

          <div className="space-y-1 col-span-5">
            <Label className="font-normal text-xs">
              Requires wife to accept/take care of children
            </Label>
            <Select>
              <SelectTrigger className="shadow text-muted-foreground bg-background text-xs rounded-sm h-8 ring-transparent ring-offset-transparent">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="web-and-graphic-designer">Select</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1 col-span-5">
            <Label className="font-normal text-xs">
              Willing to accept/take care of wife&apos;s children
            </Label>
            <Select>
              <SelectTrigger className="shadow text-muted-foreground bg-background text-xs rounded-sm h-8 ring-transparent ring-offset-transparent">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="web-and-graphic-designer">Select</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
}
