import * as dynamoose from "dynamoose";

const UserMarriageDiscussionSchema = new dynamoose.Schema({
  id: {
    type: String,
    hashKey: true,  // Designates this as the partition key
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
}, {
  timestamps: true,  // Adds createdAt and updatedAt timestamps
  saveUnknown: true  // Allows saving fields not defined in the schema
});

// Define the model using the schema
const UserMarriageDiscussionModel = dynamoose.model("UserMarriageDiscussion", UserMarriageDiscussionSchema);

export { UserMarriageDiscussionModel };
