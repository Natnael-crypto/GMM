export interface ImageAccessRequestPayload {
  status: 'accepted' | 'rejected';
}

export interface ImageRequestNotificationPayload {
  userName: string;
  recipientId: string;
  action: 'requested' | 'accepted' | 'rejected';
}
