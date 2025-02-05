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
import Multiselect from '@/components/ui/multi-select';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import {
  heights,
  UserBasicInformation,
  userBasicInformationSchema,
  weights,
} from '@/lib/schemas/user';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useUpdateProfileContext } from '@/components/dashboard/profile/update-profile-context';
import { useUpdateUserMutation } from '@/lib/user/api';
import { toast } from '@/components/ui/use-toast';
import { setUser } from '@/lib/auth/slice';
import PhotoUploader from './photo-uploader';
import { languages } from '@/config/locales';
import ChildrenStatus from '@/components/registration/children-status';
import { Calendar } from '@/components/ui/calendar';
import { CalendarIcon } from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { getEighteenYearsAgo } from '@/lib/format';
import CountrySelector from '@/components/ui/country-selector';
import useLocation from '@/lib/hooks/use-location';
import { useProfileCompletion } from '@/lib/hooks/profile-completion';

export default function BasicInformationForm() {
  const user = useAppSelector((state) => state.auth.user);
  const form = useForm<UserBasicInformation>({
    resolver: zodResolver(userBasicInformationSchema),
    defaultValues: {
      id: user?.id ?? '',
      firstName: user?.firstName ?? '',
      lastName: user?.lastName ?? '',
      dateOfBirth: user?.dateOfBirth
        ? new Date(user?.dateOfBirth)
        : getEighteenYearsAgo(),
      gender: user?.gender ?? '',
      height: user?.height ?? 0,
      weight: user?.weight ?? 0,
      country: user?.country ?? '',
      skinColor: user?.skinColor ?? '',
      languages: user?.languages ?? [],
      nationality: user?.nationality ?? '',
      currentCountry: user?.currentCountry ?? '',
      city: user?.city ?? '',
      hasChildren: user?.hasChildren ?? '',
      numberOfChildren: user?.numberOfChildren ?? 0,
      ageOfOldestChild: user?.ageOfOldestChild ?? 0,
      ageOfYoungestChild: user?.ageOfYoungestChild ?? 0,
      sunniMadhaib: user?.sunniMadhaib ?? '',
      religiousPractice: user?.religiousPractice ?? '',
      bornOrRevertToIslam: user?.bornOrRevertToIslam ?? '',
      drinks: user?.drinks ?? false,
      drugs: user?.drugs ?? false,
      smokes: user?.smokes ?? false,
      tattoos: user?.tattoos ?? 'None',
      email: user?.email ?? '',
      maritalStatus: user?.maritalStatus ?? '',
      pictures: user?.pictures ?? ['', '', '', '', '', '', '', ''],
      video: user?.video ?? '',
      phoneNumber: user?.phoneNumber ?? '',
    },
  });

  const [updateUser, updateResult] = useUpdateUserMutation();

  const { basics } = useProfileCompletion(user);

  const locationInputRef = useRef<HTMLInputElement>(null);
  const { location, onLocationChange, isLoaded, setLocation } =
    useLocation(locationInputRef);

  useEffect(() => {
    form.reset({
      ...user,
      dateOfBirth: user?.dateOfBirth
        ? new Date(user?.dateOfBirth)
        : getEighteenYearsAgo(),
      languages: user?.languages ?? [],
      pictures: user?.pictures ?? ['', '', '', '', '', '', '', ''],
    });

    if (user) {
      setLocation({
        country: user.currentCountry,
        city: user.city,
      });
    }

    if (user?.pictures && user.pictures.length < 8) {
      const pics = [...user.pictures];
      for (let i = pics.length; i < 8; i++) {
        pics.push('');
      }
      form.setValue('pictures', pics);
    }
  }, [form, user, setLocation]);

  useEffect(() => {
    form.setValue('currentCountry', location?.country);
    form.setValue('city', location?.city);
  }, [location, form]);

  const basicInfoFormRef = useRef<HTMLFormElement>(null);
  const { registerForm, setSaving } = useUpdateProfileContext();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (basicInfoFormRef && basicInfoFormRef.current) {
      registerForm('basicInformationForm', basicInfoFormRef.current);
    }
  }, [basicInfoFormRef, registerForm]);

  const onSubmit = (data: any) => {
    updateUser({ user: data });
  };

  useEffect(() => {
    if (updateResult.isSuccess) {
      toast({
        title: 'Success',
        description: 'Basic information updated successfully',
      });
      dispatch(setUser({ ...user, ...updateResult.data }));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateResult, dispatch]);

  useEffect(() => {
    setSaving(updateResult.isLoading);
  }, [updateResult, setSaving]);

  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const disableForm = !!(basics >= 100 && user?.isMatched);

  return (
    <div className="px-6 sm:px-16 md:px-[3rem] lg:px-[5rem] 2xl:px-[15rem] 3xl:px-[20rem] grid grid-cols-12 lg:grid-cols-4 gap-x-5 gap-y-4 py-8 text-md">
      <div className="col-span-12 lg:col-span-1">
        <FormField
          name="pictures"
          control={form.control}
          render={({ field }) => {
            const pictureField = field;
            return (
              <FormField
                name="video"
                control={form.control}
                render={({ field }) => (
                  <PhotoUploader
                    onChange={pictureField.onChange}
                    images={pictureField.value}
                    video={field.value}
                    onVideoChange={field.onChange}
                  />
                )}
              />
            );
          }}
        />
      </div>

      <Form {...form}>
        <form
          ref={basicInfoFormRef}
          onSubmit={form.handleSubmit(onSubmit)}
          className="col-span-12 lg:col-span-3 grid grid-cols-4 gap-x-5 gap-y-4 h-fit"
        >
          <div className="col-span-4 sm:col-span-2 flex gap-5 items-center h-fit">
            <Label>First Name</Label>
            <FormField
              name="firstName"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      className="bg-muted text-muted-foreground border-none"
                      {...field}
                      disabled
                    />
                  </FormControl>
                  <FormMessage className="text-md" />
                </FormItem>
              )}
            />
          </div>

          <div className="col-span-4 sm:col-span-2 flex gap-5 items-center h-fit">
            <Label>Last Name</Label>
            <FormField
              name="lastName"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      className="bg-muted text-muted-foreground border-none"
                      {...field}
                      disabled
                    />
                  </FormControl>
                  <FormMessage className="text-md" />
                </FormItem>
              )}
            />
          </div>

          <div className="space-y-1 col-span-4 sm:col-span-1">
            <Label>Date of Birth</Label>
            <FormField
              control={form.control}
              name="dateOfBirth"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <Popover
                    open={isCalendarOpen}
                    onOpenChange={setIsCalendarOpen}
                  >
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={'outline'}
                          className={cn(
                            'shadow w-full pl-3 text-left font-normal h-8 rounded-sm text-md text-muted-foreground'
                          )}
                          disabled={true}
                        >
                          {field.value ? (
                            format(field.value, 'PPP')
                          ) : (
                            <span>Date of Birth</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <div className="relative h-72 overflow-auto p-2">
                        <Select
                          onValueChange={(value) => {
                            field.onChange(new Date(value));
                          }}
                        >
                          <SelectTrigger className="z-50 sticky top-0 bg-background h-10 py-1">
                            <SelectValue placeholder="Select Year" />
                          </SelectTrigger>
                          <SelectContent position="popper">
                            {Array.from(
                              { length: 100 },
                              (_, i) => getEighteenYearsAgo().getFullYear() - i
                            ).map((year) => (
                              <SelectItem key={year} value={year.toString()}>
                                {year}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>

                        <Calendar
                          key={field.value?.toString() ?? 'date_of_birth'}
                          mode="single"
                          selected={field.value}
                          onSelect={(value) => {
                            field.onChange(value);
                            setIsCalendarOpen(false);
                          }}
                          disabled={(date) =>
                            date > getEighteenYearsAgo() ||
                            date < new Date('1900-01-01')
                          }
                          defaultMonth={field.value}
                        />
                      </div>
                    </PopoverContent>
                  </Popover>

                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
          </div>

          <div className="space-y-1 col-span-4 sm:col-span-1">
            <Label>Gender</Label>
            <FormField
              name="gender"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                      disabled
                    >
                      <SelectTrigger className="shadow text-muted-foreground bg-background text-md rounded-sm h-8 ring-transparent ring-offset-transparent">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem className="text-sm " value="Male">
                          Male
                        </SelectItem>
                        <SelectItem className="text-sm " value="Female">
                          Female
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage className="text-md" />
                </FormItem>
              )}
            />
          </div>

          <div className="space-y-1 col-span-4 sm:col-span-1">
            <Label>Height</Label>
            <FormField
              name="height"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value ? field.value.toString() : ''}
                      disabled={disableForm}
                    >
                      <SelectTrigger className="shadow text-muted-foreground bg-background text-md rounded-sm h-8 ring-transparent ring-offset-transparent">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="max-h-64">
                        {Object.keys(heights).map((h, i) => (
                          <SelectItem className="text-sm " key={i} value={h}>
                            {heights[h]}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage className="text-md" />
                </FormItem>
              )}
            />
          </div>

          <div className="space-y-1 col-span-4 sm:col-span-1">
            <Label>Weight</Label>
            <FormField
              name="weight"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value ? field.value.toString() : ''}
                      disabled={disableForm}
                    >
                      <SelectTrigger className="shadow text-muted-foreground bg-background text-md rounded-sm h-8 ring-transparent ring-offset-transparent">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="max-h-64">
                        {Object.keys(weights).map((w, i) => (
                          <SelectItem className="text-sm " key={i} value={w}>
                            {weights[w]}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage className="text-md" />
                </FormItem>
              )}
            />
          </div>

          <div className="space-y-1 col-span-4 sm:col-span-2">
            <Label>Country of Origin</Label>
            <FormField
              name="country"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <CountrySelector
                      value={field.value}
                      onChange={field.onChange}
                      disabled={disableForm}
                    />
                  </FormControl>
                  <FormMessage className="text-md" />
                </FormItem>
              )}
            />
          </div>

          <div className="space-y-1 col-span-4 sm:col-span-2">
            <Label>Language(s)</Label>
            <FormField
              name="languages"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Multiselect
                      onChange={field.onChange}
                      selectedOptions={field.value}
                      disabled={disableForm}
                      title="Language"
                      max={5}
                      initOptions={languages}
                      placeholder="Select"
                      className="shadow text-muted-foreground bg-background text-md rounded-sm h-8 ring-transparent ring-offset-transparent"
                    />
                  </FormControl>
                  <FormMessage className="text-md" />
                </FormItem>
              )}
            />
          </div>
          <div className="space-y-1 col-span-4 sm:col-span-2">
            <Label>Nationality/Passport</Label>
            <FormField
              name="nationality"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <CountrySelector
                      value={field.value}
                      onChange={field.onChange}
                      disabled={disableForm}
                    />
                  </FormControl>
                  <FormMessage className="text-md" />
                </FormItem>
              )}
            />
          </div>
          {isLoaded && (
            <>
              <div className="space-y-1 col-span-4 sm:col-span-2">
                <Label>Current City</Label>
                <FormField
                  name="city"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          ref={locationInputRef}
                          name={field.name}
                          value={location.city || ''}
                          onChange={onLocationChange}
                          className="shadow text-muted-foreground bg-background text-md rounded-sm h-8 ring-transparent ring-offset-transparent"
                          disabled={disableForm}
                        />
                      </FormControl>
                      <FormMessage className="text-md" />
                    </FormItem>
                  )}
                />
              </div>
            </>
          )}
          <div className="space-y-1 col-span-4 sm:col-span-2">
            <Label>Marital Status</Label>
            <FormField
              name="maritalStatus"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                      disabled={disableForm}
                    >
                      <SelectTrigger className="shadow text-muted-foreground bg-background text-md rounded-sm h-8 ring-transparent ring-offset-transparent">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem
                          className="text-sm "
                          value="Single/Never Married"
                        >
                          Single/Never Married
                        </SelectItem>
                        <SelectItem
                          className="text-sm "
                          value="Single/Legally Divorced"
                        >
                          Single/Legally Divorced
                        </SelectItem>
                        <SelectItem
                          className="text-sm "
                          value="Single/Islamically-Divorced"
                        >
                          Single/Islamically-Divorced
                        </SelectItem>
                        <SelectItem className="text-sm " value="Widowed">
                          Widowed
                        </SelectItem>
                        <SelectItem className="text-sm " value="Other">
                          Other
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage className="text-md" />
                </FormItem>
              )}
            />
          </div>

          <div className="space-y-1 col-span-4 sm:col-span-2">
            <Label>Do you have children?</Label>
            <FormField
              name="hasChildren"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Select
                      onValueChange={(value) => {
                        field.onChange(value);
                        if (value === 'No kids') {
                          form.setValue('numberOfChildren', 0);
                          form.setValue('ageOfOldestChild', 0);
                          form.setValue('ageOfYoungestChild', 0);
                        }
                      }}
                      value={field.value}
                      disabled={disableForm}
                    >
                      <SelectTrigger className="shadow text-muted-foreground bg-background text-md rounded-sm h-8 ring-transparent ring-offset-transparent">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem className="text-sm " value="No kids">
                          No kids
                        </SelectItem>
                        <SelectItem
                          className="text-sm "
                          value="Yes but not with me"
                        >
                          Yes but not with me
                        </SelectItem>
                        <SelectItem
                          className="text-sm "
                          value="Yes 20%+ Shared parenting"
                        >
                          Yes 20%+ Shared Parenting
                        </SelectItem>
                        <SelectItem
                          className="text-sm "
                          value="Yes: 50%+ Joint-Shared Parenting"
                        >
                          Yes: 50%+ Joint-Shared Parenting
                        </SelectItem>
                        <SelectItem
                          className="text-sm "
                          value="Yes Full-Time Single Parent"
                        >
                          Yes Full-Time Single Parent
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage className="text-md" />
                </FormItem>
              )}
            />
          </div>

          <ChildrenStatus />

          <div className="col-span-4 grid grid-cols-4 sm:grid-cols-8 gap-x-5 gap-y-4">
            <div className="space-y-1 col-span-4 sm:col-span-2">
              <Label>Sunni-Madhaib</Label>
              <FormField
                name="sunniMadhaib"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                        disabled={disableForm}
                      >
                        <SelectTrigger className="shadow text-muted-foreground bg-background text-md rounded-sm h-8 ring-transparent ring-offset-transparent">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem className="text-sm " value="Hanafi">
                            Hanafi
                          </SelectItem>
                          <SelectItem className="text-sm " value="Hanbali">
                            Hanbali
                          </SelectItem>
                          <SelectItem className="text-sm " value="Maliki">
                            Maliki
                          </SelectItem>
                          <SelectItem className="text-sm " value="Shafi">
                            Shafi
                          </SelectItem>
                          <SelectItem className="text-sm " value="All Four">
                            All Four
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage className="text-md" />
                  </FormItem>
                )}
              />
            </div>

            <div className="space-y-1 col-span-4 sm:col-span-3">
              <Label>Religious Practice</Label>
              <FormField
                name="religiousPractice"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                        disabled={disableForm}
                      >
                        <SelectTrigger className="shadow text-muted-foreground bg-background text-md rounded-sm h-8 ring-transparent ring-offset-transparent">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem
                            className="text-sm "
                            value="Not Practicing (never prays/non-muslim)"
                          >
                            Not Practicing (never prays/non-muslim)
                          </SelectItem>
                          <SelectItem
                            className="text-sm "
                            value="Practicing/Fardh"
                          >
                            Practicing/Fardh
                          </SelectItem>
                          <SelectItem
                            className="text-sm "
                            value="Very Practicing/Sunnah Nawafil Included"
                          >
                            Very Practicing/Sunnah Nawafil Included
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage className="text-md" />
                  </FormItem>
                )}
              />
            </div>
            <div className="space-y-1 col-span-4 sm:col-span-3">
              <Label>Born/Reverted to Islam</Label>
              <FormField
                name="bornOrRevertToIslam"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                        disabled={disableForm}
                      >
                        <SelectTrigger className="shadow text-muted-foreground bg-background text-md rounded-sm h-8 ring-transparent ring-offset-transparent">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem className="text-sm " value="Born Muslim">
                            Born Muslim
                          </SelectItem>
                          <SelectItem
                            className="text-sm "
                            value="Reverted to Islam"
                          >
                            Reverted to Islam
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage className="text-md" />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="space-y-1 col-span-4 sm:col-span-2">
            <Label>Drinking</Label>
            <FormField
              name="drinks"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value?.toString()}
                      disabled={disableForm}
                    >
                      <SelectTrigger className="shadow text-muted-foreground bg-background text-md rounded-sm h-8 ring-transparent ring-offset-transparent">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem className="text-sm" value="true">
                          Yes
                        </SelectItem>
                        <SelectItem className="text-sm" value="false">
                          No
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage className="text-md" />
                </FormItem>
              )}
            />
          </div>
          <div className="space-y-1 col-span-4 sm:col-span-2">
            <Label>
              Drugs <span className="text-nowrap">(including Cannabis)</span>
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
                      disabled={disableForm}
                    >
                      <SelectTrigger className="shadow text-muted-foreground bg-background text-md rounded-sm h-8 ring-transparent ring-offset-transparent">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem className="text-sm" value="true">
                          Yes
                        </SelectItem>
                        <SelectItem className="text-sm" value="false">
                          No
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage className="text-md" />
                </FormItem>
              )}
            />
          </div>
          <div className="space-y-1 col-span-4 sm:col-span-2">
            <Label>Smoking</Label>
            <FormField
              name="smokes"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value?.toString()}
                      disabled={disableForm}
                    >
                      <SelectTrigger className="shadow text-muted-foreground bg-background text-md rounded-sm h-8 ring-transparent ring-offset-transparent">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem className="text-sm" value="true">
                          Yes
                        </SelectItem>
                        <SelectItem className="text-sm" value="false">
                          No
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage className="text-md" />
                </FormItem>
              )}
            />
          </div>

          <div className="space-y-1 col-span-4 sm:col-span-2">
            <Label>Tattoo(s)</Label>
            <FormField
              name="tattoos"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value?.toString()}
                      disabled={disableForm}
                    >
                      <SelectTrigger className="shadow text-muted-foreground bg-background text-md rounded-sm h-8 ring-transparent ring-offset-transparent">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem className="text-sm" value="None">
                          None
                        </SelectItem>
                        <SelectItem
                          className="text-sm"
                          value="Minimal, not visible"
                        >
                          Minimal, Not Visible
                        </SelectItem>
                        <SelectItem
                          className="text-sm"
                          value="Small, visible or concealed"
                        >
                          Small, Visible or Concealed
                        </SelectItem>
                        <SelectItem
                          className="text-sm"
                          value="Large or multiple tattoos"
                        >
                          Large or Multiple
                        </SelectItem>
                        <SelectItem className="text-sm" value="Doesn’t matter">
                          Doesn’t Matter
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage className="text-md" />
                </FormItem>
              )}
            />
          </div>
        </form>
      </Form>
    </div>
  );
}
