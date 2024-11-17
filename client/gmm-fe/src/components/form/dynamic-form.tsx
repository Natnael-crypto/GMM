'use client';

import { useForm } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import Field from '@/components/dashboard/profile/field';
import { useSubmitFormMutation } from '@/lib/form/api';
import { useAppSelector } from '@/lib/hooks';
import React, { useEffect } from 'react';
import { evaluateRuleTree } from '@/lib/form/rule-evalutator';

const transform = (answers: any) => {
  const data: any = {};

  answers.forEach((answer: any) => {
    data[answer.field.id] = answer.value;
  });

  return data;
};

const widthClassName = (w: string) => {
  const cls = [
    'md:col-span-1',
    'md:col-span-2',
    'md:col-span-3',
    'md:col-span-4',
    'md:col-span-5',
    'md:col-span-6',
    'md:col-span-7',
    'md:col-span-8',
    'md:col-span-9',
    'md:col-span-10',
    'md:col-span-11',
    'md:col-span-12',
  ];
  const width = parseInt(w, 10);
  return cls[width - 1];
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

  const fieldIdNameMap: Record<string, string> = {};
  fields.forEach((field: any) => {
    fieldIdNameMap[field.id as string] = field.name;
    fieldIdNameMap[field.name as string] = field.id;
  });

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

  const values = form.watch();

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
          className="grid grid-cols-12 gap-x-3 gap-y-4 py-5"
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
                  const remappedValue: any = {};

                  for (const key in values) {
                    remappedValue[fieldIdNameMap[key]] = values[key];
                  }

                  try {
                    const show = evaluateRuleTree(field.show, remappedValue);
                    if (!show) return null;
                  } catch (e) {
                    console.log(e);
                  }

                  return (
                    <Field
                      key={field.id}
                      type={field.type}
                      label={field.label}
                      name={field.id}
                      options={field.options}
                      className={widthClassName(field.displayWidth)}
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
