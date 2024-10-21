import { Preference } from '@modules/matchmaking/entities/preference.entity';
import { User } from '@modules/user/entities/user.entity';
import { Gender } from '@modules/user/enums/user.enum';

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

export class Matchmaker {
  private readonly preferenceFields = [
    'minAge',
    'maxAge',
    'minHeight',
    'maxHeight',
    'minWeight',
    'maxWeight',
    'ethnicOrigin',
    'nationality',
    'language',
    'country',
    'martialStatus',
    'salat',
    'bornOrRevert',
    'hijab',
    'children',
    'wantsChildren',
    'education',
    'profession',
    'drinking',
    'smoking',
    'tattoos',
  ];

  constructor(private readonly user: ExtendedUser) {}

  age(dateOfBirth: Date): number {
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

  countConflict(candidate: ExtendedUser, pref: Preference): number {
    let penalty = 0;

    if (pref.minAge && this.age(candidate.dateOfBirth) < pref.minAge) {
      penalty += 1;
    }

    if (pref.maxAge && this.age(candidate.dateOfBirth) > pref.maxAge) {
      penalty += 1;
    }

    if (pref.minHeight && candidate.height < pref.minHeight) {
      penalty += 1;
    }

    if (pref.maxHeight && candidate.height > pref.maxHeight) {
      penalty += 1;
    }

    if (pref.minWeight && candidate.weight < pref.minWeight) {
      penalty += 1;
    }

    if (pref.maxWeight && candidate.weight > pref.maxWeight) {
      penalty += 1;
    }

    if (pref.nationality && candidate.nationality !== pref.nationality) {
      penalty += 1;
    }

    if (pref.language && !candidate.languages.includes(pref.language)) {
      penalty += 1;
    }

    if (pref.country && candidate.country !== pref.country) {
      penalty += 1;
    }

    if (pref.martialStatus && candidate.maritalStatus !== pref.martialStatus) {
      penalty += 1;
    }

    if (pref.salat && candidate.salat !== pref.salat) {
      penalty += 1;
    }

    if (
      pref.bornOrRevert &&
      candidate.bornOrRevertToIslam !== pref.bornOrRevert
    ) {
      penalty += 1;
    }

    if (candidate.gender === Gender.FEMALE) {
      if (pref.hijab && candidate.hijab !== pref.hijab) {
        penalty += 1;
      }
    }

    if (pref.children && candidate.children !== pref.children) {
      penalty += 1;
    }

    if (pref.wantsChildren && candidate.wantsChildren !== pref.wantsChildren) {
      penalty += 1;
    }

    if (pref.education && candidate.education !== pref.education) {
      penalty += 1;
    }

    if (pref.profession && candidate.profession !== pref.profession) {
      penalty += 1;
    }

    if (
      pref.drinking !== undefined &&
      pref.drinking !== null &&
      candidate.drinks !== pref.drinking
    ) {
      penalty += 1;
    }

    if (
      pref.smoking !== undefined &&
      pref.smoking !== null &&
      candidate.smokes !== pref.smoking
    ) {
      penalty += 1;
    }

    if (
      pref.tattoos !== undefined &&
      pref.tattoos !== null &&
      candidate.tattoos !== pref.tattoos
    ) {
      penalty += 1;
    }

    return penalty;
  }

  computeSimilarity(candidate: ExtendedUser): number {
    let penalty = 0;
    let count = 0;

    for (const field of this.preferenceFields) {
      if (
        candidate.preference[field] !== null &&
        candidate.preference[field] !== undefined
      ) {
        count++;
      }

      if (
        this.user.preference[field] !== null &&
        this.user.preference[field] !== undefined
      ) {
        count++;
      }
    }

    if (count === 0) {
      return 1;
    }

    penalty += this.countConflict(candidate, this.user.preference);
    penalty += this.countConflict(this.user, candidate.preference);

    return 1 - penalty / count;
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
