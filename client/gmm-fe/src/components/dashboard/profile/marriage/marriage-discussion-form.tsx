'use effect'

import { useEffect, useRef } from 'react'
import { Form } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useAppSelector } from '@/lib/hooks';
import { useUpdateProfileContext } from '@/components/dashboard/profile/update-profile-context';
import { toast } from '@/components/ui/use-toast';
import { MarriageDiscussion, marriageDiscussionSchema } from '@/lib/schemas/marriage-discussion';
import { useUpdateMarriageDiscussionMutation } from '@/lib/user/api';
import { useTranslations } from 'next-intl';
import Field from '../field';

export default function MarriageDiscussionForm({ marriageDiscussion }: { marriageDiscussion?: MarriageDiscussion }) {
    const form = useForm<MarriageDiscussion>({
        resolver: zodResolver(marriageDiscussionSchema),
        defaultValues: {
            marriageType: marriageDiscussion?.marriageType || '',
            marriageLocation: marriageDiscussion?.marriageLocation || '',
            marriageVenue: marriageDiscussion?.marriageVenue || '',
            marriageTimeline: marriageDiscussion?.marriageTimeline || '',
            familyInMarriageDiscussion: marriageDiscussion?.familyInMarriageDiscussion || '',
            dowry: marriageDiscussion?.dowry || '',
            weddingBudget: marriageDiscussion?.weddingBudget || '',
        }
    });

    useEffect(() => {
        form.reset(marriageDiscussion)
    }, [form, marriageDiscussion]);

    const user = useAppSelector((state) => state.auth.user);
    const marriageDiscussionFormRef = useRef<HTMLFormElement>(null);

    const { registerForm, setSaving } = useUpdateProfileContext()
    const [updateMarriageDiscussion, updateResult] = useUpdateMarriageDiscussionMutation();

    useEffect(() => {
        if (marriageDiscussionFormRef && marriageDiscussionFormRef.current) {
            registerForm('marriageDiscussionForm', marriageDiscussionFormRef.current);
        }
    }, [marriageDiscussionFormRef, registerForm]);

    const onSubmit = (data: MarriageDiscussion) => {
        updateMarriageDiscussion({ userId: user!.id, marriageDiscussion: data });
    }

    useEffect(() => {
        if (updateResult.isSuccess) {
            toast({
                title: 'Success',
                description: 'Marriage discussion preferences are updated successfully',
            });
        }
    }, [updateResult])

    useEffect(() => {
        setSaving(updateResult.isLoading);
    }, [updateResult, setSaving])

    const discussion = useTranslations('forms.marriageDiscussion')
    const questions = discussion.raw('questions')

    return (
        <Form {...form}>
            <form
                ref={marriageDiscussionFormRef}
                onSubmit={form.handleSubmit(onSubmit)}
                className="grid grid-cols-12 gap-x-3 gap-y-3 py-5">
                {
                    questions.map((question: any, index: number) => {
                        return <Field key={index} type={question.type} label={question.question} name={question.name} options={question.options} />
                    })
                }
            </form>
        </Form>
    )
}
