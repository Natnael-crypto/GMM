import { MatchStageInvitation } from '../schemas/match';
import { User } from '../schemas/user';

export enum MatchStage {
  BASIC_INFORMATION = 'BASIC_INFORMATION',
  WORLDLY_LIFESTYLE = 'WORLDLY_LIFESTYLE',
  ISLAMIC_LIFESTYLE = 'ISLAMIC_LIFESTYLE',
  MARRIAGE_DISCUSSION = 'MARRIAGE_DISCUSSION',
  FAMILY_INTRODUCTION = 'FAMILY_INTRODUCTION',
}

export enum StageInvitationStatus {
  PENDING = 'PENDING',
  ACCEPTED = 'ACCEPTED',
  REJECTED = 'REJECTED',
}

export interface Match {
  id: string;
  maleUserId: string;
  femaleUserId: string;
  isActive: boolean;
  createdAt: Date;
  maleUser: User;
  femaleUser: User;
  invitations: MatchStageInvitation[];
  stage: MatchStage;
}

export interface MatchPreference {
  queryString: string;
  /*  
  The threshold for fuzzyMatching 
  
  The threshold is a number between 0 and 1. 
  The smaller the threshold, the more similar the matches 
  will be.

  fuzzyMatchThreshold: 0 means exact match.
  */
  fuzzyMatchThreshold: number;
}
