'use client'

import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
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
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { Preference, preferenceSchema } from '@/lib/schemas/preference';
import { useUpdatePreferenceMutation } from '@/lib/user/api';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useUpdateProfileContext } from '../profile/update-profile-context';
import { toast } from '@/components/ui/use-toast';
import { setUser } from '@/lib/auth/slice';
import { useCreateMatchMutation } from '@/lib/matchmaking/api';
import AutoComplete from '@/components/ui/searchable-select';
import { countries } from '@/lib/schemas/user';
import { setQueryString } from '@/lib/matchmaking/slice';
import { cmToFeetInches, kgToPounds } from '@/lib/format';
import { languages } from '@/config/locales';

const countryOptions = Object.keys(countries).map((country) => ({
  label: country,
  value: country
}));

const martialStatusOptions = ["Single/Never Married", "Single/Legally Divorced", "Single/Islamically-Divorced", "Widowed", "Other"].map((status => ({
  label: status,
  value: status
})))

export default function MatchPreferenceFilter() {
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();

  const form = useForm<Preference>({
    resolver: zodResolver(preferenceSchema),
    defaultValues: {
      preferredAge: user?.preference?.preferredAge || [18, 100],
      preferredHeight: user?.preference?.preferredHeight || [0, 300],
      preferredWeight: user?.preference?.preferredWeight || [0, 220],
      ethnicOrigin: user?.preference?.ethnicOrigin || '',
      nationality: user?.preference?.nationality || '',
      language: user?.preference?.language || '',
      countryOfOrigin: user?.preference?.countryOfOrigin || '',
      martialStatus: user?.preference?.martialStatus || '',
      bornOrRevert: user?.preference?.bornOrRevert || '',
      hijab: user?.preference?.hijab || '',
      children: user?.preference?.children || '',
      wantsChildren: user?.preference?.wantsChildren || '',
      education: user?.preference?.education || '',
      profession: user?.preference?.profession || '',
      drinking: user?.preference?.drinking || false,
      smoking: user?.preference?.smoking || false,
      tattoos: user?.preference?.tattoos || false,
    },
  });

  useEffect(() => {
    if (user && user.preference) {
      form.reset({
        preferredAge: user?.preference?.preferredAge || [18, 100],
        preferredHeight: user?.preference?.preferredHeight || [0, 300],
        preferredWeight: user?.preference?.preferredWeight || [0, 300],
        ethnicOrigin: user?.preference?.ethnicOrigin || '',
        nationality: user?.preference?.nationality || '',
        language: user?.preference?.language || '',
        countryOfOrigin: user?.preference?.countryOfOrigin || '',
        martialStatus: user?.preference?.martialStatus || '',
        bornOrRevert: user?.preference?.bornOrRevert || '',
        hijab: user?.preference?.hijab || '',
        children: user?.preference?.children || '',
        wantsChildren: user?.preference?.wantsChildren || '',
        education: user?.preference?.education || '',
        profession: user?.preference?.profession || '',
        drinking: user?.preference?.drinking || false,
        smoking: user?.preference?.smoking || false,
        tattoos: user?.preference?.tattoos || false,
      })
    }
  }, [form, user]);

  const preferenceFormRef = useRef<HTMLFormElement>(null);
  const { registerForm, setSaving } = useUpdateProfileContext()
  useEffect(() => {
    if (preferenceFormRef && preferenceFormRef.current) {
      registerForm('preferenceForm', preferenceFormRef.current);
    }
  }, [preferenceFormRef, registerForm]);

  const [updatePreference, updateResult] = useUpdatePreferenceMutation()
  const [createMatch, createResult] = useCreateMatchMutation()

  useEffect(() => {
    setSaving(updateResult.isLoading || createResult.isLoading);
  }, [updateResult, createResult, setSaving])

  useEffect(() => {
    if (updateResult.isSuccess) {
      toast({
        title: 'Success',
        description: 'Preference updated successfully',
      });
      dispatch(setUser({ ...user, preference: updateResult.data }));
      createMatch(getQueryString(form.getValues()));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateResult, dispatch])

  useEffect(() => {
    if (createResult.isSuccess) {
      toast({
        title: 'Success',
        description: 'You have been matched successfully',
      });
    } else if (createResult.isError) {
      toast({
        title: 'Match status',
        description: 'Finding you a match message, we will notify you soon.',
      });
    }
  }, [createResult])

  const onSubmit = (data: Preference) => {
    updatePreference({
      preferredAge: isAgeAny ? null : data.preferredAge,
      preferredHeight: isHeightAny ? null : data.preferredHeight,
      preferredWeight: isWeightAny ? null : data.preferredWeight,
      ethnicOrigin: isEthniOriginAny ? null : data.ethnicOrigin,
      nationality: isNationalityAny ? null : data.nationality,
      language: isLanguageAny ? null : data.language,
      countryOfOrigin: isCountryOfOriginAny ? null : data.countryOfOrigin,
      martialStatus: isMartialStatusAny ? null : data.martialStatus,
      bornOrRevert: isBornOrRevertAny ? null : data.bornOrRevert,
      hijab: isHijabAny ? null : data.hijab,
      children: isChildrenAny ? null : data.children,
      wantsChildren: isWantsChildrenAny ? null : data.wantsChildren,
      education: isEducationAny ? null : data.education,
      profession: isProfessionAny ? null : data.profession,
      drinking: isDrinkingAny ? null : data.drinking,
      smoking: isSmokingAny ? null : data.smoking,
      tattoos: isTattooAny ? null : data.tattoos,
    } as unknown as any);
  }

  const isWeightAny = form.watch('preferredWeight')?.[0] === 0 && form.watch('preferredWeight')?.[1] === 300;
  const isHeightAny = form.watch('preferredHeight')?.[0] === 0 && form.watch('preferredHeight')?.[1] === 300;
  const isAgeAny = form.watch('preferredAge')?.[0] === 18 && form.watch('preferredAge')?.[1] === 100;
  const isLanguageAny = form.watch('language') === '';
  const isEthniOriginAny = form.watch('ethnicOrigin') === '';
  const isNationalityAny = form.watch('nationality') === '';
  const isCountryOfOriginAny = form.watch('countryOfOrigin') === '';
  const isMartialStatusAny = form.watch('martialStatus') === '';
  const isBornOrRevertAny = form.watch('bornOrRevert') === '';
  const isHijabAny = form.watch('hijab') === '';
  const isChildrenAny = form.watch('children') === '';
  const isWantsChildrenAny = form.watch('wantsChildren') === '';
  const isEducationAny = form.watch('education') === '';
  const isProfessionAny = form.watch('profession') === '';
  const isDrinkingAny = form.watch('drinking') === ('' as unknown as boolean)
  const isSmokingAny = form.watch('smoking') === ('' as unknown as boolean)
  const isTattooAny = form.watch('tattoos') === ('' as unknown as boolean)


  const getQueryString = (data: Preference) => {
    const filter = []

    if (user) {
      filter.push(`gender:neq:${user.gender}`)
    }

    if (!isAgeAny) {
      const [minAge, maxAge] = data.preferredAge
      filter.push(`age:lte:${maxAge},age:gte:${minAge}`)
    }

    if (!isHeightAny) {
      const [minHeight, maxHeight] = data.preferredHeight
      filter.push(`height:lte:${maxHeight},height:gte:${minHeight}`)
    }

    if (!isWeightAny) {
      const [minWeight, maxWeight] = data.preferredWeight
      filter.push(`weight:lte:${maxWeight},weight:gte:${minWeight}`)
    }

    if (!isEthniOriginAny) {
      filter.push(`ethnicOrigin:like:${data.ethnicOrigin}`)
    }

    if (!isNationalityAny) {
      filter.push(`nationality:like:${data.nationality}`)
    }

    if (!isLanguageAny) {
      filter.push(`language:like:${data.language}`)
    }

    if (!isCountryOfOriginAny) {
      filter.push(`country:like:${data.countryOfOrigin}`)
    }

    if (!isMartialStatusAny) {
      filter.push(`martialStatus:like:${data.martialStatus}`)
    }

    if (!isBornOrRevertAny) {
      filter.push(`bornOrRevert:like:${data.bornOrRevert}`)
    }

    if (!isHijabAny) {
      filter.push(`hijab:like:${data.hijab}`)
    }

    if (!isDrinkingAny) {
      filter.push(`drinks:eq:${data.drinking}`)
    }

    if (!isSmokingAny) {
      filter.push(`smokes:eq:${data.smoking}`)
    }

    if (!isTattooAny) {
      filter.push(`tattoos:eq:${data.tattoos}`)
    }

    return `filter=${filter.join(',')}`
  }

  dispatch(setQueryString(getQueryString(form.getValues())));

  return (
    <Form {...form}>
      <form
        ref={preferenceFormRef}
        onSubmit={form.handleSubmit(onSubmit)}
        className="col-span-9 grid grid-cols-2 md:grid-cols-subgrid gap-x-4 gap-y-5 text-secondary">
        <div className="space-y-2 col-span-9 md:col-span-3">
          <Label className="text-xs flex justify-between items-center" onClick={() => form.setValue('preferredAge', [18, 100])}>
            <span className="font-bold line-clamp-1">Preferred Age</span>
            <span className="flex gap-1 items-center justify-center text-[0.65rem]">
              <Input type="checkbox" className="p-0 m-0 h-fit" checked={isAgeAny} onChange={() => { }} />
              <span>Any</span>
            </span>
          </Label>
          <FormField
            name="preferredAge"
            control={form.control}
            render={({ field }) => (<>
              <Slider value={field.value} onValueChange={field.onChange} min={18} max={100} step={1} />
              <div className="text-[0.7rem] flex gap-1 text-primary font-bold justify-center">
                <span>{field.value?.join(' - ')}</span>
              </div>
            </>)}
          />

        </div>
        <div className="space-y-2 col-span-9 md:col-span-3">
          <Label className="text-xs flex justify-between items-center" onClick={() => form.setValue('preferredHeight', [0, 300])}>
            <span className="font-bold line-clamp-1 ">Height</span>
            <span className="flex gap-1 items-center justify-center text-[0.65rem]">
              <Input type="checkbox" className="p-0 m-0 h-fit" checked={isHeightAny} onChange={() => { }} />
              <span>Any</span>
            </span>
          </Label>
          <FormField
            name="preferredHeight"
            control={form.control}
            render={({ field }) => (<>
              <Slider value={field.value} onValueChange={field.onChange} max={300} step={1} />
              <div className="text-[0.7rem] flex gap-1 text-primary font-bold justify-center">
                <span>{field.value && field.value[0]} cm </span>
                <span>-</span>
                <span>{field.value && field.value[1]} cm</span>
                |
                <span>{field.value && cmToFeetInches(field.value[0])} </span>
                <span>-</span>
                <span>{field.value && cmToFeetInches(field.value[1])}</span>
              </div>
            </>)}
          />
        </div>

        <div className="space-y-2 col-span-9 md:col-span-3">
          <Label className="text-xs flex justify-between items-center" onClick={() => { form.setValue('preferredWeight', [0, 300]) }}>
            <span className="font-bold line-clamp-1 ">Weight</span>
            <span className="flex gap-1 items-center justify-center text-[0.65rem]">
              <Input type="checkbox" className="p-0 m-0 h-fit" checked={isWeightAny} onChange={() => { }} />
              <span>Any</span>
            </span>
          </Label>
          <FormField
            name="preferredWeight"
            control={form.control}
            render={({ field }) => (
              <>
                <Slider value={field.value} onValueChange={field.onChange} max={220} step={1} />
                <div className="text-[0.7rem] flex gap-1 text-primary font-bold justify-center">
                  <span>{field.value && field.value[0]} Kg</span>
                  <span>-</span>
                  <span>{field.value && field.value[1]} Kg</span>
                  |
                  <span>{field.value && kgToPounds(field.value[0])}</span>
                  <span>-</span>
                  <span>{field.value && kgToPounds(field.value[1])}</span>
                </div>
              </>)
            }
          />
        </div>

        <div className="space-y-2 col-span-9 md:col-span-3">
          <Label className="text-xs flex justify-between items-center" onClick={() => form.setValue('nationality', '')}>
            <span className="font-bold line-clamp-1">Nationality/Passport</span>
            <span className="flex gap-1 items-center justify-center text-[0.65rem]">
              <Input type="checkbox" className="p-0 m-0 h-fit" checked={isNationalityAny} onChange={() => { }} />
              <span>Any</span>
            </span>
          </Label>
          <FormField
            name='nationality'
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <AutoComplete onChange={field.onChange} selectedOption={field.value} options={countryOptions} placeholder='' className="shadow text-muted-foreground bg-background text-xs rounded-sm h-8 ring-transparent ring-offset-transparent" />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>)}
          />
        </div>

        <div className="space-y-2 col-span-9 md:col-span-3">
          <Label className="text-xs flex justify-between items-center" onClick={() => form.setValue('language', '')}>
            <span className="font-bold line-clamp-1">Languages</span>
            <span className="flex gap-1 items-center justify-center text-[0.65rem]">
              <Input type="checkbox" className="p-0 m-0 h-fit" checked={isLanguageAny} onChange={() => { }} />
              <span>Any</span>
            </span>
          </Label>
          <FormField
            name='language'
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="shadow text-muted-foreground bg-background text-xs rounded-sm h-8 ring-transparent ring-offset-transparent">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {languages.map((l) => <SelectItem key={l.value} className="text-sm max-w-80" value={l.value}>{l.label}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>)}
          />
        </div>

        <div className="space-y-2 col-span-9 md:col-span-3">
          <Label className="text-xs flex justify-between items-center" onClick={() => form.setValue('countryOfOrigin', '')}>
            <span className="font-bold line-clamp-1">Country of Origin</span>
            <span className="flex gap-1 items-center justify-center text-[0.65rem]">
              <Input type="checkbox" className="p-0 m-0 h-fit" checked={isCountryOfOriginAny} onChange={() => { }} />
              <span>Any</span>
            </span>
          </Label>
          <FormField
            name='countryOfOrigin'
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <AutoComplete onChange={field.onChange} selectedOption={field.value} options={countryOptions} placeholder='' className="shadow text-muted-foreground bg-background text-xs rounded-sm h-8 ring-transparent ring-offset-transparent" />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>)}
          />
        </div>

        <div className="space-y-2 col-span-9 md:col-span-3">
          <Label className="text-xs flex justify-between items-center" onClick={() => form.setValue('martialStatus', '')}>
            <span className="font-bold line-clamp-1">Martial Status</span>
            <span className="flex gap-1 items-center justify-center text-[0.65rem]">
              <Input type="checkbox" className="p-0 m-0 h-fit" checked={isMartialStatusAny} onChange={() => { }} />
              <span>Any</span>
            </span>
          </Label>
          <FormField
            name='martialStatus'
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <AutoComplete onChange={field.onChange} selectedOption={field.value} options={martialStatusOptions} placeholder='' className="shadow text-muted-foreground bg-background text-xs rounded-sm h-8 ring-transparent ring-offset-transparent" />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>)}
          />
        </div>

        <div className="space-y-2 col-span-9 md:col-span-3">
          <Label className="text-xs flex justify-between items-center">
            <span className="font-bold line-clamp-1">Salat/Prayer</span>
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

        <div className="space-y-2 col-span-9 md:col-span-3">
          <Label className="text-xs flex justify-between items-center" onClick={() => form.setValue('bornOrRevert', '')}>
            <span className="font-bold line-clamp-1">Born/Reverted</span>
            <span className="flex gap-1 items-center justify-center text-[0.65rem]">
              <Input type="checkbox" className="p-0 m-0 h-fit" checked={isBornOrRevertAny} onChange={() => { }} />
              <span>Any</span>
            </span>
          </Label>
          <FormField
            name='bornOrRevert'
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value?.toString()}>
                    <SelectTrigger className="shadow text-muted-foreground bg-background text-xs rounded-sm h-8 ring-transparent ring-offset-transparent">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>

                      <SelectItem value="true">Born Muslim</SelectItem>
                      <SelectItem value="false">Reverted to Islam</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>)}
          />
        </div>

        <div className="space-y-2 col-span-9 md:col-span-3">
          <Label className="text-xs flex justify-between items-center" onClick={() => form.setValue('hijab', '')}>
            <span className="font-bold line-clamp-1">Hijab</span>
            <span className="flex gap-1 items-center justify-center text-[0.65rem]">
              <Input type="checkbox" className="p-0 m-0 h-fit" checked={isHijabAny} onChange={() => { }} />
              <span>Any</span>
            </span>
          </Label>
          <FormField
            name='hijab'
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="shadow text-muted-foreground bg-background text-xs rounded-sm h-8 ring-transparent ring-offset-transparent">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>

                      <SelectItem value="Wife must do Advanced Hijab (Niqab or burqa, possibly with gloves, often with eyes not visible)">Wife must do Advanced Hijab (Niqab or burqa, possibly with gloves, often with eyes not visible)</SelectItem>
                      <SelectItem value="Wife must do Minimum Hijab (Basic Islamic attire with long dress/skirt, or loose clothing with long sleeves. Face and hands visible)">Wife must do Minimum Hijab (Basic Islamic attire with long dress/skirt, or loose clothing with long sleeves. Face and hands visible)</SelectItem>
                      <SelectItem value="Wife may do Partial Hijab (Headscarf like a turban revealing neck. Tight clothing showing shape of body)">Wife may do Partial Hijab (Headscarf like a turban revealing neck. Tight clothing showing shape of body)</SelectItem>
                      <SelectItem value="No Hijab (Don't need or want wife to wear Hijab)">No Hijab (Don&apos;t need or want wife to wear Hijab)</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>)}
          />
        </div>

        <div className="space-y-2 col-span-9 md:col-span-3">
          <Label className="text-xs flex justify-between items-center" onClick={() => form.setValue('children', '')}>
            <span className="font-bold line-clamp-1">Children</span>
            <span className="flex gap-1 items-center justify-center text-[0.65rem]">
              <Input type="checkbox" className="p-0 m-0 h-fit" checked={isChildrenAny} onChange={() => { }} />
              <span>Any</span>
            </span>
          </Label>
          <FormField
            name='children'
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="shadow text-muted-foreground bg-background text-xs rounded-sm h-8 ring-transparent ring-offset-transparent">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>

                      <SelectItem value="Islamic Education/Environment Priority (Children must have Islamic school/mosque environment)">Islamic Education/Environment Priority (Children must have Islamic school/mosque environment)</SelectItem>
                      <SelectItem value="Joint Decision (Open to discussing children's Islamic education with future wife)">Joint Decision (Open to discussing children&apos;s Islamic education with future wife)</SelectItem>
                      <SelectItem value="Undecided (Has not decided yet about the Islamic education of children)">Undecided (Has not decided yet about the Islamic education of children)</SelectItem>
                      <SelectItem value="Secular Upbringing (Prefers children not to attend Islamic school or masjid; Islamic education not a priority)">Secular Upbringing (Prefers children not to attend Islamic school or masjid; Islamic education not a priority)</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>)}
          />
        </div>

        <div className="space-y-2 col-span-9 md:col-span-3">
          <Label className="text-xs flex justify-between items-center" onClick={() => form.setValue('wantsChildren', '')}>
            <span className="font-bold line-clamp-1">Wants Children</span>
            <span className="flex gap-1 items-center justify-center text-[0.65rem]">
              <Input type="checkbox" className="p-0 m-0 h-fit" checked={isWantsChildrenAny} onChange={() => { }} />
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

        <div className="space-y-2 col-span-9 md:col-span-3">
          <Label className="text-xs flex justify-between items-center" onClick={() => form.setValue('education', '')}>
            <span className="font-bold line-clamp-1">Education</span>
            <span className="flex gap-1 items-center justify-center text-[0.65rem]">
              <Input type="checkbox" className="p-0 m-0 h-fit" checked={isEducationAny} onChange={() => { }} />
              <span>Any</span>
            </span>
          </Label>
          <FormField
            name='education'
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="shadow text-muted-foreground bg-background text-xs rounded-sm h-8 ring-transparent ring-offset-transparent">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem className="text-sm max-w-80" value="High school">High school</SelectItem>
                      <SelectItem className="text-sm max-w-80" value="Diploma">Diploma</SelectItem>
                      <SelectItem className="text-sm max-w-80" value="Non-Degree Qualified">Non-Degree Qualified</SelectItem>
                      <SelectItem className="text-sm max-w-80" value="Bachelor's degree">Bachelor&apos;s degree</SelectItem>
                      <SelectItem className="text-sm max-w-80" value="Masters">Masters</SelectItem>
                      <SelectItem className="text-sm max-w-80" value="PHD/Doctorate">PHD/Doctorate</SelectItem>
                      <SelectItem className="text-sm max-w-80" value="Currently Studying">Currently Studying</SelectItem>
                      <SelectItem className="text-sm max-w-80" value="None of the above">None of the above</SelectItem>
                    </SelectContent>
                  </Select></FormControl>
                <FormMessage className="text-xs" />
              </FormItem>)}
          />
        </div>

        <div className="space-y-2 col-span-9 md:col-span-3">
          <Label className="text-xs flex justify-between items-center" onClick={() => form.setValue('profession', '')}>
            <span className="font-bold line-clamp-1">Profession</span>
            <span className="flex gap-1 items-center justify-center text-[0.65rem]">
              <Input type="checkbox" className="p-0 m-0 h-fit" checked={isProfessionAny} onChange={() => { }} />
              <span>Any</span>
            </span>
          </Label>
          <FormField
            name='profession'
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="shadow text-muted-foreground bg-background text-xs rounded-sm h-8 ring-transparent ring-offset-transparent">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>

                      <SelectItem value="Web & Graphic Designer">Web & Graphic Designer</SelectItem>
                      <SelectItem value="Software Engineer">Software Engineer</SelectItem>
                      <SelectItem value="Doctor">Doctor</SelectItem>
                      <SelectItem value="Nurse">Nurse</SelectItem>
                      <SelectItem value="Teacher">Teacher</SelectItem>
                      <SelectItem value="Accountant">Accountant</SelectItem>
                      <SelectItem value="Business Owner">Business Owner</SelectItem>
                      <SelectItem value="Investor">Investor</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>)}
          />
        </div>

        <div className="space-y-2 col-span-9 md:col-span-2">
          <Label className="text-xs flex justify-between items-center" onClick={() => form.setValue('drinking', ('' as unknown as boolean))}>
            <span className="font-bold line-clamp-1">Drinking</span>
            <span className="flex gap-1 items-center justify-center text-[0.65rem]">
              <Input type="checkbox" className="p-0 m-0 h-fit" checked={isDrinkingAny} onChange={() => { }} />
              <span>Any</span>
            </span>
          </Label>
          <FormField
            name='drinking'
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value?.toString()}>
                    <SelectTrigger className="shadow text-muted-foreground bg-background text-xs rounded-sm h-8 ring-transparent ring-offset-transparent">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="true">Yes</SelectItem>
                      <SelectItem value="false">No</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>)}
          />
        </div>
        <div className="space-y-2 col-span-9 md:col-span-2">
          <Label className="text-xs flex justify-between items-center" onClick={() => form.setValue('smoking', ('' as unknown as boolean))}>
            <span className="font-bold line-clamp-1">Smoking</span>
            <span className="flex gap-1 items-center justify-center text-[0.65rem]">
              <Input type="checkbox" className="p-0 m-0 h-fit" checked={isSmokingAny} onChange={() => { }} />
              <span>Any</span>
            </span>
          </Label>
          <FormField
            name='smoking'
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value?.toString()}>
                    <SelectTrigger className="shadow text-muted-foreground bg-background text-xs rounded-sm h-8 ring-transparent ring-offset-transparent">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="true">Yes</SelectItem>
                      <SelectItem value="false">No</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>)}
          />
        </div>
        <div className="space-y-2 col-span-9 md:col-span-2">
          <Label className="text-xs flex justify-between items-center" onClick={() => form.setValue('tattoos', ('' as unknown as boolean))}>
            <span className="font-bold line-clamp-1">Tattoo(s)</span>
            <span className="flex gap-1 items-center justify-center text-[0.65rem]">
              <Input type="checkbox" className="p-0 m-0 h-fit" checked={isTattooAny} onChange={() => { }} />
              <span>Any</span>
            </span>
          </Label>
          <FormField
            name='tattoos'
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value?.toString()}>
                    <SelectTrigger className="shadow text-muted-foreground bg-background text-xs rounded-sm h-8 ring-transparent ring-offset-transparent">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="true">Yes</SelectItem>
                      <SelectItem value="false">No</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>)}
          />
        </div>
      </form >
    </Form >
  );
}
