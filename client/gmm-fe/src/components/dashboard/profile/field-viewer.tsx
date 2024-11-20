import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

type SubField = {
  label: string;
  value?: string | number | boolean | null;
};

type Field = {
  icon: IconDefinition;
  label: string;
  value?: string | number | boolean | SubField[] | null;
};

interface FieldViewerProps<T> {
  getFields: (entity?: T) => Field[];
  title?: string;
  entity?: T;
}

export default function FieldViewer<T>({
  getFields,
  title,
  entity,
}: FieldViewerProps<T>) {
  const fields = getFields(entity);

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
        fields.map((field, index) => (
          <div key={index} className="grid grid-cols-12 gap-x-5 py-3 px-8">
            <div className="col-span-3 sm:col-span-2 md:col-span-1 text-center">
              <FontAwesomeIcon
                icon={field.icon}
                size="2xl"
                className="text-primary"
              />
            </div>
            <div className="col-span-9 sm:col-span-10 md:col-span-11 space-y-3 mt-1">
              {Array.isArray(field.value) ? (
                <ul className="flex flex-col gap-3">
                  {field.value.map((subField, subIndex) => (
                    <li key={subIndex} className="gap-x-4">
                      <p className="text-sm">
                        {subField.label}:{' '}
                        <span className="text-md font-bold">
                          {subField.value || 'None'}
                        </span>
                      </p>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="col-span-9 sm:col-span-10 md:col-span-11 space-y-3 mt-1">
                  <p className="text-sm">
                    {field.label}:{' '}
                    <span className="text-md font-bold">
                      {field.value || 'None'}
                    </span>
                  </p>
                </div>
              )}
            </div>
          </div>
        ))}
    </div>
  );
}
