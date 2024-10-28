'use client';

import { useUpdateProfileContext } from '@/components/dashboard/profile/update-profile-context';
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
import AutoComplete from '@/components/ui/searchable-select';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/components/ui/use-toast';
import { useAppSelector } from '@/lib/hooks';
import {
  WorldlyLifestyle,
  worldlyLifestyleSchema,
} from '@/lib/schemas/worldly-lifestyle';
import { useUpdateWorldlyLifestyleMutation } from '@/lib/user/api';
import { zodResolver } from '@hookform/resolvers/zod';

import { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import flags from 'react-phone-number-input/flags';

const currencies = {
  USD: 'US',
  CAD: 'CA',
  EUR: 'EU',
  GBP: 'GB',
  JPY: 'JP',
  AUD: 'AU',
  CHF: 'CH',
  CNY: 'CN',
  INR: 'IN',
  MXN: 'MX',
  BRL: 'BR',
  ZAR: 'ZA',
  RUB: 'RU',
  KRW: 'KR',
  HKD: 'HK',
  SGD: 'SG',
  NZD: 'NZ',
  SEK: 'SE',
  NOK: 'NO',
  DKK: 'DK',
  TRY: 'TR',
  PLN: 'PL',
  THB: 'TH',
  IDR: 'ID',
  PHP: 'PH',
  MYR: 'MY',
  VND: 'VN',
  AED: 'AE',
  SAR: 'SA',
  ILS: 'IL',
};

const professions = [
  'Web & Graphic Designer',
  'Software Engineer',
  'Doctor',
  'Nurse',
  'Teacher',
  'Accountant',
  'Business Owner',
  'Investor',
  'Lawyer',
  'Architect',
  'Engineer',
  'Data Scientist',
  'Project Manager',
  'Sales Manager',
  'Marketing Specialist',
  'HR Manager',
  'Journalist',
  'Consultant',
  'Artist',
  'Musician',
  'Photographer',
  'Chef',
  'Dentist',
  'Pharmacist',
  'Electrician',
  'Plumber',
  'Carpenter',
  'Mechanic',
  'Pilot',
  'Flight Attendant',
  'Scientist',
  'Psychologist',
  'Therapist',
  'Veterinarian',
  'Police Officer',
  'Firefighter',
  'Translator',
  'Interpreter',
  'Fashion Designer',
  'Civil Engineer',
  'Biomedical Engineer',
  'Software Tester',
  'SEO Specialist',
  'Social Media Manager',
  'Event Planner',
  'Interior Designer',
  'Legal Secretary',
  'Paralegal',
  'Logistics Manager',
  'Supply Chain Analyst',
  'IT Support Specialist',
  'Systems Administrator',
  'Cybersecurity Analyst',
  'Graphic Artist',
  'Animator',
  'Film Director',
  'Video Editor',
  'Game Developer',
  'Bartender',
  'Waiter',
  'Personal Trainer',
  'Yoga Instructor',
  'Chiropractor',
  'Real Estate Agent',
  'Property Manager',
  'Entrepreneur',
  'Economist',
  'Political Scientist',
  'Historian',
  'Researcher',
  'Biologist',
  'Environmental Scientist',
  'Geologist',
  'Urban Planner',
  'Sociologist',
  'Anthropologist',
  'Author',
  'Novelist',
  'Screenwriter',
  'Public Relations Specialist',
  'Corporate Trainer',
  'Health Coach',
  'Nutritionist',
  'Baker',
  'Florist',
];

const carBrands = [
  'Acura',
  'Alfa Romeo',
  'Aston Martin',
  'Audi',
  'BMW',
  'Chevrolet',
  'Chrysler',
  'Citroën',
  'Dodge',
  'Ferrari',
  'Fiat',
  'Ford',
  'Genesis',
  'Honda',
  'Hummer',
  'Hyundai',
  'Infiniti',
  'Jaguar',
  'Jeep',
  'Kia',
  'Koenigsegg',
  'Lamborghini',
  'Land Rover',
  'Lincoln',
  'Lotus',
  'Mazda',
  'Mercedes-Benz',
  'Mini',
  'Mitsubishi',
  'Nissan',
  'Peugeot',
  'Porsche',
  'Ram',
  'Renault',
  'Saab',
  'Skoda',
  'Smart',
  'Subaru',
  'Suzuki',
  'Tata',
  'Tesla',
  'Volkswagen',
  'Volvo',
  'Wiesmann',
  'Pagani',
];

const debtsOptions = [
  'Car',
  'Home',
  'Student Loan',
  'Personal Loan',
  'Business Loan',
];

export function WorldlyLifestyleForm({
  worldlyLifestyle,
}: {
  worldlyLifestyle?: WorldlyLifestyle;
}) {
  const form = useForm<WorldlyLifestyle>({
    resolver: zodResolver(worldlyLifestyleSchema),
    defaultValues: {
      employmentType: worldlyLifestyle?.employmentType || '',
      annualIncome: worldlyLifestyle?.annualIncome || '',
      annualIncomeCurrency: worldlyLifestyle?.annualIncomeCurrency || '',
      currentOccupationTitle: worldlyLifestyle?.currentOccupationTitle || '',
      typeOfResidence: worldlyLifestyle?.typeOfResidence || '',
      livingSituation: worldlyLifestyle?.livingSituation || '',
      ownsVehicle: worldlyLifestyle?.ownsVehicle || '',
      vehicleYear: worldlyLifestyle?.vehicleYear || new Date().getFullYear(),
      vehicleMake: worldlyLifestyle?.vehicleMake || '',
      vehicleModel: worldlyLifestyle?.vehicleModel || '',
      educationQualification: worldlyLifestyle?.educationQualification || '',
      applicableDebts: worldlyLifestyle?.applicableDebts || '',
      currentDebts: worldlyLifestyle?.currentDebts || [],
      approximateDebt: worldlyLifestyle?.approximateDebt || '',
      approximateDebtCurrency: worldlyLifestyle?.approximateDebtCurrency || '',
      payingInterestOnDebts: worldlyLifestyle?.payingInterestOnDebts || '',
      presentFamilyMembers: worldlyLifestyle?.presentFamilyMembers || '',
      numberOfSiblings: worldlyLifestyle?.numberOfSiblings || 0,
      pets: worldlyLifestyle?.pets || '',
      majorPreexistingHealthCondition:
        worldlyLifestyle?.majorPreexistingHealthCondition || '',
      mobilityAssistantRequirement:
        worldlyLifestyle?.mobilityAssistantRequirement || '',
      preexistingHealthConditionDescription:
        worldlyLifestyle?.preexistingHealthConditionDescription || '',
    },
  });

  useEffect(() => {
    form.reset(worldlyLifestyle);
  }, [form, worldlyLifestyle]);

  const user = useAppSelector((state) => state.auth.user);
  const worldlyLifestyleFormRef = useRef<HTMLFormElement>(null);

  const { registerForm, setSaving } = useUpdateProfileContext();
  const [updateWorldlyStyle, updateResult] =
    useUpdateWorldlyLifestyleMutation();

  useEffect(() => {
    if (worldlyLifestyleFormRef && worldlyLifestyleFormRef.current) {
      registerForm('worldlyLifestyleForm', worldlyLifestyleFormRef.current);
    }
  }, [worldlyLifestyleFormRef, registerForm]);

  const onSubmit = (data: WorldlyLifestyle) => {
    const worldlyLifestyle = data;
    if (data.ownsVehicle === 'No') {
      worldlyLifestyle.vehicleMake = '';
      worldlyLifestyle.vehicleModel = '';
      worldlyLifestyle.vehicleYear = 0;
    }
    updateWorldlyStyle({ userId: user!.id, worldlyLifestyle });
  };

  useEffect(() => {
    if (updateResult.isSuccess) {
      toast({
        title: 'Success',
        description: 'Worldly lifestyle updated successfully',
      });
    }
  }, [updateResult]);

  useEffect(() => {
    setSaving(updateResult.isLoading);
  }, [updateResult, setSaving]);

  const hasPreexistingHealthCondition =
    form.watch('majorPreexistingHealthCondition') === 'Yes';
  const ownsCar = form.watch('ownsVehicle') === 'Yes';
  const hasDebt = form.watch('applicableDebts') === 'Yes';

  return (
    <div className="py-8 px-6 sm:px-16 md:px-24 lg:px-52">
      <h1 className="text-xl font-bold text-secondary border-b p-1">
        Your Current Worldly Lifestyle{' '}
        <span className="text-xs">(that you live)</span>
      </h1>

      <Form {...form}>
        <form
          ref={worldlyLifestyleFormRef}
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid grid-cols-12 gap-x-3 gap-y-4 py-5"
        >
          <div className="flex flex-col gap-1 justify-end col-span-12 md:col-span-4">
            <Label>Employment Type</Label>
            <FormField
              name="employmentType"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="shadow text-muted-foreground bg-background text-xs rounded-sm h-8 ring-transparent ring-offset-transparent">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Employed">Employed</SelectItem>
                        <SelectItem value="Self-Employed">
                          Self-Employed
                        </SelectItem>
                        <SelectItem value="Business owner/investor">
                          Business owner/investor
                        </SelectItem>
                        <SelectItem value="Not employed">
                          Not employed
                        </SelectItem>
                        <SelectItem value="Retired">Retired</SelectItem>
                        <SelectItem value="Student">Student</SelectItem>
                        <SelectItem value="Homemaker/housewife">
                          Homemaker/housewife
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
          </div>

          <div className="flex flex-col gap-1 justify-end col-span-12 md:col-span-4">
            <Label>Annual Income</Label>

            <div className="grid grid-cols-12 md:grid-cols-3 gap-0">
              <FormField
                name="annualIncome"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="col-span-8 md:col-span-2">
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger className="text-muted-foreground bg-background text-xs  rounded-none rounded-ss-sm rounded-es-sm h-8 ring-transparent ring-offset-transparent shadow">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="0 - 20,000">0 - 20,000</SelectItem>
                          <SelectItem value="20,000 - 50,000">
                            20,000 - 50,000
                          </SelectItem>
                          <SelectItem value="50,000 - 100,000">
                            50,000 - 100,000
                          </SelectItem>
                          <SelectItem value="100,000 - 200,000">
                            100,000 - 200,000
                          </SelectItem>
                          <SelectItem value="200,000 - 350,000">
                            200,000 - 350,000
                          </SelectItem>
                          <SelectItem value="200,000 - 300,000">
                            350,000 - 450,000
                          </SelectItem>
                          <SelectItem value="> 450,000">450,000+</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />

              <FormField
                name="annualIncomeCurrency"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="col-span-4 md:col-span-1">
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger className="text-muted-foreground bg-background text-xs rounded-none rounded-ee-sm rounded-se-sm h-8 border-s-0 ring-transparent ring-offset-transparent shadow">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.entries(currencies).map(
                            ([currency, countryCode]) => {
                              const Flag =
                                flags[countryCode as keyof typeof flags];

                              return (
                                <SelectItem
                                  value={currency}
                                  key={currency}
                                  className="px-3"
                                >
                                  <div className="flex gap-4 items-center justify-center">
                                    <div className="w-5">
                                      {Flag && <Flag title={currency} />}
                                    </div>{' '}
                                    <div>{currency}</div>
                                  </div>
                                </SelectItem>
                              );
                            }
                          )}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="flex flex-col gap-1 justify-end col-span-12 md:col-span-4">
            <Label>Current Occupation Title</Label>
            <FormField
              name="currentOccupationTitle"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="shadow text-muted-foreground bg-background text-xs rounded-sm h-8 ring-transparent ring-offset-transparent">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {professions.map((profession) => (
                          <SelectItem
                            value={profession}
                            key={profession}
                            className="text-sm"
                          >
                            {profession}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
          </div>

          <div className="flex flex-col gap-1 justify-end col-span-12 md:col-span-4">
            <Label>Type of Residence</Label>
            <FormField
              name="typeOfResidence"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="shadow text-muted-foreground bg-background text-xs rounded-sm h-8 ring-transparent ring-offset-transparent">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Apartment (Rent)">
                          Apartment (Rent)
                        </SelectItem>
                        <SelectItem value="Apartment Owned">
                          Apartment Owned
                        </SelectItem>
                        <SelectItem value="House (Rent)">
                          House (Rent)
                        </SelectItem>
                        <SelectItem value="House (Owned)">
                          House (Owned)
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
          </div>

          <div className="flex flex-col gap-1 justify-end col-span-12 md:col-span-4">
            <Label>Living Situation</Label>
            <FormField
              name="livingSituation"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="shadow text-muted-foreground bg-background text-xs rounded-sm h-8 ring-transparent ring-offset-transparent">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Living alone">
                          Living alone
                        </SelectItem>
                        <SelectItem value="Living with friends/roommates truncate">
                          Living with friends/roommates
                        </SelectItem>
                        <SelectItem value="Living with kids">
                          Living with kids
                        </SelectItem>
                        <SelectItem value="Living with mother/father">
                          Living with mother/father
                        </SelectItem>
                        <SelectItem value="Living in joint family/with brother and his wife">
                          Living in joint family/with brother and his wife
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
          </div>

          <div className="flex flex-col gap-1 justify-end col-span-12 md:col-span-4">
            <Label>Do You Own a Car?</Label>
            <FormField
              name="ownsVehicle"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value?.toString()}
                    >
                      <SelectTrigger className="shadow text-muted-foreground bg-background text-xs rounded-sm h-8 ring-transparent ring-offset-transparent">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Yes">Yes</SelectItem>
                        <SelectItem value="No">No</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
          </div>

          {ownsCar && (
            <>
              <div className="flex flex-col gap-1 justify-end col-span-12 md:col-span-2">
                <Label>Vehicle Make</Label>
                <FormField
                  name="vehicleMake"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <AutoComplete
                        onChange={field.onChange}
                        selectedOption={field.value}
                        options={carBrands.map((brand) => ({
                          label: brand,
                          value: brand,
                        }))}
                        placeholder=""
                        className="shadow text-muted-foreground bg-background text-xs rounded-sm h-8 ring-transparent ring-offset-transparent"
                      />
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex flex-col gap-1 justify-end col-span-12 md:col-span-2">
                <Label>Vehicle Year</Label>
                <FormField
                  name="vehicleYear"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value?.toString()}
                        >
                          <SelectTrigger className="shadow text-muted-foreground bg-background text-xs rounded-sm h-8 ring-transparent ring-offset-transparent ">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="max-h-64">
                            {Array.from({ length: 40 }, (_, i) => (
                              <SelectItem
                                key={i}
                                value={String(new Date().getFullYear() - i)}
                              >
                                {String(new Date().getFullYear() - i)}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex flex-col gap-1 justify-end col-span-12 md:col-span-4">
                <Label>Vehicle Model</Label>
                <FormField
                  name="vehicleModel"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          {...field}
                          className="text-muted-foreground bg-background text-xs shadow rounded-sm"
                        />
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />
              </div>
            </>
          )}

          <div className="flex flex-col gap-1 justify-end col-span-12 md:col-span-4">
            <Label>Education Qualification</Label>
            <FormField
              name="educationQualification"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="shadow text-muted-foreground bg-background text-xs rounded-sm h-8 ring-transparent ring-offset-transparent">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="High school">High school</SelectItem>
                        <SelectItem value="Diploma">Diploma</SelectItem>
                        <SelectItem value="Non-Degree Qualified">
                          Non-Degree Qualified
                        </SelectItem>
                        <SelectItem value="Bachelor's degree">
                          Bachelor&apos;s degree
                        </SelectItem>
                        <SelectItem value="Masters">Masters</SelectItem>
                        <SelectItem value="PHD/Doctorate">
                          PHD/Doctorate
                        </SelectItem>
                        <SelectItem value="Currently Studying">
                          Currently Studying
                        </SelectItem>
                        <SelectItem value="None of the above">
                          None of the above
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
          </div>

          <div className="flex flex-col gap-1 justify-end col-span-12 md:col-span-4">
            <Label>Do you have debt?</Label>
            <FormField
              name="applicableDebts"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="shadow text-muted-foreground bg-background text-xs rounded-sm h-8 ring-transparent ring-offset-transparent">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Yes">Yes</SelectItem>
                        <SelectItem value="No">No</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
          </div>

          {hasDebt && (
            <>
              <div className="flex flex-col gap-1 justify-end col-span-12 md:col-span-4">
                <Label>Current Debt</Label>
                <FormField
                  name="currentDebts"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Multiselect
                          onChange={field.onChange}
                          selectedOptions={field.value}
                          title="Current Debts"
                          initOptions={debtsOptions.map((debt) => ({
                            label: debt,
                            value: debt,
                          }))}
                          placeholder="Select"
                          className="shadow text-muted-foreground bg-background text-xs rounded-sm h-8 ring-transparent ring-offset-transparent"
                        />
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex flex-col gap-1 justify-end col-span-12 md:col-span-4">
                <Label>Approximate Debt</Label>

                <div className="grid grid-cols-12 md:grid-cols-3 gap-0">
                  <FormField
                    name="approximateDebt"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem className="col-span-8 md:col-span-2">
                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
                          >
                            <SelectTrigger className="text-muted-foreground bg-background text-xs  rounded-none rounded-ss-sm rounded-es-sm h-8 ring-transparent ring-offset-transparent shadow">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="0 - 20,000">
                                0 - 20,000
                              </SelectItem>
                              <SelectItem value="20,000 - 50,000">
                                20,000 - 50,000
                              </SelectItem>
                              <SelectItem value="50,000 - 100,000">
                                50,000 - 100,000
                              </SelectItem>
                              <SelectItem value="100,000 - 200,000">
                                100,000 - 200,000
                              </SelectItem>
                              <SelectItem value="200,000 - 350,000">
                                200,000 - 350,000
                              </SelectItem>
                              <SelectItem value="200,000 - 300,000">
                                350,000 - 450,000
                              </SelectItem>
                              <SelectItem value="> 450,000">
                                450,000+
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    name="approximateDebtCurrency"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem className="col-span-4 md:col-span-1">
                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
                          >
                            <SelectTrigger className="text-muted-foreground bg-background text-xs rounded-none rounded-ee-sm rounded-se-sm h-8 border-s-0 ring-transparent ring-offset-transparent shadow">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {Object.entries(currencies).map(
                                ([currency, countryCode]) => {
                                  const Flag =
                                    flags[countryCode as keyof typeof flags];

                                  return (
                                    <SelectItem
                                      value={currency}
                                      key={currency}
                                      className="px-3"
                                    >
                                      <div className="flex gap-4 items-center justify-center">
                                        <div className="w-5">
                                          {Flag && <Flag title={currency} />}
                                        </div>{' '}
                                        <div>{currency}</div>
                                      </div>
                                    </SelectItem>
                                  );
                                }
                              )}
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1 justify-end col-span-12 md:col-span-3">
                <Label>Do you pay Interest/Riba on Debts?</Label>
                <FormField
                  name="payingInterestOnDebts"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <SelectTrigger className="shadow text-muted-foreground bg-background text-xs rounded-sm h-8 ring-transparent ring-offset-transparent">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Yes">Yes</SelectItem>
                            <SelectItem value="No">No</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />
              </div>
            </>
          )}

          <div className="flex flex-col gap-1 justify-end col-span-12 md:col-span-3">
            <Label>Present Family Members</Label>
            <FormField
              name="presentFamilyMembers"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="shadow text-muted-foreground bg-background text-xs rounded-sm h-8 ring-transparent ring-offset-transparent">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Both Parents Present">
                          Both Parents Present
                        </SelectItem>
                        <SelectItem value="Only Father">Only Father</SelectItem>
                        <SelectItem value="Only Mother">Only Mother</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
          </div>

          <div className="flex flex-col gap-1 justify-end col-span-12 md:col-span-3">
            <Label>Number of Siblings</Label>
            <FormField
              name="numberOfSiblings"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      value={
                        field.value
                          ? field.value === 0
                            ? 'None'
                            : field.value.toString()
                          : 'None'
                      }
                    >
                      <SelectTrigger className="shadow text-muted-foreground bg-background text-xs rounded-sm h-8 ring-transparent ring-offset-transparent">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="None">None</SelectItem>
                        <SelectItem value="1">1</SelectItem>
                        <SelectItem value="2">2</SelectItem>
                        <SelectItem value="3">3</SelectItem>
                        <SelectItem value="4">4</SelectItem>
                        <SelectItem value="5+">5+</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
          </div>

          <div className="flex flex-col gap-1 justify-end col-span-12 md:col-span-3">
            <Label>Pets</Label>
            <FormField
              name="pets"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="shadow text-muted-foreground bg-background text-xs rounded-sm h-8 ring-transparent ring-offset-transparent text-start">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="None">No</SelectItem>
                        <SelectItem value="Cats">Cats</SelectItem>
                        <SelectItem value="Dog">Dog</SelectItem>
                        <SelectItem value="Bird">Bird</SelectItem>
                        <SelectItem value="Reptiles">Reptiles</SelectItem>
                        <SelectItem value="Insects">Insects</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
          </div>

          <h2 className="col-span-12 font-bold mt-2">Health Conditions</h2>

          <div className="flex flex-col gap-1 justify-end col-span-12 md:col-span-5">
            <Label>
              Major Pre-Existing Health Conditions and/or Disabilities
            </Label>
            <FormField
              name="majorPreexistingHealthCondition"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="shadow text-muted-foreground bg-background text-xs rounded-sm h-8 ring-transparent ring-offset-transparent">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Yes">Yes</SelectItem>
                        <SelectItem value="No">No</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
          </div>

          <div className="flex flex-col gap-1 justify-end col-span-12 md:col-span-3">
            <Label>Do your require mobility assistant?</Label>
            <FormField
              name="mobilityAssistantRequirement"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="shadow text-muted-foreground bg-background text-xs rounded-sm h-8 ring-transparent ring-offset-transparent">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Yes">Yes</SelectItem>
                        <SelectItem value="No">No</SelectItem>
                        <SelectItem value="Limited Assistance">
                          Limited Assistance
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
          </div>

          {hasPreexistingHealthCondition && (
            <div className="flex flex-col gap-1 justify-end col-span-12">
              <Label>
                Describe your pre-existing conditions and/or disabilities
                (Example: STD, Disabilities, Cancer, etc)
              </Label>
              <FormField
                name="preexistingHealthConditionDescription"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        {...field}
                        className="text-muted-foreground bg-background text-xs shadow rounded-sm"
                      />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
            </div>
          )}
        </form>
      </Form>
    </div>
  );
}
