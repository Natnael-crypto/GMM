import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useTranslations } from 'next-intl';
import {
  FamilyIntroduction,
  familyIntroductionSchema,
} from '@/lib/schemas/family-introduction';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useEffect, useRef, useState } from 'react';
import { useUpdateProfileContext } from '../update-profile-context';
import {
  useCreateUploadUrlMutation,
  useUpdateFamilyIntroductionMutation,
  useUpdateUserMutation,
} from '@/lib/user/api';
import { useAppSelector } from '@/lib/hooks';
import { toast } from '@/components/ui/use-toast';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { useSendRequestMutation } from '@/lib/guardian/api';
import { PhoneInput } from '@/components/ui/phone-input';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useImage } from '@/lib/hooks/use-image';
import { Link } from '@/lib/navigation';
import { upload } from '@/lib/file-upload';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useProfileCompletion } from '@/lib/hooks/profile-completion';

export default function FamilyIntroductionForm({
  familyIntroduction,
}: {
  familyIntroduction?: FamilyIntroduction;
}) {
  const t = useTranslations('Dashboard.updateProfile.familyIntroduction');

  const user = useAppSelector((state) => state.auth.user);

  const form = useForm<FamilyIntroduction>({
    resolver: zodResolver(familyIntroductionSchema),
    defaultValues: {
      guardianFirstName: familyIntroduction?.guardianFirstName ?? '',
      guardianLastName: familyIntroduction?.guardianLastName ?? '',
      relationshipToGuardian: familyIntroduction?.relationshipToGuardian ?? '',
      guardianPhoneNumber: familyIntroduction?.guardianPhoneNumber ?? '',
      guardianEmail: familyIntroduction?.guardianEmail ?? '',
    },
  });

  const { familyIntroduction: familyIntroductionCompletion } =
    useProfileCompletion();

  const [idCardImageId, setIdCardImageId] = useState<string | null>(null);
  const idCardImageUrl = useImage(idCardImageId ?? undefined);

  useEffect(() => {
    if (user && user.guardian) {
      if (user.guardian.email !== user.email) {
        form.reset({
          ...familyIntroduction,
          guardianEmail: user.guardian.email,
        });
      }
    } else {
      form.reset(familyIntroduction);
    }
  }, [form, familyIntroduction, user]);

  useEffect(() => {
    if (user) {
      setIdCardImageId(user.idCardImage);
    }
  }, [user]);

  const familyIntroductionFormRef = useRef<HTMLFormElement>(null);

  const { registerForm, setSaving } = useUpdateProfileContext();
  const [updateFamilyIntroduction, updateResult] =
    useUpdateFamilyIntroductionMutation();
  const [sendGuardianRequest] = useSendRequestMutation();

  const [updateUser] = useUpdateUserMutation();

  useEffect(() => {
    if (familyIntroductionFormRef && familyIntroductionFormRef.current) {
      registerForm('familyIntroductionForm', familyIntroductionFormRef.current);
    }
  }, [familyIntroductionFormRef, registerForm]);

  const onSubmit = async (data: FamilyIntroduction) => {
    console.log(data);

    if (idCardImageId !== user?.idCardImage && idCardImageId) {
      updateUser({
        user: {
          id: user!.id,
          idCardImage: idCardImageId,
        },
      });
    }

    try {
      if (user?.guardian && user.guardian.email !== data.guardianEmail) {
        updateFamilyIntroduction({
          userId: user!.id,
          familyIntroduction: data,
        });

        console.log(data);

        const result = await sendGuardianRequest({
          guardianEmail: data.guardianEmail,
        }).unwrap();

        if (result) {
          toast({
            title: 'Success',
            description: 'Guardian request sent successfully',
          });
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (updateResult.isSuccess) {
      toast({
        title: 'Success',
        description: 'Family information updated successfully',
      });
    }
  }, [updateResult]);

  useEffect(() => {
    setSaving(updateResult.isLoading);
  }, [updateResult, setSaving]);

  const bornMuslim = user?.bornOrRevertToIslam === 'Born Muslim';

  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [generateUploadUrl, uploadResult] = useCreateUploadUrlMutation();

  const handleImageChange = async (files: FileList | null) => {
    const file = files?.[0];
    if (file) {
      if (!file.type.startsWith('image')) {
        toast({
          title: 'Government Issued ID',
          description: 'Invalid file type. Please upload an image file',
        });
        return;
      }
      const blobUrl = URL.createObjectURL(file);

      setPreviewImage(blobUrl);

      try {
        const fileInfo = await upload(file, generateUploadUrl);
        setIdCardImageId(fileInfo.fileKey);
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <Form {...form}>
      <form
        ref={familyIntroductionFormRef}
        onSubmit={form.handleSubmit(onSubmit)}
        className="pb-8 px-6 sm:px-16 md:px-[3rem] lg:px-[5rem] 2xl:px-[15rem] 3xl:px-[20rem]"
      >
        <div className="grid grid-cols-12 gap-x-3 gap-y-3 py-4">
          <div className="space-y-1 col-span-4">
            <Label>{t('guardianInformation.firstName')}</Label>
            <FormField
              name="guardianFirstName"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      disabled
                      className="text-muted-foreground bg-background text-xs shadow rounded-sm"
                    />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
          </div>

          <div className="space-y-1 col-span-4">
            <Label>{t('guardianInformation.lastName')}</Label>
            <FormField
              name="guardianLastName"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      disabled
                      className="text-muted-foreground bg-background text-xs shadow rounded-sm"
                    />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
          </div>

          <div className="space-y-1 col-span-4">
            <Label>{t('guardianInformation.relationship')}</Label>
            <FormField
              name="relationshipToGuardian"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger
                        className="shadow text-muted-foreground bg-background text-xs rounded-sm h-8 ring-transparent ring-offset-transparent"
                        disabled
                      >
                        <SelectValue />
                      </SelectTrigger>

                      <SelectContent>
                        <SelectItem value="Father/Mother (parental involvement)">
                          Father/Mother (parental involvement)
                        </SelectItem>
                        <SelectItem value="Brother (above 18, min 12 years older)">
                          Brother (above 18, min 12 years older)
                        </SelectItem>
                        <SelectItem value="Paternal/Maternal Uncle (no father or brother)">
                          Paternal/Maternal Uncle (no father or brother)
                        </SelectItem>
                        <SelectItem value="Paternal/Maternal Aunts (no father or brother)">
                          Paternal/Maternal Aunts (no father or brother)
                        </SelectItem>
                        {!bornMuslim && (
                          <>
                            <SelectItem value="Imam/Mosque (Imam/mufti is my guardian/family contact)">
                              Imam/Mosque (Imam/mufti is my guardian/family
                              contact)
                            </SelectItem>
                            <SelectItem value="Revert Care appoint guardian/wali (option only for reverts subject to interview and approval)">
                              Revert Care appoint guardian/wali (option only for
                              reverts subject to interview and approval)
                            </SelectItem>{' '}
                          </>
                        )}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
          </div>

          <div className="space-y-1 col-span-4">
            <Label>{t('guardianInformation.phoneNumber')}</Label>
            <FormField
              name="guardianPhoneNumber"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <PhoneInput
                      {...field}
                      disabled
                      className="text-muted-foreground bg-background text-md shadow rounded-sm"
                    />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
          </div>

          <div className="space-y-1 col-span-6">
            <Label>
              {t('guardianInformation.email')}{' '}
              {user &&
                (!user.guardian ||
                  user.guardian.email !== form.watch('guardianEmail')) && (
                  <span className="text-xs font-medium italic">
                    (Pending Approval)
                  </span>
                )}
            </Label>
            <FormField
              name="guardianEmail"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      disabled
                      className="text-muted-foreground bg-background text-xs shadow rounded-sm"
                    />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
          </div>

          <h1 className="text-xl font-bold text-secondary border-b p-1 col-span-12">
            {t('idVerification.title')}
          </h1>

          <div className="space-y-1 col-span-4">
            <Label>{t('idVerification.phoneNumber')}</Label>
            <PhoneInput
              value={user?.phoneNumber ?? ''}
              disabled
              className="text-muted-foreground bg-background text-md shadow rounded-sm"
            />
          </div>

          <div className="col-span-6"></div>

          <div className="space-y-1 col-span-7 flex flex-col gap-y-1 mt-4">
            <Label>{t('idVerification.id')}</Label>
            {idCardImageUrl && user?.idCardImage ? (
              <Link
                href={idCardImageUrl || ''}
                className={cn(
                  buttonVariants({ variant: 'default' }),
                  'bg-primary text-primary-foreground h-7 text-xs w-fit'
                )}
                target="_blank"
              >
                View
              </Link>
            ) : (
              <>
                <Input
                  className="text-muted-foreground bg-background text-xs shadow rounded-sm"
                  type="file"
                  onChange={(e) => handleImageChange(e.target.files)}
                />
                <div className="aspect-square flex items-center justify-center w-[225px]">
                  {previewImage ? (
                    <Image
                      src={previewImage}
                      className="w-full h-full object-cover"
                      width={300}
                      height={300}
                      alt="ID Card"
                    />
                  ) : (
                    <FontAwesomeIcon
                      className="text-[6rem] text-muted-foreground"
                      icon={['far', 'id-card']}
                    />
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </form>
    </Form>
  );
}
