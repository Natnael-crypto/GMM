'use client';

import { useForm } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import Field from '@/components/dashboard/profile/field';
import { useSubmitFormMutation } from '@/lib/form/api';
import { useAppSelector } from '@/lib/hooks';
import React, { useEffect } from 'react';

const transform = (answers: any) => {
  const data: any = {};

  answers.forEach((answer: any) => {
    data[answer.field.id] = answer.value;
  });

  return data;
};

export default function DynamicForm({
  formSchema,
  data,
}: {
  formSchema: any;
  data: any;
}) {
  const form = useForm();
  const user = useAppSelector((state) => state.auth.user);

  const fields = (formSchema ? [...formSchema.fields] : []).sort(
    (a: any, b: any) => a.order - b.order
  );

  const groupedFields: any = [];
  let lastSection = '';

  fields.forEach((field) => {
    if (field.section !== lastSection) {
      lastSection = field.section;
      groupedFields.push([]);
    }

    const lastGroup = groupedFields[groupedFields.length - 1];
    if (lastGroup) {
      lastGroup.push(field);
    } else {
      groupedFields.push([field]);
    }
  });

  const [submitForm, submitFormResult] = useSubmitFormMutation();

  useEffect(() => {
    if (data) {
      form.reset(transform(data));
    }
  }, [data, form]);

  const onSubmit = (data: any) => {
    if (user) {
      submitForm({ slug: formSchema.slug, data, userId: user.id });
    }
  };

  return (
    <div className="py-8 px-6 sm:px-16 md:px-[3rem] lg:px-[5rem] 2xl:px-[15rem] 3xl:px-[20rem]">
      <h1 className="text-xl font-bold text-secondary border-b p-1">
        {formSchema?.title}
      </h1>

      {formSchema?.description && (
        <div className="py-4 text-center text-sm">
          {formSchema?.description}
        </div>
      )}

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid grid-cols-12 gap-x-3 gap-y-3 py-5"
        >
          {groupedFields.map((group: any, index: number) => {
            return (
              <React.Fragment key={index}>
                {group[0].section && (
                  <h2 className="col-span-12 font-bold mt-2">
                    {group[0].section}
                  </h2>
                )}
                {group.map((field: any) => {
                  return (
                    <Field
                      key={field.id}
                      type={field.type}
                      label={field.label}
                      name={field.id}
                      options={field.options}
                      className={field.displayWidth}
                      onChange={() => onSubmit(form.getValues())}
                    />
                  );
                })}
              </React.Fragment>
            );
          })}
        </form>
      </Form>
    </div>
  );
}
