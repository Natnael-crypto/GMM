import { MatchStage, MatchStageInvitation } from '../schemas/match';
import { User } from '../schemas/user';

export enum StageInvitationStatus {
  PENDING = 'Pending',
  ACCEPTED = 'Accepted',
  REJECTED = 'Rejected',
  EXPIRED = 'Expired',
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
  /*  
  The tolerance of difference for matching. 
  
  The tolerance is a number between 0 and 1. 
  The smaller the threshold, the more similar the matches 
  will be.

  tolerance: 0 means exact match.
  */
  tolerance: number;
}

export interface MatchStatistics {
  potentialMatchCount: number;
  outsidePreferenceCount: number;
  poolSize: number;
}
