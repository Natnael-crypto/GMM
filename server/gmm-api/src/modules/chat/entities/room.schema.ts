import * as dynamoose from "dynamoose";

const RoomSchema = new dynamoose.Schema({
    roomId: {
      type: String,
      hashKey: true,
    },
    createdBy: String,
    createdDate: Date,
  });

  export const RoomModel = dynamoose.model('Rooms', RoomSchema);