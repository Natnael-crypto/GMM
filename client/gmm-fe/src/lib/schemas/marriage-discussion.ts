import { z } from 'zod';

export const marriageDiscussionSchema = z
  .object({
    marriageType: z.string({ required_error: 'Please select your preference' }),
    marriageLocation: z.string({
      required_error: 'Please select your preference',
    }),
    marriageVenue: z.string({
      required_error: 'Please select your preference',
    }),
    marriageTimeline: z.string({
      required_error: 'Please select your preference',
    }),
    familyInMarriageDiscussion: z.string({
      required_error: 'Please select your preference',
    }),
    dowry: z.string({
      required_error: 'Please select your preference',
    }),
    weddingBudget: z.string({
      required_error: 'Please select your preference',
    }),
  })
  .required();

export type MarriageDiscussion = z.infer<typeof marriageDiscussionSchema>;
