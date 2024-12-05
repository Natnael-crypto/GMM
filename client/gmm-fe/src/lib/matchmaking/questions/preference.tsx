import { languages } from '@/config';
import { PreferenceForm } from '@/lib/schemas/preference';
import { countries, countryToCountryCode } from '@/lib/schemas/user';
import flags from 'react-phone-number-input/flags';

const countryOptions = Object.keys(countries).map((country) => ({
  label: country,
  value: country,
}));

export interface PreferenceQuestion {
  label: string;
  name: keyof PreferenceForm;
  width: string;
  type: 'multiselect' | 'single';
  options: { label: string; value: string; icon?: any }[];
}

const toOption = (value: string) => ({ label: value, value });

export const basicPreferenceQuestions: PreferenceQuestion[] = [
  {
    label: 'Country of Origin',
    name: 'country',
    width: 'col-span-10 md:col-span-3',
    type: 'multiselect',
    options: countryOptions.map((c) => {
      const countryCode = countryToCountryCode[c.value];
      const Flag = flags[countryCode as keyof typeof flags];
      const icon = (
        <div className="w-5">{Flag && <Flag title={c.label} />}</div>
      );
      return { label: c.label, value: c.value, icon: icon };
    }),
  },
  {
    label: 'Martial Status',
    name: 'martialStatus',
    width: 'col-span-10 md:col-span-3',
    type: 'multiselect',
    options: [
      'Single/Never Married',
      'Single/Legally Divorced',
      'Single/Islamically-Divorced',
      'Widowed',
      'Other',
    ].map(toOption),
  },
  {
    label: 'Children',
    name: 'children',
    width: 'col-span-10 md:col-span-3',
    type: 'multiselect',
    options: ['Has children', "Doesn't have children"].map(toOption),
  },
  {
    label: 'Religious Practice',
    name: 'salat',
    width: 'col-span-10 md:col-span-3',
    type: 'multiselect',
    options: [
      {
        value: 'full_daily_prayers',
        label:
          'Must Pray Full Daily Prayers + Sunnah (Husband prays all obligatory and Sunnah prayers)',
      },
      {
        value: 'fardh_only',
        label:
          'Fardh Only (Husband prays mandatory prayers as a minimum requirement)',
      },
      {
        value: 'flexible',
        label:
          "Flexible Approach (As long as husband says he's a Muslim, he does not have to pray)",
      },
    ],
  },
  {
    label: 'Hijab',
    name: 'hijab',
    width: 'col-span-10 md:col-span-3',
    type: 'multiselect',
    options: [
      {
        value: 'advanced_hijab',
        label:
          'Wife must do Advanced Hijab (Niqab or burqa, possibly with gloves, often with eyes not visible)',
      },
      {
        value: 'minimum_hijab',
        label:
          'Wife must do Minimum Hijab (Basic Islamic attire with long dress/skirt, or loose clothing with long sleeves. Face and hands visible)',
      },
      {
        value: 'partial_hijab',
        label:
          'Wife may do Partial Hijab (Headscarf like a turban revealing neck. Tight clothing showing shape of body)',
      },
      {
        value: 'no_hijab',
        label: "No Hijab (Don't need or want wife to wear Hijab)",
      },
    ],
  },
];

