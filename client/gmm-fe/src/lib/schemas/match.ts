import { z } from 'zod';

export enum MatchStage {
  BASIC_INFORMATION = 'Basic Information',
  WORLDLY_LIFESTYLE = 'Worldly Lifestyle',
  ISLAMIC_LIFESTYLE = 'Islamic Lifestyle',
  MARRIAGE_DISCUSSION = 'Marriage Discussion',
  FAMILY_INTRODUCTION = 'Family Introduction',
}

export const allMatchStages = [
  MatchStage.BASIC_INFORMATION,
  MatchStage.WORLDLY_LIFESTYLE,
  MatchStage.ISLAMIC_LIFESTYLE,
  MatchStage.MARRIAGE_DISCUSSION,
  MatchStage.FAMILY_INTRODUCTION,
];

export function hasAccessToStage(currentStage: MatchStage, stage: MatchStage) {
  return allMatchStages.indexOf(stage) <= allMatchStages.indexOf(currentStage);
}

export const userInMatchPool = z.object({
  userId: z.string(),
  country: z.string(),
  age: z.number(),
  gender: z.string(),
  height: z.number(),
  weight: z.number(),
  languages: z.array(z.string()),
  nationality: z.string(),
  maritalStatus: z.string(),
  bornOrRevertToIslam: z.string().nullable(),
  drinks: z.boolean(),
  drugs: z.boolean(),
  smokes: z.boolean(),
  tattoos: z.boolean(),
  salat: z.string().nullable(),
  hijab: z.string().nullable(),
  children: z.string().nullable(),
  profession: z.string().nullable(),
  wantsChildren: z.string().nullable(),
});

export type UserInMatchPool = z.infer<typeof userInMatchPool>;

export const matchStageInvitationSchema = z.object({
  id: z.string(),
  inviterId: z.string(),
  matchId: z.string(),
  status: z.string(),
  acceptedOrRejectedAt: z.coerce.date(),
});

export type MatchStageInvitation = z.infer<typeof matchStageInvitationSchema>;
