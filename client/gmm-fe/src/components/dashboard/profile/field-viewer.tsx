import { cn } from '@/lib/utils';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

type SubField = {
  label: string;
  value?: string | number | boolean | null;
  context?: string;
  iconName?: string;
  icon?: IconDefinition;
  className?: string;
};

type Field = {
  iconName?: string;
  icon?: IconDefinition;
  label: string;
  value?: string | number | boolean | SubField[] | null;
  context?: string;
  className?: string;
};

interface FieldViewerProps<T> {
  getFields?: (entity?: T) => Field[];
  title?: string;
  entity?: T;
  formFields?: Field[];
}

export default function FieldViewer<T>({
  getFields,
  title,
  entity,
  formFields,
}: FieldViewerProps<T>) {
  if (!getFields && !formFields) {
    return null;
  } else if (getFields && !entity) {
    return null;
  }
  const x = 'bg-red-500';
  const fields = formFields ? formFields : getFields && getFields(entity);

  return (
    <div className="rounded-se-3xl rounded-es-3xl overflow-hidden py-5 globprof-section">
      <div className="globprof-step-info">
        {title && (
          <h1 className="globprof-step-title text-secondary font-bold pb-3">
            {title}
          </h1>
        )}

        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in voluptate
          velit esse cillum dolore eu fugiat nulla pariatur.
        </p>
      </div>

      {fields &&
        fields.map(
          (field, index) =>
            field.value &&
            ((Array.isArray(field.value) && field.value.length > 0) ||
              !Array.isArray(field.value)) && (
              <div key={index} className="grid grid-cols-12 gap-x-5 py-3">
                <div className="flex-auto col-span-12 globprof-container">
                  <h2 className="text-secondary font-bold text-lg mb-2">
                    {field.label}
                  </h2>
                  {Array.isArray(field.value) ? (
                    field.value.length > 0 && (
                      <ul className="flex">
                        {field.value.map((subField, subIndex) => (
                          <>
                            <li
                              key={subIndex}
                              className={cn(
                                'shadow-md globprof-pill globprof-pill-outline',
                                subField.className
                              )}
                            >
                              <span className="globprof-icon">
                                {subField.icon ? (
                                  <FontAwesomeIcon icon={subField.icon} />
                                ) : (
                                  <i
                                    className={`fa-solid ${subField.iconName}`}
                                  ></i>
                                )}
                              </span>
                              {subField.label
                                ? `${subField.label} : ${subField.value}`
                                : subField.value}
                            </li>
                            {subField.context && (
                              <span>{subField.context}</span>
                            )}
                          </>
                        ))}
                      </ul>
                    )
                  ) : (
                    <ul className="flex flex-col gap-2">
                      <li
                        className={cn(
                          'shadow-md globprof-pill w-fit',
                          field.className ?? 'globprof-pill-outline'
                        )}
                      >
                        <span className="globprof-icon">
                          {field.icon ? (
                            <FontAwesomeIcon icon={field.icon} />
                          ) : (
                            <i className={`fa-solid ${field.iconName}`}></i>
                          )}
                        </span>
                        {field.value}
                      </li>
                      <li className="text-sm">
                        {field.context && <span>({field.context})</span>}
                      </li>
                    </ul>
                  )}
                </div>
                {/*<div className="col-span-3 sm:col-span-2 md:col-span-1 text-center text-3xl text-primary">
                  {field.icon ? (
                    <FontAwesomeIcon
                      icon={field.icon}
                      className="text-primary"
                    />
                  ) : (
                    <i className={`fa-solid ${field.iconName}`}></i>
                  )}
                </div>
                <div className="col-span-9 sm:col-span-10 md:col-span-11 space-y-3 mt-1">
                  {Array.isArray(field.value) ? (
                    field.value.length > 0 && (
                      <ul className="flex flex-col gap-3">
                        {field.value.map((subField, subIndex) => (
                          <li key={subIndex} className="gap-x-4">
                            <p className="text-sm">
                              {subField.label}:{' '}
                              <span className="text-md font-bold">
                                {subField.value}
                              </span>
                            </p>
                          </li>
                        ))}
                      </ul>
                    )
                  ) : (
                    <div className="col-span-9 sm:col-span-10 md:col-span-11 space-y-3 mt-1">
                      <p className="text-sm">
                        {field.label}:{' '}
                        <span className="text-md font-bold">{field.value}</span>
                      </p>
                    </div>
                  )}
                </div>*/}
              </div>
            )
        )}
    </div>
  );
}
