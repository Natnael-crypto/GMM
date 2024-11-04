'use client'

import { useEffect, useRef } from 'react'
import { Form } from '@/components/ui/form';
import { FemaleExpectedIslamicLifestyle, femaleExpectedIslamicLifestyleSchema } from '@/lib/schemas/islamic-lifestyle';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useAppSelector } from '@/lib/hooks';
import { useUpdateExpectedIslamicLifestyleMutation } from '@/lib/user/api';
import { toast } from '@/components/ui/use-toast';
import { useUpdateProfileContext } from '@/components/dashboard/profile/update-profile-context';
import { useTranslations } from 'next-intl';
import Field from '../field';

export default function ExpectedIslamicLifestyleFormFemale({ expectedIslamicLifestyle }: { expectedIslamicLifestyle?: FemaleExpectedIslamicLifestyle }) {
    const form = useForm<FemaleExpectedIslamicLifestyle>({
        resolver: zodResolver(femaleExpectedIslamicLifestyleSchema),
        defaultValues: {
            salat: expectedIslamicLifestyle?.salat ?? '',
            hijab: expectedIslamicLifestyle?.hijab ?? '',
            socialMedia: expectedIslamicLifestyle?.socialMedia ?? '',
            wifeNonMehramContact: expectedIslamicLifestyle?.wifeNonMehramContact ?? '',
            husbandNonMehramContact: expectedIslamicLifestyle?.husbandNonMehramContact ?? '',
            wifeAppearance: expectedIslamicLifestyle?.wifeAppearance ?? '',
            husbandAppearance: expectedIslamicLifestyle?.husbandAppearance ?? '',
            childrenUpbringing: expectedIslamicLifestyle?.childrenUpbringing ?? '',
            polygyny: expectedIslamicLifestyle?.polygyny ?? ''
        }
    });

    useEffect(() => {
        form.reset(expectedIslamicLifestyle)
    }, [form, expectedIslamicLifestyle]);

    const user = useAppSelector((state) => state.auth.user);
    const expectedIslamicLifestyleFormRef = useRef<HTMLFormElement>(null);

    const { registerForm, setSaving } = useUpdateProfileContext()
    const [updateExpectedIslamicLifestyle, updateResult] = useUpdateExpectedIslamicLifestyleMutation();

    useEffect(() => {
        if (expectedIslamicLifestyleFormRef && expectedIslamicLifestyleFormRef.current) {
            registerForm('expectedIslamicLifestyleForm', expectedIslamicLifestyleFormRef.current);
        }
    }, [expectedIslamicLifestyleFormRef, registerForm]);

    const onSubmit = (data: FemaleExpectedIslamicLifestyle) => {
        updateExpectedIslamicLifestyle({ userId: user!.id, expectedIslamicLifestyle: data });
    }

    useEffect(() => {
        setSaving(updateResult.isLoading);
    }, [updateResult, setSaving])

    useEffect(() => {
        if (updateResult.isSuccess) {
            toast({
                title: 'Success',
                description: 'Expected Islamic lifestyle updated successfully',
            });
        }
    }, [updateResult])

    const t = useTranslations('forms.expectedIslamicLifestyle.female')
    const questions = t.raw('questions')

    return (
        <div className="bg-muted w-full py-4 px-6 sm:px-16 md:px-[3rem] lg:px-[5rem] 2xl:px-[15rem] 3xl:px-[20rem]">
            <h1 className="text-xl font-bold text-primary border-b p-1">
                {t('title')}
            </h1>

            <Form {...form}>
                <form
                    ref={expectedIslamicLifestyleFormRef}
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="grid grid-cols-12 gap-x-3 gap-y-4 py-5">
                    {
                        questions.map((question: any, index: number) => {
                            return <Field key={index} type={question.type} label={question.question} name={question.name} options={question.options} />
                        })
                    }
                </form>
            </Form>
        </div>
    )
}
