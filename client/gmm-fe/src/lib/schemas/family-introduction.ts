import { z } from 'zod';

export const familyIntroductionSchema = z
  .object({
    guardianFirstName: z.string({
      required_error: 'Please enter your guardian first name',
    }),
    guardianLastName: z.string({
      required_error: 'Please enter your guardian last name',
    }),
    relationshipToGuardian: z.string({
      required_error: 'Please select your relationship with the guardian',
    }),
    guardianPhoneNumber: z.string({
      required_error: 'Please add your guardian phone number',
    }),
    guardianEmail: z.string({
      required_error: 'Please select your guardian email',
    }),
  })
  .required();

export type FamilyIntroduction = z.infer<typeof familyIntroductionSchema>;
