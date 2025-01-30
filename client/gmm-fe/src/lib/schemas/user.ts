'use client';

import { z } from 'zod';
import { preferenceSchema } from './preference';
import { getEighteenYearsAgo } from '../format';
import { isValidPhoneNumber } from 'react-phone-number-input';

export enum AccountStatus {
  INCOMPLETE_REGISTRATION = 'Incomplete Registration',
  PENDING = 'Pending',
  APPROVED = 'Approved',
  DENIED = 'Denied',
  SUSPENDED = 'Suspended',
}

export enum AccountVerificationStatus {
  VERIFIED = 'Verified',
  UNVERIFIED = 'Unverified',
}

export enum Gender {
  MALE = 'Male',
  FEMALE = 'Female',
}

export const _userBasicInformationSchema = z
  .object({
    id: z.string(),
    email: z
      .string({ required_error: 'Please enter a valid email' })
      .email({ message: 'Please enter a valid email' }),
    firstName: z
      .string({
        required_error: 'Please enter your first name',
      })
      .min(1, { message: 'Please enter your first name' }),
    lastName: z
      .string({
        required_error: 'Please enter your last name',
      })
      .min(1, { message: 'Please enter your last name' }),
    phoneNumber: z
      .string({
        required_error: 'Please enter your phone number',
      })
      .min(1, { message: 'Please enter your phone number' })
      .refine((value) => isValidPhoneNumber(value ?? ''), {
        message: 'Please enter a valid phone number',
      }),

    dateOfBirth: z
      .date({
        required_error: 'A date of birth is required.',
      })
      .refine((date) => date <= getEighteenYearsAgo(), {
        message: 'You must be at least 18 years old.',
      }),

    gender: z
      .string({ required_error: 'Please enter your gender' })
      .min(1, { message: 'Please enter your gender' }),

    height: z.union([
      z
        .string({ required_error: 'Please enter your height in cm' })
        .refine((value) => !isNaN(parseInt(value)))
        .transform(Number),
      z.number({
        required_error: 'Please enter your height in cm',
      }),
    ]),
    weight: z.union([
      z
        .string({ required_error: 'Please enter your height in kg' })
        .refine((value) => !isNaN(parseInt(value)))
        .transform(Number),
      z.number({
        required_error: 'Please enter your weight in kg',
      }),
    ]),
    country: z
      .string({
        required_error: 'Please enter your country',
      })
      .min(1, { message: 'Please enter your country' }),
    skinColor: z.string({
      required_error: 'Please enter your skin color',
    }),
    languages: z.union([
      z.array(z.string()).min(1, { message: 'Required' }),
      z
        .string({
          required_error: 'Please list languages you speak',
        })
        .refine(
          (value) => {
            return (
              value
                .split(',')
                .map((lang) => lang.trim())
                .filter((lang) => lang.length > 0).length > 0
            );
          },
          {
            message: 'Please enter at least one language',
          }
        )
        .transform((value) =>
          value
            .split(',')
            .map((lang) => lang.trim())
            .filter((lang) => lang.length > 0)
        ),
    ]),
    idCardImage: z.string({
      required_error: 'Please upload your ID',
    }),

    nationality: z
      .string({
        required_error: 'Please enter your nationality',
      })
      .min(1, { message: 'Please enter your nationality' }),
    currentCountry: z
      .string({
        required_error: 'Please enter the current country you live in',
      })
      .min(1, { message: 'Please enter the current country you live in' }),
    city: z
      .string({
        required_error: 'Please enter your city',
      })
      .min(1, { message: 'Please enter your city' }),
    maritalStatus: z
      .string({
        required_error: 'Please state your status',
      })
      .min(1, { message: 'Please state your status' }),
    hasChildren: z
      .string({
        required_error: 'Please state your status',
      })
      .min(1, { message: 'Please select your status' }),
    numberOfChildren: z.union([
      z.number(),
      z
        .string({ required_error: 'How many children do you have?' })
        .refine((value) => !isNaN(parseInt(value)), {
          message: 'Please enter a valid number',
        })
        .transform(Number),
    ]),
    ageOfOldestChild: z.union([
      z.number(),
      z
        .string({ required_error: 'How old is your oldest child?' })
        .refine((value) => !isNaN(parseInt(value)), {
          message: 'Please enter a valid number',
        })
        .transform(Number),
    ]),
    ageOfYoungestChild: z.union([
      z.number(),
      z
        .string({ required_error: 'How old is your youngest child?' })
        .refine((value) => !isNaN(parseInt(value)), {
          message: 'Please enter a valid number',
        })
        .transform(Number),
    ]),
    sunniMadhaib: z
      .string({
        required_error: 'Please specify',
      })
      .min(1, { message: 'Please specify' }),

    religiousPractice: z
      .string({
        required_error: 'Please specify your religious practice',
      })
      .min(1, { message: 'Please specify your religious practice' }),

    bornOrRevertToIslam: z.string({
      required_error: 'Please specify',
    }),

    drinks: z.union([
      z.boolean({
        required_error: 'Please specify if you drink',
      }),
      z
        .string({
          required_error: 'Please specify if you drink (true/false)',
        })
        .transform((value) => value === 'true'),
    ]),

    drugs: z.union([
      z.boolean({
        required_error: 'Please specify if you do drugs',
      }),
      z
        .string({
          required_error: 'Please specify if you do drugs (true/false)',
        })
        .transform((value) => value === 'true'),
    ]),

    smokes: z.union([
      z.boolean({
        required_error: 'Please specify if you smoke',
      }),
      z
        .string({
          required_error: 'Please specify if you smoke (true/false)',
        })
        .transform((value) => value === 'true'),
    ]),

    tattoos: z.string({
      required_error: 'Please specify',
    }),

    pictures: z
      .array(
        z.string({
          required_error: 'Please upload a picture',
        })
      )
      .refine(
        (value) => {
          return (
            value.length === 8 && value.filter((val) => val != '').length >= 5
          );
        },
        {
          message: 'Please upload at least 5 pictures',
        }
      ),

    video: z.string({
      required_error: 'Please upload a video',
    }),
  })
  .required();

