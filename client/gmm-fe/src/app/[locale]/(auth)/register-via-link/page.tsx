'use client';

import { signUpWithLink } from '@/actions/auth/signup';
import { Button, buttonVariants } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { useAppSelector } from '@/lib/hooks';
import { useRouter } from '@/lib/navigation';
import { SignUpWithLink, signUpWithLinkSchema } from '@/lib/schemas/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { PhoneNumberUtil } from 'google-libphonenumber';
import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';
import { getEighteenYearsAgo } from '@/lib/format';
import { DatePicker } from '@mui/x-date-pickers';
import {
  SelectItem,
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import Loading from '@/components/ui/loading';
import { Label } from '@/components/ui/label';
import Image from 'next/image';
import { useCreateUploadUrlMutation } from '@/lib/user/api';
import { upload } from '@/lib/file-upload';
import PasswordStrengthIndicator from '@/components/ui/password-strength-indicator';

export default function GuardianRegistrationPage() {
  const t = useTranslations('Auth');

  const { replace } = useRouter();

  const params = useSearchParams();

  const form = useForm<SignUpWithLink>({
    resolver: zodResolver(signUpWithLinkSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      phoneNumber: '',
      token: params.get('token') || '',
      password: '',
      gender: 'Male',
      dateOfBirth: getEighteenYearsAgo(),
      idCardImage: '',
      relationship: '',
      confirmPassword: '',
    },
  });
  console.log(form.formState.errors);
  const [image, setImage] = useState<string | null>(null);
  const [generateUploadUrl, uploadResult] = useCreateUploadUrlMutation();

  const handleImageChange = async (files: FileList | null, field: any) => {
    console.log('Uploading image');

    const file = files?.[0];
    if (file) {
      if (!file.type.startsWith('image')) {
        form.setError('idCardImage', {
          type: 'invalidFileType',
          message: 'Invalid file type. Please upload an image file',
        });
        return;
      }
      const blobUrl = URL.createObjectURL(file);

      try {
        const fileInfo = await upload(file, generateUploadUrl);
        console.log('Upload Successful');
        field.onChange(fileInfo.fileKey);

        setImage(blobUrl);
      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    const token = params.get('token');
    if (token) {
      const userInfo = jwtDecode(token) as unknown as {
        firstName: string;
        lastName: string;
        email: string;
        phone: string;
        relationship: string;
      };

      form.reset({
        ...form.getValues(),
        firstName: userInfo.firstName ?? '',
        lastName: userInfo.lastName ?? '',
        gender: 'Male',
        phoneNumber: userInfo.phone ?? '',
        token: token,
        relationship: userInfo.relationship ?? '',
      });
    }
  }, [params, form]);

  const [isLoading, setIsLoading] = useState(false);

  async function onSubmit(data: SignUpWithLink) {
    setIsLoading(true);
    try {
      const response = await signUpWithLink(data);

      if (response.status === 200) {
        toast({
          title: 'Success',
          description: 'Login to continue',
        });
        replace('login');
      } else {
        toast({
          title: 'Error',
          description: response.message,
          variant: 'destructive',
        });
      }
    } catch {
      toast({
        title: 'Error',
        description: 'Unable to Register. Please try again later.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="rounded-xl bg-background shadow-lg p-5 space-y-4 text-sm"
      >
        <div className="flex justify-between items-end">
          <h1 className="text-xl">Guardian&apos;s Registration</h1>
        </div>

        <div className="divide-y space-y-2">
          <div className="flex justify-between items-center py-2 pt-3">
            <div className="flex flex-col gap-1">
              <span className="font-bold">Full Name</span>

              <div className="flex gap-2">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          className="text-sm placeholder:text-xs shadow"
                          placeholder={t('signup.firstName')}
                          autoComplete="given-name"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          autoComplete="family-name"
                          className="text-sm placeholder:text-xs shadow"
                          placeholder={t('signup.lastName')}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col items-start py-2 gap-6 pt-3">
            <div className="flex flex-col w-full gap-1">
              <span className="font-bold">Password</span>

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="flex flex-col gap-2 max-w-64">
                        <Input
                          autoComplete="new-password"
                          className="text-sm placeholder:text-xs shadow w-full"
                          placeholder={t('signup.password')}
                          type="password"
                          {...field}
                        />
                        <PasswordStrengthIndicator password={field.value} />
                      </div>
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex flex-col w-full gap-1">
              <span className="font-bold">Confirm Password</span>
              <div className="max-w-64">
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          className="text-sm placeholder:text-xs shadow"
                          placeholder={t('signup.confirmPassword')}
                          type="password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>
          <div className="flex items-center py-2 pt-3">
            <div className="flex flex-col gap-1">
              <FormField
                control={form.control}
                name="dateOfBirth"
                render={({ field }) => (
                  <FormItem className="flex flex-col pt-2">
                    <DatePicker
                      label={'Date of Birth'}
                      views={['year', 'month', 'day']}
                      value={field.value}
                      onChange={field.onChange}
                      maxDate={getEighteenYearsAgo()}
                      slotProps={{
                        day: {
                          sx: {
                            '&.MuiPickersDay-root.Mui-selected': {
                              backgroundColor: '#197149',
                            },
                            '&.MuiPickersDay-root:hover': {
                              backgroundColor: '#145634',
                              color: '#fff',
                            },
                            padding: '2px',
                          },
                        },
                        desktopPaper: {
                          sx: {
                            '.MuiPickersYear-yearButton.Mui-selected': {
                              backgroundColor: '#197149',
                            },
                            '.MuiPickersYear-yearButton:hover': {
                              backgroundColor: '#197149',
                              color: '#fff',
                            },
                            padding: '2px',
                          },
                        },
                        textField: {
                          sx: {
                            '& .MuiOutlinedInput-root': {
                              '& .MuiOutlinedInput-input': {
                                padding: '6px 8px',
                              },
                            },
                          },
                        },
                      }}
                    />

                    <FormMessage className="text-md" />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="flex items-center py-2 gap-5 pt-3">
            <div className="flex flex-col gap-1">
              <span className="font-bold">Relationship</span>
              <FormField
                name="relationship"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger className="text-md shadow text-muted-foreground bg-background rounded-sm h-9 ring-transparent ring-offset-transparent w-[263px]">
                          <SelectValue placeholder="Relationship to User" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Father/Mother (parental involvement)">
                            Father/Mother (parental involvement)
                          </SelectItem>
                          <SelectItem value="Brother (above 18, min 12 years older)">
                            Brother
                          </SelectItem>
                          <SelectItem value="Paternal/Maternal Uncle (no father or brother)">
                            Paternal/Maternal Uncle (no father or brother)
                          </SelectItem>
                          <SelectItem value="Paternal/Maternal Aunts (no father or brother)">
                            Paternal/Maternal Aunts (no father or brother)
                          </SelectItem>
                          <SelectItem value="Imam/Mosque (Imam/mufti is my guardian/family contact)">
                            Imam/Mosque (Imam/mufti is my guardian/family
                            contact)
                          </SelectItem>
                          <SelectItem value="Revert Care appoint guardian/wali (option only for reverts subject to interview and approval)">
                            Revert Care appoint guardian/wali (option only for
                            reverts subject to interview and approval)
                          </SelectItem>{' '}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage className="text-md" />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex flex-col gap-1">
              <span className="font-bold">Phone Number</span>
              <FormField
                name="phoneNumber"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="shadow">
                        <PhoneInput
                          {...field}
                          className="text-muted-foreground bg-background text-md rounded-sm"
                        />
                      </div>
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="flex justify-between items-start py-2 pt-3">
            <div className="flex flex-col gap-1">
              <div className="space-y-1 py-2 col-span-2">
                <Label>Guardian ID</Label>

                {image && !uploadResult.isLoading && (
                  <div className="relative w-64 overflow-hidden">
                    <Image
                      src={image}
                      className="object-contain w-full h-full"
                      width={100}
                      height={100}
                      alt="upload your ID picture"
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="flex gap-2">
              <FormField
                name="idCardImage"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      {uploadResult.isLoading ? (
                        <Loading />
                      ) : (
                        <label
                          className={cn(
                            buttonVariants({ variant: 'outline' }),
                            'text-secondary h-7 text-xs'
                          )}
                        >
                          Upload Document
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) =>
                              handleImageChange(e.target.files, field)
                            }
                            className="hidden"
                          />
                        </label>
                      )}
                    </FormControl>
                    <FormMessage className="text-sm" />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="h-24 py-6">
            {isLoading ? (
              <Loading />
            ) : (
              <Button
                type="submit"
                className={cn(
                  buttonVariants({ variant: 'outline' }),
                  'text-secondary h-7 text-xs'
                )}
              >
                Register
              </Button>
            )}
          </div>
        </div>
      </form>
    </Form>
  );
}
