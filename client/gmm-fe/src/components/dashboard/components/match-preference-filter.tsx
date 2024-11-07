'use client';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  SelectContent,
  SelectTrigger,
  SelectValue,
  Select,
  SelectItem,
} from '@/components/ui/select';
import AutoComplete from '@/components/ui/searchable-select';
import {
  countries,
  minAge,
  maxAge,
  minHeight,
  maxHeight,
  minWeight,
  maxWeight,
  countryToCountryCode,
} from '@/lib/schemas/user';
import { setQueryString } from '@/lib/matchmaking/slice';
import { cmToFeetInches, kgToPounds } from '@/lib/format';
import { languages } from '@/config/locales';
import { useDebounce } from 'use-debounce';
import flags from 'react-phone-number-input/flags';
import { Slider } from '@/components/ui/slider';
import MatchFilterSlider from './match-filter-slider';
import { usePreference } from '@/lib/hooks/match/preference-hook';
import { useMatch } from '@/lib/hooks/match/match-hook';

const countryOptions = Object.keys(countries).map((country) => ({
  label: country,
  value: country,
}));

const martialStatusOptions = [
  'Single/Never Married',
  'Single/Legally Divorced',
  'Single/Islamically-Divorced',
  'Widowed',
  'Other',
].map((status) => ({
  label: status,
  value: status,
}));