export const userBasicInformationSchema =
  _userBasicInformationSchema.superRefine((data, ctx) => {
    if (data.hasChildren && data.ageOfOldestChild < data.ageOfYoungestChild) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['ageOfOldestChild'],
        message:
          'Age of oldest child must be greater than age of youngest child',
      });
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['ageOfYoungestChild'],
        message:
          'Age of youngest child must be less than age of youngest child',
      });
    }
  });

export const baseUserSchema = z
  .object({
    id: z.string().optional(),
    registered: z.boolean(),
    email: z
      .string({ required_error: 'Please enter a valid email' })
      .email({ message: 'Please enter a valid email' }),
    firstName: z.string({
      required_error: 'Please enter your first name',
    }),
    lastName: z.string({
      required_error: 'Please enter your last name',
    }),
    phoneNumber: z
      .string({
        required_error: 'Please enter your phone number',
      })
      .refine((value) => isValidPhoneNumber(value ?? ''), {
        message: 'Please enter a valid phone number',
      }),
    dateOfBirth: z
      .date({
        required_error: 'A date of birth is required.',
      })
      .refine((date) => date <= getEighteenYearsAgo(), {
        message: 'You must be at least 18 years old.',
      }),
    gender: z.string({ required_error: 'Please enter your gender' }),
    height: z.union([
      z
        .string({ required_error: 'Please enter your height in cm' })
        .refine((value) => {
          const num = parseInt(value);
          return !isNaN(num) && num > 0;
        })
        .transform(Number),
      z
        .number({
          required_error: 'Please enter your height in cm',
        })
        .min(1, { message: 'Required' }),
    ]),
    weight: z.union([
      z
        .string({ required_error: 'Please enter your height in kg' })
        .refine((value) => {
          const num = parseInt(value);
          return !isNaN(num) && num > 0;
        })
        .transform(Number),
      z
        .number({
          required_error: 'Please enter your weight in kg',
        })
        .min(1, { message: 'Required' }),
    ]),
    country: z.string({
      required_error: 'Please enter your country',
    }),
    skinColor: z.string({
      required_error: 'Please enter your skin color',
    }),
    languages: z.union([
      z.array(z.string()).min(1, { message: 'Required' }),
      z
        .string({
          required_error: 'Please list languages you speak',
        })
        .refine(
          (value) => {
            return (
              value
                .split(',')
                .map((lang) => lang.trim())
                .filter((lang) => lang.length > 0).length > 0
            );
          },
          {
            message: 'Please enter at least one language',
          }
        )
        .transform((value) =>
          value
            .split(',')
            .map((lang) => lang.trim())
            .filter((lang) => lang.length > 0)
        ),
    ]),
    idCardImage: z.string({
      required_error: 'Please upload your ID',
    }),
    nationality: z.string({
      required_error: 'Please enter your nationality',
    }),
    currentCountry: z.string({
      required_error: 'Please enter the current country you live in',
    }),
    city: z.string({
      required_error: 'Please enter your city',
    }),
    maritalStatus: z.string({
      required_error: 'Please state your status',
    }),
    hasChildren: z.string({
      required_error: 'Please state your status',
    }),
    numberOfChildren: z.union([
      z.number().min(0),
      z
        .string({ required_error: 'How many children do you have?' })
        .refine(
          (value) => {
            const num = parseInt(value);
            return !isNaN(num) && num >= 0;
          },
          {
            message: 'Please enter a valid number',
          }
        )
        .transform(Number),
    ]),
    ageOfOldestChild: z.union([
      z.number().min(0),
      z
        .string({ required_error: 'How old is your oldest child?' })
        .refine(
          (value) => {
            const num = parseInt(value);
            return !isNaN(num) && num >= 0;
          },
          {
            message: 'Please enter a valid number',
          }
        )
        .transform(Number),
    ]),
    ageOfYoungestChild: z.union([
      z.number().min(0),
      z
        .string({ required_error: 'How old is your youngest child?' })
        .refine(
          (value) => {
            const num = parseInt(value);
            return !isNaN(num) && num >= 0;
          },
          {
            message: 'Please enter a valid number',
          }
        )
        .transform(Number),
    ]),
    sunniMadhaib: z.string({
      required_error: 'Please specify',
    }),

    religiousPractice: z.string({
      required_error: 'Please specify your religious practice',
    }),

    bornOrRevertToIslam: z.string({
      required_error: 'Please specify your religious practice',
    }),

    drinks: z.union([
      z.boolean({
        required_error: 'Please specify if you drink',
      }),
      z
        .string({
          required_error: 'Please specify if you drink (true/false)',
        })
        .transform((value) => value === 'true'),
    ]),

    drugs: z.union([
      z.boolean({
        required_error: 'Please specify if you do drugs',
      }),
      z
        .string({
          required_error: 'Please specify if you do drugs (true/false)',
        })
        .transform((value) => value === 'true'),
    ]),

    smokes: z.union([
      z.boolean({
        required_error: 'Please specify if you smoke',
      }),
      z
        .string({
          required_error: 'Please specify if you smoke (true/false)',
        })
        .transform((value) => value === 'true'),
    ]),

    tattoos: z.string({
      required_error: 'Please specify',
    }),

    pictures: z
      .array(
        z.string({
          required_error: 'Please upload a picture',
        })
      )
      .default([])
      .optional(),

    video: z
      .string({
        required_error: 'Please upload a video',
      })
      .default('')
      .optional(),

    preference: preferenceSchema.optional().nullable(),

    accountStatus: z
      .enum([
        AccountStatus.INCOMPLETE_REGISTRATION,
        AccountStatus.PENDING,
        AccountStatus.APPROVED,
        AccountStatus.DENIED,
        AccountStatus.SUSPENDED,
      ])
      .optional(),

    roleId: z.string(),
    isMatched: z.boolean().default(false).optional().nullable(),
  })
  .required();

export const userSchema = baseUserSchema.extend({
  guardian: baseUserSchema.optional().nullable(),
  dependents: z.array(baseUserSchema).default([]).optional(),
});

