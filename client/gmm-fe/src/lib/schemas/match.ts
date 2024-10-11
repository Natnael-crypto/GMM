import { z } from 'zod';

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
