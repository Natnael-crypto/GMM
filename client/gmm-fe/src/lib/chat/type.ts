import { Message } from '../schemas/chat';

export interface MessagesResponse {
  messages: Message[];
  lastKey: {
    id: string;
    roomId: string;
    sentAt: number;
  };
}
