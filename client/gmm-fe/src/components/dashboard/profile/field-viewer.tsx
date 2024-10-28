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
    <div className="rounded-se-3xl rounded-es-3xl overflow-hidden bg-muted border border-muted text-sm">
      {title && (
        <h1 className="text-primary font-bold text-xl p-5 px-8">{title}</h1>
      )}

      {fields &&
        fields.map((field, index) => (
          <div
            key={index}
            className="grid grid-cols-12 gap-x-5 py-3 px-8 even:bg-white"
          >
            <div className="col-span-1">
              <FontAwesomeIcon
                icon={field.icon}
                size="xl"
                className="text-primary"
              />
            </div>
            <div className="col-span-11 space-y-3">
              {Array.isArray(field.value) ? (
                <ul className="flex flex-col gap-3 text-sm">
                  {field.value.map((subField, subIndex) => (
                    <li key={subIndex} className="grid grid-cols-11 gap-x-4">
                      <span className="col-span-4">{subField.label}</span>
                      <span className="col-span-7 font-bold">
                        {subField.value || 'N/A'}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="col-span-11 grid grid-cols-11 gap-2 items-center">
                  <h1 className="col-span-4">{field.label}</h1>
                  <h1 className="col-span-7 font-bold">
                    {field.value || 'N/A'}
                  </h1>
                </div>
              )}
            </div>
          </div>
        ))}
    </div>
  );
}
