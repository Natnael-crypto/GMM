import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Multiselect from '@/components/ui/multi-select';
import AutoComplete, { Option } from '@/components/ui/searchable-select';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import React from 'react';
import { ControllerRenderProps, useFormContext } from 'react-hook-form';
import flags from 'react-phone-number-input/flags';

export enum FieldType {
  TEXT = 'text',
  SELECT = 'select',
  AUTOCOMPLETE = 'autocomplete',
  MULTISELECT = 'multiselect',
  STRING = 'string',
  NUMBER = 'number',
  WITH_CURRENCY = 'with_currency',
}

const currencies = {
  AED: 'AE', // United Arab Emirates Dirham
  AFN: 'AF', // Afghan Afghani
  ALL: 'AL', // Albanian Lek
  AMD: 'AM', // Armenian Dram
  ANG: 'AN', // Netherlands Antillean Guilder
  AOA: 'AO', // Angolan Kwanza
  ARS: 'AR', // Argentine Peso
  AUD: 'AU', // Australian Dollar
  AWG: 'AW', // Aruban Florin
  AZN: 'AZ', // Azerbaijani Manat
  BAM: 'BA', // Bosnia-Herzegovina Convertible Mark
  BBD: 'BB', // Barbadian Dollar
  BDT: 'BD', // Bangladeshi Taka
  BGN: 'BG', // Bulgarian Lev
  BHD: 'BH', // Bahraini Dinar
  BIF: 'BI', // Burundian Franc
  BMD: 'BM', // Bermudian Dollar
  BND: 'BN', // Brunei Dollar
  BOB: 'BO', // Bolivian Boliviano
  BRL: 'BR', // Brazilian Real
  BSD: 'BS', // Bahamian Dollar
  BTN: 'BT', // Bhutanese Ngultrum
  BWP: 'BW', // Botswanan Pula
  BYN: 'BY', // Belarusian Ruble
  BZD: 'BZ', // Belize Dollar
  CAD: 'CA', // Canadian Dollar
  CDF: 'CD', // Congolese Franc
  CHF: 'CH', // Swiss Franc
  CLP: 'CL', // Chilean Peso
  CNY: 'CN', // Chinese Yuan
  COP: 'CO', // Colombian Peso
  CRC: 'CR', // Costa Rican Colón
  CUP: 'CU', // Cuban Peso
  CVE: 'CV', // Cape Verdean Escudo
  CZK: 'CZ', // Czech Koruna
  DJF: 'DJ', // Djiboutian Franc
  DKK: 'DK', // Danish Krone
  DOP: 'DO', // Dominican Peso
  DZD: 'DZ', // Algerian Dinar
  EGP: 'EG', // Egyptian Pound
  ERN: 'ER', // Eritrean Nakfa
  ETB: 'ET', // Ethiopian Birr
  EUR: 'EU', // Euro
  FJD: 'FJ', // Fijian Dollar
  FKP: 'FK', // Falkland Islands Pound
  FOK: 'FO', // Faroese Króna
  GBP: 'GB', // British Pound Sterling
  GEL: 'GE', // Georgian Lari
  GGP: 'GG', // Guernsey Pound
  GHS: 'GH', // Ghanaian Cedi
  GIP: 'GI', // Gibraltar Pound
  GMD: 'GM', // Gambian Dalasi
  GNF: 'GN', // Guinean Franc
  GTQ: 'GT', // Guatemalan Quetzal
  GYD: 'GY', // Guyanaese Dollar
  HKD: 'HK', // Hong Kong Dollar
  HNL: 'HN', // Honduran Lempira
  HRK: 'HR', // Croatian Kuna
  HTG: 'HT', // Haitian Gourde
  HUF: 'HU', // Hungarian Forint
  IDR: 'ID', // Indonesian Rupiah
  ILS: 'IL', // Israeli New Shekel
  IMP: 'IM', // Isle of Man Pound
  INR: 'IN', // Indian Rupee
  IQD: 'IQ', // Iraqi Dinar
  IRR: 'IR', // Iranian Rial
  ISK: 'IS', // Icelandic Króna
  JEP: 'JE', // Jersey Pound
  JMD: 'JM', // Jamaican Dollar
  JOD: 'JO', // Jordanian Dinar
  JPY: 'JP', // Japanese Yen
  KES: 'KE', // Kenyan Shilling
  KGS: 'KG', // Kyrgystani Som
  KHR: 'KH', // Cambodian Riel
  KID: 'KI', // Kiribati Dollar
  KMF: 'KM', // Comorian Franc
  KRW: 'KR', // South Korean Won
  KWD: 'KW', // Kuwaiti Dinar
  KYD: 'KY', // Cayman Islands Dollar
  KZT: 'KZ', // Kazakhstani Tenge
  LAK: 'LA', // Laotian Kip
  LBP: 'LB', // Lebanese Pound
  LKR: 'LK', // Sri Lankan Rupee
  LRD: 'LR', // Liberian Dollar
  LSL: 'LS', // Lesotho Loti
  LYD: 'LY', // Libyan Dinar
  MAD: 'MA', // Moroccan Dirham
  MDL: 'MD', // Moldovan Leu
  MGA: 'MG', // Malagasy Ariary
  MKD: 'MK', // Macedonian Denar
  MMK: 'MM', // Myanma Kyat
  MNT: 'MN', // Mongolian Tugrik
  MOP: 'MO', // Macanese Pataca
  MRU: 'MR', // Mauritanian Ouguiya
  MUR: 'MU', // Mauritian Rupee
  MVR: 'MV', // Maldivian Rufiyaa
  MWK: 'MW', // Malawian Kwacha
  MXN: 'MX', // Mexican Peso
  MYR: 'MY', // Malaysian Ringgit
  MZN: 'MZ', // Mozambican Metical
  NAD: 'NA', // Namibian Dollar
  NGN: 'NG', // Nigerian Naira
  NIO: 'NI', // Nicaraguan Córdoba
  NOK: 'NO', // Norwegian Krone
  NPR: 'NP', // Nepalese Rupee
  NZD: 'NZ', // New Zealand Dollar
  OMR: 'OM', // Omani Rial
  PAB: 'PA', // Panamanian Balboa
  PEN: 'PE', // Peruvian Nuevo Sol
  PGK: 'PG', // Papua New Guinean Kina
  PHP: 'PH', // Philippine Peso
  PKR: 'PK', // Pakistani Rupee
  PLN: 'PL', // Polish Zloty
  PYG: 'PY', // Paraguayan Guarani
  QAR: 'QA', // Qatari Rial
  RON: 'RO', // Romanian Leu
  RSD: 'RS', // Serbian Dinar
  RUB: 'RU', // Russian Ruble
  RWF: 'RW', // Rwandan Franc
  SAR: 'SA', // Saudi Riyal
  SBD: 'SB', // Solomon Islands Dollar
  SCR: 'SC', // Seychellois Rupee
  SDG: 'SD', // Sudanese Pound
  SEK: 'SE', // Swedish Krona
  SGD: 'SG', // Singapore Dollar
  SHP: 'SH', // Saint Helena Pound
  SLE: 'SL', // Sierra Leonean Leone
  SOS: 'SO', // Somali Shilling
  SRD: 'SR', // Surinamese Dollar
  SSP: 'SS', // South Sudanese Pound
  STN: 'ST', // São Tomé and Príncipe Dobra
  SYP: 'SY', // Syrian Pound
  SZL: 'SZ', // Swazi Lilangeni
  THB: 'TH', // Thai Baht
  TJS: 'TJ', // Tajikistani Somoni
  TMT: 'TM', // Turkmenistani Manat
  TND: 'TN', // Tunisian Dinar
  TOP: 'TO', // Tongan Paʻanga
  TRY: 'TR', // Turkish Lira
  TTD: 'TT', // Trinidad and Tobago Dollar
  TVD: 'TV', // Tuvaluan Dollar
  TWD: 'TW', // New Taiwan Dollar
  TZS: 'TZ', // Tanzanian Shilling
  UAH: 'UA', // Ukrainian Hryvnia
  UGX: 'UG', // Ugandan Shilling
  USD: 'US', // United States Dollar
  UYU: 'UY', // Uruguayan Peso
  UZS: 'UZ', // Uzbekistani Som
  VES: 'VE', // Venezuelan Bolívar Soberano
  VND: 'VN', // Vietnamese Dong
  VUV: 'VU', // Vanuatu Vatu
  WST: 'WS', // Samoan Tala
  XAF: 'XA', // Central African CFA Franc
  XCD: 'XC', // East Caribbean Dollar
  XDR: 'XD', // Special Drawing Rights
  XOF: 'XO', // West African CFA Franc
  XPF: 'XP', // CFP Franc
  YER: 'YE', // Yemeni Rial
  ZAR: 'ZA', // South African Rand
  ZMW: 'ZM', // Zambian Kwacha
  ZWL: 'ZW', // Zimbabwean Dollar
};

