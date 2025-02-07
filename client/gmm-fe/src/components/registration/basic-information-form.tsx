'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
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
  weights,
  userRegistrationSchema,
  UserRegistration,
} from '@/lib/schemas/user';
import { useForm } from 'react-hook-form';
import { useRegisterUserMutation } from '@/lib/user/api';
import { toast } from '@/components/ui/use-toast';
import { setUser } from '@/lib/auth/slice';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useUpdateProfileContext } from '@/components/dashboard/profile/update-profile-context';
import { languages } from '@/config/locales';
import PhotoUploader from '@/components/registration/photo-uploader';
import VideoUploader from '@/components/registration/video-uploader';
import FamilyIntroductionForm from '@/components/registration/family-form';
import ChildrenStatus from './children-status';
import { useRouter } from '@/lib/navigation';
import { Calendar } from '../ui/calendar';
import { CalendarIcon } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { getEighteenYearsAgo } from '@/lib/format';
import { FamilyIntroduction } from '@/lib/schemas/family-introduction';
import { isValidPhoneNumber } from 'react-phone-number-input';
import CountrySelector from '../ui/country-selector';
import { useLoadScript } from '@react-google-maps/api';
import { constants, mapLibraries } from '@/config';
import useLocation from '@/lib/hooks/use-location';