export const userRegistrationSchema = _userBasicInformationSchema
  .extend({
    guardianFirstName: z
      .string({
        required_error: "Please enter guardian's first name",
      })
      .optional(),
    guardianLastName: z
      .string({
        required_error: "Please enter guardian's last name",
      })
      .optional(),
    relationshipToGuardian: z
      .string({
        required_error: 'Please enter your relationship',
      })
      .optional(),
    guardianPhoneNumber: z
      .string({
        required_error: 'Please enter guardian phone number',
      })
      .optional(),
    guardianEmail: z
      .string({ required_error: "Please enter guardian's email" })
      .email({ message: 'Please enter a valid email' })
      .optional(),
  })
  .superRefine((data, ctx) => {
    if (data.hasChildren && data.ageOfOldestChild < data.ageOfYoungestChild) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['ageOfOldestChild', 'ageOfYoungestChild'],
        message:
          'Age of oldest child must be greater than age of youngest child',
      });
      return z.NEVER;
    }
    return z.NEVER;
  });

export type UserRegistration = z.infer<typeof userRegistrationSchema>;
export type User = z.infer<typeof userSchema>;
export type UserBasicInformation = z.infer<typeof userBasicInformationSchema>;

const generateHeights = () => {
  const heights: Record<string, string> = {};
  const startFeet = 3;
  const endFeet = 7;
  const startInches = 9;
  const endInches = 2;

  for (let feet = startFeet; feet <= endFeet; feet++) {
    for (
      let inches = feet === startFeet ? startInches : 0;
      inches <= (feet === endFeet ? endInches : 11);
      inches++
    ) {
      const totalInches = feet * 12 + inches;
      const cm = Math.round(totalInches * 2.54);
      heights[cm.toString()] = `${feet}'${inches}'' (${cm} cm)`;
    }
  }

  return heights;
};

const generateWeights = () => {
  const weights: Record<string, string> = {};
  for (let lbs = 88; lbs <= 485; lbs += 2) {
    const kg = Math.round(lbs / 2.20462);
    weights[kg.toString()] = `${lbs} lbs (${kg} kg)`;
  }
  return weights;
};

export const heights: Record<string, string> = generateHeights();
export const weights: Record<string, string> = generateWeights();

export const minHeight = Math.min(...Object.keys(heights).map(Number));
export const maxHeight = Math.max(...Object.keys(heights).map(Number));
export const minWeight = Math.min(...Object.keys(weights).map(Number));
export const maxWeight = Math.max(...Object.keys(weights).map(Number));
export const minAge = 18;
export const maxAge = 80;

