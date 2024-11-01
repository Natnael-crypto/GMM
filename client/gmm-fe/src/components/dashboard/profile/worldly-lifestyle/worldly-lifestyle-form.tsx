'use client';

import { useUpdateProfileContext } from '@/components/dashboard/profile/update-profile-context';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Label } from '@/components/ui/label';
import Multiselect from '@/components/ui/multi-select';
import AutoComplete from '@/components/ui/searchable-select';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/components/ui/use-toast';
import { useAppSelector } from '@/lib/hooks';
import {
  WorldlyLifestyle,
  worldlyLifestyleSchema,
} from '@/lib/schemas/worldly-lifestyle';
import { useUpdateWorldlyLifestyleMutation } from '@/lib/user/api';
import { zodResolver } from '@hookform/resolvers/zod';

import { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import flags from 'react-phone-number-input/flags';

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

const professions = [
  'Web & Graphic Designer',
  'Software Engineer',
  'Doctor',
  'Nurse',
  'Teacher',
  'Accountant',
  'Business Owner',
  'Investor',
  'Lawyer',
  'Architect',
  'Engineer',
  'Data Scientist',
  'Project Manager',
  'Sales Manager',
  'Marketing Specialist',
  'HR Manager',
  'Journalist',
  'Consultant',
  'Artist',
  'Musician',
  'Photographer',
  'Chef',
  'Dentist',
  'Pharmacist',
  'Electrician',
  'Plumber',
  'Carpenter',
  'Mechanic',
  'Pilot',
  'Flight Attendant',
  'Scientist',
  'Psychologist',
  'Therapist',
  'Veterinarian',
  'Police Officer',
  'Firefighter',
  'Translator',
  'Interpreter',
  'Fashion Designer',
  'Civil Engineer',
  'Biomedical Engineer',
  'Software Tester',
  'SEO Specialist',
  'Social Media Manager',
  'Event Planner',
  'Interior Designer',
  'Legal Secretary',
  'Paralegal',
  'Logistics Manager',
  'Supply Chain Analyst',
  'IT Support Specialist',
  'Systems Administrator',
  'Cybersecurity Analyst',
  'Graphic Artist',
  'Animator',
  'Film Director',
  'Video Editor',
  'Game Developer',
  'Bartender',
  'Waiter',
  'Personal Trainer',
  'Yoga Instructor',
  'Chiropractor',
  'Real Estate Agent',
  'Property Manager',
  'Entrepreneur',
  'Economist',
  'Political Scientist',
  'Historian',
  'Researcher',
  'Biologist',
  'Environmental Scientist',
  'Geologist',
  'Urban Planner',
  'Sociologist',
  'Anthropologist',
  'Author',
  'Novelist',
  'Screenwriter',
  'Public Relations Specialist',
  'Corporate Trainer',
  'Health Coach',
  'Nutritionist',
  'Baker',
  'Florist',
];

const carBrands = [
  'Acura',
  'Alfa Romeo',
  'Aston Martin',
  'Audi',
  'BMW',
  'Chevrolet',
  'Chrysler',
  'Citroën',
  'Dodge',
  'Ferrari',
  'Fiat',
  'Ford',
  'Genesis',
  'Honda',
  'Hummer',
  'Hyundai',
  'Infiniti',
  'Jaguar',
  'Jeep',
  'Kia',
  'Koenigsegg',
  'Lamborghini',
  'Land Rover',
  'Lincoln',
  'Lotus',
  'Mazda',
  'Mercedes-Benz',
  'Mini',
  'Mitsubishi',
  'Nissan',
  'Peugeot',
  'Porsche',
  'Ram',
  'Renault',
  'Saab',
  'Skoda',
  'Smart',
  'Subaru',
  'Suzuki',
  'Tata',
  'Tesla',
  'Volkswagen',
  'Volvo',
  'Wiesmann',
  'Pagani',
];

const carData: Record<string, { models: string[] }> = {
  Acura: {
    models: [
      'ILX',
      'MDX',
      'RDX',
      'TLX',
      'NSX',
      'RLX',
      'ZDX',
      'Legend',
      'CL',
      'Integra',
    ],
  },
  'Alfa Romeo': {
    models: [
      'Giulia',
      'Stelvio',
      '4C Spider',
      '4C Coupe',
      '8C',
      'Spider',
      'Brera',
      'Mito',
      'GT',
      '159',
    ],
  },
  'Aston Martin': {
    models: [
      'DB11',
      'Vantage',
      'DBX',
      'DB9',
      'Rapide',
      'Vanquish',
      'DBS',
      'Cygnet',
      'Virage',
      'Vulcan',
    ],
  },
  Audi: {
    models: ['A3', 'A4', 'Q5', 'Q7', 'A6', 'A8', 'Q3', 'Q8', 'TT', 'R8'],
  },
  BMW: {
    models: [
      '3 Series',
      '5 Series',
      'X5',
      'X3',
      'X7',
      '2 Series',
      '4 Series',
      '7 Series',
      'Z4',
      'i8',
    ],
  },
  Chevrolet: {
    models: [
      'Camaro',
      'Silverado',
      'Equinox',
      'Malibu',
      'Impala',
      'Tahoe',
      'Suburban',
      'Traverse',
      'Colorado',
      'Corvette',
    ],
  },
  Chrysler: {
    models: [
      '300',
      'Pacifica',
      'Voyager',
      'Aspen',
      'Concorde',
      'Crossfire',
      'LHS',
      'PT Cruiser',
      'Sebring',
      '200',
    ],
  },
  Citroën: {
    models: [
      'C3',
      'C4',
      'C5',
      'C6',
      'C1',
      'C2',
      'DS3',
      'DS4',
      'Berlingo',
      'Jumpy',
    ],
  },
  Dodge: {
    models: [
      'Charger',
      'Challenger',
      'Durango',
      'Journey',
      'Grand Caravan',
      'Avenger',
      'Dakota',
      'Dart',
      'Nitro',
      'Viper',
    ],
  },
  Ferrari: {
    models: [
      '488',
      'Portofino',
      'Roma',
      '812',
      'California',
      'GTC4Lusso',
      'F8',
      'LaFerrari',
      '458',
      'FF',
    ],
  },
  Fiat: {
    models: [
      '500',
      '500X',
      '500L',
      'Panda',
      'Tipo',
      '124 Spider',
      'Bravo',
      'Ducato',
      'Punto',
      'Doblo',
    ],
  },
  Ford: {
    models: [
      'Mustang',
      'F-150',
      'Explorer',
      'Escape',
      'Edge',
      'Expedition',
      'Ranger',
      'Bronco',
      'Fusion',
      'Focus',
    ],
  },
  Genesis: {
    models: ['G70', 'G80', 'G90', 'GV70', 'GV80'],
  },
  Honda: {
    models: [
      'Civic',
      'Accord',
      'CR-V',
      'Pilot',
      'Odyssey',
      'Ridgeline',
      'Fit',
      'HR-V',
      'Passport',
      'Insight',
    ],
  },
  Hummer: {
    models: ['H1', 'H2', 'H3', 'EV'],
  },
  Hyundai: {
    models: [
      'Elantra',
      'Santa Fe',
      'Tucson',
      'Sonata',
      'Palisade',
      'Kona',
      'Veloster',
      'Accent',
      'Venue',
      'Genesis',
    ],
  },
  Infiniti: {
    models: [
      'Q50',
      'Q60',
      'QX50',
      'QX60',
      'QX80',
      'Q30',
      'QX70',
      'M37',
      'Q40',
      'EX35',
    ],
  },
  Jaguar: {
    models: [
      'F-Pace',
      'E-Pace',
      'I-Pace',
      'XF',
      'XJ',
      'XE',
      'F-Type',
      'S-Type',
      'XK',
      'X-Type',
    ],
  },
  Jeep: {
    models: [
      'Wrangler',
      'Grand Cherokee',
      'Cherokee',
      'Compass',
      'Renegade',
      'Gladiator',
      'Patriot',
      'Commander',
      'Liberty',
      'Wagoneer',
    ],
  },
  Kia: {
    models: [
      'Soul',
      'Sorento',
      'Sportage',
      'Optima',
      'Rio',
      'Seltos',
      'Telluride',
      'Stinger',
      'Forte',
      'Sedona',
    ],
  },
  Koenigsegg: {
    models: ['Agera', 'Regera', 'Jesko', 'Gemera', 'CCX'],
  },
  Lamborghini: {
    models: [
      'Huracan',
      'Aventador',
      'Urus',
      'Gallardo',
      'Murcielago',
      'Diablo',
      'Veneno',
      'Sian',
      'Reventon',
      'Countach',
    ],
  },
  'Land Rover': {
    models: [
      'Range Rover',
      'Discovery',
      'Defender',
      'Freelander',
      'LR2',
      'LR3',
      'LR4',
      'Range Rover Evoque',
      'Range Rover Sport',
      'Discovery Sport',
    ],
  },
  Lincoln: {
    models: [
      'Navigator',
      'Aviator',
      'Corsair',
      'MKZ',
      'Continental',
      'MKC',
      'MKS',
      'MKT',
      'Town Car',
      'Mark LT',
    ],
  },
  Lotus: {
    models: ['Elise', 'Exige', 'Evora', 'Emira', 'Esprit'],
  },
  Mazda: {
    models: ['Mazda3', 'Mazda6', 'CX-5', 'CX-30', 'MX-5 Miata'],
  },
  'Mercedes-Benz': {
    models: [
      'C-Class',
      'E-Class',
      'S-Class',
      'GLC',
      'GLE',
      'A-Class',
      'GLA',
      'CLA',
      'SL',
      'AMG GT',
    ],
  },
  Mini: {
    models: ['Cooper', 'Countryman', 'Clubman', 'Paceman', 'Convertible'],
  },
  Mitsubishi: {
    models: ['Outlander', 'Eclipse Cross', 'Mirage', 'RVR', 'Lancer'],
  },
  Nissan: {
    models: [
      'Altima',
      'Maxima',
      'Sentra',
      'Rogue',
      'Murano',
      'Titan',
      'Frontier',
      '370Z',
      'Juke',
      'Pathfinder',
    ],
  },
  Peugeot: {
    models: [
      '208',
      '308',
      '508',
      '3008',
      '5008',
      '2008',
      'Partner',
      'Traveller',
      'Rifter',
    ],
  },
  Porsche: {
    models: [
      '911',
      'Cayenne',
      'Macan',
      'Panamera',
      'Boxster',
      'Cayman',
      'Taycan',
      '918 Spyder',
      'Carrera GT',
    ],
  },
  Ram: {
    models: ['1500', '2500', '3500', 'ProMaster City', 'ProMaster'],
  },
  Renault: {
    models: ['Clio', 'Captur', 'Megane', 'Koleos', 'Talisman'],
  },
  Saab: {
    models: ['9-3', '9-5', '9-4X', 'Sonett', '95'],
  },
  Skoda: {
    models: ['Octavia', 'Fabia', 'Superb', 'Kodiaq', 'Kamiq'],
  },
  Smart: {
    models: ['Fortwo', 'Forfour', 'Roadster'],
  },
  Subaru: {
    models: ['Outback', 'Forester', 'Crosstrek', 'Legacy', 'Impreza'],
  },
  Suzuki: {
    models: ['Vitara', 'SX4', 'Swift', 'Baleno', 'Jimny'],
  },
  Tata: {
    models: ['Nexon', 'Harrier', 'Safari', 'Altroz', 'Tiago'],
  },
  Tesla: {
    models: ['Model S', 'Model 3', 'Model X', 'Model Y', 'Roadster'],
  },
  Volkswagen: {
    models: ['Golf', 'Passat', 'Jetta', 'Tiguan', 'Atlas'],
  },
  Volvo: {
    models: ['XC40', 'XC60', 'XC90', 'S60', 'S90'],
  },
  Wiesmann: {
    models: ['MF3', 'MF4', 'GT', 'Spyder'],
  },
  Pagani: {
    models: ['Zonda', 'Huayra'],
  },
};

const debtsOptions = [
  'Car',
  'Home',
  'Student Loan',
  'Personal Loan',
  'Business Loan',
];

export function WorldlyLifestyleForm({
  worldlyLifestyle,
}: {
  worldlyLifestyle?: WorldlyLifestyle;
}) {
  const form = useForm<WorldlyLifestyle>({
    resolver: zodResolver(worldlyLifestyleSchema),
    defaultValues: {
      employmentType: worldlyLifestyle?.employmentType || '',
      annualIncome: worldlyLifestyle?.annualIncome || '',
      annualIncomeCurrency: worldlyLifestyle?.annualIncomeCurrency || '',
      currentOccupationTitle: worldlyLifestyle?.currentOccupationTitle || '',
      typeOfResidence: worldlyLifestyle?.typeOfResidence || '',
      livingSituation: worldlyLifestyle?.livingSituation || '',
      ownsVehicle: worldlyLifestyle?.ownsVehicle || '',
      vehicleYear: worldlyLifestyle?.vehicleYear || new Date().getFullYear(),
      vehicleMake: worldlyLifestyle?.vehicleMake || '',
      vehicleModel: worldlyLifestyle?.vehicleModel || '',
      educationQualification: worldlyLifestyle?.educationQualification || '',
      applicableDebts: worldlyLifestyle?.applicableDebts || '',
      currentDebts: worldlyLifestyle?.currentDebts || [],
      approximateDebt: worldlyLifestyle?.approximateDebt || '',
      approximateDebtCurrency: worldlyLifestyle?.approximateDebtCurrency || '',
      payingInterestOnDebts: worldlyLifestyle?.payingInterestOnDebts || '',
      presentFamilyMembers: worldlyLifestyle?.presentFamilyMembers || '',
      numberOfSiblings: worldlyLifestyle?.numberOfSiblings || 0,
      pets: worldlyLifestyle?.pets || '',
      majorPreexistingHealthCondition:
        worldlyLifestyle?.majorPreexistingHealthCondition || '',
      mobilityAssistantRequirement:
        worldlyLifestyle?.mobilityAssistantRequirement || '',
      preexistingHealthConditionDescription:
        worldlyLifestyle?.preexistingHealthConditionDescription || '',
    },
  });

  useEffect(() => {
    form.reset(worldlyLifestyle);
  }, [form, worldlyLifestyle]);

  const user = useAppSelector((state) => state.auth.user);
  const worldlyLifestyleFormRef = useRef<HTMLFormElement>(null);

  const { registerForm, setSaving } = useUpdateProfileContext();
  const [updateWorldlyStyle, updateResult] =
    useUpdateWorldlyLifestyleMutation();

  useEffect(() => {
    if (worldlyLifestyleFormRef && worldlyLifestyleFormRef.current) {
      registerForm('worldlyLifestyleForm', worldlyLifestyleFormRef.current);
    }
  }, [worldlyLifestyleFormRef, registerForm]);

  const onSubmit = (data: WorldlyLifestyle) => {
    const worldlyLifestyle = data;
    if (data.ownsVehicle === 'No') {
      worldlyLifestyle.vehicleMake = '';
      worldlyLifestyle.vehicleModel = '';
      worldlyLifestyle.vehicleYear = 0;
    }
    updateWorldlyStyle({ userId: user!.id, worldlyLifestyle });
  };

  useEffect(() => {
    if (updateResult.isSuccess) {
      toast({
        title: 'Success',
        description: 'Worldly lifestyle updated successfully',
      });
    }
  }, [updateResult]);

  useEffect(() => {
    setSaving(updateResult.isLoading);
  }, [updateResult, setSaving]);

  const hasPreexistingHealthCondition =
    form.watch('majorPreexistingHealthCondition') === 'Yes';
  const ownsCar = form.watch('ownsVehicle') === 'Yes';
  const hasDebt = form.watch('applicableDebts') === 'Yes';

  const carMake = carData[form.watch('vehicleMake')] || { models: [] };
  const carModels = carMake.models.map((model) => ({
    label: model,
    value: model,
  }));

  return (
    <div className="py-8 px-6 sm:px-16 md:px-24 lg:px-52">
      <h1 className="text-xl font-bold text-secondary border-b p-1">
        Your Current Worldly Lifestyle{' '}
        <span className="text-xs">(that you live)</span>
      </h1>

      <Form {...form}>
        <form
          ref={worldlyLifestyleFormRef}
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid grid-cols-12 gap-x-3 gap-y-4 py-5"
        >
          <div className="flex flex-col gap-1 justify-end col-span-12 md:col-span-4">
            <Label>Employment Type</Label>
            <FormField
              name="employmentType"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="shadow text-muted-foreground bg-background text-xs rounded-sm h-8 ring-transparent ring-offset-transparent">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Employed">Employed</SelectItem>
                        <SelectItem value="Self-Employed">
                          Self-Employed
                        </SelectItem>
                        <SelectItem value="Business owner/investor">
                          Business owner/investor
                        </SelectItem>
                        <SelectItem value="Not employed">
                          Not employed
                        </SelectItem>
                        <SelectItem value="Retired">Retired</SelectItem>
                        <SelectItem value="Student">Student</SelectItem>
                        <SelectItem value="Homemaker/housewife">
                          Homemaker/housewife
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
          </div>

          <div className="flex flex-col gap-1 justify-end col-span-12 md:col-span-4">
            <Label>Annual Income</Label>

            <div className="grid grid-cols-12 md:grid-cols-3 gap-0">
              <FormField
                name="annualIncome"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="col-span-8 md:col-span-2">
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger className="text-muted-foreground bg-background text-xs  rounded-none rounded-ss-sm rounded-es-sm h-8 ring-transparent ring-offset-transparent shadow">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="0 - 20,000">0 - 20,000</SelectItem>
                          <SelectItem value="20,000 - 50,000">
                            20,000 - 50,000
                          </SelectItem>
                          <SelectItem value="50,000 - 100,000">
                            50,000 - 100,000
                          </SelectItem>
                          <SelectItem value="100,000 - 200,000">
                            100,000 - 200,000
                          </SelectItem>
                          <SelectItem value="200,000 - 350,000">
                            200,000 - 350,000
                          </SelectItem>
                          <SelectItem value="200,000 - 300,000">
                            350,000 - 450,000
                          </SelectItem>
                          <SelectItem value="> 450,000">450,000+</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />

              <FormField
                name="annualIncomeCurrency"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="col-span-4 md:col-span-1">
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger className="text-muted-foreground bg-background text-xs rounded-none rounded-ee-sm rounded-se-sm h-8 border-s-0 ring-transparent ring-offset-transparent shadow">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.entries(currencies).map(
                            ([currency, countryCode]) => {
                              const Flag =
                                flags[countryCode as keyof typeof flags];

                              return (
                                <SelectItem
                                  value={currency}
                                  key={currency}
                                  className="px-3"
                                >
                                  <div className="flex gap-4 items-center justify-center">
                                    <div className="w-5">
                                      {Flag && <Flag title={currency} />}
                                    </div>{' '}
                                    <div>{currency}</div>
                                  </div>
                                </SelectItem>
                              );
                            }
                          )}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="flex flex-col gap-1 justify-end col-span-12 md:col-span-4">
            <Label>Current Occupation Title</Label>
            <FormField
              name="currentOccupationTitle"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="shadow text-muted-foreground bg-background text-xs rounded-sm h-8 ring-transparent ring-offset-transparent">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {professions.map((profession) => (
                          <SelectItem
                            value={profession}
                            key={profession}
                            className="text-sm"
                          >
                            {profession}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
          </div>

          <div className="flex flex-col gap-1 justify-end col-span-12 md:col-span-4">
            <Label>Type of Residence</Label>
            <FormField
              name="typeOfResidence"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="shadow text-muted-foreground bg-background text-xs rounded-sm h-8 ring-transparent ring-offset-transparent">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Apartment (Rent)">
                          Apartment (Rent)
                        </SelectItem>
                        <SelectItem value="Apartment Owned">
                          Apartment Owned
                        </SelectItem>
                        <SelectItem value="House (Rent)">
                          House (Rent)
                        </SelectItem>
                        <SelectItem value="House (Owned)">
                          House (Owned)
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
          </div>

          <div className="flex flex-col gap-1 justify-end col-span-12 md:col-span-4">
            <Label>Living Situation</Label>
            <FormField
              name="livingSituation"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="shadow text-muted-foreground bg-background text-xs rounded-sm h-8 ring-transparent ring-offset-transparent">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Living alone">
                          Living alone
                        </SelectItem>
                        <SelectItem value="Living with friends/roommates truncate">
                          Living with friends/roommates
                        </SelectItem>
                        <SelectItem value="Living with kids">
                          Living with kids
                        </SelectItem>
                        <SelectItem value="Living with mother/father">
                          Living with mother/father
                        </SelectItem>
                        <SelectItem value="Living in joint family/with brother and his wife">
                          Living in joint family/with brother and his wife
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
          </div>

          <div className="flex flex-col gap-1 justify-end col-span-12 md:col-span-4">
            <Label>Do You Own a Car?</Label>
            <FormField
              name="ownsVehicle"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value?.toString()}
                    >
                      <SelectTrigger className="shadow text-muted-foreground bg-background text-xs rounded-sm h-8 ring-transparent ring-offset-transparent">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Yes">Yes</SelectItem>
                        <SelectItem value="No">No</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
          </div>

          {ownsCar && (
            <>
              <div className="flex flex-col gap-1 justify-end col-span-12 md:col-span-2">
                <Label>Vehicle Make</Label>
                <FormField
                  name="vehicleMake"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <AutoComplete
                        onChange={field.onChange}
                        selectedOption={field.value}
                        options={Object.keys(carData).map((brand) => ({
                          label: brand,
                          value: brand,
                        }))}
                        placeholder=""
                        className="shadow text-muted-foreground bg-background text-xs rounded-sm h-8 ring-transparent ring-offset-transparent"
                      />
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex flex-col gap-1 justify-end col-span-12 md:col-span-2">
                <Label>Vehicle Year</Label>
                <FormField
                  name="vehicleYear"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value?.toString()}
                        >
                          <SelectTrigger className="shadow text-muted-foreground bg-background text-xs rounded-sm h-8 ring-transparent ring-offset-transparent ">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="max-h-64">
                            {Array.from({ length: 20 }, (_, i) => (
                              <SelectItem
                                key={i}
                                value={String(new Date().getFullYear() - i)}
                              >
                                {String(new Date().getFullYear() - i)}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex flex-col gap-1 justify-end col-span-12 md:col-span-4">
                <Label>Vehicle Model</Label>
                <FormField
                  name="vehicleModel"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <FormItem>
                          <AutoComplete
                            onChange={field.onChange}
                            selectedOption={field.value}
                            options={carModels}
                            placeholder=""
                            className="shadow text-muted-foreground bg-background text-xs rounded-sm h-8 ring-transparent ring-offset-transparent"
                          />
                          <FormMessage className="text-xs" />
                        </FormItem>
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />
              </div>
            </>
          )}

          <div className="flex flex-col gap-1 justify-end col-span-12 md:col-span-4">
            <Label>Education Qualification</Label>
            <FormField
              name="educationQualification"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="shadow text-muted-foreground bg-background text-xs rounded-sm h-8 ring-transparent ring-offset-transparent">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="High school">High school</SelectItem>
                        <SelectItem value="Diploma">Diploma</SelectItem>
                        <SelectItem value="Non-Degree Qualified">
                          Non-Degree Qualified
                        </SelectItem>
                        <SelectItem value="Bachelor's degree">
                          Bachelor&apos;s degree
                        </SelectItem>
                        <SelectItem value="Masters">Masters</SelectItem>
                        <SelectItem value="PHD/Doctorate">
                          PHD/Doctorate
                        </SelectItem>
                        <SelectItem value="Currently Studying">
                          Currently Studying
                        </SelectItem>
                        <SelectItem value="None of the above">
                          None of the above
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
          </div>

          <div className="flex flex-col gap-1 justify-end col-span-12 md:col-span-4">
            <Label>Do you have debt?</Label>
            <FormField
              name="applicableDebts"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="shadow text-muted-foreground bg-background text-xs rounded-sm h-8 ring-transparent ring-offset-transparent">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Yes">Yes</SelectItem>
                        <SelectItem value="No">No</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
          </div>

          {hasDebt && (
            <>
              <div className="flex flex-col gap-1 justify-end col-span-12 md:col-span-4">
                <Label>Current Debt</Label>
                <FormField
                  name="currentDebts"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Multiselect
                          onChange={field.onChange}
                          selectedOptions={field.value}
                          title="Current Debts"
                          initOptions={debtsOptions.map((debt) => ({
                            label: debt,
                            value: debt,
                          }))}
                          placeholder="Select"
                          className="shadow text-muted-foreground bg-background text-xs rounded-sm h-8 ring-transparent ring-offset-transparent"
                        />
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex flex-col gap-1 justify-end col-span-12 md:col-span-4">
                <Label>Approximate Debt</Label>

                <div className="grid grid-cols-12 md:grid-cols-3 gap-0">
                  <FormField
                    name="approximateDebt"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem className="col-span-8 md:col-span-2">
                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
                          >
                            <SelectTrigger className="text-muted-foreground bg-background text-xs  rounded-none rounded-ss-sm rounded-es-sm h-8 ring-transparent ring-offset-transparent shadow">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="0 - 20,000">
                                0 - 20,000
                              </SelectItem>
                              <SelectItem value="20,000 - 50,000">
                                20,000 - 50,000
                              </SelectItem>
                              <SelectItem value="50,000 - 100,000">
                                50,000 - 100,000
                              </SelectItem>
                              <SelectItem value="100,000 - 200,000">
                                100,000 - 200,000
                              </SelectItem>
                              <SelectItem value="200,000 - 350,000">
                                200,000 - 350,000
                              </SelectItem>
                              <SelectItem value="200,000 - 300,000">
                                350,000 - 450,000
                              </SelectItem>
                              <SelectItem value="> 450,000">
                                450,000+
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    name="approximateDebtCurrency"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem className="col-span-4 md:col-span-1">
                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
                          >
                            <SelectTrigger className="text-muted-foreground bg-background text-xs rounded-none rounded-ee-sm rounded-se-sm h-8 border-s-0 ring-transparent ring-offset-transparent shadow">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {Object.entries(currencies).map(
                                ([currency, countryCode]) => {
                                  const Flag =
                                    flags[countryCode as keyof typeof flags];

                                  return (
                                    <SelectItem
                                      value={currency}
                                      key={currency}
                                      className="px-3"
                                    >
                                      <div className="flex gap-4 items-center justify-center">
                                        <div className="w-5">
                                          {Flag && <Flag title={currency} />}
                                        </div>{' '}
                                        <div>{currency}</div>
                                      </div>
                                    </SelectItem>
                                  );
                                }
                              )}
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1 justify-end col-span-12 md:col-span-3">
                <Label>Do you pay Interest/Riba on Debts?</Label>
                <FormField
                  name="payingInterestOnDebts"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <SelectTrigger className="shadow text-muted-foreground bg-background text-xs rounded-sm h-8 ring-transparent ring-offset-transparent">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Yes">Yes</SelectItem>
                            <SelectItem value="No">No</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />
              </div>
            </>
          )}

          <div className="flex flex-col gap-1 justify-end col-span-12 md:col-span-3">
            <Label>Present Family Members</Label>
            <FormField
              name="presentFamilyMembers"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="shadow text-muted-foreground bg-background text-xs rounded-sm h-8 ring-transparent ring-offset-transparent">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Both Parents Present">
                          Both Parents Present
                        </SelectItem>
                        <SelectItem value="Only Father">Only Father</SelectItem>
                        <SelectItem value="Only Mother">Only Mother</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
          </div>

          <div className="flex flex-col gap-1 justify-end col-span-12 md:col-span-3">
            <Label>Number of Siblings</Label>
            <FormField
              name="numberOfSiblings"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      value={
                        field.value
                          ? field.value === 0
                            ? 'None'
                            : field.value.toString()
                          : 'None'
                      }
                    >
                      <SelectTrigger className="shadow text-muted-foreground bg-background text-xs rounded-sm h-8 ring-transparent ring-offset-transparent">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="None">None</SelectItem>
                        <SelectItem value="1">1</SelectItem>
                        <SelectItem value="2">2</SelectItem>
                        <SelectItem value="3">3</SelectItem>
                        <SelectItem value="4">4</SelectItem>
                        <SelectItem value="5+">5+</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
          </div>

          <div className="flex flex-col gap-1 justify-end col-span-12 md:col-span-3">
            <Label>Pets</Label>
            <FormField
              name="pets"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="shadow text-muted-foreground bg-background text-xs rounded-sm h-8 ring-transparent ring-offset-transparent text-start">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="None">No</SelectItem>
                        <SelectItem value="Cats">Cats</SelectItem>
                        <SelectItem value="Dog">Dog</SelectItem>
                        <SelectItem value="Bird">Bird</SelectItem>
                        <SelectItem value="Reptiles">Reptiles</SelectItem>
                        <SelectItem value="Insects">Insects</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
          </div>

          <h2 className="col-span-12 font-bold mt-2">Health Conditions</h2>

          <div className="flex flex-col gap-1 justify-end col-span-12 md:col-span-5">
            <Label>
              Major Pre-Existing Health Conditions and/or Disabilities
            </Label>
            <FormField
              name="majorPreexistingHealthCondition"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="shadow text-muted-foreground bg-background text-xs rounded-sm h-8 ring-transparent ring-offset-transparent">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Yes">Yes</SelectItem>
                        <SelectItem value="No">No</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
          </div>

          <div className="flex flex-col gap-1 justify-end col-span-12 md:col-span-3">
            <Label>Do your require mobility assistant?</Label>
            <FormField
              name="mobilityAssistantRequirement"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="shadow text-muted-foreground bg-background text-xs rounded-sm h-8 ring-transparent ring-offset-transparent">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Yes">Yes</SelectItem>
                        <SelectItem value="No">No</SelectItem>
                        <SelectItem value="Limited Assistance">
                          Limited Assistance
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
          </div>

          {hasPreexistingHealthCondition && (
            <div className="flex flex-col gap-1 justify-end col-span-12">
              <Label>
                Describe your pre-existing conditions and/or disabilities
                (Example: STD, Disabilities, Cancer, etc)
              </Label>
              <FormField
                name="preexistingHealthConditionDescription"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        {...field}
                        className="text-muted-foreground bg-background text-xs shadow rounded-sm"
                      />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
            </div>
          )}
        </form>
      </Form>
    </div>
  );
}
