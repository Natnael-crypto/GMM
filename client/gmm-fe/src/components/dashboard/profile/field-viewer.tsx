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
  description?: string;
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
    {field && field.value && (
      <li
        className={cn(
          'text-nowrap flex gap-2 font-bold text-sm w-fit h-fit px-4 py-1 rounded-full shadow-lg',
          field.className ?? 'outlined-pill'
        )}
      >
        {field.icon && <FontAwesomeIcon icon={field.icon} />}
        {field.iconName && !field.icon && (
          <i className={`fa-solid ${field.iconName}`}></i>
        )}
        {field.label && isSubField ? (
          <span className="text-sm">
            {field.label}: {field.value}
          </span>
        ) : (
          <span className="text-sm">{field.value}</span>
        )}
      </li>
    )}
    {field.context && <span className="text-sm mt-1">({field.context})</span>}
  </>
);

export default function FieldViewer<T>({
  getFields,
  title,
  description,
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
    <div className="rounded-se-3xl rounded-es-3xl overflow-hidden py-5">
      <div className="">
        {title && (
          <h1 className="text-secondary font-extrabold text-2xl">{title}</h1>
        )}

        {description && (
          <p className="mt-3 bg-muted rounded-2xl p-4 text-sm">{description}</p>
        )}
      </div>

      {fields &&
        fields.map((field, index) => {
          return (
            field.value &&
            ((Array.isArray(field.value) && field.value.length > 0) ||
              !Array.isArray(field.value)) && (
              <div key={index} className="grid grid-cols-12 gap-6 mt-6">
                <div className="flex-auto col-span-12 gap-4">
                  {field.label && (
                    <>
                      <h2 className="text-secondary font-bold mb-2">
                        {field.label}
                      </h2>

                      {Array.isArray(field.value) ? (
                        field.value.length > 0 && (
                          <ul className="flex gap-1">
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
                    </>
                  )}

                  {/* Handle fields that have horizontal layout */}
                  {!field.label &&
                    Array.isArray(field.value) &&
                    field.value.length > 0 && (
                      <ul className="flex flex-wrap gap-5">
                        {field.value.map((innerField, fieldIndex) => (
                          <React.Fragment key={fieldIndex}>
                            {innerField.value &&
                              innerField.value.toString().length > 0 && (
                                <div>
                                  <h2 className="text-secondary font-bold mb-2 text-sm">
                                    {innerField.label}
                                  </h2>

                                  {Array.isArray(innerField.value) ? (
                                    innerField.value.length > 0 && (
                                      <ul className="flex gap-1">
                                        {innerField.value.map(
                                          (subField, subIndex) => (
                                            <PillView
                                              key={subIndex}
                                              field={subField}
                                              isSubField={true}
                                            />
                                          )
                                        )}
                                      </ul>
                                    )
                                  ) : (
                                    <PillView field={innerField as SubField} />
                                  )}
                                </div>
                              )}
                          </React.Fragment>
                        ))}
                      </ul>
                    )}
                </div>
              </div>
            )
          );
        })}
    </div>
  );
}
