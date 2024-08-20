import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import React from 'react';

export default function IslamicLifestyle() {
  return (
    <div>
      <div className="py-8 px-6 sm:px-16 md:px-24 lg:px-52">
        <h1 className="text-xl font-bold text-secondary border-b p-1">
          Currently Islamic Lifestyle
        </h1>

        <div className="grid grid-cols-12 gap-x-3 gap-y-3 py-5">
          <div className="space-y-1 col-span-4">
            <Label className="font-normal text-xs">Salat/Prayers</Label>
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

          <div className="space-y-1 col-span-4">
            <Label className="font-normal text-xs">Ramadan</Label>
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
            <Label className="font-normal text-xs">Fasting</Label>
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
            <Label className="font-normal text-xs">Zakat</Label>
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
            <Label className="font-normal text-xs">Food</Label>
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
            <Label className="font-normal text-xs">Islam & Culture</Label>
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
            <Label className="font-normal text-xs">Money</Label>
            <Select>
              <SelectTrigger className="shadow text-muted-foreground bg-background text-xs rounded-sm h-8 ring-transparent ring-offset-transparent">
                <SelectValue placeholder="Full Islamic Compliance" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="bsc">Full Islamic Compliance</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1 col-span-4">
            <Label className="font-normal text-xs">Islamic Education</Label>
            <Select>
              <SelectTrigger className="shadow text-muted-foreground bg-background text-xs rounded-sm h-8 ring-transparent ring-offset-transparent">
                <SelectValue placeholder="Direct Scholar Guidance" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Yes">Direct Scholar Guidance</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1 col-span-4">
            <Label className="font-normal text-xs">Appearance (Beard)</Label>
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

          <div className="space-y-1 col-span-4">
            <Label className="font-normal text-xs">Hajj & Umrah</Label>
            <Select>
              <SelectTrigger className="shadow text-muted-foreground bg-background text-xs rounded-sm h-8 ring-transparent ring-offset-transparent">
                <SelectValue placeholder="No Plans" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Yes">No Plans</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1 col-span-4">
            <Label className="font-normal text-xs">Children & Upbringing</Label>
            <Select>
              <SelectTrigger className="shadow text-muted-foreground bg-background text-xs rounded-sm h-8 ring-transparent ring-offset-transparent">
                <SelectValue placeholder="Plans for Islamic Setting (Intends to..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Yes">Plans for Islamic Setting</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="bg-muted w-full py-4 px-6 sm:px-16 md:px-24 lg:px-52">
        <h1 className="text-xl font-bold text-primary border-b p-1">
          Expected Islamic Lifestyle of Your Potential Spouses
        </h1>

        <div className="grid grid-cols-12 gap-x-3 gap-y-4 py-5">
          <div className="space-y-1 col-span-4">
            <Label className="font-normal text-xs">Salat/Prayers</Label>
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

          <div className="space-y-1 col-span-4">
            <Label className="font-normal text-xs">Hijab</Label>
            <Select>
              <SelectTrigger className="shadow text-muted-foreground bg-background text-xs rounded-sm h-8 ring-transparent ring-offset-transparent">
                <SelectValue placeholder="Enhanced Hijab (Niqab or burqa..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="web-and-graphic-designer">
                  Enhanced Hijab (Niqab or burqa...
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1 col-span-4">
            <Label className="font-normal text-xs">
              Appearance (Makeup/Perfume)
            </Label>
            <Select>
              <SelectTrigger className="shadow text-muted-foreground bg-background text-xs rounded-sm h-8 ring-transparent ring-offset-transparent">
                <SelectValue placeholder="Makeup with Hijab/Niqab, No Perfume..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="apartment-rent">
                  Makeup with Hijab/Niqab, No Perfume...
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1 col-span-4">
            <Label className="font-normal text-xs">
              Polygyny/Family Structure
            </Label>
            <Select>
              <SelectTrigger className="shadow text-muted-foreground bg-background text-xs rounded-sm h-8 ring-transparent ring-offset-transparent">
                <SelectValue placeholder="Open (Require future wife to discuss..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="apartment-rent">
                  Open (Require future wife to discuss
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1 col-span-4">
            <Label className="font-normal text-xs">Children Upbringing</Label>
            <Select>
              <SelectTrigger className="shadow text-muted-foreground bg-background text-xs rounded-sm h-8 ring-transparent ring-offset-transparent">
                <SelectValue placeholder="Plans for Islamic Setting (Intends to..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="indifferent">
                  Plans for Islamic Setting
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1 col-span-4">
            <Label className="font-normal text-xs">Islam & Culture</Label>
            <Select>
              <SelectTrigger className="shadow text-muted-foreground bg-background text-xs rounded-sm h-8 ring-transparent ring-offset-transparent">
                <SelectValue placeholder="Restricted Use (Will accept minimal..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="honda">
                  Restricted Use (Will accept minimal
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1 col-span-4">
            <Label className="font-normal text-xs">Non-Mehram Contract</Label>
            <Select>
              <SelectTrigger className="shadow text-muted-foreground bg-background text-xs rounded-sm h-8 ring-transparent ring-offset-transparent">
                <SelectValue placeholder="Mehram Contracts Only (Currently..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="bsc">
                  Mehram Contracts Only (Currently
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1 col-span-4">
            <Label className="font-normal text-xs">Obedience to Husband</Label>
            <Select>
              <SelectTrigger className="shadow text-muted-foreground bg-background text-xs rounded-sm h-8 ring-transparent ring-offset-transparent">
                <SelectValue placeholder="Mutual Compromise (Both Spouses..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Yes">
                  Mutual Compromise (Both Spouses
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1 col-span-4">
            <Label className="font-normal text-xs">Obedience to In-laws</Label>
            <Select>
              <SelectTrigger className="shadow text-muted-foreground bg-background text-xs rounded-sm h-8 ring-transparent ring-offset-transparent">
                <SelectValue placeholder="Independent Relationship: (Minimal..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="personal-loan">
                  Independent Relationship : (Minimal
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
}