export const countries: Record<string, string[]> = {
  Afghanistan: ['Kabul', 'Herat', 'Kandahar', 'Mazar-i-Sharif', 'Jalalabad'],
  Albania: ['Tirana', 'Durrës', 'Vlorë', 'Shkodër', 'Fier'],
  Algeria: ['Algiers', 'Oran', 'Constantine', 'Annaba', 'Blida'],
  Andorra: [
    'Andorra la Vella',
    'Escaldes-Engordany',
    'Encamp',
    'Les Escaldes',
    'Sant Julià de Lòria',
  ],
  Angola: ['Luanda', 'Ndalatando', 'Huambo', 'Lobito', 'Benguela'],
  'Antigua and Barbuda': [
    "St. John's",
    'All Saints',
    'Liberta',
    'Parham',
    'Bolands',
  ],
  Argentina: ['Buenos Aires', 'Córdoba', 'Rosario', 'Mendoza', 'La Plata'],
  Armenia: ['Yerevan', 'Gyumri', 'Vanadzor', 'Vagharshapat', 'Hrazdan'],
  Australia: ['Sydney', 'Melbourne', 'Brisbane', 'Perth', 'Adelaide'],
  Austria: ['Vienna', 'Graz', 'Linz', 'Salzburg', 'Innsbruck'],
  Azerbaijan: ['Baku', 'Ganja', 'Sumqayit', 'Lankaran', 'Mingachevir'],
  Bahamas: ['Nassau', 'Freeport', 'West End', 'Exuma', 'Eleuthera'],
  Bahrain: ['Manama', 'Muharraq', 'Riffa', 'Sitra', 'Hamad Town'],
  Bangladesh: ['Dhaka', 'Chittagong', 'Khulna', 'Rajshahi', 'Sylhet'],
  Barbados: ['Bridgetown', 'Speightstown', 'Oistins', 'Bathsheba', 'Holetown'],
  Belarus: ['Minsk', 'Gomel', 'Mogilev', 'Vitebsk', 'Brest'],
  Belgium: ['Brussels', 'Antwerp', 'Ghent', 'Bruges', 'Namur'],
  Belize: [
    'Belmopan',
    'San Ignacio',
    'Corozal Town',
    'Dangriga',
    'Orange Walk Town',
  ],
  Benin: ['Porto-Novo', 'Cotonou', 'Parakou', 'Djougou', 'Bohicon'],
  Bhutan: ['Thimphu', 'Paro', 'Punakha', 'Phuentsholing', 'Wangdue Phodrang'],
  Bolivia: ['Sucre', 'La Paz', 'Santa Cruz', 'Cochabamba', 'Oruro'],
  'Bosnia and Herzegovina': [
    'Sarajevo',
    'Banja Luka',
    'Tuzla',
    'Zenica',
    'Mostar',
  ],
  Botswana: ['Gaborone', 'Francistown', 'Molepolole', 'Maun', 'Kasane'],
  Brazil: ['Brasília', 'Rio de Janeiro', 'São Paulo', 'Salvador', 'Fortaleza'],
  Brunei: ['Bandar Seri Begawan', 'Kuala Belait', 'Seria', 'Tutong', 'Bangar'],
  Bulgaria: ['Sofia', 'Plovdiv', 'Varna', 'Burgas', 'Ruse'],
  'Burkina Faso': [
    'Ouagadougou',
    'Bobo-Dioulasso',
    'Koudougou',
    'Banfora',
    'Pô',
  ],
  Burundi: ['Gitega', 'Bujumbura', 'Ngozi', 'Muyinga', 'Rumonge'],
  'Cabo Verde': ['Praia', 'Mindelo', 'Santa Maria', 'Espargos', 'Sal Rei'],
  Cambodia: [
    'Phnom Penh',
    'Siem Reap',
    'Battambang',
    'Sihanoukville',
    'Kampong Cham',
  ],
  Cameroon: ['Yaoundé', 'Douala', 'Garoua', 'Bafoussam', 'Buea'],
  Canada: ['Toronto', 'Vancouver', 'Montreal', 'Calgary', 'Ottawa'],
  'Central African Republic': [
    'Bangui',
    'Bimbo',
    'Berberati',
    'Mbaïki',
    'Carnot',
  ],
  Chad: ["N'Djamena", 'Moundou', 'Sarh', 'Abéché', 'Kelo'],
  Chile: ['Santiago', 'Valparaíso', 'Concepción', 'La Serena', 'Antofagasta'],
  China: ['Beijing', 'Shanghai', 'Shenzhen', 'Guangzhou', 'Chengdu'],
  Colombia: ['Bogotá', 'Medellín', 'Cali', 'Barranquilla', 'Cartagena'],
  Comoros: ['Moroni', 'Moutsamoudou', 'Domoni', 'Fomboni', 'Mitsamiouli'],
  'Congo (Congo-Brazzaville)': [
    'Brazzaville',
    'Pointe-Noire',
    'Dolisie',
    'Nkayi',
    'Owando',
  ],
  'Costa Rica': ['San José', 'Alajuela', 'Cartago', 'Heredia', 'Liberia'],
  Croatia: ['Zagreb', 'Split', 'Rijeka', 'Osijek', 'Dubrovnik'],
  Cuba: ['Havana', 'Santiago de Cuba', 'Camagüey', 'Holguín', 'Guantánamo'],
  Cyprus: ['Nicosia', 'Limassol', 'Larnaca', 'Famagusta', 'Paphos'],
  'Czech Republic (Czechia)': ['Prague', 'Brno', 'Plzeň', 'Ostrava', 'Olomouc'],
  'Democratic Republic of the Congo': [
    'Kinshasa',
    'Lubumbashi',
    'Mbuji-Mayi',
    'Kananga',
    'Kolwezi',
  ],
  Denmark: ['Copenhagen', 'Aarhus', 'Odense', 'Aalborg', 'Esbjerg'],
  Djibouti: ['Djibouti', 'Ali Sabieh', 'Dikhil', 'Tadjourah', 'Obock'],
  Dominica: ['Roseau', 'Portsmouth', 'Salisbury', 'Marigot', 'Loubière'],
  'Dominican Republic': [
    'Santo Domingo',
    'Santiago',
    'San Pedro de Macorís',
    'La Romana',
    'Puerto Plata',
  ],
  Ecuador: ['Quito', 'Guayaquil', 'Cuenca', 'Machala', 'Manta'],
  Egypt: ['Cairo', 'Alexandria', 'Giza', 'Shubra El Kheima', 'Port Said'],
  'El Salvador': [
    'San Salvador',
    'Santa Ana',
    'San Miguel',
    'Sonsonate',
    'La Libertad',
  ],
  'Equatorial Guinea': ['Malabo', 'Bata', 'Ebebiyin', 'Aconibe', 'Evinayong'],
  Eritrea: ['Asmara', 'Massawa', 'Keren', 'Assab', 'Mendefera'],
  Estonia: ['Tallinn', 'Tartu', 'Narva', 'Kohtla-Järve', 'Pärnu'],
  'Eswatini (fmr. Swaziland)': [
    'Mbabane',
    'Manzini',
    'Lobamba',
    'Nhlangano',
    'Siteki',
  ],
  Ethiopia: ['Addis Ababa', 'Dire Dawa', 'Mekelle', 'Gondar', 'Bahir Dar'],
  Fiji: ['Suva', 'Nadi', 'Lautoka', 'Labasa', 'Ba'],
  Finland: ['Helsinki', 'Espoo', 'Tampere', 'Vantaa', 'Oulu'],
  France: ['Paris', 'Marseille', 'Lyon', 'Toulouse', 'Nice'],
  Gabon: ['Libreville', 'Port-Gentil', 'Franceville', 'Mouila', 'Onyanga'],
  Gambia: ['Banjul', 'Serekunda', 'Brikama', 'Bakau', 'Gunjur'],
  Georgia: ['Tbilisi', 'Kutaisi', 'Batumi', 'Zugdidi', 'Rustavi'],
  Germany: ['Berlin', 'Munich', 'Hamburg', 'Cologne', 'Frankfurt'],
  Ghana: ['Accra', 'Kumasi', 'Tamale', 'Takoradi', 'Cape Coast'],
  Greece: ['Athens', 'Thessaloniki', 'Patras', 'Heraklion', 'Larissa'],
  Grenada: ["St. George's", 'Gouyave', 'Grenville', 'Carriacou', 'Sauteurs'],
  Guatemala: [
    'Guatemala City',
    'Quetzaltenango',
    'Escuintla',
    'San Miguel Petapa',
    'Mixco',
  ],
  Guinea: ['Conakry', 'Nzérékoré', 'Kankan', 'Kindia', 'Boké'],
  'Guinea-Bissau': ['Bissau', 'Gabú', 'Bafatá', 'Bolama', 'Cacheu'],
  Guyana: ['Georgetown', 'Linden', 'Anna Regina', 'New Amsterdam', 'Bartica'],
  Haiti: ['Port-au-Prince', 'Cap-Haïtien', 'Les Cayes', 'Jacmel', 'Gonaïves'],
  Honduras: [
    'Tegucigalpa',
    'San Pedro Sula',
    'La Ceiba',
    'Choloma',
    'El Progreso',
  ],
  Hungary: ['Budapest', 'Debrecen', 'Szeged', 'Miskolc', 'Pécs'],
  Iceland: ['Reykjavik', 'Kopavogur', 'Hafnarfjordur', 'Akureyri', 'Akranes'],
  India: ['New Delhi', 'Mumbai', 'Bengaluru', 'Kolkata', 'Chennai'],
  Indonesia: ['Jakarta', 'Surabaya', 'Bandung', 'Medan', 'Bali'],
  Iran: ['Tehran', 'Isfahan', 'Shiraz', 'Tabriz', 'Ahvaz'],
  Iraq: ['Baghdad', 'Mosul', 'Basra', 'Erbil', 'Sulaymaniyah'],
  Ireland: ['Dublin', 'Cork', 'Limerick', 'Galway', 'Waterford'],
  Israel: ['Jerusalem', 'Tel Aviv', 'Haifa', 'Rishon Lezion', 'Petah Tikva'],
  Italy: ['Rome', 'Milan', 'Naples', 'Turin', 'Florence'],
  'Ivory Coast': ['Yamoussoukro', 'Abidjan', 'San Pedro', 'Bouaké', 'Korhogo'],
  Jamaica: [
    'Kingston',
    'Montego Bay',
    'Mandeville',
    'Spanish Town',
    'Portmore',
  ],
  Japan: ['Tokyo', 'Osaka', 'Yokohama', 'Nagoya', 'Sapporo'],
  Jordan: ['Amman', 'Zarqa', 'Irbid', 'Aqaba', 'Salt'],
  Kazakhstan: ['Almaty', 'Astana', 'Shymkent', 'Karaganda', 'Aktobe'],
  Kenya: ['Nairobi', 'Mombasa', 'Nakuru', 'Kisumu', 'Eldoret'],
  Kiribati: ['Tarawa', 'Betio', 'Bairiki', 'Kiritimati', 'Tabiteuea'],
  Kuwait: ['Kuwait City', 'Hawalli', 'Salmiya', 'Farwaniya', 'Ahmadi'],
  Kyrgyzstan: ['Bishkek', 'Osh', 'Jalal-Abad', 'Talas', 'Naryn'],
  Laos: ['Vientiane', 'Luang Prabang', 'Pakse', 'Savannakhet', 'Xam Neua'],
  Latvia: ['Riga', 'Daugavpils', 'Liepaja', 'Jelgava', 'Rēzekne'],
  Lebanon: ['Beirut', 'Tripoli', 'Sidon', 'Tyre', 'Zahle'],
  Lesotho: ['Maseru', 'Teyateyaneng', 'Leribe', "Mohale's Hoek", 'Quthing'],
  Liberia: ['Monrovia', 'Gbarnga', 'Bong Town', 'Kakata', 'Harper'],
  Libya: ['Tripoli', 'Benghazi', 'Misrata', 'Tarhuna', 'Al Bayda'],
  Liechtenstein: ['Vaduz', 'Balzers', 'Eschen', 'Schellenberg', 'Schaan'],
  Lithuania: ['Vilnius', 'Kaunas', 'Klaipeda', 'Šiauliai', 'Panevėžys'],
  Luxembourg: [
    'Luxembourg City',
    'Esch-sur-Alzette',
    'Differdange',
    'Dudelange',
    'Echternach',
  ],
  Madagascar: [
    'Antananarivo',
    'Toamasina',
    'Antsiranana',
    'Fianarantsoa',
    'Mahajanga',
  ],
  Malawi: ['Lilongwe', 'Blantyre', 'Mzuzu', 'Zomba', 'Karonga'],
  Malaysia: [
    'Kuala Lumpur',
    'George Town',
    'Johor Bahru',
    'Malacca City',
    'Shah Alam',
  ],
  Maldives: ['Malé', 'Addu City', 'Fuvahmulah', 'Hithadhoo', 'Kulhudhuffushi'],
  Mali: ['Bamako', 'Sikasso', 'Koulikoro', 'Kayes', 'Mopti'],
  Malta: ['Valletta', 'Birkirkara', 'Sliema', 'Mosta', 'Qormi'],
  'Marshall Islands': [
    'Majuro',
    'Ebeye',
    'Laura',
    'Delap-Uliga-Djarrit',
    'Wotje',
  ],
  Mauritania: ['Nouakchott', 'Nouadhibou', 'Kaédi', 'Rosso', 'Kiffa'],
  Mauritius: [
    'Port Louis',
    'Beau Bassin',
    'Vacoas',
    'Quatre Bornes',
    'Curepipe',
  ],
  Mexico: ['Mexico City', 'Guadalajara', 'Monterrey', 'Puebla', 'Tijuana'],
  Micronesia: ['Palikir', 'Weno', 'Kolonia', 'Saipan', 'Yap'],
  Moldova: ['Chișinău', 'Bălți', 'Bender', 'Rîbnița', 'Tighina'],
  Monaco: ['Monaco', 'Monte Carlo', 'La Condamine', 'Menton', 'Beausoleil'],
  Mongolia: ['Ulaanbaatar', 'Erdenet', 'Darkhan', 'Choibalsan', 'Baganuur'],
  Montenegro: ['Podgorica', 'Nikšić', 'Herceg Novi', 'Bijelo Polje', 'Tivat'],
  Morocco: ['Rabat', 'Casablanca', 'Marrakech', 'Fes', 'Tangier'],
  Mozambique: ['Maputo', 'Beira', 'Nampula', 'Matola', 'Tete'],
  'Myanmar (formerly Burma)': [
    'Naypyidaw',
    'Yangon',
    'Mandalay',
    'Moulmein',
    'Bago',
  ],
  Namibia: ['Windhoek', 'Swakopmund', 'Walvis Bay', 'Oshakati', 'Rundu'],
  Nauru: ['Yaren', 'Denigomodu', 'Nauru', 'Aiwo', 'Boe'],
  Nepal: ['Kathmandu', 'Pokhara', 'Lalitpur', 'Bhaktapur', 'Biratnagar'],
  Netherlands: ['Amsterdam', 'Rotterdam', 'The Hague', 'Utrecht', 'Eindhoven'],
  'New Zealand': [
    'Wellington',
    'Auckland',
    'Christchurch',
    'Hamilton',
    'Tauranga',
  ],
  Nicaragua: ['Managua', 'León', 'Granada', 'Masaya', 'Chinandega'],
  Niger: ['Niamey', 'Zinder', 'Maradi', 'Agadez', 'Diffa'],
  Nigeria: ['Abuja', 'Lagos', 'Port Harcourt', 'Ibadan', 'Kaduna'],
  'North Korea': ['Pyongyang', 'Hamhung', 'Chŏngjin', 'Nampo', 'Wonsan'],
  'North Macedonia': ['Skopje', 'Bitola', 'Ohrid', 'Kumanovo', 'Veles'],
  Norway: ['Oslo', 'Bergen', 'Stavanger', 'Drammen', 'Fredrikstad'],
  Oman: ['Muscat', 'Salalah', 'Sohar', 'Bawshar', 'Ibri'],
  Pakistan: ['Islamabad', 'Karachi', 'Lahore', 'Faisalabad', 'Rawalpindi'],
  Palau: ['Ngerulmud', 'Melekeok', 'Koror', 'Airai', 'Ngaraard'],
  'Palestine State': [
    'East Jerusalem',
    'Ramallah',
    'Nablus',
    'Gaza City',
    'Hebron',
  ],
  Panama: ['Panama City', 'David', 'Colón', 'Chitré', 'Santiago'],
  'Papua New Guinea': [
    'Port Moresby',
    'Lae',
    'Mount Hagen',
    'Madang',
    'Kokopo',
  ],
  Paraguay: [
    'Asunción',
    'Ciudad del Este',
    'Encarnación',
    'Luque',
    'Fernando de la Mora',
  ],
  Peru: ['Lima', 'Arequipa', 'Trujillo', 'Cusco', 'Piura'],
  Philippines: [
    'Manila',
    'Quezon City',
    'Cebu City',
    'Davao City',
    'Zamboanga City',
  ],
  Poland: ['Warsaw', 'Kraków', 'Łódź', 'Wrocław', 'Gdańsk'],
  Portugal: ['Lisbon', 'Porto', 'Amadora', 'Braga', 'Coimbra'],
  Qatar: ['Doha', 'Al Rayyan', 'Al Wakrah', 'Umm Salal', 'Al Khor'],
  Romania: ['Bucharest', 'Cluj-Napoca', 'Timișoara', 'Iași', 'Constanța'],
  Russia: [
    'Moscow',
    'Saint Petersburg',
    'Novosibirsk',
    'Yekaterinburg',
    'Nizhny Novgorod',
  ],
  Rwanda: ['Kigali', 'Butare', 'Gisenyi', 'Musanze', 'Rubavu'],
  'Saint Kitts and Nevis': [
    'Basseterre',
    'Charlestown',
    'Dieppe Bay Town',
    'Sandy Point Town',
    'Newton Ground',
  ],
  'Saint Lucia': [
    'Castries',
    'Gros Islet',
    'Vieux Fort',
    'Soufrière',
    'Dennery',
  ],
  'Saint Vincent and the Grenadines': [
    'Kingstown',
    'Glen',
    'Bequia',
    'Canouan',
    'Union Island',
  ],
  Samoa: ['Apia', 'Aiga-i-le-Tai', 'Vaitele', "Savai'i", 'Tafuna'],
  'San Marino': [
    'San Marino',
    'Serravalle',
    'Domagnano',
    'Borgo Maggiore',
    'City of San Marino',
  ],
  'Sao Tome and Principe': [
    'São Tomé',
    'Principe',
    'Neves',
    'Santana',
    'Trindade',
  ],
  'Saudi Arabia': ['Riyadh', 'Jeddah', 'Mecca', 'Dammam', 'Khobar'],
  Senegal: ['Dakar', 'Touba', 'Pikine', 'Kaolack', 'Ziguinchor'],
  Serbia: ['Belgrade', 'Novi Sad', 'Niš', 'Kragujevac', 'Subotica'],
  Seychelles: [
    'Victoria',
    'Bel Ombre',
    'Anse Boileau',
    'Beau Vallon',
    'Anse Royale',
  ],
  'Sierra Leone': ['Freetown', 'Bo', 'Kenema', 'Makeni', 'Koidu'],
  Singapore: ['Singapore', 'Bedok', 'Tampines', 'Yishun', 'Woodlands'],
  Slovakia: ['Bratislava', 'Košice', 'Prešov', 'Nitra', 'Trnava'],
  Slovenia: ['Ljubljana', 'Maribor', 'Celje', 'Kranj', 'Velenje'],
  'Solomon Islands': ['Honiara', 'Gizo', 'Auki', 'Noro', 'Lata'],
  Somalia: ['Mogadishu', 'Hargeisa', 'Bosaso', 'Kismayo', 'Baidoa'],
  'South Africa': [
    'Pretoria',
    'Cape Town',
    'Johannesburg',
    'Durban',
    'Port Elizabeth',
  ],
  'South Korea': ['Seoul', 'Busan', 'Incheon', 'Daegu', 'Daejeon'],
  'South Sudan': ['Juba', 'Wau', 'Malakal', 'Aweil', 'Bor'],
  Spain: ['Madrid', 'Barcelona', 'Valencia', 'Sevilla', 'Bilbao'],
  'Sri Lanka': [
    'Sri Jayawardenepura Kotte',
    'Colombo',
    'Kandy',
    'Galle',
    'Jaffna',
  ],
  Sudan: ['Khartoum', 'Omdurman', 'Nyala', 'Port Sudan', 'El Obeid'],
  Suriname: ['Paramaribo', 'Wanica', 'Nickerie', 'Saramacca', 'Commewijne'],
  Sweden: ['Stockholm', 'Gothenburg', 'Malmö', 'Uppsala', 'Västerås'],
  Switzerland: ['Bern', 'Zurich', 'Geneva', 'Basel', 'Lausanne'],
  Syria: ['Damascus', 'Aleppo', 'Homs', 'Latakia', 'Deir ez-Zor'],
  Tajikistan: ['Dushanbe', 'Khujand', 'Kurgan-Tyube', 'Isfara', 'Vahdat'],
  Tanzania: ['Dodoma', 'Dar es Salaam', 'Arusha', 'Mwanza', 'Mbeya'],
  Thailand: [
    'Bangkok',
    'Chiang Mai',
    'Pattaya',
    'Nakhon Ratchasima',
    'Khon Kaen',
  ],
  'Timor-Leste': ['Dili', 'Baucau', 'Maliana', 'Lospalos', 'Oecusse'],
  Togo: ['Lomé', 'Sokodé', 'Kpalimé', 'Atakpamé', 'Tsévié'],
  Tonga: ["Nuku'alofa", 'Neiafu', 'Lifuka', "Vava'u", "Ha'apai"],
  'Trinidad and Tobago': [
    'Port of Spain',
    'San Fernando',
    'Scarborough',
    'Chaguanas',
    'Arima',
  ],
  Tunisia: ['Tunis', 'Sfax', 'Sousse', 'Kairouan', 'Bizerte'],
  Turkey: ['Ankara', 'Istanbul', 'Izmir', 'Bursa', 'Antalya'],
  Turkmenistan: ['Ashgabat', 'Turkmenbashi', 'Mary', 'Balkanabat', 'Dashoguz'],
  Tuvalu: ['Funafuti', 'Savave', 'Nukufetau', 'Nanumea', 'Niulakita'],
  Uganda: ['Kampala', 'Entebbe', 'Mbarara', 'Gulu', 'Jinja'],
  Ukraine: ['Kyiv', 'Kharkiv', 'Odesa', 'Dnipro', 'Lviv'],
  'United Arab Emirates': [
    'Abu Dhabi',
    'Dubai',
    'Sharjah',
    'Ajman',
    'Ras Al Khaimah',
  ],
  'United Kingdom': [
    'London',
    'Birmingham',
    'Manchester',
    'Glasgow',
    'Liverpool',
  ],
  'United States of America': [
    'Washington, D.C.',
    'New York City',
    'Los Angeles',
    'Chicago',
    'Houston',
  ],
  Uruguay: ['Montevideo', 'Salto', 'Paysandú', 'Las Piedras', 'Rivera'],
  Uzbekistan: ['Tashkent', 'Samarkand', 'Bukhara', 'Namangan', 'Andijan'],
  Vanuatu: ['Port Vila', 'Luganville', 'Espiritu Santo', 'Tanna', 'Aneityum'],
  'Vatican City': [
    'Vatican City',
    "St. Peter's Basilica",
    'Apostolic Palace',
    'Vatican Gardens',
    'Castel Gandolfo',
  ],
  Venezuela: [
    'Caracas',
    'Maracaibo',
    'Valencia',
    'Barquisimeto',
    'Ciudad Guayana',
  ],
  Vietnam: ['Hanoi', 'Ho Chi Minh City', 'Da Nang', 'Hai Phong', 'Can Tho'],
  Yemen: ["Sana'a", 'Aden', 'Taiz', 'Hodeidah', 'Ibb'],
  Zambia: ['Lusaka', 'Ndola', 'Kitwe', 'Livingstone', 'Chingola'],
  Zimbabwe: ['Harare', 'Bulawayo', 'Gweru', 'Mutare', 'Kwekwe'],
};

