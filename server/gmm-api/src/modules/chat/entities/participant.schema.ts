import * as dynamoose from 'dynamoose';

const ParticipantSchema = new dynamoose.Schema({
  roomId: {
    type: String,
    hashKey: true,
  },
  socketId: {
    type: String,
    rangeKey: true,
  },
  username: String,
  avatar: String,
  connected: Boolean,
});

export const ParticipantModel = dynamoose.model('Participants', ParticipantSchema);
