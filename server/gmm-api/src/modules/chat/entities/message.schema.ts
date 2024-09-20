import * as dynamoose from 'dynamoose';

const MessageSchema = new dynamoose.Schema(
  {
    id: {
      type: String,
      hashKey: true,
      required: true,
    },
    roomId: {
      type: String,
      index: {
        type: 'global',
        name: 'roomId-sentAt-index',
      },
      required: true,
    },
    sentAt: {
      type: Date,
      required: true,
      rangeKey: true,
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
      enum: ['text', 'image', 'video', 'audio'], // Enum for content types
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const MessageModel = dynamoose.model('Messages', MessageSchema);
