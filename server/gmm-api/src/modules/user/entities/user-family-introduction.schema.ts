import * as dynamoose from "dynamoose";

// Define the schema for UserFamilyIntroduction
const UserFamilyIntroductionSchema = new dynamoose.Schema({
  id: {
    type: String,
    hashKey: true,  // Designate this as the partition key
  },
  guardianFullName: {
    type: String,
    required: false,  // Optional
  },
  relationshipToGuardian: {
    type: String,
    required: false,  // Optional
  },
  guardianPhoneNumber: {
    type: String,
    required: false,  // Optional
  },
  guardianEmail: {
    type: String,
    required: false,  // Optional
  },
  guardianIdCard: {
    type: String,
    required: false,  // Optional, used for storing ID card image URL
  },
}, {
  timestamps: true,  // Adds createdAt and updatedAt timestamps
  saveUnknown: true  // Allows saving fields not defined in the schema
});

// Define the model using the schema
const UserFamilyIntroductionModel = dynamoose.model("UserFamilyIntroduction", UserFamilyIntroductionSchema);

export { UserFamilyIntroductionModel };
