import { Preference } from '@modules/matchmaking/entities/preference.entity';
import { FemaleIslamicLifestyle } from '@modules/user/entities';
import { User } from '@modules/user/entities/user.entity';

export type ExtendedUser = User & {
  salat: string;
  hijab: string;
  children: string;
  wantsChildren: string;
  education: string;
  profession: string;
};

export interface Score {
  userLikesCandidate: number;
  candidateLikesUser: number;
}

export interface MatchmakerResult {
  user: User;
  score: Score;
}

export class Matchmaker {
  private readonly preferenceFields = [
    {
      field: 'minAge',
      weight: 1,
      evaluate: (pref: Preference, user: User) =>
        user.age && user.age >= pref.minAge,
    },
    {
      field: 'maxAge',
      weight: 1,
      evaluate: (pref: Preference, user: User) =>
        user.age && user.age <= pref.maxAge,
    },
    {
      field: 'minHeight',
      weight: 1,
      evaluate: (pref: Preference, user: User) => user.height >= pref.minHeight,
    },
    {
      field: 'maxHeight',
      weight: 1,
      evaluate: (pref: Preference, user: User) => user.height <= pref.maxHeight,
    },
    {
      field: 'minWeight',
      weight: 1,
      evaluate: (pref: Preference, user: User) => user.weight >= pref.minWeight,
    },
    {
      field: 'maxWeight',
      weight: 1,
      evaluate: (pref: Preference, user: User) => user.weight <= pref.maxWeight,
    },
    {
      field: 'nationality',
      weight: 1,
      evaluate: (pref: Preference, user: User) =>
        pref.nationality.includes(user.nationality),
    },
    {
      field: 'language',
      weight: 1,
      evaluate: (pref: Preference, user: User) =>
        user.languages &&
        user.languages.some((language) => pref.language.includes(language)),
    },
    {
      field: 'country',
      weight: 1,
      evaluate: (pref: Preference, user: User) =>
        user.country && pref.country.includes(user.country),
    },
    {
      field: 'martialStatus',
      weight: 1,
      evaluate: (pref: Preference, user: User) =>
        user.maritalStatus && pref.martialStatus.includes(user.maritalStatus),
    },
    {
      field: 'salat',
      weight: 1,
      evaluate: (pref: Preference, user: User) =>
        user.islamicLifestyle &&
        user.islamicLifestyle.salat &&
        pref.salat.includes(user.islamicLifestyle.salat),
    },
    {
      field: 'bornOrRevert',
      weight: 1,
      evaluate: (pref: Preference, user: User) =>
        user.bornOrRevertToIslam &&
        pref.bornOrRevert.includes(user.bornOrRevertToIslam),
    },
    {
      field: 'hijab',
      weight: 1,
      evaluate: (pref: Preference, user: User) =>
        user.islamicLifestyle &&
        (user.islamicLifestyle as FemaleIslamicLifestyle).hijab &&
        pref.hijab.includes(
          (user.islamicLifestyle as FemaleIslamicLifestyle).hijab,
        ),
    },
    {
      field: 'children',
      weight: 1,
      evaluate: (pref: Preference, user: User) =>
        user.hasChildren && pref.children.includes(user.hasChildren),
    },
    {
      field: 'wantsChildren',
      weight: 1,
      evaluate: (pref: Preference, user: User) =>
        user.expectedWorldlyLifestyle &&
        user.expectedWorldlyLifestyle.havingChildren &&
        pref.wantsChildren.includes(
          user.expectedWorldlyLifestyle.havingChildren,
        ),
    },
    {
      field: 'education',
      weight: 1,
      evaluate: (pref: Preference, user: User) =>
        user.worldlyLifestyle &&
        user.worldlyLifestyle.educationQualification &&
        pref.education.includes(user.worldlyLifestyle.educationQualification),
    },
    {
      field: 'profession',
      weight: 1,
      evaluate: (pref: Preference, user: User) =>
        user.worldlyLifestyle &&
        user.worldlyLifestyle.currentOccupationTitle &&
        pref.profession.includes(user.worldlyLifestyle.currentOccupationTitle),
    },
    {
      field: 'drinking',
      weight: 1,
      evaluate: (pref: Preference, user: User) => pref.drinking === user.drinks,
    },
    {
      field: 'smoking',
      weight: 1,
      evaluate: (pref: Preference, user: User) => pref.smoking === user.smokes,
    },
    {
      field: 'tattoos',
      weight: 1,
      evaluate: (pref: Preference, user: User) => pref.tattoos === user.tattoos,
    },
  ];

  constructor(private readonly user: User) {}

  likes(user: User, candidate: User): number {
    const userPref = user.preference;

    if (!userPref) return 1;

    let total = 0;
    let diff = 0;
    const mismatches: any[] = [];
    for (const field of this.preferenceFields) {
      const userPrefValue = userPref[field.field];

      // user doesn't have a preference for this field
      if (userPrefValue === undefined || userPrefValue === null) {
        continue;
      }

      if (!field.evaluate(userPref, candidate)) {
        diff += field.weight;
        mismatches.push(field);
      }

      total += field.weight;
    }

    if (total === 0) return 1;

    return 1 - diff / total;
  }

  computeSimilarity(candidate: User): Score {
    const likes = this.likes(this.user, candidate);
    const likedBy = this.likes(candidate, this.user);

    return {
      userLikesCandidate: likes,
      candidateLikesUser: likedBy,
    };
  }

  score(candidates: User[]): MatchmakerResult[] {
    return candidates.map((candidate) => ({
      user: candidate,
      score: this.computeSimilarity(candidate),
    }));
  }
}
