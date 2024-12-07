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
      evaluate: (pref: Preference, user: User) => {
        if (pref.notNationality) {
          return !pref.nationality.includes(user.nationality);
        } else {
          return pref.nationality.includes(user.nationality);
        }
      },
    },
    {
      field: 'language',
      weight: 1,
      evaluate: (pref: Preference, user: User) => {
        if (!user.languages) return false;

        const hasMatchingLanguage = user.languages.some((language) =>
          pref.language.includes(language),
        );

        return pref.notLanguage ? !hasMatchingLanguage : hasMatchingLanguage;
      },
    },
    {
      field: 'country',
      weight: 1,
      evaluate: (pref: Preference, user: User) => {
        if (!user.currentCountry) return false;

        return pref.notCountry
          ? !pref.country.includes(user.currentCountry)
          : pref.country.includes(user.currentCountry);
      },
    },
    {
      field: 'city',
      weight: 1,
      evaluate: (pref: Preference, user: User) => {
        if (!user.city) return false;

        return pref.notCity
          ? !pref.city.includes(user.city)
          : pref.city.includes(user.city);
      },
    },
    {
      field: 'countryOfOrigin',
      weight: 1,
      evaluate: (pref: Preference, user: User) => {
        if (!user.country)
          return pref.notCountryOfOrigin
            ? !pref.countryOfOrigin.includes(user.country)
            : pref.countryOfOrigin.includes(user.country);
      },
    },
    {
      field: 'martialStatus',
      weight: 1,
      evaluate: (pref: Preference, user: User) => {
        if (!user.maritalStatus) return false;

        return pref.notMartialStatus
          ? !pref.martialStatus.includes(user.maritalStatus)
          : pref.martialStatus.includes(user.maritalStatus);
      },
    },
    {
      field: 'religiousPractice',
      weight: 1,
      evaluate: (pref: Preference, user: User) => {
        if (!user.religiousPractice) return false;

        return pref.notReligiousPractice
          ? !pref.religiousPractice.includes(user.religiousPractice)
          : pref.religiousPractice.includes(user.religiousPractice);
      },
    },
    {
      field: 'bornOrRevert',
      weight: 1,
      evaluate: (pref: Preference, user: User) => {
        if (!user.bornOrRevertToIslam) return false;

        return pref.notBornOrRevert
          ? !pref.bornOrRevert.includes(user.bornOrRevertToIslam)
          : pref.bornOrRevert.includes(user.bornOrRevertToIslam);
      },
    },
    {
      field: 'hijab',
      weight: 1,
      evaluate: (pref: Preference, user: User) => {
        if (!user.hijab) return false;

        return pref.notHijab
          ? !pref.hijab.includes(user.hijab)
          : pref.hijab.includes(user.hijab);
      },
    },
    {
      field: 'children',
      weight: 1,
      evaluate: (pref: Preference, user: User) => {
        if (!user.hasChildren) return false;

        return pref.notChildren
          ? !pref.children.includes(user.hasChildren)
          : pref.children.includes(user.hasChildren);
      },
    },
    {
      field: 'wantsChildren',
      weight: 1,
      evaluate: (pref: Preference, user: User) => {
        if (!user.wantsChildren) return false;

        return pref.notWantsChildren
          ? !pref.wantsChildren.includes(user.wantsChildren)
          : pref.wantsChildren.includes(user.wantsChildren);
      },
    },
    {
      field: 'education',
      weight: 1,
      evaluate: (pref: Preference, user: User) => {
        if (!user.education) return false;

        return pref.notEducation
          ? !pref.education.includes(user.education)
          : pref.education.includes(user.education);
      },
    },
    {
      field: 'profession',
      weight: 1,
      evaluate: (pref: Preference, user: User) =>
        user.profession && pref.profession.includes(user.profession),
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
      field: 'drugs',
      weight: 1,
      evaluate: (pref: Preference, user: User) => pref.drugs === user.drugs,
    },
    {
      field: 'tattoos',
      weight: 1,
      evaluate: (pref: Preference, user: User) => {
        if (!user.tattoos) {
          return false;
        }

        return pref.notTattoos
          ? !pref.tattoos.includes(user.tattoos)
          : pref.tattoos.includes(user.tattoos);
      },
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
