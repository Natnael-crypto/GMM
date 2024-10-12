'use client'

import { useEffect, useRef } from 'react'
import { Form } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { toast } from '@/components/ui/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAppSelector } from '@/lib/hooks';
import { FemaleIslamicLifestyle, femaleIslamicLifestyleSchema } from '@/lib/schemas/islamic-lifestyle';
import { useUpdateIslamicLifestyleMutation } from '@/lib/user/api';
import { useUpdateProfileContext } from '@/components/dashboard/profile/update-profile-context';
import { useTranslations } from 'next-intl';
import Field from '../field';

export default function IslamicLifestyleFormFemale({ islamicLifestyle }: { islamicLifestyle?: FemaleIslamicLifestyle }) {
    const form = useForm<FemaleIslamicLifestyle>({
        resolver: zodResolver(femaleIslamicLifestyleSchema),
        defaultValues: {
            salat: islamicLifestyle?.salat || '',
            ramadan: islamicLifestyle?.ramadan || '',
            fasting: islamicLifestyle?.fasting || '',
            zakat: islamicLifestyle?.zakat || '',
            food: islamicLifestyle?.food || '',
            islamAndCulture: islamicLifestyle?.islamAndCulture || '',
            islamicEducation: islamicLifestyle?.islamicEducation || '',
            appearance: islamicLifestyle?.appearance || '',
            hajjAndUmra: islamicLifestyle?.hajjAndUmra || '',
            childrenAndUpbringing: islamicLifestyle?.childrenAndUpbringing || '',
        }
    });

    useEffect(() => {
        form.reset(islamicLifestyle)
    }, [form, islamicLifestyle]);

    const user = useAppSelector((state) => state.auth.user);
    const islamicLifestyleFormRef = useRef<HTMLFormElement>(null);

    const { registerForm, setSaving } = useUpdateProfileContext()
    const [updateIslamicLifestyle, updateResult] = useUpdateIslamicLifestyleMutation();

    useEffect(() => {
        if (islamicLifestyleFormRef && islamicLifestyleFormRef.current) {
            registerForm('islamicLifestyleForm', islamicLifestyleFormRef.current);
        }
    }, [islamicLifestyleFormRef, registerForm]);

    const onSubmit = async (data: FemaleIslamicLifestyle) => {
        await updateIslamicLifestyle({ userId: user!.id, islamicLifestyle: data });
    }

    useEffect(() => {
        if (updateResult.isSuccess) {
            toast({
                title: 'Success',
                description: 'Islamic lifestyle updated successfully',
            });
        }
    }, [updateResult])

    useEffect(() => {
        setSaving(updateResult.isLoading);
    }, [updateResult, setSaving])

    const t = useTranslations('forms.islamicLifestyle.female')
    const questions = t.raw('questions')

    return (
        <div className="py-8 px-6 sm:px-16 md:px-24 lg:px-52">
            <h1 className="text-xl font-bold text-secondary border-b p-1">
                {
                    t.rich('title', {
                        sm: (text) => <span className='text-xs'>{text}</span>
                    })
                }
            </h1>

            <div className='py-4 text-center text-sm'>
                {t.rich('description', {
                    bold: (text) => <span className="font-bold">{text}</span>,
                }
                )}
            </div>

            <Form {...form}>
                <form
                    ref={islamicLifestyleFormRef}
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="grid grid-cols-12 gap-x-3 gap-y-3 py-5">
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