export default function MatchPreferenceFilter() {
  const {
    form,
    preferenceUpdateResult,
    isFilterInactive,
    debouncedSavePreference,
  } = usePreference();
  const { findNewMatch } = useMatch();

  return (
    <Form {...form}>
      <form className="col-span-9 grid grid-cols-2 md:grid-cols-subgrid gap-x-4 gap-y-5 text-secondary">
        <div className="space-y-2 col-span-10 md:col-span-3">
          <MatchFilterSlider
            name="preferredAge"
            label="Preferred Age"
            min={18}
            max={100}
            onChange={debouncedSavePreference}
            defaultValue={[minAge, maxAge]}
            allowAny={isFilterInactive['preferredAge']}
            render={(field) => (
              <div className="text-xs flex gap-1 text-primary font-bold justify-center">
                {field.value && (
                  <span>
                    {field.value[0] === field.value[1]
                      ? field.value[0]
                      : field.value.join(' - ')}
                  </span>
                )}
              </div>
            )}
          />
        </div>
        <div className="space-y-2 col-span-10 md:col-span-3">
          <MatchFilterSlider
            name="preferredHeight"
            label="Height"
            min={minHeight}
            max={maxHeight}
            onChange={debouncedSavePreference}
            defaultValue={[minHeight, maxHeight]}
            allowAny={isFilterInactive['preferredHeight']}
            render={(field) => (
              <div className="text-xs flex md:flex-col lg:flex-row gap-1 text-primary font-bold justify-center items-center">
                <span>
                  <span>{field.value && field.value[0]} cm </span>{' '}
                  {field.value[0] !== field.value[1] && (
                    <>
                      <span>-</span>{' '}
                      <span>{field.value && field.value[1]} cm</span>
                    </>
                  )}
                </span>
                <span className="block md:hidden lg:block">|</span>
                <span>
                  <span>{field.value && cmToFeetInches(field.value[0])}</span>{' '}
                  {field.value[0] !== field.value[1] && (
                    <>
                      <span>-</span>{' '}
                      <span>
                        {field.value && cmToFeetInches(field.value[1])}
                      </span>
                    </>
                  )}
                </span>
              </div>
            )}
          />
        </div>

        <div className="space-y-2 col-span-10 md:col-span-3">
          <MatchFilterSlider
            name="preferredWeight"
            label="Weight"
            min={minWeight}
            max={maxWeight}
            onChange={debouncedSavePreference}
            defaultValue={[minWeight, maxWeight]}
            allowAny={isFilterInactive['preferredWeight']}
            render={(field) => (
              <div className="text-xs flex md:flex-col lg:flex-row gap-1 text-primary font-bold justify-center items-center">
                <span>
                  <span>{field.value && field.value[0]} Kg</span> <span>-</span>{' '}
                  <span>{field.value && field.value[1]} Kg</span>
                </span>
                <span className="block md:hidden lg:block">|</span>
                <span>
                  <span>{field.value && kgToPounds(field.value[0])}</span>{' '}
                  <span>-</span>{' '}
                  <span>{field.value && kgToPounds(field.value[1])}</span>
                </span>
              </div>
            )}
          />
        </div>

        <div className="space-y-2 col-span-10 md:col-span-3">
          <Label
            className="text-sm flex justify-between items-center"
            onClick={() => form.setValue('nationality', '')}
          >
            <span className="font-bold line-clamp-1">Nationality/Passport</span>
            <span className="flex gap-1 items-center justify-center text-[0.65rem]">
              <Input
                type="checkbox"
                className="p-0 m-0 h-fit"
                checked={isFilterInactive['nationality']}
                onChange={() => {}}
              />
              <span>Any</span>
            </span>
          </Label>
          <FormField
            name="nationality"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <AutoComplete
                    onChange={field.onChange}
                    selectedOption={field.value}
                    options={countryOptions.map((c) => {
                      const countryCode = countryToCountryCode[c.value];
                      const Flag = flags[countryCode as keyof typeof flags];
                      const icon = (
                        <div className="w-5">
                          {Flag && <Flag title={c.label} />}
                        </div>
                      );
                      return { label: c.label, value: c.value, icon: icon };
                    })}
                    placeholder=""
                    className="shadow text-muted-foreground bg-background text-sm rounded-sm h-8 ring-transparent ring-offset-transparent"
                  />
                </FormControl>
                <FormMessage className="text-sm" />
              </FormItem>
            )}
          />
        </div>

        <div className="space-y-2 col-span-10 md:col-span-3">
          <Label
            className="text-sm flex justify-between items-center"
            onClick={() => form.setValue('language', '')}
          >
            <span className="font-bold line-clamp-1">Languages</span>
            <span className="flex gap-1 items-center justify-center text-[0.65rem]">
              <Input
                type="checkbox"
                className="p-0 m-0 h-fit"
                // checked={isFilterInactive['language']}
                onChange={() => {}}
              />
              <span>Any</span>
            </span>
          </Label>
          <FormField
            name="language"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="shadow text-muted-foreground bg-background text-sm rounded-sm h-8 ring-transparent ring-offset-transparent">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {languages.map((l) => (
                        <SelectItem
                          key={l.value}
                          className="text-sm max-w-80"
                          value={l.value}
                        >
                          {l.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage className="text-sm" />
              </FormItem>
            )}
          />
        </div>

        <div className="space-y-2 col-span-10 md:col-span-3">
          <Label
            className="text-sm flex justify-between items-center"
            onClick={() => form.setValue('country', '')}
          >
            <span className="font-bold line-clamp-1">Country of Origin</span>
            <span className="flex gap-1 items-center justify-center text-[0.65rem]">
              <Input
                type="checkbox"
                className="p-0 m-0 h-fit"
                // checked={isFilterInactive['countryOfOrigin']}
                onChange={() => {}}
              />
              <span>Any</span>
            </span>
          </Label>
          <FormField
            name="country"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <AutoComplete
                    onChange={field.onChange}
                    selectedOption={field.value}
                    options={countryOptions.map((c) => {
                      const countryCode = countryToCountryCode[c.value];
                      const Flag = flags[countryCode as keyof typeof flags];
                      const icon = (
                        <div className="w-5">
                          {Flag && <Flag title={c.label} />}
                        </div>
                      );
                      return { label: c.label, value: c.value, icon: icon };
                    })}
                    placeholder=""
                    className="shadow text-muted-foreground bg-background text-sm rounded-sm h-8 ring-transparent ring-offset-transparent"
                  />
                </FormControl>
                <FormMessage className="text-sm" />
              </FormItem>
            )}
          />
        </div>

        <div className="space-y-2 col-span-10 md:col-span-3">
          <Label
            className="text-sm flex justify-between items-center"
            onClick={() => form.setValue('martialStatus', '')}
          >
            <span className="font-bold line-clamp-1">Martial Status</span>
            <span className="flex gap-1 items-center justify-center text-[0.65rem]">
              <Input
                type="checkbox"
                className="p-0 m-0 h-fit"
                // checked={isFilterInactive['martialStatus']}
                onChange={() => {}}
              />
              <span>Any</span>
            </span>
          </Label>
          <FormField
            name="martialStatus"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <AutoComplete
                    onChange={field.onChange}
                    selectedOption={field.value}
                    options={martialStatusOptions}
                    placeholder=""
                    className="shadow text-muted-foreground bg-background text-sm rounded-sm h-8 ring-transparent ring-offset-transparent"
                  />
                </FormControl>
                <FormMessage className="text-sm" />
              </FormItem>
            )}
          />
        </div>

        <div className="space-y-2 col-span-10 md:col-span-3">
          <Label
            className="text-sm flex justify-between items-center"
            onClick={() => form.setValue('bornOrRevert', '')}
          >
            <span className="font-bold line-clamp-1">Born/Reverted</span>
            <span className="flex gap-1 items-center justify-center text-[0.65rem]">
              <Input
                type="checkbox"
                className="p-0 m-0 h-fit"
                // checked={isFilterInactive['bornOrRevert']}
                onChange={() => {}}
              />
              <span>Any</span>
            </span>
          </Label>
          <FormField
            name="bornOrRevert"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value?.toString()}
                  >
                    <SelectTrigger className="shadow text-muted-foreground bg-background text-sm rounded-sm h-8 ring-transparent ring-offset-transparent">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="true">Born Muslim</SelectItem>
                      <SelectItem value="false">Reverted to Islam</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage className="text-sm" />
              </FormItem>
            )}
          />
        </div>

        <div className="space-y-2 col-span-10 md:col-span-3">
          <Label
            className="text-sm flex justify-between items-center"
            onClick={() => form.setValue('children', '')}
          >
            <span className="font-bold line-clamp-1">Children</span>
            <span className="flex gap-1 items-center justify-center text-[0.65rem]">
              <Input
                type="checkbox"
                className="p-0 m-0 h-fit"
                // checked={isFilterInactive['children']}
                onChange={() => {}}
              />
              <span>Any</span>
            </span>
          </Label>
          <FormField
            name="children"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="shadow text-muted-foreground bg-background text-sm rounded-sm h-8 ring-transparent ring-offset-transparent">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Has Children">Has Children</SelectItem>
                      <SelectItem value="Doesn't have children">
                        Doesn&apos;t have children
                      </SelectItem>
                      <SelectItem value="Doesn't matter">
                        Doesn&apos;t matter
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage className="text-sm" />
              </FormItem>
            )}
          />
        </div>

        <div className="space-y-2 col-span-10 md:col-span-3">
          <Label
            className="text-sm flex justify-between items-center"
            onClick={() => form.setValue('wantsChildren', '')}
          >
            <span className="font-bold line-clamp-1">Wants Children</span>
            <span className="flex gap-1 items-center justify-center text-[0.65rem]">
              <Input
                type="checkbox"
                className="p-0 m-0 h-fit"
                // checked={isFilterInactive['wantsChildren']}
                onChange={() => {}}
              />
              <span>Any</span>
            </span>
          </Label>
          <Select>
            <SelectTrigger className="shadow text-muted-foreground bg-background text-sm rounded-sm h-8 ring-transparent ring-offset-transparent">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem className="text-sm max-w-80" value="Wants children">
                Wants children
              </SelectItem>
              <SelectItem
                className="text-sm max-w-80"
                value="Don't want children"
              >
                Don&apos;t want children
              </SelectItem>
              <SelectItem
                className="text-sm max-w-80"
                value="Can't Have Children (medical reason)"
              >
                Can&apos;t Have Children (medical reason)
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2 col-span-10 md:col-span-6">
          <Label className="text-sm flex justify-between items-center">
            <span className="font-bold line-clamp-1">Salat/Prayer</span>
            <span className="flex gap-1 items-center justify-center text-[0.65rem]">
              <Input type="checkbox" className="p-0 m-0 h-fit" />
              <span>Any</span>
            </span>
          </Label>
          <Select>
            <SelectTrigger className="shadow text-muted-foreground bg-background text-sm rounded-sm h-8 ring-transparent ring-offset-transparent">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Must Pray Full Daily Prayers + Sunnah (Husband prays all obligatory and Sunnah prayers)">
                Must Pray Full Daily Prayers + Sunnah (Husband prays all
                obligatory and Sunnah prayers)
              </SelectItem>
              <SelectItem value="Fardh Only (Husband prays mandatory prayers as a minimum requirement)">
                Fardh Only (Husband prays mandatory prayers as a minimum
                requirement)
              </SelectItem>
              <SelectItem value="Flexible Approach (As long as husband says he's a Muslim, he does not have to pray)">
                Flexible Approach (As long as husband says he&apos;s a Muslim,
                he does not have to pray)
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2 col-span-10 md:col-span-9">
          <Label
            className="text-sm flex justify-between items-center"
            onClick={() => form.setValue('hijab', '')}
          >
            <span className="font-bold line-clamp-1">Hijab</span>
            <span className="flex gap-1 items-center justify-center text-[0.65rem]">
              <Input
                type="checkbox"
                className="p-0 m-0 h-fit"
                // checked={isFilterInactive['hijab']}
                onChange={() => {}}
              />
              <span>Any</span>
            </span>
          </Label>
          <FormField
            name="hijab"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="shadow text-muted-foreground bg-background text-sm rounded-sm h-8 ring-transparent ring-offset-transparent">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Wife must do Advanced Hijab (Niqab or burqa, possibly with gloves, often with eyes not visible)">
                        Wife must do Advanced Hijab (Niqab or burqa, possibly
                        with gloves, often with eyes not visible)
                      </SelectItem>
                      <SelectItem value="Wife must do Minimum Hijab (Basic Islamic attire with long dress/skirt, or loose clothing with long sleeves. Face and hands visible)">
                        Wife must do Minimum Hijab (Basic Islamic attire with
                        long dress/skirt, or loose clothing with long sleeves.
                        Face and hands visible)
                      </SelectItem>
                      <SelectItem value="Wife may do Partial Hijab (Headscarf like a turban revealing neck. Tight clothing showing shape of body)">
                        Wife may do Partial Hijab (Headscarf like a turban
                        revealing neck. Tight clothing showing shape of body)
                      </SelectItem>
                      <SelectItem value="No Hijab (Don't need or want wife to wear Hijab)">
                        No Hijab (Don&apos;t need or want wife to wear Hijab)
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage className="text-sm" />
              </FormItem>
            )}
          />
        </div>

        <div className="space-y-2 col-span-10 md:col-span-3">
          <Label
            className="text-sm flex justify-between items-center"
            onClick={() => form.setValue('education', '')}
          >
            <span className="font-bold line-clamp-1">Education</span>
            <span className="flex gap-1 items-center justify-center text-[0.65rem]">
              <Input
                type="checkbox"
                className="p-0 m-0 h-fit"
                // checked={isFilterInactive['education']}
                onChange={() => {}}
              />
              <span>Any</span>
            </span>
          </Label>
          <FormField
            name="education"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="shadow text-muted-foreground bg-background text-sm rounded-sm h-8 ring-transparent ring-offset-transparent">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem
                        className="text-sm max-w-80"
                        value="High school"
                      >
                        High school
                      </SelectItem>
                      <SelectItem className="text-sm max-w-80" value="Diploma">
                        Diploma
                      </SelectItem>
                      <SelectItem
                        className="text-sm max-w-80"
                        value="Non-Degree Qualified"
                      >
                        Non-Degree Qualified
                      </SelectItem>
                      <SelectItem
                        className="text-sm max-w-80"
                        value="Bachelor's degree"
                      >
                        Bachelor&apos;s degree
                      </SelectItem>
                      <SelectItem className="text-sm max-w-80" value="Masters">
                        Masters
                      </SelectItem>
                      <SelectItem
                        className="text-sm max-w-80"
                        value="PHD/Doctorate"
                      >
                        PHD/Doctorate
                      </SelectItem>
                      <SelectItem
                        className="text-sm max-w-80"
                        value="Currently Studying"
                      >
                        Currently Studying
                      </SelectItem>
                      <SelectItem
                        className="text-sm max-w-80"
                        value="None of the above"
                      >
                        None of the above
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage className="text-sm" />
              </FormItem>
            )}
          />
        </div>

        <div className="space-y-2 col-span-10 md:col-span-3">
          <Label
            className="text-sm flex justify-between items-center"
            onClick={() => form.setValue('profession', '')}
          >
            <span className="font-bold line-clamp-1">Profession</span>
            <span className="flex gap-1 items-center justify-center text-[0.65rem]">
              <Input
                type="checkbox"
                className="p-0 m-0 h-fit"
                // checked={isFilterInactive['profession']}
                onChange={() => {}}
              />
              <span>Any</span>
            </span>
          </Label>
          <FormField
            name="profession"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="shadow text-muted-foreground bg-background text-sm rounded-sm h-8 ring-transparent ring-offset-transparent">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Web & Graphic Designer">
                        Web & Graphic Designer
                      </SelectItem>
                      <SelectItem value="Software Engineer">
                        Software Engineer
                      </SelectItem>
                      <SelectItem value="Doctor">Doctor</SelectItem>
                      <SelectItem value="Nurse">Nurse</SelectItem>
                      <SelectItem value="Teacher">Teacher</SelectItem>
                      <SelectItem value="Accountant">Accountant</SelectItem>
                      <SelectItem value="Business Owner">
                        Business Owner
                      </SelectItem>
                      <SelectItem value="Investor">Investor</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage className="text-sm" />
              </FormItem>
            )}
          />
        </div>

        <div className="space-y-2 col-span-10 md:col-span-3">
          <Label
            className="text-sm flex justify-between items-center"
            onClick={() => form.setValue('drinking', '' as unknown as boolean)}
          >
            <span className="font-bold line-clamp-1">Drinking</span>
            <span className="flex gap-1 items-center justify-center text-[0.65rem]">
              <Input
                type="checkbox"
                className="p-0 m-0 h-fit"
                // checked={isFilterInactive['drinking']}
                onChange={() => {}}
              />
              <span>Any</span>
            </span>
          </Label>
          <FormField
            name="drinking"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value?.toString()}
                  >
                    <SelectTrigger className="shadow text-muted-foreground bg-background text-sm rounded-sm h-8 ring-transparent ring-offset-transparent">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="true">Yes</SelectItem>
                      <SelectItem value="false">No</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage className="text-sm" />
              </FormItem>
            )}
          />
        </div>

        <div className="space-y-2 col-span-10 md:col-span-3">
          <Label
            className="text-sm flex justify-between items-center"
            onClick={() => form.setValue('smoking', '' as unknown as boolean)}
          >
            <span className="font-bold line-clamp-1">Smoking</span>
            <span className="flex gap-1 items-center justify-center text-[0.65rem]">
              <Input
                type="checkbox"
                className="p-0 m-0 h-fit"
                // checked={isFilterInactive['smoking']}
                onChange={() => {}}
              />
              <span>Any</span>
            </span>
          </Label>
          <FormField
            name="smoking"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value?.toString()}
                  >
                    <SelectTrigger className="shadow text-muted-foreground bg-background text-sm rounded-sm h-8 ring-transparent ring-offset-transparent">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="true">Yes</SelectItem>
                      <SelectItem value="false">No</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage className="text-sm" />
              </FormItem>
            )}
          />
        </div>

        <div className="space-y-2 col-span-10 md:col-span-3">
          <Label
            className="text-sm flex justify-between items-center"
            onClick={() => form.setValue('tattoos', '' as unknown as boolean)}
          >
            <span className="font-bold line-clamp-1">Tattoo(s)</span>
            <span className="flex gap-1 items-center justify-center text-[0.65rem]">
              <Input
                type="checkbox"
                className="p-0 m-0 h-fit"
                // checked={isFilterInactive['tattoos']}
                onChange={() => {}}
              />
              <span>Any</span>
            </span>
          </Label>
          <FormField
            name="tattoos"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value?.toString()}
                  >
                    <SelectTrigger className="shadow text-muted-foreground bg-background text-sm rounded-sm h-8 ring-transparent ring-offset-transparent">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="true">Yes</SelectItem>
                      <SelectItem value="false">No</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage className="text-sm" />
              </FormItem>
            )}
          />
        </div>

        <div className="space-y-2 col-span-10 md:col-span-3">
          <Label
            className="text-sm flex justify-between items-center"
            onClick={() => form.setValue('drugs', '' as unknown as boolean)}
          >
            <span className="font-bold line-clamp-1">Drug(s)</span>
            <span className="flex gap-1 items-center justify-center text-[0.65rem]">
              <Input
                type="checkbox"
                className="p-0 m-0 h-fit"
                // checked={isFilterInactive['drugs']}
                onChange={() => {}}
              />
              <span>Any</span>
            </span>
          </Label>
          <FormField
            name="drugs"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value?.toString()}
                  >
                    <SelectTrigger className="shadow text-muted-foreground bg-background text-sm rounded-sm h-8 ring-transparent ring-offset-transparent">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="true">Yes</SelectItem>
                      <SelectItem value="false">No</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage className="text-sm" />
              </FormItem>
            )}
          />
        </div>
      </form>
    </Form>
  );
}
