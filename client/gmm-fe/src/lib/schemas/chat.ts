import { z } from 'zod';

export const chatSchema = z.object({
  id: z.string(),
  user1: z.string(),
  user2: z.string(),
});

export const messageSchema = z.object({
  id: z.string(),
  roomId: z.string(),
  senderId: z.string(),
  content: z.string(),
  contentType: z.string(),
  sentAt: z.coerce.date(),
});

export type Chat = z.infer<typeof chatSchema>;
export type Message = z.infer<typeof messageSchema>;
