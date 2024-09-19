import * as dynamoose from 'dynamoose';

const MessageSchema = new dynamoose.Schema(
  {
    id: {
      type: String,
      hashKey: true,
    },
    roomId: {
      rangeKey: true,
      type: String,
      required: true,
    },
    senderId: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    contentType: {
      type: String,
      required: true,
    },
    sentAt: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const MessageModel = dynamoose.model('Messages', MessageSchema);
