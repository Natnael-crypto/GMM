'use client';
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
import { FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { useFormContext } from 'react-hook-form';
import { upload } from '@/lib/file-upload';
import { useCreateUploadUrlMutation } from '@/lib/user/api';
import { useState } from 'react';
import Image from 'next/image';
import Loading from '../ui/loading';

export default function FamilyIntroductionForm() {
  const t = useTranslations('Dashboard.updateProfile.familyIntroduction');
  const form = useFormContext()

  const [image, setImage] = useState<string | undefined>(undefined);
  const [generateUploadUrl, uploadResult] = useCreateUploadUrlMutation();

  const handleImageChange = async (files: FileList | null, field: any) => {
    const file = files?.[0];
    if (file) {

      if (!file.type.startsWith('image')) {
        form.setError('pictures', {
          type: 'invalidFileType',
          message: 'Invalid file type. Please upload an image file',
        });
        return;
      }
      const blobUrl = URL.createObjectURL(file);

      setImage(blobUrl);

      try {
        const fileInfo = await upload(file, generateUploadUrl);

        field.onChange(fileInfo.fileKey);
      } catch (error) {
        console.error(error);
      }
    }
  }

  return (
    <div>
      <div className="col-span-2 flex flex-col sm:flex-row justify-between items-center border-b border-b-secondary pb-1">
        <h1 className="text-primary text-lg font-bold">
          Family/Guardian Introduction
        </h1>
        <span className="text-destructive font-bold text-xs">
          Please Answer All Questions Accurately
        </span>
      </div>
      <div className="grid grid-cols-12 gap-x-3 gap-y-3 py-4">
        <div className="space-y-1 col-span-6">
          <Label className="font-normal text-xs line-clamp-1">
            {t('guardianInformation.fullName')}
          </Label>
          <FormField
            name="guardianFullName"
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

        <div className="space-y-1 col-span-6">
          <Label className="font-normal text-xs line-clamp-1">
            {t('guardianInformation.relationship')}
          </Label>
          <FormField
            name='relationshipToGuardian'
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="shadow text-muted-foreground bg-background text-xs rounded-sm h-8 ring-transparent ring-offset-transparent">
                      <SelectValue />
                    </SelectTrigger>

                    <SelectContent>
                      <SelectItem value="Father/Mother (parental involvement)">Father/Mother (parental involvement)</SelectItem>
                      <SelectItem value="Brother (above 18, subject to approval)">Brother (above 18, subject to approval)</SelectItem>
                      <SelectItem value="Paternal/Maternal Uncle (no father or brother)">Paternal/Maternal Uncle (no father or brother)</SelectItem>
                      <SelectItem value="Paternal/Maternal Aunts (no father or brother)">Paternal/Maternal Aunts (no father or brother)</SelectItem>
                      <SelectItem value="Imam/Mosque (Imam/mufti is my guardian/family contact)">Imam/Mosque (Imam/mufti is my guardian/family contact)</SelectItem>
                      <SelectItem value="Revert Care appoint guardian/wali (option only for reverts subject to interview and approval)">Revert Care appoint guardian/wali (option only for reverts subject to interview and approval)</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>)}
          />
        </div>

        <div className="space-y-1 col-span-6">
          <Label className="font-normal text-xs line-clamp-1">
            {t('guardianInformation.phoneNumber')}
          </Label>
          <FormField
            name="guardianPhoneNumber"
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

        <div className="space-y-1 col-span-6">
          <Label className="font-normal text-xs line-clamp-1">{t('guardianInformation.email')}{" "}
          </Label>
          <FormField
            name="guardianEmail"
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


        <h1 className="text-xl font-bold text-secondary border-b p-1 col-span-12">
          {t('idVerification.title')}
        </h1>

        <div className="space-y-1 col-span-12">
          <Label className="font-normal text-xs line-clamp-1">
            {t('idVerification.phoneNumber')}
          </Label>
          <FormField
            name="phoneNumber"
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

        <div className="space-y-1 col-span-12">
          <Label className="font-normal text-xs line-clamp-1">
            {t('idVerification.id')}
          </Label>
          <FormField
            name="idCardImage"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  {uploadResult.isLoading ? <Loading /> :
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageChange(e.target.files, field)}
                      className="text-muted-foreground bg-background text-xs shadow rounded-sm"

                    />
                  }

                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
          {
            image && !uploadResult.isLoading && (
              <div className='relative w-64 aspect-video overflow-hidden'>
                <Image src={image} className="object-cover w-full h-full" width={100} height={100} alt="upload your ID picture" />
              </div>)
          }
        </div>
      </div>
    </div>

  )
}
