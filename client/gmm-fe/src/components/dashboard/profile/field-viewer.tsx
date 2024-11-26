import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

type SubField = {
  label: string;
  value?: string | number | boolean | null;
};

type Field = {
  iconName?: string;
  icon?: IconDefinition;
  label: string;
  value?: string | number | boolean | SubField[] | null;
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

  const fields = formFields ? formFields : getFields && getFields(entity);

  return (
    <div className="rounded-se-3xl rounded-es-3xl overflow-hidden bg-muted border border-muted py-5">
      <div>
        {title && (
          <h1 className="text-secondary font-bold text-xl px-8 pb-3">
            {title}
          </h1>
        )}
      </div>

      {fields &&
        fields.map(
          (field, index) =>
            field.value &&
            ((Array.isArray(field.value) && field.value.length > 0) ||
              !Array.isArray(field.value)) && (
              <div key={index} className="grid grid-cols-12 gap-x-5 py-3 px-8">
                <div className="col-span-3 sm:col-span-2 md:col-span-1 text-center text-3xl text-primary">
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
                  {Array.isArray(field.value)
                    ? field.value.length > 0 && (
                        <ul className="flex flex-col gap-3">
                          {field.value.map(
                            (subField, subIndex) =>
                              subField.value && (
                                <li key={subIndex} className="gap-x-4">
                                  <p className="text-sm">
                                    {subField.label}:{' '}
                                    <span className="text-md font-bold">
                                      {subField.value}
                                    </span>
                                  </p>
                                </li>
                              )
                          )}
                        </ul>
                      )
                    : field.value && (
                        <div className="col-span-9 sm:col-span-10 md:col-span-11 space-y-3 mt-1">
                          <p className="text-sm">
                            {field.label}:{' '}
                            <span className="text-md font-bold">
                              {field.value}
                            </span>
                          </p>
                        </div>
                      )}
                </div>
              </div>
            )
        )}
    </div>
  );
}
