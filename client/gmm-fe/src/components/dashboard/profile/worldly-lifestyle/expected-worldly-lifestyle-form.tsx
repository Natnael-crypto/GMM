'use client'

import { useUpdateProfileContext } from '@/components/dashboard/profile/update-profile-context';
import { Form } from '@/components/ui/form';
import { toast } from '@/components/ui/use-toast';
import { useAppSelector } from '@/lib/hooks';
import { MaleExpectedWorldlyLifestyle, maleExpectedWorldlyLifestyleSchema } from '@/lib/schemas/worldly-lifestyle';
import { useUpdateExpectedWorldlyLifestyleMutation } from '@/lib/user/api';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Field from '../field';

export function ExpectedWorldlyLifestyleFormMale({ expectedWorldlyLifestyle }: { expectedWorldlyLifestyle?: MaleExpectedWorldlyLifestyle }) {
    const form = useForm<MaleExpectedWorldlyLifestyle>({
        resolver: zodResolver(maleExpectedWorldlyLifestyleSchema),
        defaultValues: {
            decisionMakingAndLeadership: expectedWorldlyLifestyle?.decisionMakingAndLeadership || '',
            willFinanciallySupportWifeEducation: expectedWorldlyLifestyle?.willFinanciallySupportWifeEducation || '',
            moneyInMarriage: expectedWorldlyLifestyle?.moneyInMarriage || '',
            roleOfWife: expectedWorldlyLifestyle?.roleOfWife || '',
            wifeRelocation: expectedWorldlyLifestyle?.wifeRelocation || '',
            jointFamily: expectedWorldlyLifestyle?.jointFamily || '',
            wifeOpenToLiveWithHusbandsParents: expectedWorldlyLifestyle?.wifeOpenToLiveWithHusbandsParents || '',
            haveTheirHomeSeparateFromTheirFamilies: expectedWorldlyLifestyle?.haveTheirHomeSeparateFromTheirFamilies || '',
            husbandOpenToLiveWithWifeFamily: expectedWorldlyLifestyle?.husbandOpenToLiveWithWifeFamily || '',
            acceptHusbandsChildren: expectedWorldlyLifestyle?.acceptHusbandsChildren || '',
            acceptWifesChildren: expectedWorldlyLifestyle?.acceptWifesChildren || '',
            havingChildren: expectedWorldlyLifestyle?.havingChildren || '',
            desiredNumberOfChildren: expectedWorldlyLifestyle?.desiredNumberOfChildren || '',
            parenthoodTimingAfterMarriage: expectedWorldlyLifestyle?.parenthoodTimingAfterMarriage || '',
        },
    });

    useEffect(() => {
        form.reset(expectedWorldlyLifestyle);
    }, [form, expectedWorldlyLifestyle])

    const user = useAppSelector((state) => state.auth.user);
    const expectedWorldlyLifestyleFormRef = React.useRef<HTMLFormElement>(null);

    const { registerForm, setSaving } = useUpdateProfileContext()
    const [updateExpectedWorldlyStyle, updateResult] = useUpdateExpectedWorldlyLifestyleMutation();

    React.useEffect(() => {
        if (expectedWorldlyLifestyleFormRef && expectedWorldlyLifestyleFormRef.current) {
            registerForm('expectedWorldlyLifestyle', expectedWorldlyLifestyleFormRef.current);
        }
    }, [expectedWorldlyLifestyleFormRef, registerForm]);

    const onSubmit = (data: MaleExpectedWorldlyLifestyle) => {
        updateExpectedWorldlyStyle({ userId: user!.id, expectedWorldlyLifestyle: data });
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
    }, [updateResult, setSaving]);

    const t = useTranslations('forms.expectedWorldlyLifestyle.male')
    const questions = t.raw('questions')

    return (
        <div className="bg-muted w-full py-4 px-6 sm:px-16 md:px-[3rem] lg:px-[5rem] 2xl:px-[15rem] 3xl:px-[20rem]">
            <h1 className="text-xl font-bold text-primary border-b p-1">
                {t('title')}
            </h1>

            <Form {...form} >
                <form
                    ref={expectedWorldlyLifestyleFormRef}
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


    );
}
