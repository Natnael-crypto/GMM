'use client';

import { useForm } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import Field from '@/components/dashboard/profile/field';
import { useSubmitFormMutation } from '@/lib/form/api';
import { useAppSelector } from '@/lib/hooks';
import React, { useEffect, useMemo, useRef } from 'react';
import { evaluateRuleTree } from '@/lib/form/rule-evalutator';
import { useDebouncedCallback } from 'use-debounce';
import { useUpdateProfileContext } from '../dashboard/profile/update-profile-context';
import { usePathname } from '@/lib/navigation';

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

  const { fieldIdNameMap, groupedFields, currencyFields }: any = useMemo(() => {
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

    // amount field id: currency field id
    const currencyFields: Record<string, string> = {};

    fields.forEach((field) => {
      if (field.section !== lastSection) {
        lastSection = field.section;
        groupedFields.push([]);
      }

      if (field.type === 'with_currency') {
        const currencyFieldName = fields.find(
          (f) => f.name === field.name + '_currency'
        ).id;
        currencyFields[field.id] = currencyFieldName;
      }

      const lastGroup = groupedFields[groupedFields.length - 1];
      if (lastGroup) {
        lastGroup.push(field);
      } else {
        groupedFields.push([field]);
      }
    });

    return { fieldIdNameMap, groupedFields, currencyFields };
  }, [formSchema]);

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

  const debouncedSubmit = useDebouncedCallback(onSubmit, 1000);
  const values = form.watch();
  const remappedValue: any = {};

  for (const key in values) {
    remappedValue[fieldIdNameMap[key]] = values[key];
  }

  for (const key in user) {
    remappedValue[`user.${key}`] = user[key as keyof typeof user];
  }

  const formRef = useRef<HTMLFormElement>(null);
  const { registerForm, setSaving } = useUpdateProfileContext();
  useEffect(() => {
    if (formRef && formRef.current) {
      registerForm('form', formRef.current);
    }
  }, [formRef, registerForm]);

  useEffect(() => {
    setSaving(submitFormResult.isLoading);
  }, [submitFormResult, setSaving]);

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
          ref={formRef}
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
                  try {
                    const show = evaluateRuleTree(field.show, remappedValue);
                    if (!show) return null;
                  } catch (e) {
                    console.log(e);
                  }

                  const filteredOptions = field.options?.filter(
                    (option: { label: string; value: string; show: any }) => {
                      try {
                        return evaluateRuleTree(option.show, remappedValue);
                      } catch (e) {
                        console.log(e);
                      }
                    }
                  );

                  return (
                    <Field
                      key={field.id}
                      type={field.type}
                      label={field.label}
                      name={field.id}
                      options={filteredOptions}
                      currencyFieldName={currencyFields[field.id]}
                      className={widthClassName(field.displayWidth)}
                      onChange={() => debouncedSubmit(form.getValues())}
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