export type FieldOption =
  | {
      value: string;
      label: string;
    }
  | string;

export interface FieldProps {
  type: FieldType;
  label: string;
  name: string;
  currencyFieldName?: string;
  options?: FieldOption[];
  className?: string;
  onChange?: (value: any) => void;
}

export default function Field(props: FieldProps) {
  // const form = useFormContext();

  let body;

  let options: Option[] = [];
  if (props.options) {
    if (props.options[0] && typeof props.options[0] === 'object') {
      options = props.options as Option[];
    } else {
      options =
        (props.options as string[])?.map((option) => ({
          value: option,
          label: option,
        })) ?? [];
    }
  }

  const handleChange = (value: any, field: ControllerRenderProps) => {
    field.onChange(value);

    if (props.onChange) {
      props.onChange(value);
    }
  };

  switch (props.type) {
    case FieldType.SELECT:
      body = (
        <FormField
          name={props.name}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <AutoComplete
                  onChange={(value) => {
                    handleChange(value, field);
                  }}
                  selectedOption={field.value}
                  options={options}
                  placeholder=""
                  showSearch={false}
                  className="shadow text-muted-foreground bg-background rounded-sm h-8 ring-transparent ring-offset-transparent"
                />
                {/* <Select
                  onValueChange={(value) => {
                    handleChange(value, field);
                  }}
                  value={field.value}
                >
                  <SelectTrigger className="shadow text-muted-foreground bg-background text-md rounded-sm h-8 ring-transparent ring-offset-transparent">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {props.options?.map((option) => {
                      if (typeof option === 'object') {
                        return (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        );
                      } else {
                        return (
                          <SelectItem key={option} value={option}>
                            {option}
                          </SelectItem>
                        );
                      }
                    })}
                  </SelectContent>
                </Select> */}
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />
      );
      break;

    case FieldType.AUTOCOMPLETE:
      body = (
        <FormField
          name={props.name}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <AutoComplete
                  onChange={(value) => {
                    handleChange(value, field);
                  }}
                  selectedOption={field.value}
                  options={options}
                  placeholder=""
                  className="shadow text-muted-foreground bg-background rounded-sm h-8 ring-transparent ring-offset-transparent"
                />
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />
      );
      break;

    case FieldType.MULTISELECT:
      body = (
        <FormField
          name={props.name}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Multiselect
                  onChange={(value) => {
                    handleChange(value, field);
                  }}
                  selectedOptions={
                    Array.isArray(field.value) ? field.value : []
                  }
                  title={props.label}
                  initOptions={options}
                  placeholder="Select"
                  className="shadow text-muted-foreground bg-background rounded-sm h-8 ring-transparent ring-offset-transparent"
                />
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />
      );
      break;

    case FieldType.TEXT:
      body = (
        <FormField
          name={props.name}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  {...field}
                  onChange={(value) => {
                    handleChange(value, field);
                  }}
                  className="text-muted-foreground bg-background text-xs shadow rounded-sm"
                />
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />
      );
      break;

    case FieldType.STRING:
      body = (
        <FormField
          name={props.name}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  {...field}
                  className="text-muted-foreground bg-background text-xs shadow rounded-sm"
                />
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />
      );
      break;

    case FieldType.NUMBER:
      body = (
        <FormField
          name={props.name}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  {...field}
                  type="number"
                  className="text-muted-foreground bg-background text-xs shadow rounded-sm"
                />
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />
      );
      break;

    case FieldType.WITH_CURRENCY:
      body = (
        <div className="grid grid-cols-12 md:grid-cols-3 gap-0">
          <FormField
            name={props.name}
            render={({ field }) => (
              <FormItem className="col-span-8 md:col-span-2">
                <FormControl>
                  <AutoComplete
                    onChange={(value) => {
                      handleChange(value, field);
                    }}
                    selectedOption={field.value}
                    options={options}
                    placeholder=""
                    showSearch={false}
                    className="text-muted-foreground bg-background text-md  rounded-none rounded-ss-sm rounded-es-sm h-8 ring-transparent ring-offset-transparent shadow"
                  />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
          <FormField
            name={`${props.currencyFieldName}`}
            render={({ field }) => (
              <FormItem className="col-span-4 md:col-span-1">
                <FormControl>
                  <AutoComplete
                    onChange={(value) => {
                      handleChange(value, field);
                    }}
                    selectedOption={field.value}
                    options={Object.entries(currencies).map(
                      ([currency, countryCode]) => {
                        const Flag = flags[countryCode as keyof typeof flags];

                        return {
                          value: currency,
                          label: currency,
                          icon: (
                            <div className="w-5">
                              {Flag && <Flag title={currency} />}
                            </div>
                          ),
                        };
                      }
                    )}
                    placeholder=""
                    className="text-muted-foreground bg-background text-md rounded-none rounded-ee-sm rounded-se-sm h-8 border-s-0 ring-transparent ring-offset-transparent shadow"
                  />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
        </div>
      );
      break;

    default:
      body = null;
  }

  return (
    <div
      className={cn(
        'flex flex-col justify-end gap-1 col-span-12 md:col-span-4',
        props.className
      )}
    >
      <Label>{props.label}</Label>
      {body}
    </div>
  );
}
