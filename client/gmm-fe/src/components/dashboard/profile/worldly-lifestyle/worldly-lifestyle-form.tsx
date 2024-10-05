'use client'

import { useUpdateProfileContext } from '@/components/dashboard/profile/update-profile-context';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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
import { WorldlyLifestyle, worldlyLifestyleSchema } from '@/lib/schemas/worldly-lifestyle';
import { useUpdateWorldlyLifestyleMutation } from '@/lib/user/api';
import { zodResolver } from '@hookform/resolvers/zod';

import { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';

const currencies = [
    'USD', 'CAD', 'EUR', 'GBP', 'JPY', 'AUD', 'CHF', 'CNY', 'INR', 'MXN',
    'BRL', 'ZAR', 'RUB', 'KRW', 'HKD', 'SGD', 'NZD', 'SEK', 'NOK', 'DKK',
    'TRY', 'PLN', 'THB', 'IDR', 'PHP', 'MYR', 'VND', 'AED', 'SAR', 'ILS'
];

const professions = [
    "Web & Graphic Designer", "Software Engineer", "Doctor", "Nurse", "Teacher",
    "Accountant", "Business Owner", "Investor", "Lawyer", "Architect",
    "Engineer", "Data Scientist", "Project Manager", "Sales Manager",
    "Marketing Specialist", "HR Manager", "Journalist", "Consultant",
    "Artist", "Musician", "Photographer", "Chef", "Dentist",
    "Pharmacist", "Electrician", "Plumber", "Carpenter", "Mechanic",
    "Pilot", "Flight Attendant", "Scientist", "Psychologist", "Therapist",
    "Veterinarian", "Police Officer", "Firefighter", "Translator", "Interpreter",
    "Fashion Designer", "Civil Engineer", "Biomedical Engineer", "Software Tester",
    "SEO Specialist", "Social Media Manager", "Event Planner", "Interior Designer",
    "Legal Secretary", "Paralegal", "Logistics Manager", "Supply Chain Analyst",
    "IT Support Specialist", "Systems Administrator", "Cybersecurity Analyst",
    "Graphic Artist", "Animator", "Film Director", "Video Editor", "Game Developer",
    "Bartender", "Waiter", "Personal Trainer", "Yoga Instructor", "Chiropractor",
    "Real Estate Agent", "Property Manager", "Entrepreneur", "Economist",
    "Political Scientist", "Historian", "Researcher", "Biologist",
    "Environmental Scientist", "Geologist", "Urban Planner", "Sociologist",
    "Anthropologist", "Author", "Novelist", "Screenwriter", "Public Relations Specialist",
    "Corporate Trainer", "Health Coach", "Nutritionist", "Baker", "Florist"
];

const carBrands = ["Toyota", "Ford", "Honda", "Chevrolet", "Nissan", "BMW", "Mercedes-Benz", "Volkswagen", "Audi", "Hyundai", "Kia", "Subaru", "Tesla", "Volvo", "Jeep", "Lexus", "Mazda", "Dodge", "Porsche", "Land Rover", "Jaguar", "Chrysler", "Fiat", "Mitsubishi", "Mini", "Genesis", "Infiniti", "Acura", "Lincoln", "Alfa Romeo", "Ram", "Saab", "Suzuki", "Hummer", "Peugeot", "Renault", "Skoda", "Citroën", "Tata", "MG", "Smart", "Wiesmann", "Lotus", "Pagani", "Koenigsegg", "Aston Martin", "Ferrari", "Lamborghini"];

export function WorldlyLifestyleForm({ worldlyLifestyle }: { worldlyLifestyle?: WorldlyLifestyle }) {
    const form = useForm<WorldlyLifestyle>({
        resolver: zodResolver(worldlyLifestyleSchema),
        defaultValues: {
            employmentType: worldlyLifestyle?.employmentType || '',
            annualIncome: worldlyLifestyle?.annualIncome || '',
            annualIncomeCurrency: worldlyLifestyle?.annualIncomeCurrency || '',
            currentOccupationTitle: worldlyLifestyle?.currentOccupationTitle || '',
            typeOfResidence: worldlyLifestyle?.typeOfResidence || '',
            livingSituation: worldlyLifestyle?.livingSituation || '',
            vehicleYear: worldlyLifestyle?.vehicleYear || (new Date().getFullYear()),
            vehicleMake: worldlyLifestyle?.vehicleMake || '',
            vehicleModel: worldlyLifestyle?.vehicleModel || '',
            educationQualification: worldlyLifestyle?.educationQualification || '',
            applicableDebts: worldlyLifestyle?.applicableDebts || '',
            currentDebts: worldlyLifestyle?.currentDebts || [],
            approximateDebts: worldlyLifestyle?.approximateDebts || '',
            payingInterestOnDebts: worldlyLifestyle?.payingInterestOnDebts || '',
            presentFamilyMembers: worldlyLifestyle?.presentFamilyMembers || '',
            numberOfSibilings: worldlyLifestyle?.numberOfSibilings || 0,
            pets: worldlyLifestyle?.pets || 0,
            majorPreexistingHealthCondition: worldlyLifestyle?.majorPreexistingHealthCondition || '',
            mobilityAssistantRequirement: worldlyLifestyle?.mobilityAssistantRequirement || '',
            preexistingHealthConditionDescription: worldlyLifestyle?.preexistingHealthConditionDescription || '',
        },
    });

    useEffect(() => {
        form.reset(worldlyLifestyle)
    }, [form, worldlyLifestyle]);

    const user = useAppSelector((state) => state.auth.user);
    const worldlyLifestyleFormRef = useRef<HTMLFormElement>(null);

    const { registerForm, setSaving } = useUpdateProfileContext()
    const [updateWorldlyStyle, updateResult] = useUpdateWorldlyLifestyleMutation();

    useEffect(() => {
        if (worldlyLifestyleFormRef && worldlyLifestyleFormRef.current) {
            registerForm('worldlyLifestyleForm', worldlyLifestyleFormRef.current);
        }
    }, [worldlyLifestyleFormRef, registerForm]);

    const onSubmit = (data: WorldlyLifestyle) => {
        updateWorldlyStyle({ userId: user!.id, worldlyLifestyle: data });
    }

    useEffect(() => {
        if (updateResult.isSuccess) {
            toast({
                title: 'Success',
                description: 'Worldly lifestyle updated successfully',
            });
        }
    }, [updateResult])

    useEffect(() => {
        setSaving(updateResult.isLoading);
    }, [updateResult, setSaving])

    const hasPreexistingHealthCondition = form.watch('majorPreexistingHealthCondition') === 'Yes';

    return (

        <div className="py-8 px-6 sm:px-16 md:px-24 lg:px-52">
            <h1 className="text-xl font-bold text-secondary border-b p-1">
                Currently Worldly Lifestyle
            </h1>

            <Form {...form} >
                <form
                    ref={worldlyLifestyleFormRef}
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="grid grid-cols-12 gap-x-3 gap-y-4 py-5">
                    <div className="space-y-1 col-span-4">
                        <Label className="line-clamp-1 font-normal text-xs">Employment Type</Label>
                        <FormField
                            name='employmentType'
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Select onValueChange={field.onChange} value={field.value}>
                                            <SelectTrigger className="shadow text-muted-foreground bg-background text-xs rounded-sm h-8 ring-transparent ring-offset-transparent">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem className="text-sm max-w-80" value="Employed">Employed</SelectItem>
                                                <SelectItem className="text-sm max-w-80" value="Self-Employed">Self-Employed</SelectItem>
                                                <SelectItem className="text-sm max-w-80" value="Business owner/investor">Business owner/investor</SelectItem>
                                                <SelectItem className="text-sm max-w-80" value="Not employed">Not employed</SelectItem>
                                                <SelectItem className="text-sm max-w-80" value="Retired">Retired</SelectItem>
                                                <SelectItem className="text-sm max-w-80" value="Student">Student</SelectItem>
                                                <SelectItem className="text-sm max-w-80" value="Homemaker/housewife">Homemaker/housewife</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage className="text-xs" />
                                </FormItem>)}
                        />
                    </div>

                    <div className="space-y-1 col-span-3">
                        <Label className="line-clamp-1 font-normal text-xs">Annual Income</Label>

                        <div className="grid grid-cols-3 gap-0">
                            <FormField
                                name='annualIncome'
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem className='col-span-2'>
                                        <FormControl>
                                            <Select onValueChange={field.onChange} value={field.value}>
                                                <SelectTrigger className="text-muted-foreground bg-background text-xs  rounded-none rounded-ss-sm rounded-es-sm h-8 ring-transparent ring-offset-transparent shadow">
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem className="text-sm max-w-80" value="0 - 20,000">0 - 20,000</SelectItem>
                                                    <SelectItem className="text-sm max-w-80" value="20,000 - 50,000">20,000 - 50,000</SelectItem>
                                                    <SelectItem className="text-sm max-w-80" value="50,000 - 100,000">50,000 - 100,000</SelectItem>
                                                    <SelectItem className="text-sm max-w-80" value="100,000 - 200,000">100,000 - 200,000</SelectItem>
                                                    <SelectItem className="text-sm max-w-80" value="200,000 - 350,000">200,000 - 350,000</SelectItem>
                                                    <SelectItem className="text-sm max-w-80" value="200,000 - 300,000">350,000 - 450,000</SelectItem>
                                                    <SelectItem className="text-sm max-w-80" value="> 450,000">&gt; 450,000</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage className="text-xs" />
                                    </FormItem>)}
                            />

                            <FormField
                                name='annualIncomeCurrency'
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem className="col-span-1">
                                        <FormControl>
                                            <Select onValueChange={field.onChange} value={field.value}>
                                                <SelectTrigger className="text-muted-foreground bg-background text-xs rounded-none rounded-ee-sm rounded-se-sm h-8 border-s-0 ring-transparent ring-offset-transparent shadow">
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {currencies.map((currency) => (
                                                        <SelectItem className="text-sm max-w-80" value={currency} key={currency}>
                                                            {currency}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage className="text-xs" />
                                    </FormItem>)}
                            />
                        </div>
                    </div>

                    <div className="space-y-1 col-span-5">
                        <Label className="line-clamp-1 font-normal text-xs">
                            Current Occupation Title
                        </Label>
                        <FormField
                            name='currentOccupationTitle'
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
                                                    <SelectItem value={profession} key={profession} className='text-sm'>
                                                        {profession}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage className="text-xs" />
                                </FormItem>)}
                        />
                    </div>

                    <div className="space-y-1 col-span-3">
                        <Label className="line-clamp-1 font-normal text-xs">Type of Residence</Label>
                        <FormField
                            name='typeOfResidence'
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Select onValueChange={field.onChange} value={field.value}>
                                            <SelectTrigger className="shadow text-muted-foreground bg-background text-xs rounded-sm h-8 ring-transparent ring-offset-transparent">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem className="text-sm max-w-80" value="Apartment (Rent)">Apartment (Rent)</SelectItem>
                                                <SelectItem className="text-sm max-w-80" value="Apartment Owned">Apartment Owned</SelectItem>
                                                <SelectItem className="text-sm max-w-80" value="House (Rent)">House (Rent)</SelectItem>
                                                <SelectItem className="text-sm max-w-80" value="House (Owned)">House (Owned)</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage className="text-xs" />
                                </FormItem>)}
                        />
                    </div>

                    <div className="space-y-1 col-span-3">
                        <Label className="line-clamp-1 font-normal text-xs">Living Situation</Label>
                        <FormField
                            name='livingSituation'
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Select onValueChange={field.onChange} value={field.value}>
                                            <SelectTrigger className="shadow text-muted-foreground bg-background text-xs rounded-sm h-8 ring-transparent ring-offset-transparent">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem className="text-sm max-w-80" value="Living alone">Living alone</SelectItem>
                                                <SelectItem className="text-sm max-w-80" value="Living with friends/roommates truncate">Living with friends/roommates</SelectItem>
                                                <SelectItem className="text-sm max-w-80" value="Living with kids">Living with kids</SelectItem>
                                                <SelectItem className="text-sm max-w-80" value="Living with mother/father">Living with mother/father</SelectItem>
                                                <SelectItem className="text-sm max-w-80" value="Living in joint family/with brother and his wife">Living in joint family/with brother and his wife</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage className="text-xs" />
                                </FormItem>)}
                        />
                    </div>

                    <div className="space-y-1 col-span-2">
                        <Label className="line-clamp-1 font-normal text-xs">Vehicle Make</Label>

                        <FormField
                            name='vehicleMake'
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <AutoComplete onChange={field.onChange} selectedOption={field.value} options={carBrands.map(brand => ({ label: brand, value: brand }))} placeholder='' className="shadow text-muted-foreground bg-background text-xs rounded-sm h-8 ring-transparent ring-offset-transparent" />
                                    <FormMessage className="text-xs" />
                                </FormItem>)}
                        />
                    </div>

                    <div className="space-y-1 col-span-2">
                        <Label className="line-clamp-1 font-normal text-xs">Vehicle Year</Label>
                        <FormField
                            name='vehicleYear'
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Select onValueChange={field.onChange} value={field.value?.toString()}>
                                            <SelectTrigger className="shadow text-muted-foreground bg-background text-xs rounded-sm h-8 ring-transparent ring-offset-transparent ">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent className='max-h-64'>
                                                {
                                                    Array.from({ length: 40 }, (_, i) => (
                                                        <SelectItem className="text-sm max-w-80" key={i} value={String((new Date().getFullYear()) - i)}>
                                                            {String((new Date().getFullYear()) - i)}
                                                        </SelectItem>))
                                                }
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage className="text-xs" />
                                </FormItem>)}
                        />
                    </div>

                    <div className="space-y-1 col-span-2">
                        <Label className="line-clamp-1 font-normal text-xs">Vehicle Model</Label>
                        <FormField
                            name='vehicleModel'
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
                                </FormItem>)}
                        />
                    </div>

                    <div className="space-y-1 col-span-4">
                        <Label className="line-clamp-1 font-normal text-xs">
                            Education Qualification
                        </Label>
                        <FormField
                            name='educationQualification'
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
                                        </Select>
                                    </FormControl>
                                    <FormMessage className="text-xs" />
                                </FormItem>)}
                        />
                    </div>

                    <div className="space-y-1 col-span-2">
                        <Label className="line-clamp-1 font-normal text-xs">Applicable Dept</Label>
                        <FormField
                            name='applicableDebts'
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Select onValueChange={field.onChange} value={field.value}>
                                            <SelectTrigger className="shadow text-muted-foreground bg-background text-xs rounded-sm h-8 ring-transparent ring-offset-transparent">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem className="text-sm max-w-80" value="Yes">Yes</SelectItem>
                                                <SelectItem className="text-sm max-w-80" value="No">No</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage className="text-xs" />
                                </FormItem>)}
                        />
                    </div>

                    <div className="space-y-1 col-span-3">
                        <Label className="line-clamp-1 font-normal text-xs">Current Debt</Label>
                        <FormField
                            name='currentDebts'
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Select onValueChange={field.onChange} value={field.value ? field.value[0] : ''}>
                                            <SelectTrigger className="shadow text-muted-foreground bg-background text-xs rounded-sm h-8 ring-transparent ring-offset-transparent">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem className="text-sm max-w-80" value="Car">Car</SelectItem>
                                                <SelectItem className="text-sm max-w-80" value="Home">Home</SelectItem>
                                                <SelectItem className="text-sm max-w-80" value="Student Loans">Student Loans</SelectItem>
                                                <SelectItem className="text-sm max-w-80" value="Personal Loans">Personal Loans</SelectItem>
                                                <SelectItem className="text-sm max-w-80" value="Business loans">Business loans</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage className="text-xs" />
                                </FormItem>)}
                        />
                    </div>

                    <div className="space-y-1 col-span-3">
                        <Label className="line-clamp-1 font-normal text-xs">Approximate Debt</Label>
                        <FormField
                            name='approximateDebts'
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            className="text-muted-foreground bg-background text-xs shadow rounded-sm"
                                            placeholder={`0 ${form.watch('annualIncomeCurrency')}`}
                                        />
                                    </FormControl>
                                    <FormMessage className="text-xs" />
                                </FormItem>)}
                        />
                    </div>

                    <div className="space-y-1 col-span-3">
                        <Label className="line-clamp-1 font-normal text-xs">
                            Paying Interest/Riba on Debts?
                        </Label>
                        <FormField
                            name='payingInterestOnDebts'
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Select onValueChange={field.onChange} value={field.value}>
                                            <SelectTrigger className="shadow text-muted-foreground bg-background text-xs rounded-sm h-8 ring-transparent ring-offset-transparent">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem className="text-sm max-w-80" value="Yes">Yes</SelectItem>
                                                <SelectItem className="text-sm max-w-80" value="No">No</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage className="text-xs" />
                                </FormItem>)}
                        />
                    </div>

                    <div className="space-y-1 col-span-3">
                        <Label className="line-clamp-1 font-normal text-xs">
                            Present Family Members
                        </Label>
                        <FormField
                            name='presentFamilyMembers'
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Select onValueChange={field.onChange} value={field.value}>
                                            <SelectTrigger className="shadow text-muted-foreground bg-background text-xs rounded-sm h-8 ring-transparent ring-offset-transparent">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem className="text-sm max-w-80" value="Both Parents Present">Both Parents Present</SelectItem>
                                                <SelectItem className="text-sm max-w-80" value="Only Father">Only Father</SelectItem>
                                                <SelectItem className="text-sm max-w-80" value="Only Mother">Only Mother</SelectItem>
                                                <SelectItem className="text-sm max-w-80" value="Other">Other</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage className="text-xs" />
                                </FormItem>)}
                        />
                    </div>

                    <div className="space-y-1 col-span-2">
                        <Label className="line-clamp-1 font-normal text-xs">Number of Siblings</Label>
                        <FormField
                            name='numberOfSibilings'
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Select onValueChange={field.onChange} value={field.value ? (field.value === 0 ? 'None' : field.value.toString()) : 'None'}>
                                            <SelectTrigger className="shadow text-muted-foreground bg-background text-xs rounded-sm h-8 ring-transparent ring-offset-transparent">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem className="text-sm max-w-80" value="None">None</SelectItem>
                                                <SelectItem className="text-sm max-w-80" value="1">1</SelectItem>
                                                <SelectItem className="text-sm max-w-80" value="2">2</SelectItem>
                                                <SelectItem className="text-sm max-w-80" value="3">3</SelectItem>
                                                <SelectItem className="text-sm max-w-80" value="4">4</SelectItem>
                                                <SelectItem className="text-sm max-w-80" value="5+">5+</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage className="text-xs" />
                                </FormItem>)}
                        />
                    </div>

                    <div className="space-y-1 col-span-2">
                        <Label className="line-clamp-1 font-normal text-xs">Number of Pets</Label>
                        <FormField
                            name='pets'
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Select onValueChange={field.onChange} value={field.value ? (field.value === 0 ? "None" : field.value.toString()) : 'None'}>
                                            <SelectTrigger className="shadow text-muted-foreground bg-background text-xs rounded-sm h-8 ring-transparent ring-offset-transparent text-start">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem className="text-sm max-w-80" value="None">None</SelectItem>
                                                <SelectItem className="text-sm max-w-80" value="1">1</SelectItem>
                                                <SelectItem className="text-sm max-w-80" value="2">2</SelectItem>
                                                <SelectItem className="text-sm max-w-80" value="3">3</SelectItem>
                                                <SelectItem className="text-sm max-w-80" value="4">4</SelectItem>
                                                <SelectItem className="text-sm max-w-80" value="5">5+</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage className="text-xs" />
                                </FormItem>)}
                        />
                    </div>

                    <h2 className="col-span-12 font-bold mt-2">Health Conditions</h2>

                    <div className="space-y-1 col-span-5">
                        <Label className="line-clamp-1 font-normal text-xs">
                            Major Pre-Existing Health Conditions and/or Disabilities
                        </Label>
                        <FormField
                            name='majorPreexistingHealthCondition'
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
                                </FormItem>)}
                        />
                    </div>

                    <div className="space-y-1 col-span-3">
                        <Label className="line-clamp-1 font-normal text-xs">
                            Do your require mobility assistant?
                        </Label>
                        <FormField
                            name='mobilityAssistantRequirement'
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Select onValueChange={field.onChange} value={field.value}>
                                            <SelectTrigger className="shadow text-muted-foreground bg-background text-xs rounded-sm h-8 ring-transparent ring-offset-transparent">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem className="text-sm max-w-80" value="Yes">Yes</SelectItem>
                                                <SelectItem className="text-sm max-w-80" value="No">No</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage className="text-xs" />
                                </FormItem>)}
                        />
                    </div>

                    {hasPreexistingHealthCondition && <div className="space-y-1 col-span-12">
                        <Label className="line-clamp-1 font-normal text-xs">
                            Describe your pre-existing conditions and/or disabilities
                            (Example: STD, Disabilities, Cancer, etc)
                        </Label>
                        <FormField
                            name='preexistingHealthConditionDescription'
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
                                </FormItem>)}
                        />
                    </div>}
                </form>
            </Form>
        </div>
    );
}
