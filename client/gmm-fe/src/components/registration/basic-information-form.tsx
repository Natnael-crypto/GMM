'use client'

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import Multiselect from '@/components/ui/multi-select';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { countries, heights, weights, userRegistrationSchema, UserRegistration, User } from '@/lib/schemas/user';
import { useForm } from 'react-hook-form';
import { useRegisterUserMutation } from '@/lib/user/api';
import { toast } from '@/components/ui/use-toast';
import { setUser } from '@/lib/auth/slice';
import { useEffect, useRef } from 'react';
import { useUpdateProfileContext } from '@/components/dashboard/profile/update-profile-context';
import { languages } from '@/config/locales';
import PhotoUploader from '@/components/registration/photo-uploader';
import VideoUploader from '@/components/registration/video-uploader';
import FamilyIntroductionForm from '@/components/registration/family-form';
import ChildrenStatus from './children-status';
import AutoComplete from '../ui/searchable-select';

const countryOptions = Object.keys(countries).map((country) => ({
  label: country,
  value: country
}));

const cityOptions = Object.keys(countries).flatMap(country => countries[country].map(city => ({
  label: `${city}, ${country}`,
  value: `${city}, ${country}`
})));


export default function BasicInformationForm() {
  const user = useAppSelector(state => state.auth.user);
  const form = useForm<UserRegistration>({
    resolver: zodResolver(userRegistrationSchema),
    defaultValues: {
      id: user?.id ?? '',
      firstName: user?.firstName ?? '',
      lastName: user?.lastName ?? '',
      age: user?.age ?? 0,
      gender: user?.gender ?? '',
      height: user?.height ?? 0,
      weight: user?.weight ?? 0,
      country: user?.country ?? '',
      skinColor: user?.skinColor ?? '',
      languages: user?.languages ?? [],
      nationality: user?.nationality ?? '',
      city: user?.city ?? '',
      numberOfChildren: user?.numberOfChildren ?? 0,
      ageOfOldestChild: user?.ageOfOldestChild ?? 0,
      ageOfYoungestChild: user?.ageOfYoungestChild ?? 0,
      sunniMadhaib: user?.sunniMadhaib ?? '',
      religiousPractice: user?.religiousPractice ?? '',
      bornMuslim: (user as unknown as any)?.bornOrRevertToIslam ?? true,
      drinks: user?.drinks ?? false,
      drugs: user?.drugs ?? false,
      smokes: user?.smokes ?? false,
      tattoos: user?.tattoos ?? false,
      email: user?.email ?? '',
      maritalStatus: user?.maritalStatus ?? '',
      pictures: user?.pictures ?? ['', '', '', '', '', '', '', ''],
      video: user?.video ?? '',
      phoneNumber: user?.phoneNumber ?? '',
      idCardImage: user?.idCardImage ?? '',
    }
  });


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
        id: user?.id ?? '',
        firstName: user?.firstName ?? '',
        lastName: user?.lastName ?? '',
        age: user?.age ?? 0,
        gender: user?.gender ?? '',
        height: user?.height ?? 0,
        weight: user?.weight ?? 0,
        country: user?.country ?? '',
        skinColor: user?.skinColor ?? '',
        languages: user?.languages ?? [],
        nationality: user?.nationality ?? '',
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
        tattoos: user?.tattoos ?? false,
        email: user?.email ?? '',
        maritalStatus: user?.maritalStatus ?? '',
        bornMuslim: (user as unknown as any)?.bornOrRevertToIslam ?? true,
        pictures: user?.pictures ?? ['', '', '', '', '', '', '', ''],
        video: user?.video ?? '',
        phoneNumber: user?.phoneNumber ?? '',
      })
    }
  }, [form, user]);

  const onSubmit = (data: UserRegistration) => {
    try {
      registerUser(data);
    } catch (error) { console.log(error) }
  }

  useEffect(() => {
    if (registrationResult.isSuccess) {
      dispatch(setUser({ ...user, ...registrationResult.data }));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [registrationResult, dispatch])

  useEffect(() => {
    setSaving(registrationResult.isLoading);
  }, [registrationResult, setSaving])

  useEffect(() => {
    if (form.formState.errors && Object.keys(form.formState.errors).length > 0) {
      toast({
        title: 'Error',
        description: 'Please fill all required fields (' + Object.keys(form.formState.errors).join(', ') + ')',
      });
    }
  }, [form, form.formState.errors])

  return (
    <Form {...form}>
      <div className="grid grid-cols-3 gap-x-5">
        <form
          ref={registrationFormRef}
          onSubmit={form.handleSubmit(onSubmit)}
          className="col-span-3 grid grid-cols-3 gap-x-4 gap-y-4">



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
                        <FormMessage className='text-md' />
                      </FormItem>)}
                  />
                </div>
                <div className="w-full">
                  <FormField
                    name="video"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <VideoUploader field={field} />
                        <FormMessage className='text-md' />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>

            <div className="hidden md:block lg:hidden col-span-1"></div>
            <div className='col-span-3 lg:col-span-2 grid grid-cols-4 gap-y-4 gap-x-5 h-fit'>
              <div className="col-span-4 flex flex-col sm:flex-row justify-between items-center border-b border-b-secondary pb-1">
                <h1 className="text-primary text-lg font-bold">Basic Information</h1>
                <span className="text-destructive font-bold text-xs">
                  Please Answer All Questions Accurately
                </span>
              </div>
              <div className="col-span-4 sm:col-span-2 space-y-1 py-2 items-center h-fit">
                <Label>First Name</Label>
                <FormField
                  name='firstName'
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          className="text-muted-foreground bg-background text-md shadow rounded-sm"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-md" />
                    </FormItem>)}
                />
              </div>

              <div className="col-span-4 sm:col-span-2 space-y-1 py-2 items-center h-fit">
                <Label>Last Name</Label>
                <FormField
                  name='lastName'
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          className="text-muted-foreground bg-background text-md shadow rounded-sm"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-md" />
                    </FormItem>)}
                />

              </div>

              <div className="space-y-1 py-2 col-span-2 lg:col-span-1">
                <Label>Age (Year)</Label>
                <FormField
                  name='age'
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Select onValueChange={field.onChange} value={field.value ? field.value.toString() : ''}>
                          <SelectTrigger className="shadow text-muted-foreground bg-background text-md rounded-sm h-8 ring-transparent ring-offset-transparent">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className='max-h-64'>
                            {
                              Array.from({ length: 73 }, (_, i) => i + 18).map(i => <SelectItem className="text-sm max-w-80" key={i} value={i.toString()}>{i}</SelectItem>)
                            }
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage className="text-md" />
                    </FormItem>)}
                />
              </div>

              <div className="space-y-1 py-2 col-span-2 lg:col-span-1">
                <Label>Gender</Label>
                <FormField
                  name='gender'
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <SelectTrigger className="shadow text-muted-foreground bg-background text-md rounded-sm h-8 ring-transparent ring-offset-transparent">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem className="text-sm max-w-80" value="Male">Male</SelectItem>
                            <SelectItem className="text-sm max-w-80" value="Female">Female</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage className="text-md" />
                    </FormItem>)}
                />
              </div>

              <div className="space-y-1 py-2 col-span-2 lg:col-span-1">
                <Label>Height</Label>
                <FormField
                  name='height'
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Select onValueChange={field.onChange} value={field.value ? field.value.toString() : ''}>
                          <SelectTrigger className="shadow text-muted-foreground bg-background text-md rounded-sm h-8 ring-transparent ring-offset-transparent">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className='max-h-64'>
                            {Object.keys(heights).map((h, i) => <SelectItem className="text-sm max-w-80" key={i} value={h}>{heights[h]}</SelectItem>)}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage className="text-md" />
                    </FormItem>)}
                />

              </div>

              <div className="space-y-1 py-2 col-span-2 lg:col-span-1">
                <Label>Weight</Label>
                <FormField
                  name='weight'
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Select onValueChange={field.onChange} value={field.value ? field.value.toString() : ''}>
                          <SelectTrigger className="shadow text-muted-foreground bg-background text-md rounded-sm h-8 ring-transparent ring-offset-transparent">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className='max-h-64'>
                            {Object.keys(weights).map((w, i) => <SelectItem className="text-sm max-w-80" key={i} value={w}>{weights[w]}</SelectItem>)}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage className="text-md" />
                    </FormItem>)}
                />
              </div>

              <div className="space-y-1 py-2 col-span-4 sm:col-span-2">
                <Label>Country of Origin</Label>
                <FormField
                  name='country'
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <AutoComplete onChange={field.onChange} selectedOption={field.value} options={countryOptions} placeholder='' className="shadow text-muted-foreground bg-background text-md rounded-sm h-8 ring-transparent ring-offset-transparent" />
                      </FormControl>
                      <FormMessage className="text-md" />
                    </FormItem>)}
                />
              </div>
              {/* <div className="space-y-1 py-2 col-span-4 sm:col-span-2">
                <Label>Skin Color</Label>
                <FormField
                  name='skinColor'
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <SelectTrigger className="shadow text-muted-foreground bg-background text-md rounded-sm h-8 ring-transparent ring-offset-transparent">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem className="text-sm max-w-80" value="Asian">Asian</SelectItem>
                            <SelectItem className="text-sm max-w-80" value="Black">Black</SelectItem>
                            <SelectItem className="text-sm max-w-80" value="Brown">Brown</SelectItem>
                            <SelectItem className="text-sm max-w-80" value="White">White</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage className="text-md" />
                    </FormItem>)}
                />
              </div> */}
              <div className="space-y-1 py-2 col-span-4 sm:col-span-2">
                <Label>Language(s) - Max 3</Label>
                <FormField
                  name='languages'
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Multiselect onChange={field.onChange} selectedOptions={field.value} title="Language" max={3} initOptions={languages} placeholder='Select' className="shadow text-muted-foreground bg-background text-md rounded-sm h-8 ring-transparent ring-offset-transparent" />
                      </FormControl>
                      <FormMessage className="text-md" />
                    </FormItem>)}
                />


              </div>
              <div className="space-y-1 py-2 col-span-4 sm:col-span-2">
                <Label>Nationality/Passport</Label>
                <FormField
                  name='nationality'
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <AutoComplete onChange={field.onChange} selectedOption={field.value} options={countryOptions} placeholder='' className="shadow text-muted-foreground bg-background text-md rounded-sm h-8 ring-transparent ring-offset-transparent" />
                      </FormControl>
                      <FormMessage className="text-md" />
                    </FormItem>)}
                />

              </div>
              <div className="space-y-1 py-2 col-span-4 sm:col-span-2">
                <Label>Current City</Label>
                <FormField
                  name='city'
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <AutoComplete onChange={field.onChange} selectedOption={field.value} options={cityOptions} placeholder='' className="shadow text-muted-foreground bg-background text-md rounded-sm h-8 ring-transparent ring-offset-transparent" />
                      </FormControl>
                      <FormMessage className="text-md" />
                    </FormItem>)}
                />

              </div>
              <div className="space-y-1 py-2 col-span-4 sm:col-span-2">
                <Label>Marital Status</Label>
                <FormField
                  name='maritalStatus'
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <SelectTrigger className="shadow text-muted-foreground bg-background text-md rounded-sm h-8 ring-transparent ring-offset-transparent">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem className="text-sm max-w-80" value="Single/Never Married">Single/Never Married</SelectItem>
                            <SelectItem className="text-sm max-w-80" value="Single/Legally Divorced">Single/Legally Divorced</SelectItem>
                            <SelectItem className="text-sm max-w-80" value="Single/Islamically-Divorced">Single/Islamically-Divorced</SelectItem>
                            <SelectItem className="text-sm max-w-80" value="Widowed">Widowed</SelectItem>
                            <SelectItem className="text-sm max-w-80" value="Other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage className="text-md" />
                    </FormItem>)}
                />

              </div>

              <div className="space-y-1 py-2 col-span-4 sm:col-span-2">
                <Label>Do you have children?</Label>
                <FormField
                  name='hasChildren'
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <SelectTrigger className="shadow text-muted-foreground bg-background text-md rounded-sm h-8 ring-transparent ring-offset-transparent">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem className="text-sm max-w-80" value="No kids">No kids</SelectItem>
                            <SelectItem className="text-sm max-w-80" value="Yes but not with me">Yes but not with me</SelectItem>
                            <SelectItem className="text-sm max-w-80" value="Yes 20%+ Shared parenting">Yes 20%+ Shared Parenting</SelectItem>
                            <SelectItem className="text-sm max-w-80" value="Yes: 50%+ Joint-Shared Parenting">Yes: 50%+ Joint-Shared Parenting</SelectItem>
                            <SelectItem className="text-sm max-w-80" value="Yes Full-Time Single Parent">Yes Full-Time Single Parent</SelectItem>
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
                    name='sunniMadhaib'
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <SelectTrigger className="shadow text-muted-foreground bg-background text-md rounded-sm h-8 ring-transparent ring-offset-transparent">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem className="text-sm max-w-80" value="Hanafi">Hanafi</SelectItem>
                              <SelectItem className="text-sm max-w-80" value="Hanbali">Hanbali</SelectItem>
                              <SelectItem className="text-sm max-w-80" value="Maliki">Maliki</SelectItem>
                              <SelectItem className="text-sm max-w-80" value="Shafi">Shafi</SelectItem>
                              <SelectItem className="text-sm max-w-80" value="All Four">All Four</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage className="text-md" />
                      </FormItem>)}
                  />

                </div>

                <div className="space-y-1 py-2 col-span-8 sm:col-span-3">
                  <Label>Religious Practice</Label>
                  <FormField
                    name='religiousPractice'
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <SelectTrigger className="shadow text-muted-foreground bg-background text-md rounded-sm h-8 ring-transparent ring-offset-transparent">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem className="text-sm max-w-80" value="Not Practicing Never Prays/Non-Muslim">Not Practicing Never Prays/Non-Muslim</SelectItem>
                              <SelectItem className="text-sm max-w-80" value="Occasionally Practicing">Occasionally Practicing</SelectItem>
                              <SelectItem className="text-sm max-w-80" value="Practicing and Trying to Get Better">Practicing and Trying to get Better</SelectItem>
                              <SelectItem className="text-sm max-w-80" value="Practicing/Fardh">Practicing/Fardh</SelectItem>
                              <SelectItem className="text-sm max-w-80" value="Very Practicing/Sunnah Nawafil Included">Very Practicing/Sunnah Nawafil Included</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage className="text-md" />
                      </FormItem>)}
                  />

                </div>
                <div className="space-y-1 py-2 col-span-8 sm:col-span-3">
                  <Label>
                    Born/Reverted to Islam
                  </Label>
                  <FormField
                    name='bornMuslim'
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Select onValueChange={field.onChange} value={field.value?.toString()}>
                            <SelectTrigger className="shadow text-muted-foreground bg-background text-md rounded-sm h-8 ring-transparent ring-offset-transparent">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem className="text-sm max-w-80" value="true">Born Muslim</SelectItem>
                              <SelectItem className="text-sm max-w-80" value="false">Reverted to Islam</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage className="text-md" />
                      </FormItem>)}
                  />
                </div>
              </div>

              <div className="space-y-1 py-2 col-span-2 sm:col-span-1">
                <Label>Drinks</Label>
                <FormField
                  name='drinks'
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Select onValueChange={field.onChange} value={field.value?.toString()}>
                          <SelectTrigger className="shadow text-muted-foreground bg-background text-md rounded-sm h-8 ring-transparent ring-offset-transparent">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem className="text-sm max-w-80" value="true">Yes</SelectItem>
                            <SelectItem className="text-sm max-w-80" value="false">No</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage className="text-md" />
                    </FormItem>)}
                />
              </div>
              <div className="space-y-1 py-2 col-span-2 sm:col-span-1">
                <Label>
                  Drugs{' '}
                  <span className="text-[0.6rem] text-nowrap">
                    (Including Cannabis)
                  </span>
                </Label>
                <FormField
                  name='drugs'
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Select onValueChange={field.onChange} value={field.value?.toString()}>
                          <SelectTrigger className="shadow text-muted-foreground bg-background text-md rounded-sm h-8 ring-transparent ring-offset-transparent">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem className="text-sm max-w-80" value="true">Yes</SelectItem>
                            <SelectItem className="text-sm max-w-80" value="false">No</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage className="text-md" />
                    </FormItem>)}
                />
              </div>
              <div className="space-y-1 py-2 col-span-2 sm:col-span-1">
                <Label>
                  Smokes <span className="text-[0.6rem]">(Vapping/Shisha)</span>
                </Label>
                <FormField
                  name='smokes'
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Select onValueChange={field.onChange} value={field.value?.toString()}>
                          <SelectTrigger className="shadow text-muted-foreground bg-background text-md rounded-sm h-8 ring-transparent ring-offset-transparent">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem className="text-sm max-w-80" value="true">Yes</SelectItem>
                            <SelectItem className="text-sm max-w-80" value="false">No</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage className="text-md" />
                    </FormItem>)}
                />
              </div>

              <div className="space-y-1 py-2 col-span-2 sm:col-span-1">
                <Label>Tattoo(s)</Label>
                <FormField
                  name='tattoos'
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Select onValueChange={field.onChange} value={field.value?.toString()}>
                          <SelectTrigger className="shadow text-muted-foreground bg-background text-md rounded-sm h-8 ring-transparent ring-offset-transparent">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem className="text-sm max-w-80" value="true">Yes</SelectItem>
                            <SelectItem className="text-sm max-w-80" value="false">No</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage className="text-md" />
                    </FormItem>)}
                />
              </div>

            </div>
          </div>
        </form>
        <div className='hidden md:block md:col-span-1'></div>
        <div className="col-span-3 lg:col-span-2 mt-8">
          <FamilyIntroductionForm />
        </div>
      </div>
    </Form>
  );
}
