'use client'

import { useUpdateProfileContext } from '@/components/dashboard/profile/update-profile-context';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
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
import { toast } from '@/components/ui/use-toast';
import { useAppSelector } from '@/lib/hooks';
import { WorldlyLifestyle, worldlyLifestyleSchema } from '@/lib/schemas/worldly-lifestyle';
import { useUpdateWorldlyLifestyleMutation } from '@/lib/user/api';
import { zodResolver } from '@hookform/resolvers/zod';

import { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';

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
        updateWorldlyStyle({ userId: user!.id, worldlyLifestyle: data, self: true });
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
                                                <SelectItem value="Employed">Employed</SelectItem>
                                                <SelectItem value="Self-Employed">Self-Employed</SelectItem>
                                                <SelectItem value="Business owner/investor">Business owner/investor</SelectItem>
                                                <SelectItem value="Not employed">Not employed</SelectItem>
                                                <SelectItem value="Retired">Retired</SelectItem>
                                                <SelectItem value="Student">Student</SelectItem>
                                                <SelectItem value="Homemaker/housewife">Homemaker/housewife</SelectItem>
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
                                                    <SelectItem value="0 - 20,000">0 - 20,000</SelectItem>
                                                    <SelectItem value="20,000 - 50,000">20,000 - 50,000</SelectItem>
                                                    <SelectItem value="50,000 - 100,000">50,000 - 100,000</SelectItem>
                                                    <SelectItem value="> 100,000">&gt; 100,000</SelectItem>
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
                                                    <SelectItem value="USD">USD</SelectItem>
                                                    <SelectItem value="CAD">CAD</SelectItem>
                                                    <SelectItem value="EUR">EUR</SelectItem>
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
                                                <SelectItem value="Apartment (Rent)">Apartment (Rent)</SelectItem>
                                                <SelectItem value="Apartment Owned">Apartment Owned</SelectItem>
                                                <SelectItem value="House (Rent)">House (Rent)</SelectItem>
                                                <SelectItem value="House (Owned)">House (Owned)</SelectItem>
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
                                                <SelectItem value="Living alone">Living alone</SelectItem>
                                                <SelectItem value="Living with friends/roommates truncate">Living with friends/roommates</SelectItem>
                                                <SelectItem value="Living with kids">Living with kids</SelectItem>
                                                <SelectItem value="Living with mother/father">Living with mother/father</SelectItem>
                                                <SelectItem value="Living in joint family/with brother and his wife">Living in joint family/with brother and his wife</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
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
                                            <SelectContent className='max-h-36'>
                                                {
                                                    Array.from({ length: 15 }, (_, i) => (
                                                        <SelectItem key={i} value={String((new Date().getFullYear()) - i)}>
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
                        <Label className="line-clamp-1 font-normal text-xs">Vehicle Make</Label>

                        <FormField
                            name='vehicleMake'
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>

                                        <Select onValueChange={field.onChange} value={field.value}>
                                            <SelectTrigger className="shadow text-muted-foreground bg-background text-xs rounded-sm h-8 ring-transparent ring-offset-transparent">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="Toyota">Toyota</SelectItem>
                                                <SelectItem value="Ford">Ford</SelectItem>
                                                <SelectItem value="Honda">Honda</SelectItem>
                                                <SelectItem value="Chevrolet">Chevrolet</SelectItem>
                                                <SelectItem value="Nissan">Nissan</SelectItem>
                                                <SelectItem value="BMW">BMW</SelectItem>
                                                <SelectItem value="Mercedes-Benz">Mercedes-Benz</SelectItem>
                                                <SelectItem value="Volkswagen">Volkswagen</SelectItem>
                                                <SelectItem value="Audi">Audi</SelectItem>
                                                <SelectItem value="Hyundai">Hyundai</SelectItem>
                                                <SelectItem value="Kia">Kia</SelectItem>
                                                <SelectItem value="Subaru">Subaru</SelectItem>
                                                <SelectItem value="Tesla">Tesla</SelectItem>
                                                <SelectItem value="Volvo">Volvo</SelectItem>
                                                <SelectItem value="Jeep">Jeep</SelectItem>
                                                <SelectItem value="Lexus">Lexus</SelectItem>
                                                <SelectItem value="Mazda">Mazda</SelectItem>
                                                <SelectItem value="Dodge">Dodge</SelectItem>
                                                <SelectItem value="Porsche">Porsche</SelectItem>
                                                <SelectItem value="Land Rover">Land Rover</SelectItem>
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
                                                <SelectItem value="High school">High school</SelectItem>
                                                <SelectItem value="Diploma">Diploma</SelectItem>
                                                <SelectItem value="Non-Degree Qualified">Non-Degree Qualified</SelectItem>
                                                <SelectItem value="Bachelor's degree">Bachelor&apos;s degree</SelectItem>
                                                <SelectItem value="Masters">Masters</SelectItem>
                                                <SelectItem value="PHD/Doctorate">PHD/Doctorate</SelectItem>
                                                <SelectItem value="Currently Studying">Currently Studying</SelectItem>
                                                <SelectItem value="None of the above">None of the above</SelectItem>

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
                                                <SelectItem value="Car">Car</SelectItem>
                                                <SelectItem value="Home">Home</SelectItem>
                                                <SelectItem value="Student Loans">Student Loans</SelectItem>
                                                <SelectItem value="Personal Loans">Personal Loans</SelectItem>
                                                <SelectItem value="Business loans">Business loans</SelectItem>
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
                                                <SelectItem value="Both Parents Present">Both Parents Present</SelectItem>
                                                <SelectItem value="Only Father">Only Father</SelectItem>
                                                <SelectItem value="Only Mother">Only Mother</SelectItem>
                                                <SelectItem value="Other">Other</SelectItem>
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
                                                <SelectItem value="None">None</SelectItem>
                                                <SelectItem value="1">1</SelectItem>
                                                <SelectItem value="2">2</SelectItem>
                                                <SelectItem value="3">3</SelectItem>
                                                <SelectItem value="4">4</SelectItem>
                                                <SelectItem value="5">5</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage className="text-xs" />
                                </FormItem>)}
                        />
                    </div>

                    <div className="space-y-1 col-span-2">
                        <Label className="line-clamp-1 font-normal text-xs">Pets</Label>
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
                                                <SelectItem value="None">None</SelectItem>
                                                <SelectItem value="1">1</SelectItem>
                                                <SelectItem value="2">2</SelectItem>
                                                <SelectItem value="3">3</SelectItem>
                                                <SelectItem value="4">4</SelectItem>
                                                <SelectItem value="5">5</SelectItem>
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
                                                <SelectItem value="Yes">Yes</SelectItem>
                                                <SelectItem value="No">No</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage className="text-xs" />
                                </FormItem>)}
                        />
                    </div>

                    <div className="space-y-1 col-span-12">
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
                    </div>
                </form>
            </Form>
        </div>
    );
}
