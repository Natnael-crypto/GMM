import { Message } from '../schemas/chat';

export interface LastKey {
  id?: string;
  roomId: string;
  sentAt?: number;
}

export interface MessagesResponse {
  messages: Message[];
  lastKey: LastKey;
}
