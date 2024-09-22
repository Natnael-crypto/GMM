'use client';

import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Multiselect from '@/components/ui/multi-select';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { User, userBasicInformationSchema } from '@/lib/schemas/user';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useUpdateProfileContext } from '@/components/dashboard/profile/update-profile-context';
import { useUpdateUserMutation } from '@/lib/user/api';
import { toast } from '@/components/ui/use-toast';
import { setUser } from '@/lib/auth/slice';
import PhotoUploader from './photo-uploader';


const languages = [{
    value: 'EN',
    label: 'English',
}, {
    value: 'AR',
    label: 'Arabic',
}, {
    value: 'HN',
    label: 'Hindu',
}, {
    value: 'FR',
    label: 'France',
},]

export default function BasicInformationForm() {
    const user = useAppSelector(state => state.auth.user);
    const form = useForm<User>({
        resolver: zodResolver(userBasicInformationSchema),
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
            phone: '',
        }
    });
    const [updateUser, updateResult] = useUpdateUserMutation();

    useEffect(() => {
        form.reset({
            ...user,
            languages: user?.languages ?? [],
            pictures: user?.pictures ?? ['', '', '', '', '', '', '', ''],
            bornMuslim: (user as unknown as any)?.bornOrRevertToIslam ?? true,
            video: user?.video ?? '',
            phone: '',
        })

        if (user?.pictures && user.pictures.length < 8) {
            const pics = [...user.pictures];
            for (let i = pics.length; i < 8; i++) {
                pics.push('');
            }
            form.setValue('pictures', pics);
        }

    }, [form, user]);


    const basicInfoFormRef = useRef<HTMLFormElement>(null);
    const { registerForm, setSaving } = useUpdateProfileContext();
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (basicInfoFormRef && basicInfoFormRef.current) {
            registerForm('basicInformationForm', basicInfoFormRef.current);
        }
    }, [basicInfoFormRef, registerForm]);


    const onSubmit = (data: User) => {
        updateUser({ user: data, self: true });
    }

    useEffect(() => {
        if (updateResult.isSuccess) {

            toast({
                title: 'Success',
                description: 'Basic information updated successfully',
            });
            dispatch(setUser({ ...user, ...updateResult.data }));
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [updateResult, dispatch])

    useEffect(() => {
        setSaving(updateResult.isLoading);
    }, [updateResult, setSaving])

    return (
        <div className="px-6 sm:px-16 md:px-24 lg:px-52 grid grid-cols-12 lg:grid-cols-3 gap-x-5 gap-y-4 py-8 text-xs">
            <div className="col-span-12 md:col-span-8 lg:col-span-1">
                <FormField
                    name="pictures"
                    control={form.control}
                    render={({ field }) => {
                        const pictureField = field;
                        return <FormField
                            name="video"
                            control={form.control}
                            render={({ field }) =>
                                <PhotoUploader
                                    onChange={pictureField.onChange}
                                    images={pictureField.value}
                                    video={field.value}
                                    onVideoChange={field.onChange}
                                />
                            }
                        />
                    }
                    }
                />
            </div>

            <Form {...form}>
                <form
                    ref={basicInfoFormRef}
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="col-span-12 lg:col-span-2 grid grid-cols-4 gap-x-5 gap-y-4 h-fit">
                    <div className="col-span-4 md:col-span-2 flex gap-5 items-center h-fit">
                        <Label className="text-nowrap font-normal text-xs line-clamp-1">First Name</Label>
                        <FormField
                            name='firstName'
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
                                    <FormMessage className="text-xs" />
                                </FormItem>)}
                        />

                    </div>

                    <div className="col-span-4 md:col-span-2 flex gap-5 items-center h-fit">
                        <Label className="text-nowrap font-normal text-xs line-clamp-1">Last Name</Label>
                        <FormField
                            name='lastName'
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
                                    <FormMessage className="text-xs" />
                                </FormItem>)}
                        />

                    </div>

                    <div className="space-y-1 col-span-2 lg:col-span-1">
                        <Label className="font-normal text-xs line-clamp-1">Age (Year)</Label>
                        <FormField
                            name='age'
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            className="text-muted-foreground bg-background text-xs shadow rounded-sm"
                                            placeholder="1988"
                                            type='number'
                                            step={1}
                                            min={18}
                                            pattern='[0-9]'
                                            {...field}

                                        />
                                    </FormControl>
                                    <FormMessage className="text-xs" />
                                </FormItem>)}
                        />
                    </div>

                    <div className="space-y-1 col-span-2 lg:col-span-1">
                        <Label className="font-normal text-xs line-clamp-1">Gender</Label>
                        <FormField
                            name='gender'
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            className="text-muted-foreground bg-background text-xs shadow rounded-sm"
                                            placeholder="Male / Female"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage className="text-xs" />
                                </FormItem>)}
                        />
                    </div>

                    <div className="space-y-1 col-span-2 lg:col-span-1">
                        <Label className="font-normal text-xs line-clamp-1">Height</Label>
                        <FormField
                            name='height'
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            type='number'
                                            step={1}
                                            min={1}
                                            pattern='[0-9]'
                                            className="text-muted-foreground bg-background text-xs shadow rounded-sm"
                                            placeholder='in cm'
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage className="text-xs" />
                                </FormItem>)}
                        />

                    </div>

                    <div className="space-y-1 col-span-2 lg:col-span-1">
                        <Label className="font-normal text-xs line-clamp-1">Weight</Label>
                        <FormField
                            name='weight'
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            className="text-muted-foreground bg-background text-xs shadow rounded-sm"
                                            placeholder="in kg"
                                            type='number'
                                            min={1}
                                            step={1}
                                            pattern='[0-9]'
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage className="text-xs" />
                                </FormItem>)}
                        />
                    </div>

                    <div className="space-y-1 col-span-2">
                        <Label className="font-normal text-xs line-clamp-1">Country of Origin</Label>
                        <FormField
                            name='country'
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Select onValueChange={field.onChange} value={field.value}>
                                            <SelectTrigger className="shadow text-muted-foreground bg-background text-xs rounded-sm h-8 ring-transparent ring-offset-transparent">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="Afghanistan">Afghanistan</SelectItem>
                                                <SelectItem value="Albania">Albania</SelectItem>
                                                <SelectItem value="Algeria">Algeria</SelectItem>
                                                <SelectItem value="Andorra">Andorra</SelectItem>
                                                <SelectItem value="Angola">Angola</SelectItem>
                                                <SelectItem value="Antigua and Barbuda">Antigua and Barbuda</SelectItem>
                                                <SelectItem value="Argentina">Argentina</SelectItem>
                                                <SelectItem value="Armenia">Armenia</SelectItem>
                                                <SelectItem value="Australia">Australia</SelectItem>
                                                <SelectItem value="Austria">Austria</SelectItem>
                                                <SelectItem value="Azerbaijan">Azerbaijan</SelectItem>
                                                <SelectItem value="Bahamas">Bahamas</SelectItem>
                                                <SelectItem value="Bahrain">Bahrain</SelectItem>
                                                <SelectItem value="Bangladesh">Bangladesh</SelectItem>
                                                <SelectItem value="Barbados">Barbados</SelectItem>
                                                <SelectItem value="Belarus">Belarus</SelectItem>
                                                <SelectItem value="Belgium">Belgium</SelectItem>
                                                <SelectItem value="Belize">Belize</SelectItem>
                                                <SelectItem value="Benin">Benin</SelectItem>
                                                <SelectItem value="Bhutan">Bhutan</SelectItem>
                                                <SelectItem value="Bolivia">Bolivia</SelectItem>
                                                <SelectItem value="Bosnia and Herzegovina">Bosnia and Herzegovina</SelectItem>
                                                <SelectItem value="Botswana">Botswana</SelectItem>
                                                <SelectItem value="Brazil">Brazil</SelectItem>
                                                <SelectItem value="Brunei">Brunei</SelectItem>
                                                <SelectItem value="Bulgaria">Bulgaria</SelectItem>
                                                <SelectItem value="Burkina Faso">Burkina Faso</SelectItem>
                                                <SelectItem value="Burundi">Burundi</SelectItem>
                                                <SelectItem value="Cabo Verde">Cabo Verde</SelectItem>
                                                <SelectItem value="Cambodia">Cambodia</SelectItem>
                                                <SelectItem value="Cameroon">Cameroon</SelectItem>
                                                <SelectItem value="Canada">Canada</SelectItem>
                                                <SelectItem value="Central African Republic">Central African Republic</SelectItem>
                                                <SelectItem value="Chad">Chad</SelectItem>
                                                <SelectItem value="Chile">Chile</SelectItem>
                                                <SelectItem value="China">China</SelectItem>
                                                <SelectItem value="Colombia">Colombia</SelectItem>
                                                <SelectItem value="Comoros">Comoros</SelectItem>
                                                <SelectItem value="Congo, Democratic Republic of the">Congo, Democratic Republic of the</SelectItem>
                                                <SelectItem value="Congo, Republic of the">Congo, Republic of the</SelectItem>
                                                <SelectItem value="Costa Rica">Costa Rica</SelectItem>
                                                <SelectItem value="Côte d'Ivoire">Côte d&apos;Ivoire</SelectItem>
                                                <SelectItem value="Croatia">Croatia</SelectItem>
                                                <SelectItem value="Cuba">Cuba</SelectItem>
                                                <SelectItem value="Cyprus">Cyprus</SelectItem>
                                                <SelectItem value="Czech Republic">Czech Republic</SelectItem>
                                                <SelectItem value="Denmark">Denmark</SelectItem>
                                                <SelectItem value="Djibouti">Djibouti</SelectItem>
                                                <SelectItem value="Dominica">Dominica</SelectItem>
                                                <SelectItem value="Dominican Republic">Dominican Republic</SelectItem>
                                                <SelectItem value="Ecuador">Ecuador</SelectItem>
                                                <SelectItem value="Egypt">Egypt</SelectItem>
                                                <SelectItem value="El Salvador">El Salvador</SelectItem>
                                                <SelectItem value="Equatorial Guinea">Equatorial Guinea</SelectItem>
                                                <SelectItem value="Eritrea">Eritrea</SelectItem>
                                                <SelectItem value="Estonia">Estonia</SelectItem>
                                                <SelectItem value="Eswatini">Eswatini</SelectItem>
                                                <SelectItem value="Ethiopia">Ethiopia</SelectItem>
                                                <SelectItem value="Fiji">Fiji</SelectItem>
                                                <SelectItem value="Finland">Finland</SelectItem>
                                                <SelectItem value="France">France</SelectItem>
                                                <SelectItem value="Gabon">Gabon</SelectItem>
                                                <SelectItem value="Gambia">Gambia</SelectItem>
                                                <SelectItem value="Georgia">Georgia</SelectItem>
                                                <SelectItem value="Germany">Germany</SelectItem>
                                                <SelectItem value="Ghana">Ghana</SelectItem>
                                                <SelectItem value="Greece">Greece</SelectItem>
                                                <SelectItem value="Grenada">Grenada</SelectItem>
                                                <SelectItem value="Guatemala">Guatemala</SelectItem>
                                                <SelectItem value="Guinea">Guinea</SelectItem>
                                                <SelectItem value="Guinea-Bissau">Guinea-Bissau</SelectItem>
                                                <SelectItem value="Guyana">Guyana</SelectItem>
                                                <SelectItem value="Haiti">Haiti</SelectItem>
                                                <SelectItem value="Honduras">Honduras</SelectItem>
                                                <SelectItem value="Hungary">Hungary</SelectItem>
                                                <SelectItem value="Iceland">Iceland</SelectItem>
                                                <SelectItem value="India">India</SelectItem>
                                                <SelectItem value="Indonesia">Indonesia</SelectItem>
                                                <SelectItem value="Iran">Iran</SelectItem>
                                                <SelectItem value="Iraq">Iraq</SelectItem>
                                                <SelectItem value="Ireland">Ireland</SelectItem>
                                                <SelectItem value="Israel">Israel</SelectItem>
                                                <SelectItem value="Italy">Italy</SelectItem>
                                                <SelectItem value="Jamaica">Jamaica</SelectItem>
                                                <SelectItem value="Japan">Japan</SelectItem>
                                                <SelectItem value="Jordan">Jordan</SelectItem>
                                                <SelectItem value="Kazakhstan">Kazakhstan</SelectItem>
                                                <SelectItem value="Kenya">Kenya</SelectItem>
                                                <SelectItem value="Kiribati">Kiribati</SelectItem>
                                                <SelectItem value="Korea, North">Korea, North</SelectItem>
                                                <SelectItem value="Korea, South">Korea, South</SelectItem>
                                                <SelectItem value="Kosovo">Kosovo</SelectItem>
                                                <SelectItem value="Kuwait">Kuwait</SelectItem>
                                                <SelectItem value="Kyrgyzstan">Kyrgyzstan</SelectItem>
                                                <SelectItem value="Laos">Laos</SelectItem>
                                                <SelectItem value="Latvia">Latvia</SelectItem>
                                                <SelectItem value="Lebanon">Lebanon</SelectItem>
                                                <SelectItem value="Lesotho">Lesotho</SelectItem>
                                                <SelectItem value="Liberia">Liberia</SelectItem>
                                                <SelectItem value="Libya">Libya</SelectItem>
                                                <SelectItem value="Liechtenstein">Liechtenstein</SelectItem>
                                                <SelectItem value="Lithuania">Lithuania</SelectItem>
                                                <SelectItem value="Luxembourg">Luxembourg</SelectItem>
                                                <SelectItem value="Madagascar">Madagascar</SelectItem>
                                                <SelectItem value="Malawi">Malawi</SelectItem>
                                                <SelectItem value="Malaysia">Malaysia</SelectItem>
                                                <SelectItem value="Maldives">Maldives</SelectItem>
                                                <SelectItem value="Mali">Mali</SelectItem>
                                                <SelectItem value="Malta">Malta</SelectItem>
                                                <SelectItem value="Marshall Islands">Marshall Islands</SelectItem>
                                                <SelectItem value="Mauritania">Mauritania</SelectItem>
                                                <SelectItem value="Mauritius">Mauritius</SelectItem>
                                                <SelectItem value="Mexico">Mexico</SelectItem>
                                                <SelectItem value="Micronesia">Micronesia</SelectItem>
                                                <SelectItem value="Moldova">Moldova</SelectItem>
                                                <SelectItem value="Monaco">Monaco</SelectItem>
                                                <SelectItem value="Mongolia">Mongolia</SelectItem>
                                                <SelectItem value="Montenegro">Montenegro</SelectItem>
                                                <SelectItem value="Morocco">Morocco</SelectItem>
                                                <SelectItem value="Mozambique">Mozambique</SelectItem>
                                                <SelectItem value="Myanmar">Myanmar</SelectItem>
                                                <SelectItem value="Namibia">Namibia</SelectItem>
                                                <SelectItem value="Nauru">Nauru</SelectItem>
                                                <SelectItem value="Nepal">Nepal</SelectItem>
                                                <SelectItem value="Netherlands">Netherlands</SelectItem>
                                                <SelectItem value="New Zealand">New Zealand</SelectItem>
                                                <SelectItem value="Nicaragua">Nicaragua</SelectItem>
                                                <SelectItem value="Niger">Niger</SelectItem>
                                                <SelectItem value="Nigeria">Nigeria</SelectItem>
                                                <SelectItem value="North Macedonia">North Macedonia</SelectItem>
                                                <SelectItem value="Norway">Norway</SelectItem>
                                                <SelectItem value="Oman">Oman</SelectItem>
                                                <SelectItem value="Pakistan">Pakistan</SelectItem>
                                                <SelectItem value="Palau">Palau</SelectItem>
                                                <SelectItem value="Palestine, State of">Palestine, State of</SelectItem>
                                                <SelectItem value="Panama">Panama</SelectItem>
                                                <SelectItem value="Papua New Guinea">Papua New Guinea</SelectItem>
                                                <SelectItem value="Paraguay">Paraguay</SelectItem>
                                                <SelectItem value="Peru">Peru</SelectItem>
                                                <SelectItem value="Philippines">Philippines</SelectItem>
                                                <SelectItem value="Poland">Poland</SelectItem>
                                                <SelectItem value="Portugal">Portugal</SelectItem>
                                                <SelectItem value="Qatar">Qatar</SelectItem>
                                                <SelectItem value="Romania">Romania</SelectItem>
                                                <SelectItem value="Russia">Russia</SelectItem>
                                                <SelectItem value="Rwanda">Rwanda</SelectItem>
                                                <SelectItem value="Saint Kitts and Nevis">Saint Kitts and Nevis</SelectItem>
                                                <SelectItem value="Saint Lucia">Saint Lucia</SelectItem>
                                                <SelectItem value="Saint Vincent and the Grenadines">Saint Vincent and the Grenadines</SelectItem>
                                                <SelectItem value="Samoa">Samoa</SelectItem>
                                                <SelectItem value="San Marino">San Marino</SelectItem>
                                                <SelectItem value="Sao Tome and Principe">Sao Tome and Principe</SelectItem>
                                                <SelectItem value="Saudi Arabia">Saudi Arabia</SelectItem>
                                                <SelectItem value="Senegal">Senegal</SelectItem>
                                                <SelectItem value="Serbia">Serbia</SelectItem>
                                                <SelectItem value="Seychelles">Seychelles</SelectItem>
                                                <SelectItem value="Sierra Leone">Sierra Leone</SelectItem>
                                                <SelectItem value="Singapore">Singapore</SelectItem>
                                                <SelectItem value="Slovakia">Slovakia</SelectItem>
                                                <SelectItem value="Slovenia">Slovenia</SelectItem>
                                                <SelectItem value="Solomon Islands">Solomon Islands</SelectItem>
                                                <SelectItem value="Somalia">Somalia</SelectItem>
                                                <SelectItem value="South Africa">South Africa</SelectItem>
                                                <SelectItem value="South Sudan">South Sudan</SelectItem>
                                                <SelectItem value="Spain">Spain</SelectItem>
                                                <SelectItem value="Sri Lanka">Sri Lanka</SelectItem>
                                                <SelectItem value="Sudan">Sudan</SelectItem>
                                                <SelectItem value="Suriname">Suriname</SelectItem>
                                                <SelectItem value="Sweden">Sweden</SelectItem>
                                                <SelectItem value="Switzerland">Switzerland</SelectItem>
                                                <SelectItem value="Syria">Syria</SelectItem>
                                                <SelectItem value="Taiwan">Taiwan</SelectItem>
                                                <SelectItem value="Tajikistan">Tajikistan</SelectItem>
                                                <SelectItem value="Tanzania">Tanzania</SelectItem>
                                                <SelectItem value="Thailand">Thailand</SelectItem>
                                                <SelectItem value="Timor-Leste">Timor-Leste</SelectItem>
                                                <SelectItem value="Togo">Togo</SelectItem>
                                                <SelectItem value="Tonga">Tonga</SelectItem>
                                                <SelectItem value="Trinidad and Tobago">Trinidad and Tobago</SelectItem>
                                                <SelectItem value="Tunisia">Tunisia</SelectItem>
                                                <SelectItem value="Turkey">Turkey</SelectItem>
                                                <SelectItem value="Turkmenistan">Turkmenistan</SelectItem>
                                                <SelectItem value="Tuvalu">Tuvalu</SelectItem>
                                                <SelectItem value="Uganda">Uganda</SelectItem>
                                                <SelectItem value="Ukraine">Ukraine</SelectItem>
                                                <SelectItem value="United Arab Emirates">United Arab Emirates</SelectItem>
                                                <SelectItem value="United Kingdom">United Kingdom</SelectItem>
                                                <SelectItem value="United States">United States</SelectItem>
                                                <SelectItem value="Uruguay">Uruguay</SelectItem>
                                                <SelectItem value="Uzbekistan">Uzbekistan</SelectItem>
                                                <SelectItem value="Vanuatu">Vanuatu</SelectItem>
                                                <SelectItem value="Vatican City">Vatican City</SelectItem>
                                                <SelectItem value="Venezuela">Venezuela</SelectItem>
                                                <SelectItem value="Vietnam">Vietnam</SelectItem>
                                                <SelectItem value="Yemen">Yemen</SelectItem>
                                                <SelectItem value="Zambia">Zambia</SelectItem>
                                                <SelectItem value="Zimbabwe">Zimbabwe</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage className="text-xs" />
                                </FormItem>)}
                        />
                    </div>
                    <div className="space-y-1 col-span-2">
                        <Label className="font-normal text-xs line-clamp-1">Skin Color</Label>
                        <FormField
                            name='skinColor'
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Select onValueChange={field.onChange} value={field.value}>
                                            <SelectTrigger className="shadow text-muted-foreground bg-background text-xs rounded-sm h-8 ring-transparent ring-offset-transparent">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="Asian">Asian</SelectItem>
                                                <SelectItem value="Black">Black</SelectItem>
                                                <SelectItem value="Brown">Brown</SelectItem>
                                                <SelectItem value="White">White</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage className="text-xs" />
                                </FormItem>)}
                        />
                    </div>
                    <div className="space-y-1 col-span-4">
                        <Label className="font-normal text-xs line-clamp-1">Language(s) - Max 3</Label>
                        <FormField
                            name='languages'
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Multiselect onChange={field.onChange} selectedOptions={field.value} title="Language" max={3} initOptions={languages} placeholder='Select' className="shadow text-muted-foreground bg-background text-xs rounded-sm h-8 ring-transparent ring-offset-transparent" />
                                    </FormControl>
                                    <FormMessage className="text-xs" />
                                </FormItem>)}
                        />

                    </div>
                    <div className="space-y-1 col-span-2">
                        <Label className="font-normal text-xs line-clamp-1">Nationality/Passport</Label>
                        <FormField
                            name='nationality'
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            className="text-muted-foreground bg-background text-xs shadow rounded-sm"
                                            placeholder="Pakistan"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage className="text-xs" />
                                </FormItem>)}
                        />

                    </div>
                    <div className="space-y-1 col-span-2">
                        <Label className="font-normal text-xs line-clamp-1">Current City</Label>
                        <FormField
                            name='city'
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            className="text-muted-foreground bg-background text-xs shadow rounded-sm"
                                            placeholder="Toronto"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage className="text-xs" />
                                </FormItem>)}
                        />

                    </div>
                    <div className="space-y-1 col-span-2">
                        <Label className="font-normal text-xs line-clamp-1">Marital Status</Label>
                        <FormField
                            name='maritalStatus'
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Select onValueChange={field.onChange} value={field.value}>
                                            <SelectTrigger className="shadow text-muted-foreground bg-background text-xs rounded-sm h-8 ring-transparent ring-offset-transparent">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="Single/Never Married">Single/Never Married</SelectItem>
                                                <SelectItem value="Single/Legally Divorced">Single/Legally Divorced</SelectItem>
                                                <SelectItem value="Single/Islamically-Divorced">Single/Islamically-Divorced</SelectItem>
                                                <SelectItem value="Other">Other</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage className="text-xs" />
                                </FormItem>)}
                        />

                    </div>

                    <div className="space-y-1 col-span-2">
                        <Label className="font-normal text-xs line-clamp-1">Do you have children?</Label>
                        {/* <FormField
                            name='maritalStatus'
                            control={form.control}
                            render={({ field }) => ( */}
                        <FormItem>
                            <FormControl>
                                <Select >
                                    <SelectTrigger className="shadow text-muted-foreground bg-background text-xs rounded-sm h-8 ring-transparent ring-offset-transparent">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="No kids">No kids</SelectItem>
                                        <SelectItem value="Yes 20%+ Shared parenting">Yes 20%+ Shared parenting</SelectItem>
                                        <SelectItem value="Yes: 50%+ Joint-Shared Parenting">Yes: 50%+ Joint-Shared Parenting</SelectItem>
                                        <SelectItem value="Yes Full-Time Single Parent">Yes Full-Time Single Parent</SelectItem>
                                    </SelectContent>
                                </Select>
                            </FormControl>
                            <FormMessage className="text-xs" />
                        </FormItem>
                        {/* )}
                        /> */}
                    </div>

                    <div className="col-span-4 grid grid-cols-4 lg:grid-cols-8 gap-x-5 gap-y-4 ">
                        <div className="space-y-1 col-span-4 lg:col-span-2">
                            <Label className="font-normal text-xs line-clamp-1">Number of children</Label>
                            <FormField
                                name='numberOfChildren'
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input
                                                className="text-muted-foreground bg-background text-xs shadow rounded-sm"
                                                placeholder="0"
                                                type='number'
                                                min={0}
                                                step={1}
                                                pattern='[0-9]'
                                                {...field}

                                            />
                                        </FormControl>
                                        <FormMessage className="text-xs" />
                                    </FormItem>)}
                            />
                        </div>

                        <div className="space-y-1 col-span-4 lg:col-span-3">
                            <Label className="font-normal text-xs line-clamp-1">Age of Oldest Child</Label>
                            <FormField
                                name='ageOfOldestChild'
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input
                                                className="text-muted-foreground bg-background text-xs shadow rounded-sm"
                                                placeholder="0"
                                                type='number'
                                                min={0}
                                                step={1}
                                                pattern='[0-9]'
                                                {...field}

                                            />
                                        </FormControl>
                                        <FormMessage className="text-xs" />
                                    </FormItem>)}
                            />
                        </div>
                        <div className="space-y-1 col-span-4 lg:col-span-3">
                            <Label className="font-normal text-xs line-clamp-1">Age of Youngest Child</Label>
                            <FormField
                                name='ageOfYoungestChild'
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input
                                                className="text-muted-foreground bg-background text-xs shadow rounded-sm"
                                                placeholder="0"
                                                type='number'
                                                min={0}
                                                step={1}
                                                pattern='[0-9]'
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage className="text-xs" />
                                    </FormItem>)}
                            />
                        </div>
                    </div>

                    <div className="col-span-4 grid grid-cols-4 lg:grid-cols-8 gap-x-5 gap-y-4">
                        <div className="space-y-1 col-span-4 lg:col-span-2">
                            <Label className="font-normal text-xs line-clamp-1">Sunni-Madhaib</Label>
                            <FormField
                                name='sunniMadhaib'
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Select onValueChange={field.onChange} value={field.value}>
                                                <SelectTrigger className="shadow text-muted-foreground bg-background text-xs rounded-sm h-8 ring-transparent ring-offset-transparent">
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="Hanafi">Hanafi</SelectItem>
                                                    <SelectItem value="Hanbali">Hanbali</SelectItem>
                                                    <SelectItem value="Maliki">Maliki</SelectItem>
                                                    <SelectItem value="Shafi">Shafi</SelectItem>
                                                    <SelectItem value="All Four">All Four</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage className="text-xs" />
                                    </FormItem>)}
                            />

                        </div>

                        <div className="space-y-1 col-span-4 lg:col-span-3">
                            <Label className="font-normal text-xs line-clamp-1">Religious Practice</Label>
                            <FormField
                                name='religiousPractice'
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Select onValueChange={field.onChange} value={field.value}>
                                                <SelectTrigger className="shadow text-muted-foreground bg-background text-xs rounded-sm h-8 ring-transparent ring-offset-transparent">
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="Not Practicing Never Prays/Non-Muslim">Not Practicing Never Prays/Non-Muslim</SelectItem>
                                                    <SelectItem value="Practicing/Fardh">Practicing/Fardh</SelectItem>
                                                    <SelectItem value="Very Practicing/Sunnah Nawafil Included">Very Practicing/Sunnah Nawafil Included</SelectItem>

                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage className="text-xs" />
                                    </FormItem>)}
                            />

                        </div>
                        <div className="space-y-1 col-span-4 lg:col-span-3">
                            <Label className="font-normal text-xs line-clamp-1">
                                Born/Reverted to Islam
                            </Label>
                            <FormField
                                name='bornMuslim'
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
                    </div>

                    <div className="space-y-1 col-span-2 lg:col-span-1">
                        <Label className="font-normal text-xs line-clamp-1">Drinks</Label>
                        <FormField
                            name='drinks'
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
                    <div className="space-y-1 col-span-2 lg:col-span-1">
                        <Label className="font-normal text-xs line-clamp-1 text-nowrap">
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
                    <div className="space-y-1 col-span-2 lg:col-span-1">
                        <Label className="font-normal text-xs line-clamp-1">
                            Smokes <span className="text-[0.6rem]">(Vapping/Shisha)</span>
                        </Label>
                        <FormField
                            name='smokes'
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

                    <div className="space-y-1 col-span-2 lg:col-span-1">
                        <Label className="font-normal text-xs line-clamp-1">Tattoo(s)</Label>
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
                </form>
            </Form>
        </div >
    );
}
