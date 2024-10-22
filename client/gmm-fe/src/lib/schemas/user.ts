import { z } from 'zod';
import { preferenceSchema } from './preference';
import { getEighteenYearsAgo } from '../format';

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

export const userBasicInformationSchema = z
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
      .min(1, { message: 'Please enter your phone number' }),

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
      z.array(z.string()).min(1, { message: 'Required' }).max(3),
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
    idCardImage: z
      .string({
        required_error: 'Please upload your ID',
      })
      .min(1, { message: 'Please upload your ID' }),
    nationality: z
      .string({
        required_error: 'Please enter your nationality',
      })
      .min(1, { message: 'Please enter your nationality' }),
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

    tattoos: z.union([
      z.boolean({
        required_error: 'Please specify if you have tattoos',
      }),
      z
        .string({
          required_error: 'Please specify if you have tattoos (true/false)',
        })
        .transform((value) => value === 'true'),
    ]),

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
    phoneNumber: z.string({
      required_error: 'Please enter your phone number',
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
      z.array(z.string()).min(1, { message: 'Required' }).max(3),
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

    tattoos: z.union([
      z.boolean({
        required_error: 'Please specify if you have tattoos',
      }),
      z
        .string({
          required_error: 'Please specify if you have tattoos (true/false)',
        })
        .transform((value) => value === 'true'),
    ]),

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
});

export const userRegistrationSchema = userBasicInformationSchema.extend({
  guardianFirstName: z
    .string({
      required_error: "Please enter guardian's first name",
    })
    .min(1, { message: "Please enter guardian's first name" }),
  guardianLastName: z
    .string({
      required_error: "Please enter guardian's last name",
    })
    .min(1, { message: "Please enter guardian's last name" }),
  relationshipToGuardian: z
    .string({
      required_error: 'Please enter your relationship',
    })
    .min(1, {
      message: 'Please enter your relationship',
    }),
  guardianPhoneNumber: z
    .string({
      required_error: 'Please enter guardian phone number',
    })
    .min(1, { message: 'Please enter guardian phone number' }),

  guardianEmail: z
    .string({ required_error: "Please enter guardian's email" })
    .email({ message: 'Please enter a valid email' }),
});

export type UserRegistration = z.infer<typeof userRegistrationSchema>;
export type User = z.infer<typeof userSchema>;
export type UserBasicInformation = z.infer<typeof userBasicInformationSchema>;

export const heights: Record<string, string> = {
  '140': "4'7'' (140 cm)",
  '142': "4'8'' (142 cm)",
  '145': "4'9'' (145 cm)",
  '147': "4'10'' (147 cm)",
  '150': "4'11'' (150 cm)",
  '152': "5'0'' (152 cm)",
  '155': "5'1'' (155 cm)",
  '157': "5'2'' (157 cm)",
  '160': "5'3'' (160 cm)",
  '162': "5'4'' (162 cm)",
  '165': "5'5'' (165 cm)",
  '168': "5'6'' (168 cm)",
  '170': "5'7'' (170 cm)",
  '173': "5'8'' (173 cm)",
  '175': "5'9'' (175 cm)",
  '178': "5'10'' (178 cm)",
  '180': "5'11'' (180 cm)",
  '183': "6'0'' (183 cm)",
  '185': "6'1'' (185 cm)",
  '188': "6'2'' (188 cm)",
  '191': "6'3'' (191 cm)",
  '193': "6'4'' (193 cm)",
  '196': "6'5'' (196 cm)",
  '198': "6'6'' (198 cm)",
  '201': "6'7'' (201 cm)",
  '203': "6'8'' (203 cm)",
  '206': "6'9'' (206 cm)",
  '208': "6'10'' (208 cm)",
  '211': "6'11'' (211 cm)",
  '213': "7'0'' (213 cm)",
  '216': "7'1'' (216 cm)",
  '218': "7'2'' (218 cm)",
};

export const weights: Record<string, string> = {
  '40': '88 lbs (40 kg)',
  '41': '90 lbs (41 kg)',
  '43': '95 lbs (43 kg)',
  '45': '100 lbs (45 kg)',
  '48': '105 lbs (48 kg)',
  '50': '110 lbs (50 kg)',
  '52': '115 lbs (52 kg)',
  '54': '120 lbs (54 kg)',
  '57': '125 lbs (57 kg)',
  '59': '130 lbs (59 kg)',
  '61': '135 lbs (61 kg)',
  '64': '140 lbs (64 kg)',
  '66': '145 lbs (66 kg)',
  '68': '150 lbs (68 kg)',
  '70': '155 lbs (70 kg)',
  '73': '160 lbs (73 kg)',
  '75': '165 lbs (75 kg)',
  '77': '170 lbs (77 kg)',
  '79': '175 lbs (79 kg)',
  '82': '180 lbs (82 kg)',
  '84': '185 lbs (84 kg)',
  '86': '190 lbs (86 kg)',
  '88': '195 lbs (88 kg)',
  '91': '200 lbs (91 kg)',
  '93': '205 lbs (93 kg)',
  '95': '210 lbs (95 kg)',
  '98': '215 lbs (98 kg)',
  '100': '220 lbs (100 kg)',
  '102': '225 lbs (102 kg)',
  '104': '230 lbs (104 kg)',
  '107': '235 lbs (107 kg)',
  '109': '240 lbs (109 kg)',
  '111': '245 lbs (111 kg)',
  '113': '250 lbs (113 kg)',
  '116': '255 lbs (116 kg)',
  '118': '260 lbs (118 kg)',
  '120': '265 lbs (120 kg)',
  '123': '270 lbs (123 kg)',
  '125': '275 lbs (125 kg)',
  '127': '280 lbs (127 kg)',
  '129': '285 lbs (129 kg)',
  '132': '290 lbs (132 kg)',
  '134': '295 lbs (134 kg)',
  '136': '300 lbs (136 kg)',
  '138': '305 lbs (138 kg)',
  '141': '310 lbs (141 kg)',
  '143': '315 lbs (143 kg)',
  '145': '320 lbs (145 kg)',
  '148': '325 lbs (148 kg)',
  '150': '330 lbs (150 kg)',
  '152': '335 lbs (152 kg)',
  '154': '340 lbs (154 kg)',
  '157': '345 lbs (157 kg)',
  '159': '350 lbs (159 kg)',
  '161': '355 lbs (161 kg)',
  '163': '360 lbs (163 kg)',
  '166': '365 lbs (166 kg)',
  '168': '370 lbs (168 kg)',
  '170': '375 lbs (170 kg)',
  '173': '380 lbs (173 kg)',
  '175': '385 lbs (175 kg)',
  '177': '390 lbs (177 kg)',
  '179': '395 lbs (179 kg)',
  '182': '400 lbs (182 kg)',
  '184': '405 lbs (184 kg)',
  '186': '410 lbs (186 kg)',
  '188': '415 lbs (188 kg)',
  '191': '420 lbs (191 kg)',
  '193': '425 lbs (193 kg)',
  '195': '430 lbs (195 kg)',
  '197': '435 lbs (197 kg)',
  '200': '440 lbs (200 kg)',
  '202': '445 lbs (202 kg)',
  '204': '450 lbs (204 kg)',
  '206': '455 lbs (206 kg)',
  '209': '460 lbs (209 kg)',
  '211': '465 lbs (211 kg)',
  '213': '470 lbs (213 kg)',
  '216': '475 lbs (216 kg)',
  '218': '480 lbs (218 kg)',
  '220': '485 lbs (220 kg)',
};

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
