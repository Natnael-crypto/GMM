import * as dynamoose from 'dynamoose';

const UserMarriageDiscussionSchema = new dynamoose.Schema(
  {
    id: {
      type: String,
      hashKey: true,
    },
    marriageType: {
      type: String,
      required: false,
    },
    marriageLocation: {
      type: String,
      required: false,
    },
    marriageVenue: {
      type: String,
      required: false,
    },
    marriageTimeline: {
      type: String,
      required: false,
    },
    familyInMarriageDiscussion: {
      type: String,
      required: false,
    },
    dowry: {
      type: String,
      required: false,
    },
    weddingBudget: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
    saveUnknown: true,
  },
);

const UserMarriageDiscussionModel = dynamoose.model(
  'UserMarriageDiscussion',
  UserMarriageDiscussionSchema,
);

export { UserMarriageDiscussionModel };
