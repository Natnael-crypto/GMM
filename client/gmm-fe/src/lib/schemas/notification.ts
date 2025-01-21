export interface Notification {
  id: string;
  recipientId: string;
  initiatorUserId: string;
  title: string;
  message: string;
  url: string;
  isRead: boolean;
  createdAt: Date;
}
