import { Option } from '@modules/form/entities/options';
import { FormFieldDisplayWidth } from '@modules/form/enums/form-field';

export const formFieldsData = [
  {
    id: '8fa413b2-8dd4-4419-bd7a-aa22895c8d6c',
    name: 'annual_income',
    label: 'Annual Income',
    type: 'Currency',
    placeholder: '',
    options: [
      { label: '0 - 20,000', value: '0 - 20,000' },
      { label: '20,000 - 50,000', value: '20,000 - 50,000' },
      { label: '50,000 - 100,000', value: '50,000 - 100,000' },
      { label: '100,000 - 200,000', value: '100,000 - 200,000' },
      { label: '200,000 - 350,000', value: '200,000 - 350,000' },
      { label: '350,000 - 450,000', value: '350,000 - 450,000' },
      { label: '450,000+', value: '450,000+' },
    ] as Option[],
    displayWidth: FormFieldDisplayWidth.Three,
    section: 'Section',
    order: 1,
  },
  {
    id: 'c93b5178-03df-418f-8905-1f5cf1e73f67',
    name: 'annual_income_currency',
    label: 'Annual Income Currency',
    type: 'Autocomplete',
    placeholder: '',
    options: [] as Option[],
    show: {
      field: 'annual_income',
      value: 'annual_income',
      operator: '=',
    },
    displayWidth: FormFieldDisplayWidth.Three,
    section: 'Section',
    order: 2,
  },
  {
    id: '01fa0657-cdc7-4218-91b5-3758ed90ec23',
    name: 'profession',
    label: 'Current Occupation Title',
    type: 'Autocomplete',
    placeholder: '',
    options: [
      { label: 'Academic librarian', value: 'Academic librarian' },
      { label: 'Accountant', value: 'Accountant' },
      { label: 'Accounting technician', value: 'Accounting technician' },
      { label: 'Actuary', value: 'Actuary' },
      { label: 'Adult nurse', value: 'Adult nurse' },
      {
        label: 'Advertising account executive',
        value: 'Advertising account executive',
      },
      {
        label: 'Advertising account planner',
        value: 'Advertising account planner',
      },
    ] as Option[],
    displayWidth: FormFieldDisplayWidth.Three,
    section: 'Section',
    order: 3,
  },
  // expected worldly
  {
    id: '575a122b-b164-4499-88f3-d6ee8a7f8f49',
    name: 'decision_making',
    label: 'Decision Making & Leadership',
    type: 'Dropdown',
    placeholder: '',
    options: [
      {
        label: 'Husband Sole Decision-Maker',
        value: 'Husband Sole Decision-Maker',
      },
      { label: 'Wife Sole Decision-Maker', value: 'Wife Sole Decision-Maker' },
    ] as Option[],
    displayWidth: FormFieldDisplayWidth.Three,
    section: 'Section',
    order: 3,
  },
  {
    id: 'b49bb996-3c56-4e99-8041-a38580572041',
    name: 'money',
    label: 'Money in Marriage',
    type: 'Dropdown',
    placeholder: '',
    options: [
      {
        label: 'Sole Provider',
        value: 'Sole Provider',
      },
      { label: 'Dual Income', value: 'Dual Income' },
    ] as Option[],
    displayWidth: FormFieldDisplayWidth.Three,
    section: 'Section',
    order: 3,
  },
  // Male expected Islamic
  {
    id: '109ca7d8-6ac3-43c9-a5de-41706e27de3f',
    name: 'salah',
    label: 'Wife & Salah/Prayer',
    type: 'Dropdown',
    placeholder: '',
    options: [
      {
        label: 'Must Pray all Fardh Salah + Sunnah',
        value: 'Must Pray all Fardh Salah + Sunnah',
      },
      { label: 'Must Pray Fardh minimum', value: 'Must Pray Fardh minimum' },
    ] as Option[],
    displayWidth: FormFieldDisplayWidth.Three,
    section: 'Section',
    order: 3,
  },
  {
    id: '22c3c8fa-ea08-4d56-b52e-3a9669c03be5',
    name: 'hijab',
    label: 'Wife & Hijab',
    type: 'Dropdown',
    placeholder: '',
    options: [
      {
        label: 'Wife must do Advanced Hijab',
        value: 'Wife must do Advanced Hijab',
      },
      {
        label: 'Wife must do Minimum Hijab',
        value: 'Wife must do Minimum Hijab',
      },
    ] as Option[],
    displayWidth: FormFieldDisplayWidth.Three,
    section: 'Section',
    order: 3,
  },
  // Islamic
  {
    id: '4bd6d9a1-8888-4eab-9f94-5713ef928a4c',
    name: 'salah',
    label: 'Salah/Prayer',
    type: 'Dropdown',
    placeholder: '',
    options: [
      {
        label: 'Irregular Salah',
        value: 'Irregular Salah',
      },
      {
        label: 'Do not Pray',
        value: 'Do not Pray',
      },
    ] as Option[],
    displayWidth: FormFieldDisplayWidth.Three,
    section: 'Section',
    order: 3,
  },
  {
    id: 'd4d75a15-104b-4d36-a391-6b8ae3e53750',
    name: 'ramadan',
    label: 'Ramadan',
    type: 'Dropdown',
    placeholder: '',
    options: [
      {
        label: 'Enhanced Devotion',
        value: 'Enhanced Devotion',
      },
      {
        label: 'Basic Observance',
        value: 'Basic Observance',
      },
    ] as Option[],
    displayWidth: FormFieldDisplayWidth.Three,
    section: 'Section',
    order: 3,
  },
  // female expected Islamic
  {
    id: '8b1f5e95-a40e-4344-9eb3-1118c09c1cb2',
    name: 'salah',
    label: 'Husband & Salah/Prayer',
    type: 'Dropdown',
    placeholder: '',
    options: [
      {
        label: 'Must Pray',
        value: 'Must Pray',
      },
      {
        label: 'Do not Pray',
        value: 'Do not Pray',
      },
    ] as Option[],
    displayWidth: FormFieldDisplayWidth.Three,
    section: 'Section',
    order: 3,
  },

  {
    id: '0cf1dca0-a420-4f85-8a9a-1e39dd3ec4a6',
    name: 'polygyny',
    label: 'Polygyny',
    type: 'Dropdown',
    placeholder: '',
    options: [
      {
        label: 'Monogamous',
        value: 'Monogamous',
      },
      {
        label: 'Polygynous',
        value: 'Polygynous',
      },
    ] as Option[],
    displayWidth: FormFieldDisplayWidth.Three,
    section: 'Section',
    order: 3,
  },
];
