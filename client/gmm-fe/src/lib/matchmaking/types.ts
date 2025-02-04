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
  femaleImageAccessExpiration: Date;
  imageRequest: ImageAccessRequest;
  allowMatchedUserView: boolean;
  allowChatView: boolean;
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

export interface CreateMatchResponse {
  data: Match;
  message: string;
}

export enum ImageAccessRequestStatus {
  PENDING = 'Pending',
  ACCEPTED = 'Accepted',
  REJECTED = 'Rejected',
}

export interface ImageAccessRequest {
  id: string;
  userId: string;
  matchId: string;
  status: ImageAccessRequestStatus;
  updatedAt: Date;
}

export interface ImageAccessPayload {
  status: ImageAccessRequestStatus;
  imageAccessRequestId: string;
}

export interface ProfileAccessPayload {
  status: boolean;
  matchId: string;
}