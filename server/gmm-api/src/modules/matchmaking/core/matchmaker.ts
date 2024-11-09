import { Preference } from '@modules/matchmaking/entities/preference.entity';
import { User } from '@modules/user/entities/user.entity';

export type ExtendedUser = User & {
  salat: string;
  hijab: string;
  children: string;
  wantsChildren: string;
  education: string;
  profession: string;
};

export interface MatchmakerResult {
  user: ExtendedUser;
  score: number;
}

function age(dateOfBirth: Date): number {
  if (!dateOfBirth) {
    return 0;
  }

  const today = new Date();
  let age = today.getFullYear() - dateOfBirth.getFullYear();
  const monthDiff = today.getMonth() - dateOfBirth.getMonth();

  // Adjust age if the birthday hasn't occurred yet this year
  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < dateOfBirth.getDate())
  ) {
    age--;
  }

  return age;
}

export class Matchmaker {
  private readonly preferenceFields = [
    {
      field: 'minAge',
      weight: 1,
      evaluate: (pref: Preference, user: ExtendedUser) =>
        age(user.dateOfBirth) >= pref.minAge,
    },
    {
      field: 'maxAge',
      weight: 1,
      evaluate: (pref: Preference, user: ExtendedUser) =>
        age(user.dateOfBirth) <= pref.maxAge,
    },
    {
      field: 'minHeight',
      weight: 1,
      evaluate: (pref: Preference, user: ExtendedUser) =>
        user.height >= pref.minHeight,
    },
    {
      field: 'maxHeight',
      weight: 1,
      evaluate: (pref: Preference, user: ExtendedUser) =>
        user.height <= pref.maxHeight,
    },
    {
      field: 'minWeight',
      weight: 1,
      evaluate: (pref: Preference, user: ExtendedUser) =>
        user.weight >= pref.minWeight,
    },
    {
      field: 'maxWeight',
      weight: 1,
      evaluate: (pref: Preference, user: ExtendedUser) =>
        user.weight <= pref.maxWeight,
    },
    {
      field: 'nationality',
      weight: 1,
      evaluate: (pref: Preference, user: ExtendedUser) =>
        pref.nationality.includes(user.nationality),
    },
    {
      field: 'language',
      weight: 1,
      evaluate: (pref: Preference, user: ExtendedUser) =>
        user.languages.some((language) => pref.language.includes(language)),
    },
    {
      field: 'country',
      weight: 1,
      evaluate: (pref: Preference, user: ExtendedUser) =>
        pref.country.includes(user.country),
    },
    {
      field: 'martialStatus',
      weight: 1,
      evaluate: (pref: Preference, user: ExtendedUser) =>
        pref.martialStatus.includes(user.maritalStatus),
    },
    {
      field: 'salat',
      weight: 1,
      evaluate: (pref: Preference, user: ExtendedUser) =>
        pref.salat.includes(user.salat),
    },
    {
      field: 'bornOrRevert',
      weight: 1,
      evaluate: (pref: Preference, user: ExtendedUser) =>
        pref.bornOrRevert.includes(user.bornOrRevertToIslam),
    },
    {
      field: 'hijab',
      weight: 1,
      evaluate: (pref: Preference, user: ExtendedUser) =>
        pref.hijab.includes(user.hijab),
    },
    {
      field: 'children',
      weight: 1,
      evaluate: (pref: Preference, user: ExtendedUser) =>
        pref.children.includes(user.children),
    },
    {
      field: 'wantsChildren',
      weight: 1,
      evaluate: (pref: Preference, user: ExtendedUser) =>
        pref.wantsChildren.includes(user.wantsChildren),
    },
    {
      field: 'education',
      weight: 1,
      evaluate: (pref: Preference, user: ExtendedUser) =>
        pref.education.includes(user.education),
    },
    {
      field: 'profession',
      weight: 1,
      evaluate: (pref: Preference, user: ExtendedUser) =>
        pref.profession.includes(user.profession),
    },
    {
      field: 'drinking',
      weight: 1,
      evaluate: (pref: Preference, user: ExtendedUser) =>
        pref.drinking === user.drinks,
    },
    {
      field: 'smoking',
      weight: 1,
      evaluate: (pref: Preference, user: ExtendedUser) =>
        pref.smoking === user.smokes,
    },
    {
      field: 'tattoos',
      weight: 1,
      evaluate: (pref: Preference, user: ExtendedUser) =>
        pref.tattoos === user.tattoos,
    },
  ];

  constructor(private readonly user: ExtendedUser) {}

  likes(user: ExtendedUser, candidate: ExtendedUser): number {
    const userPref = user.preference;
    const candidatePref = candidate.preference;

    let total = 0;
    let diff = 0;

    for (const field of this.preferenceFields) {
      const userPrefValue = userPref[field.field];
      const candidateValue = candidate[field.field];

      // user doesn't hva a preference for this field
      if (userPrefValue === undefined || userPrefValue === null) {
        continue;
      }

      if (userPrefValue === undefined || userPrefValue === null) {
        diff += 1;
      } else if (!field.evaluate(userPref, candidate)) {
        diff += field.weight;
      }

      total += field.weight;
    }

    if (total === 0) return 1;

    return 1 - diff / total;
  }

  computeSimilarity(candidate: ExtendedUser): number {
    const user = this.user;
    const likes = this.likes(user, candidate);
    const likedBy = this.likes(candidate, user);
    console.log({
      likes,
      likedBy,
    });
    return (likes + likedBy) / 2;
  }

  score(candidates: ExtendedUser[]): MatchmakerResult[] {
    return candidates
      .map((candidate) => ({
        user: candidate,
        score: this.computeSimilarity(candidate),
      }))
      .sort((a, b) => b.score - a.score);
  }
}
