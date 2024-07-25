import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  SelectContent,
  SelectTrigger,
  SelectValue,
  Select,
  SelectItem,
} from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';

import React from 'react';

export default function MatchPreferenceFilter() {
  return (
    <div className="col-span-9 grid grid-cols-subgrid gap-x-4 gap-y-5 text-secondary">
      <div className="space-y-2 col-span-3">
        <Label className="text-xs flex justify-between items-center ">
          <span className="font-bold ">Preferred Age</span>
          <span className="flex gap-1 items-center justify-center text-[0.65rem]">
            <Input type="checkbox" className="p-0 m-0 h-fit" />
            <span>Any</span>
          </span>
        </Label>
        <Slider defaultValue={[50]} max={100} step={1} />
        <div className="text-[0.6rem] flex gap-1 text-primary font-bold justify-center">
          <span>25</span>
        </div>
      </div>
      <div className="space-y-2 col-span-3">
        <Label className="text-xs flex justify-between items-center ">
          <span className="font-bold ">Height</span>
          <span className="flex gap-1 items-center justify-center text-[0.65rem]">
            <Input type="checkbox" className="p-0 m-0 h-fit" />
            <span>Any</span>
          </span>
        </Label>
        <Slider defaultValue={[50]} max={100} step={1} />
        <div className="text-[0.6rem] flex gap-1 text-primary font-bold justify-center">
          <span>152 cm (5&apos;0&apos;)</span>
          <span>-</span>
          <span>166 cm (5&apos;5&apos;)</span>
        </div>
      </div>
      <div className="space-y-2 col-span-3">
        <Label className="text-xs flex justify-between items-center ">
          <span className="font-bold ">Weight</span>
          <span className="flex gap-1 items-center justify-center text-[0.65rem]">
            <Input type="checkbox" className="p-0 m-0 h-fit" />
            <span>Any</span>
          </span>
        </Label>
        <Slider defaultValue={[50]} max={100} step={1} />
        <div className="text-[0.6rem] flex gap-1 text-primary font-bold justify-center">
          <span>40 Kg (104 lb)</span>
          <span>-</span>
          <span>54 Kg (119 lb)</span>
        </div>
      </div>

      <div className="space-y-2 col-span-3">
        <Label className="text-xs flex justify-between items-center ">
          <span className="font-bold ">Ethnic Origin</span>
          <span className="flex gap-1 items-center justify-center text-[0.65rem]">
            <Input type="checkbox" className="p-0 m-0 h-fit" />
            <span>Any</span>
          </span>
        </Label>
        <Select>
          <SelectTrigger className="shadow text-muted-foreground bg-background text-xs rounded-sm h-8 ring-transparent ring-offset-transparent">
            <SelectValue placeholder="Complete Fardh (Observe all 5 Fardh)" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="complete">
              Complete Fardh (Observe all 5 Fardh)
            </SelectItem>
            <SelectItem value="self-employed">Self-Employed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2 col-span-3">
        <Label className="text-xs flex justify-between items-center">
          <span className="font-bold">Nationality/Passport</span>
          <span className="flex gap-1 items-center justify-center text-[0.65rem]">
            <Input type="checkbox" className="p-0 m-0 h-fit" />
            <span>Any</span>
          </span>
        </Label>
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

      <div className="space-y-2 col-span-3">
        <Label className="text-xs flex justify-between items-center">
          <span className="font-bold">Languages</span>
          <span className="flex gap-1 items-center justify-center text-[0.65rem]">
            <Input type="checkbox" className="p-0 m-0 h-fit" />
            <span>Any</span>
          </span>
        </Label>
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

      <div className="space-y-2 col-span-3">
        <Label className="text-xs flex justify-between items-center">
          <span className="font-bold">Country of Origin</span>
          <span className="flex gap-1 items-center justify-center text-[0.65rem]">
            <Input type="checkbox" className="p-0 m-0 h-fit" />
            <span>Any</span>
          </span>
        </Label>
        <Select>
          <SelectTrigger className="shadow text-muted-foreground bg-background text-xs rounded-sm h-8 ring-transparent ring-offset-transparent">
            <SelectValue placeholder="Eligibility Based" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="apartment-rent">Eligibility Based</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2 col-span-3">
        <Label className="text-xs flex justify-between items-center">
          <span className="font-bold">Martial Status</span>
          <span className="flex gap-1 items-center justify-center text-[0.65rem]">
            <Input type="checkbox" className="p-0 m-0 h-fit" />
            <span>Any</span>
          </span>
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

      <div className="space-y-2 col-span-3">
        <Label className="text-xs flex justify-between items-center">
          <span className="font-bold">Salat/Prayer</span>
          <span className="flex gap-1 items-center justify-center text-[0.65rem]">
            <Input type="checkbox" className="p-0 m-0 h-fit" />
            <span>Any</span>
          </span>
        </Label>
        <Select>
          <SelectTrigger className="shadow text-muted-foreground bg-background text-xs rounded-sm h-8 ring-transparent ring-offset-transparent">
            <SelectValue placeholder="Combining Deen and Culture" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="honda">Combining Deen and Culture</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2 col-span-3">
        <Label className="text-xs flex justify-between items-center">
          <span className="font-bold">Born/Reverted</span>
          <span className="flex gap-1 items-center justify-center text-[0.65rem]">
            <Input type="checkbox" className="p-0 m-0 h-fit" />
            <span>Any</span>
          </span>
        </Label>
        <Select>
          <SelectTrigger className="shadow text-muted-foreground bg-background text-xs rounded-sm h-8 ring-transparent ring-offset-transparent">
            <SelectValue placeholder="Full Islamic Compliance" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="bsc">Full Islamic Compliance</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2 col-span-3">
        <Label className="text-xs flex justify-between items-center">
          <span className="font-bold">Hijab</span>
          <span className="flex gap-1 items-center justify-center text-[0.65rem]">
            <Input type="checkbox" className="p-0 m-0 h-fit" />
            <span>Any</span>
          </span>
        </Label>
        <Select>
          <SelectTrigger className="shadow text-muted-foreground bg-background text-xs rounded-sm h-8 ring-transparent ring-offset-transparent">
            <SelectValue placeholder="Direct Scholar Guidance" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Yes">Direct Scholar Guidance</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2 col-span-3">
        <Label className="text-xs flex justify-between items-center">
          <span className="font-bold">Children</span>
          <span className="flex gap-1 items-center justify-center text-[0.65rem]">
            <Input type="checkbox" className="p-0 m-0 h-fit" />
            <span>Any</span>
          </span>
        </Label>
        <Select>
          <SelectTrigger className="shadow text-muted-foreground bg-background text-xs rounded-sm h-8 ring-transparent ring-offset-transparent">
            <SelectValue placeholder="No Beard, Medical Reasons" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="personal-loan">
              No Beard, Medical Reasons
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2 col-span-3">
        <Label className="text-xs flex justify-between items-center">
          <span className="font-bold">Wants Children</span>
          <span className="flex gap-1 items-center justify-center text-[0.65rem]">
            <Input type="checkbox" className="p-0 m-0 h-fit" />
            <span>Any</span>
          </span>
        </Label>
        <Select>
          <SelectTrigger className="shadow text-muted-foreground bg-background text-xs rounded-sm h-8 ring-transparent ring-offset-transparent">
            <SelectValue placeholder="No Plans" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Yes">No Plans</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2 col-span-3">
        <Label className="text-xs flex justify-between items-center">
          <span className="font-bold">Education</span>
          <span className="flex gap-1 items-center justify-center text-[0.65rem]">
            <Input type="checkbox" className="p-0 m-0 h-fit" />
            <span>Any</span>
          </span>
        </Label>
        <Select>
          <SelectTrigger className="shadow text-muted-foreground bg-background text-xs rounded-sm h-8 ring-transparent ring-offset-transparent">
            <SelectValue placeholder="Plans for Islamic Setting (Intends to..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Yes">Plans for Islamic Setting</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2 col-span-3">
        <Label className="text-xs flex justify-between items-center">
          <span className="font-bold">Profession</span>
          <span className="flex gap-1 items-center justify-center text-[0.65rem]">
            <Input type="checkbox" className="p-0 m-0 h-fit" />
            <span>Any</span>
          </span>
        </Label>
        <Select>
          <SelectTrigger className="shadow text-muted-foreground bg-background text-xs rounded-sm h-8 ring-transparent ring-offset-transparent">
            <SelectValue placeholder="Plans for Islamic Setting (Intends to..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Yes">Plans for Islamic Setting</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2 col-span-2">
        <Label className="text-xs flex justify-between items-center">
          <span className="font-bold">Drinking</span>
          <span className="flex gap-1 items-center justify-center text-[0.65rem]">
            <Input type="checkbox" className="p-0 m-0 h-fit" />
            <span>Any</span>
          </span>
        </Label>
        <Select>
          <SelectTrigger className="shadow text-muted-foreground bg-background text-xs rounded-sm h-8 ring-transparent ring-offset-transparent">
            <SelectValue placeholder="Plans for Islamic Setting (Intends to..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Yes">Yes</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2 col-span-2">
        <Label className="text-xs flex justify-between items-center">
          <span className="font-bold">Smoking</span>
          <span className="flex gap-1 items-center justify-center text-[0.65rem]">
            <Input type="checkbox" className="p-0 m-0 h-fit" />
            <span>Any</span>
          </span>
        </Label>
        <Select>
          <SelectTrigger className="shadow text-muted-foreground bg-background text-xs rounded-sm h-8 ring-transparent ring-offset-transparent">
            <SelectValue placeholder="Plans for Islamic Setting (Intends to..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Yes">Yes</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2 col-span-2">
        <Label className="text-xs flex justify-between items-center">
          <span className="font-bold">Tatoo(s)</span>
          <span className="flex gap-1 items-center justify-center text-[0.65rem]">
            <Input type="checkbox" className="p-0 m-0 h-fit" />
            <span>Any</span>
          </span>
        </Label>
        <Select>
          <SelectTrigger className="shadow text-muted-foreground bg-background text-xs rounded-sm h-8 ring-transparent ring-offset-transparent">
            <SelectValue placeholder="Plans for Islamic Setting (Intends to..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Yes">Yes</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
