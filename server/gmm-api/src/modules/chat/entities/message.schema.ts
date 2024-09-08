import * as dynamoose from "dynamoose";

const MessageSchema = new dynamoose.Schema({
    roomId: {
      type: String,
      hashKey: true,
    },
    order: {
      type: Number,
      rangeKey: true,
    },
    socketId: String,
    username: String,
    content: String,
    createdAt: Date,
  });

export const MessageModel = dynamoose.model('Messages', MessageSchema);