export default function BasicInformationForm({
  familyIntroduction,
}: {
  familyIntroduction?: FamilyIntroduction;
}) {
  const user = useAppSelector((state) => state.auth.user);
  const form = useForm<UserRegistration>({
    resolver: zodResolver(userRegistrationSchema),
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
      numberOfChildren: user?.numberOfChildren ?? 1,
      ageOfOldestChild: user?.ageOfOldestChild ?? 1,
      ageOfYoungestChild: user?.ageOfYoungestChild ?? 1,
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
      idCardImage: user?.idCardImage ?? '',
    },
  });

  useEffect(() => {
    if (familyIntroduction) {
      form.reset({
        ...form.getValues(),
        guardianEmail: familyIntroduction.guardianEmail,
        guardianFirstName: familyIntroduction.guardianFirstName,
        guardianLastName: familyIntroduction.guardianLastName,
        guardianPhoneNumber: familyIntroduction.guardianPhoneNumber,
        relationshipToGuardian: familyIntroduction.relationshipToGuardian,
      });
    }
  }, [form, familyIntroduction]);

  const locationInputRef = useRef<HTMLInputElement>(null);
  const { location, onLocationChange, isLoaded, setLocation } =
    useLocation(locationInputRef);

  const registrationFormRef = useRef<HTMLFormElement>(null);
  const { registerForm, setSaving } = useUpdateProfileContext();
  const [registerUser, registrationResult] = useRegisterUserMutation();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (registrationFormRef && registrationFormRef.current) {
      registerForm('registrationForm', registrationFormRef.current);
    }
  }, [registrationFormRef, registerForm]);

  useEffect(() => {
    if (user) {
      form.reset({
        ...form.getValues(),
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
        drinks: user?.drinks ?? false,
        drugs: user?.drugs ?? false,
        smokes: user?.smokes ?? false,
        tattoos: user?.tattoos ?? 'None',
        email: user?.email ?? '',
        maritalStatus: user?.maritalStatus ?? '',
        bornOrRevertToIslam: user.bornOrRevertToIslam ?? '',
        pictures: user?.pictures ?? ['', '', '', '', '', '', '', ''],
        video: user?.video ?? '',
        phoneNumber: user?.phoneNumber ?? '',
      });
    }

    setLocation({
      country: user?.currentCountry ?? '',
      city: user?.city ?? '',
    });
  }, [form, user, setLocation]);

  useEffect(() => {
    form.setValue('currentCountry', location?.country);
    form.setValue('city', location?.city);
  }, [location, form]);

  const onSubmit = (data: UserRegistration) => {
    try {
      if (data.gender === 'Male') {
        if (!isValidPhoneNumber(data.guardianPhoneNumber ?? '')) {
          form.setError('guardianPhoneNumber', {
            type: 'manual',
            message: 'Invalid phone number',
          });
          return;
        }

        if (!data.guardianEmail) {
          form.setError('guardianEmail', {
            type: 'manual',
            message: 'Email is required',
          });
          return;
        }

        if (!data.guardianFirstName) {
          form.setError('guardianFirstName', {
            type: 'manual',
            message: 'First name is required',
          });
          return;
        }

        if (!data.guardianLastName) {
          form.setError('guardianLastName', {
            type: 'manual',
            message: 'Last name is required',
          });
          return;
        }

        if (!data.relationshipToGuardian) {
          form.setError('relationshipToGuardian', {
            type: 'manual',
            message: 'Relationship to guardian is required',
          });
          return;
        }
      } else {
        if (!data.guardianFirstName) {
          data.guardianFirstName = data.firstName;
        }

        if (!data.guardianLastName) {
          data.guardianLastName = data.lastName;
        }

        if (!data.guardianPhoneNumber) {
          data.guardianPhoneNumber = data.phoneNumber;
        }

        if (!data.guardianEmail) {
          data.guardianEmail = data.email;
        }

        if (!data.relationshipToGuardian) {
          data.relationshipToGuardian = 'Self';
        }
      }
      registerUser(data);
    } catch (error) {
      console.log(error);
    }
  };

  const router = useRouter();

  useEffect(() => {
    if (registrationResult.isSuccess) {
      dispatch(setUser({ ...user, ...registrationResult.data }));
      toast({
        title: 'Success',
        description: 'You have been registered successfully',
      });
      router.replace('/dashboard');
    } else if (registrationResult.isError) {
      toast({
        title: 'Error',
        description: 'An error occurred while registering',
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [registrationResult, dispatch]);

  useEffect(() => {
    setSaving(registrationResult.isLoading);
  }, [registrationResult, setSaving]);

  useEffect(() => {
    if (
      form.formState.errors &&
      Object.keys(form.formState.errors).length > 0
    ) {
      toast({
        title: 'Error',
        description:
          'Please fill all required fields (' +
          Object.keys(form.formState.errors).join(', ') +
          ')',
      });
    }
  }, [form, form.formState.errors]);

  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  return (
    <Form {...form}>
      <div className="grid grid-cols-3 gap-x-5">
        <form
          ref={registrationFormRef}
          onSubmit={form.handleSubmit(onSubmit)}
          className="col-span-3 grid grid-cols-3 gap-x-4 gap-y-4"
        >
          <div className="col-span-3 grid grid-cols-3 gap-x-5 gap-y-4 h-fit">
            <div className="relative col-span-3 lg:col-span-1 gap-y-4 gap-x-5 grid grid-cols-4">
              <div className="lg:absolute top-0 col-span-4 sm:col-span-2 md:col-span-4 gap-y-4 gap-x-5 flex flex-col md:flex-row lg:flex-col items-start w-full">
                <div className="w-full">
                  <FormField
                    name="pictures"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <PhotoUploader field={field} />
                        <FormMessage className="text-md" />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="w-full hidden">
                  <FormField
                    name="video"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <VideoUploader field={field} />
                        <FormMessage className="text-md" />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>

            <div className="hidden md:block lg:hidden col-span-1"></div>
            <div className="col-span-3 lg:col-span-2 grid grid-cols-4 gap-y-4 gap-x-5 h-fit">
              <div className="col-span-4 flex flex-col sm:flex-row justify-between items-center border-b border-b-secondary pb-1">
                <h1 className="text-primary text-xl font-bold">
                  Basic Information
                </h1>
                <span className="text-destructive font-bold text-xs">
                  Please Answer All Questions Accurately
                </span>
              </div>
              <div className="col-span-4 sm:col-span-2 space-y-1 py-2 items-center h-fit">
                <Label>First Name</Label>
                <FormField
                  name="firstName"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          className="text-muted-foreground bg-background text-md shadow rounded-sm"
                          {...field}
                          disabled={
                            !(user?.firstName === '' || !user?.firstName)
                          }
                        />
                      </FormControl>
                      <FormMessage className="text-md" />
                    </FormItem>
                  )}
                />
              </div>

              <div className="col-span-4 sm:col-span-2 space-y-1 py-2 items-center h-fit">
                <Label>Last Name</Label>
                <FormField
                  name="lastName"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          className="text-muted-foreground bg-background text-md shadow rounded-sm"
                          {...field}
                          disabled={!(user?.lastName === '' || !user?.lastName)}
                        />
                      </FormControl>
                      <FormMessage className="text-md" />
                    </FormItem>
                  )}
                />
              </div>

              <div className="space-y-1 py-2 col-span-4 lg:col-span-1">
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
                              disabled={!!user?.dateOfBirth}
                              variant={'outline'}
                              className={cn(
                                'shadow w-full pl-3 text-left font-normal h-8 rounded-sm text-md text-muted-foreground'
                              )}
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
                                  (_, i) =>
                                    getEighteenYearsAgo().getFullYear() - i
                                ).map((year) => (
                                  <SelectItem
                                    key={year}
                                    value={year.toString()}
                                  >
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

                      <FormMessage className="text-md" />
                    </FormItem>
                  )}
                />
              </div>

              <div className="space-y-1 py-2 col-span-4 lg:col-span-1">
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
                          disabled={!!user?.gender}
                        >
                          <SelectTrigger className="shadow text-muted-foreground bg-background text-md rounded-sm h-8 ring-transparent ring-offset-transparent">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem className="text-md " value="Male">
                              Male
                            </SelectItem>
                            <SelectItem className="text-md " value="Female">
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

              <div className="space-y-1 py-2 col-span-4 lg:col-span-1">
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
                        >
                          <SelectTrigger className="shadow text-muted-foreground bg-background text-md rounded-sm h-8 ring-transparent ring-offset-transparent">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="max-h-64">
                            {Object.keys(heights).map((h, i) => (
                              <SelectItem
                                className="text-md "
                                key={i}
                                value={h}
                              >
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

              <div className="space-y-1 py-2 col-span-4 lg:col-span-1">
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
                        >
                          <SelectTrigger className="shadow text-muted-foreground bg-background text-md rounded-sm h-8 ring-transparent ring-offset-transparent">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="max-h-64">
                            {Object.keys(weights).map((w, i) => (
                              <SelectItem
                                className="text-md "
                                key={i}
                                value={w}
                              >
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

              <div className="space-y-1 py-2 col-span-4 sm:col-span-2">
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
                        />
                      </FormControl>
                      <FormMessage className="text-md" />
                    </FormItem>
                  )}
                />
              </div>

              <div className="space-y-1 py-2 col-span-4 sm:col-span-2">
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
              <div className="space-y-1 py-2 col-span-4 sm:col-span-2">
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
                        />
                      </FormControl>
                      <FormMessage className="text-md" />
                    </FormItem>
                  )}
                />
              </div>

              {isLoaded && (
                <div className="space-y-1 py-2 col-span-4 sm:col-span-2">
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
                          />
                        </FormControl>
                        <FormMessage className="text-md" />
                      </FormItem>
                    )}
                  />
                </div>
              )}

              <div className="space-y-1 py-2 col-span-4 sm:col-span-2">
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
                        >
                          <SelectTrigger className="shadow text-muted-foreground bg-background text-md rounded-sm h-8 ring-transparent ring-offset-transparent">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem
                              className="text-md "
                              value="Single/Never Married"
                            >
                              Single/Never Married
                            </SelectItem>
                            <SelectItem
                              className="text-md "
                              value="Single/Legally Divorced"
                            >
                              Single/Legally Divorced
                            </SelectItem>
                            <SelectItem
                              className="text-md "
                              value="Single/Islamically-Divorced"
                            >
                              Single/Islamically-Divorced
                            </SelectItem>
                            <SelectItem className="text-md " value="Widowed">
                              Widowed
                            </SelectItem>
                            <SelectItem className="text-md " value="Other">
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

              <div className="space-y-1 py-2 col-span-4 sm:col-span-2">
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
                        >
                          <SelectTrigger className="shadow text-muted-foreground bg-background text-md rounded-sm h-8 ring-transparent ring-offset-transparent">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem className="text-md " value="No kids">
                              No kids
                            </SelectItem>
                            <SelectItem
                              className="text-md "
                              value="Yes but not with me"
                            >
                              Yes but not with me
                            </SelectItem>
                            <SelectItem
                              className="text-md "
                              value="Yes 20%+ Shared parenting"
                            >
                              Yes 20%+ Shared Parenting
                            </SelectItem>
                            <SelectItem
                              className="text-md "
                              value="Yes: 50%+ Joint-Shared Parenting"
                            >
                              Yes: 50%+ Joint-Shared Parenting
                            </SelectItem>
                            <SelectItem
                              className="text-md "
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

              <div className="col-span-4 grid grid-cols-8 gap-x-5 gap-y-4">
                <div className="space-y-1 py-2 col-span-8 sm:col-span-2">
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
                          >
                            <SelectTrigger className="shadow text-muted-foreground bg-background text-md rounded-sm h-8 ring-transparent ring-offset-transparent">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem className="text-md " value="Hanafi">
                                Hanafi
                              </SelectItem>
                              <SelectItem className="text-md " value="Hanbali">
                                Hanbali
                              </SelectItem>
                              <SelectItem className="text-md " value="Maliki">
                                Maliki
                              </SelectItem>
                              <SelectItem className="text-md " value="Shafi">
                                Shafi
                              </SelectItem>
                              <SelectItem className="text-md " value="All Four">
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

                <div className="space-y-1 py-2 col-span-8 sm:col-span-3">
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
                          >
                            <SelectTrigger className="shadow text-muted-foreground bg-background text-md rounded-sm h-8 ring-transparent ring-offset-transparent">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem
                                className="text-md "
                                value="Not Practicing Never Prays/Non-Muslim"
                              >
                                Not Practicing Never Prays/Non-Muslim
                              </SelectItem>
                              <SelectItem
                                className="text-md "
                                value="Occasionally Practicing"
                              >
                                Occasionally Practicing
                              </SelectItem>
                              <SelectItem
                                className="text-md "
                                value="Practicing and Trying to Get Better"
                              >
                                Practicing and Trying to get Better
                              </SelectItem>
                              <SelectItem
                                className="text-md "
                                value="Practicing/Fardh"
                              >
                                Practicing/Fardh
                              </SelectItem>
                              <SelectItem
                                className="text-md "
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
                <div className="space-y-1 py-2 col-span-8 sm:col-span-3">
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
                            disabled={!!user?.bornOrRevertToIslam}
                          >
                            <SelectTrigger className="shadow text-muted-foreground bg-background text-md rounded-sm h-8 ring-transparent ring-offset-transparent">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem
                                className="text-md "
                                value="Born Muslim"
                              >
                                Born Muslim
                              </SelectItem>
                              <SelectItem
                                className="text-md "
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

              <div className="space-y-1 py-2 col-span-4 sm:col-span-2">
                <Label>Drinks/Alcohol</Label>
                <FormField
                  name="drinks"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value?.toString()}
                        >
                          <SelectTrigger className="shadow text-muted-foreground bg-background text-md rounded-sm h-8 ring-transparent ring-offset-transparent">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem className="text-md " value="true">
                              Yes
                            </SelectItem>
                            <SelectItem className="text-md " value="false">
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
              <div className="space-y-1 py-2 col-span-4 sm:col-span-2">
                <Label>
                  Drugs <span className="text-nowrap">(Cannabis/Cocaine)</span>
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
                          <SelectTrigger className="shadow text-muted-foreground bg-background text-md rounded-sm h-8 ring-transparent ring-offset-transparent">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem className="text-md " value="true">
                              Yes
                            </SelectItem>
                            <SelectItem className="text-md " value="false">
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
              <div className="space-y-1 py-2 col-span-4 sm:col-span-2">
                <Label>
                  Smokes <span>(Vapes/Shisha)</span>
                </Label>
                <FormField
                  name="smokes"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value?.toString()}
                        >
                          <SelectTrigger className="shadow text-muted-foreground bg-background text-md rounded-sm h-8 ring-transparent ring-offset-transparent">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem className="text-md " value="true">
                              Yes
                            </SelectItem>
                            <SelectItem className="text-md " value="false">
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

              <div className="space-y-1 py-2 col-span-4 sm:col-span-2">
                <Label>Tattoo(s)</Label>
                <FormField
                  name="tattoos"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <SelectTrigger className="shadow text-muted-foreground bg-background text-md rounded-sm h-8 ring-transparent ring-offset-transparent">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem className="text-md " value="none">
                              None
                            </SelectItem>
                            <SelectItem className="text-md " value="minimal">
                              Minimal, not visible
                            </SelectItem>
                            <SelectItem className="text-md " value="small">
                              Small, visible or concealed
                            </SelectItem>
                            <SelectItem className="text-md " value="large">
                              Large or multiple tattoos
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
          </div>
        </form>
        <div className="hidden md:block md:col-span-1"></div>
        <div className="col-span-3 lg:col-span-2 mt-8">
          <FamilyIntroductionForm />
        </div>
      </div>
    </Form>
  );
}
