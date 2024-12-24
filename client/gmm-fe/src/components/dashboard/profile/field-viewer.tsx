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

const PillView = ({
  field,
  isSubField,
}: {
  isSubField?: boolean;
  field: SubField;
}) => (
  <>
    <li
      className={cn(
        'shadow-md globprof-pill globprof-pill-outline w-fit text-sm',
        field.className
      )}
    >
      <span className="globprof-icon">
        {field.icon ? (
          <FontAwesomeIcon icon={field.icon} />
        ) : (
          <i className={`fa-solid ${field.iconName}`}></i>
        )}
      </span>

      {field.label && isSubField ? (
        <span>
          {field.label}: {field.value}
        </span>
      ) : (
        <span>{field.value}</span>
      )}
    </li>
    {field.context && <span className="text-sm">({field.context})</span>}
  </>
);

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
          aliquip ex ea commodo consequat.
        </p>
      </div>

      {fields &&
        fields.map((field, index) => {
          return (
            field.value &&
            ((Array.isArray(field.value) && field.value.length > 0) ||
              !Array.isArray(field.value)) && (
              <div key={index} className="grid grid-cols-12 gap-x-5">
                <div className="flex-auto col-span-12 globprof-container">
                  <h2 className="text-secondary font-bold text-lg mb-2">
                    {field.label}
                  </h2>

                  {Array.isArray(field.value) ? (
                    field.value.length > 0 && (
                      <ul className="flex">
                        {field.value.map((subField, subIndex) => (
                          <PillView
                            key={subIndex}
                            field={subField}
                            isSubField={true}
                          />
                        ))}
                      </ul>
                    )
                  ) : (
                    <PillView field={field as SubField} />
                  )}
                </div>
              </div>
            )
          );
        })}
    </div>
  );
}