export const countryCodeToCountry = {
  AC: 'Ascension Island',
  AD: 'Andorra',
  AE: 'United Arab Emirates',
  AF: 'Afghanistan',
  AG: 'Antigua and Barbuda',
  AI: 'Anguilla',
  AL: 'Albania',
  AM: 'Armenia',
  AO: 'Angola',
  AQ: 'Antarctica',
  AR: 'Argentina',
  AS: 'American Samoa',
  AT: 'Austria',
  AU: 'Australia',
  AW: 'Aruba',
  AX: 'Aland Islands',
  AZ: 'Azerbaijan',
  BA: 'Bosnia and Herzegovina',
  BB: 'Barbados',
  BD: 'Bangladesh',
  BE: 'Belgium',
  BF: 'Burkina Faso',
  BG: 'Bulgaria',
  BH: 'Bahrain',
  BI: 'Burundi',
  BJ: 'Benin',
  BL: 'Saint Barthélemy',
  BM: 'Bermuda',
  BN: 'Brunei',
  BO: 'Bolivia',
  BQ: 'Caribbean Netherlands',
  BR: 'Brazil',
  BS: 'Bahamas',
  BT: 'Bhutan',
  BV: 'Bouvet Island',
  BW: 'Botswana',
  BY: 'Belarus',
  BZ: 'Belize',
  CA: 'Canada',
  CC: 'Cocos (Keeling) Islands',
  CD: 'Democratic Republic of the Congo',
  CF: 'Central African Republic',
  CG: 'Congo (Congo-Brazzaville)',
  CH: 'Switzerland',
  CI: 'Ivory Coast',
  CK: 'Cook Islands',
  CL: 'Chile',
  CM: 'Cameroon',
  CN: 'China',
  CO: 'Colombia',
  CR: 'Costa Rica',
  CU: 'Cuba',
  CV: 'Cabo Verde',
  CW: 'Curaçao',
  CX: 'Christmas Island',
  CY: 'Cyprus',
  CZ: 'Czech Republic',
  DE: 'Germany',
  DJ: 'Djibouti',
  DK: 'Denmark',
  DM: 'Dominica',
  DO: 'Dominican Republic',
  DZ: 'Algeria',
  EC: 'Ecuador',
  EE: 'Estonia',
  EG: 'Egypt',
  EH: 'Western Sahara',
  ER: 'Eritrea',
  ES: 'Spain',
  ET: 'Ethiopia',
  EU: 'European Union',
  FI: 'Finland',
  FJ: 'Fiji',
  FK: 'Falkland Islands',
  FM: 'Micronesia',
  FO: 'Faroe Islands',
  FR: 'France',
  GA: 'Gabon',
  GB: 'United Kingdom',
  GD: 'Grenada',
  GE: 'Georgia',
  GF: 'French Guiana',
  GG: 'Guernsey',
  GH: 'Ghana',
  GI: 'Gibraltar',
  GL: 'Greenland',
  GM: 'Gambia',
  GN: 'Guinea',
  GP: 'Guadeloupe',
  GQ: 'Equatorial Guinea',
  GR: 'Greece',
  GS: 'South Georgia and the South Sandwich Islands',
  GT: 'Guatemala',
  GU: 'Guam',
  GW: 'Guinea-Bissau',
  GY: 'Guyana',
  HK: 'Hong Kong',
  HM: 'Heard Island and McDonald Islands',
  HN: 'Honduras',
  HR: 'Croatia',
  HT: 'Haiti',
  HU: 'Hungary',
  IC: 'Canary Islands',
  ID: 'Indonesia',
  IE: 'Ireland',
  IL: 'Israel',
  IM: 'Isle of Man',
  IN: 'India',
  IO: 'British Indian Ocean Territory',
  IQ: 'Iraq',
  IR: 'Iran',
  IS: 'Iceland',
  IT: 'Italy',
  JE: 'Jersey',
  JM: 'Jamaica',
  JO: 'Jordan',
  JP: 'Japan',
  KE: 'Kenya',
  KG: 'Kyrgyzstan',
  KH: 'Cambodia',
  KI: 'Kiribati',
  KM: 'Comoros',
  KN: 'Saint Kitts and Nevis',
  KP: 'North Korea',
  KR: 'South Korea',
  KW: 'Kuwait',
  KY: 'Cayman Islands',
  KZ: 'Kazakhstan',
  LA: 'Laos',
  LB: 'Lebanon',
  LC: 'Saint Lucia',
  LI: 'Liechtenstein',
  LK: 'Sri Lanka',
  LR: 'Liberia',
  LS: 'Lesotho',
  LT: 'Lithuania',
  LU: 'Luxembourg',
  LV: 'Latvia',
  LY: 'Libya',
  MA: 'Morocco',
  MC: 'Monaco',
  MD: 'Moldova',
  ME: 'Montenegro',
  MF: 'Saint Martin',
  MG: 'Madagascar',
  MH: 'Marshall Islands',
  MK: 'North Macedonia',
  ML: 'Mali',
  MM: 'Myanmar',
  MN: 'Mongolia',
  MO: 'Macau',
  MP: 'Northern Mariana Islands',
  MQ: 'Martinique',
  MR: 'Mauritania',
  MS: 'Montserrat',
  MT: 'Malta',
  MU: 'Mauritius',
  MV: 'Maldives',
  MW: 'Malawi',
  MX: 'Mexico',
  MY: 'Malaysia',
  MZ: 'Mozambique',
  NA: 'Namibia',
  NC: 'New Caledonia',
  NE: 'Niger',
  NF: 'Norfolk Island',
  NG: 'Nigeria',
  NI: 'Nicaragua',
  NL: 'Netherlands',
  NO: 'Norway',
  NP: 'Nepal',
  NR: 'Nauru',
  NU: 'Niue',
  NZ: 'New Zealand',
  OM: 'Oman',
  PA: 'Panama',
  PE: 'Peru',
  PF: 'French Polynesia',
  PG: 'Papua New Guinea',
  PH: 'Philippines',
  PK: 'Pakistan',
  PL: 'Poland',
  PM: 'Saint Pierre and Miquelon',
  PN: 'Pitcairn Islands',
  PR: 'Puerto Rico',
  PS: 'Palestine',
  PT: 'Portugal',
  PW: 'Palau',
  PY: 'Paraguay',
  QA: 'Qatar',
  RE: 'Réunion',
  RO: 'Romania',
  RS: 'Serbia',
  RU: 'Russia',
  RW: 'Rwanda',
  SA: 'Saudi Arabia',
  SB: 'Solomon Islands',
  SC: 'Seychelles',
  SD: 'Sudan',
  SE: 'Sweden',
  SG: 'Singapore',
  SH: 'Saint Helena',
  SI: 'Slovenia',
  SJ: 'Svalbard and Jan Mayen',
  SK: 'Slovakia',
  SL: 'Sierra Leone',
  SM: 'San Marino',
  SN: 'Senegal',
  SO: 'Somalia',
  SR: 'Suriname',
  SS: 'South Sudan',
  ST: 'Sao Tome and Principe',
  SV: 'El Salvador',
  SX: 'Sint Maarten',
  SY: 'Syria',
  SZ: 'Eswatini',
  TA: 'Tristan da Cunha',
  TC: 'Turks and Caicos Islands',
  TD: 'Chad',
  TF: 'French Southern Territories',
  TG: 'Togo',
  TH: 'Thailand',
  TJ: 'Tajikistan',
  TK: 'Tokelau',
  TL: 'Timor-Leste',
  TM: 'Turkmenistan',
  TN: 'Tunisia',
  TO: 'Tonga',
  TR: 'Turkey',
  TT: 'Trinidad and Tobago',
  TV: 'Tuvalu',
  TW: 'Taiwan',
  TZ: 'Tanzania',
  UA: 'Ukraine',
  UG: 'Uganda',
  UM: 'United States Minor Outlying Islands',
  US: 'United States',
  UY: 'Uruguay',
  UZ: 'Uzbekistan',
  VA: 'Vatican City',
  VC: 'Saint Vincent and the Grenadines',
  VE: 'Venezuela',
  VG: 'Virgin Islands (British)',
  VI: 'Virgin Islands (US)',
  VN: 'Vietnam',
  VU: 'Vanuatu',
  WF: 'Wallis and Futuna',
  WS: 'Samoa',
  XK: 'Kosovo',
  YE: 'Yemen',
  YT: 'Mayotte',
  ZA: 'South Africa',
  ZM: 'Zambia',
  ZW: 'Zimbabwe',
};

export const countryToCountryCode = Object.fromEntries(
  Object.entries(countryCodeToCountry).map(([code, country]) => [country, code])
);