export const advancedPreferenceQuestions: PreferenceQuestion[] = [
  {
    label: 'Nationality/Passport',
    name: 'nationality',
    width: 'col-span-10 md:col-span-3',
    type: 'multiselect',
    options: countryOptions.map((c) => {
      const countryCode = countryToCountryCode[c.value];
      const Flag = flags[countryCode as keyof typeof flags];
      const icon = (
        <div className="w-5">{Flag && <Flag title={c.label} />}</div>
      );
      return { label: c.label, value: c.value, icon: icon };
    }),
  },
  {
    label: 'Language',
    name: 'language',
    width: 'col-span-10 md:col-span-3',
    type: 'multiselect',
    options: languages,
  },
  {
    label: 'Born/Reverted',
    name: 'bornOrRevert',
    width: 'col-span-10 md:col-span-3',
    type: 'multiselect',
    options: ['Born Muslim', 'Reverted to Islam', "Doesn't matter"].map(
      toOption
    ),
  },
  {
    label: 'Number of Children',
    name: 'numberOfChildren',
    width: 'col-span-10 md:col-span-3',
    type: 'multiselect',
    options: ['1', '2', '3', '4+', "Doesn't matter"].map(toOption),
  },
  {
    label: 'Wants Children',
    name: 'wantsChildren',
    width: 'col-span-10 md:col-span-3',
    type: 'multiselect',
    options: [
      'Wants children',
      "Doesn't want children",
    ].map(toOption),
  },
  {
    label: 'Education',
    name: 'education',
    width: 'col-span-10 md:col-span-3',
    type: 'multiselect',
    options: [
      'High school',
      'Diploma',
      'Non-Degree Qualified',
      "Bachelor's degree",
      'Masters',
      'PHD/Doctorate',
      'Currently Studying',
      'None of the above',
    ].map(toOption),
  },
  {
    label: 'Profession',
    name: 'profession',
    width: 'col-span-10 md:col-span-3',
    type: 'multiselect',
    options: [
      "Accountant",
      "Actuary",
      "Anthropologist",
      "Animator",
      "Architect",
      "Artist",
      "Author",
      "Baker",
      "Bartender",
      "Biologist",
      "Biomedical Engineer",
      "Business Owner",
      "Carpenter",
      "Chef",
      "Chemical Engineer",
      "Chiropractor",
      "Civil Engineer",
      "Cloud Engineer",
      "Construction Manager",
      "Consultant",
      "Content Creator",
      "Corporate Trainer",
      "Customer Support Specialist",
      "Data Analyst",
      "Data Engineer",
      "Data Scientist",
      "Database Administrator",
      "Dentist",
      "Economist",
      "Electrician",
      "Electrical Engineer",
      "Engineer",
      "Entrepreneur",
      "Environmental Scientist",
      "Event Coordinator",
      "Event Planner",
      "Fashion Designer",
      "Film Director",
      "Firefighter",
      "Florist",
      "Forensic Scientist",
      "Fundraiser",
      "Game Developer",
      "Geologist",
      "Graphic Designer",
      "Health Coach",
      "Healthcare Administrator",
      "Historian",
      "HR Manager",
      "Insurance Agent",
      "Interior Designer",
      "Interpreter",
      "IT Consultant",
      "IT Support Specialist",
      "Journalist",
      "Lawyer",
      "Legal Secretary",
      "Logistics Coordinator",
      "Logistics Manager",
      "Marketing Specialist",
      "Mechanic",
      "Mental Health Counselor",
      "Musician",
      "Novelist",
      "Nurse",
      "Nurse Practitioner",
      "Nutritionist",
      "Occupational Therapist",
      "Operations Manager",
      "Other",
      "Paralegal",
      "Personal Trainer",
      "Pharmacist",
      "Photographer",
      "Physician Assistant",
      "Physiotherapist",
      "Pilot",
      "Plumber",
      "Police Officer",
      "Political Scientist",
      "Project Manager",
      "Property Manager",
      "Public Health Specialist",
      "Public Relations Specialist",
      "Quality Assurance Tester",
      "Real Estate Agent",
      "Recruiting Specialist",
      "Researcher",
      "Retail Manager",
      "Scientist",
      "Screenwriter",
      "SEO Specialist",
      "Social Media Manager",
      "Sociologist",
      "Software Architect",
      "Software Developer",
      "Software Engineer",
      "Software Tester",
      "Speech Therapist",
      "Statistician",
      "Supply Chain Analyst",
      "Systems Administrator",
      "Teacher",
      "Technical Writer",
      "Therapist",
      "Translator",
      "Urban Planner",
      "Veterinarian",
      "Veterinarian Technician",
      "Video Editor",
      "Waiter",
      "Web Designer",
      "Web Developer",
      "Wedding Planner",
      "Writer",
      "Yoga Instructor"
    ].map(toOption),
  },
  {
    label: 'Drinks/Alcohol',
    name: 'drinking',
    width: 'col-span-10 md:col-span-3',
    type: 'single',
    options: [
      { label: 'Yes', value: 'true' },
      { label: 'No', value: 'false' },
    ],
  },
  {
    label: 'Smokes (Vapes/Shisha)',
    name: 'smoking',
    width: 'col-span-10 md:col-span-3',
    type: 'single',
    options: [
      { label: 'Yes', value: 'true' },
      { label: 'No', value: 'false' },
    ],
  },
  {
    label: 'Tattoo(s)',
    name: 'tattoos',
    width: 'col-span-10 md:col-span-3',
    type: 'single',
    options: [
      { label: 'Yes', value: 'true' },
      { label: 'No', value: 'false' },
    ],
  },
  {
    label: 'Drugs (Cannabis/Cocaine)',
    name: 'drugs',
    width: 'col-span-10 md:col-span-3',
    type: 'single',
    options: [
      { label: 'Yes', value: 'true' },
      { label: 'No', value: 'false' },
    ],
  },
];

export const preferenceQuestions = [
  ...basicPreferenceQuestions,
  ...advancedPreferenceQuestions,
];
