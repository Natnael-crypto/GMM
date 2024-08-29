import * as dynamoose from "dynamoose";

const ExpectedIslamicLifestyleSchema = new dynamoose.Schema({
  id: {
    type: String,
    hashKey: true,  
  },
  salat: {
    type: String,
    required: false,  // Optional
  },
  hijab: {
    type: String,
    required: false,  // Optional
  },
  appearance: {
    type: String,
    required: false,  // Optional
  },
  familyStructure: {
    type: String,
    required: false,  // Optional
  },
  childrenAndUpbringing: {
    type: String,
    required: false,  // Optional
  },
  socialMedia: {
    type: String,
    required: false,  // Optional
  },
  nonMehramContact: {
    type: String,
    required: false,  // Optional
  },
  obedienceToHusband: {
    type: String,
    required: false,  // Optional
  },
  obedienceToInLaws: {
    type: String,
    required: false,  // Optional
  },
}, {
  timestamps: true,  // Adds createdAt and updatedAt timestamps
  saveUnknown: true  // Allows saving fields not defined in the schema
});

// Define the model using the schema
const ExpectedIslamicLifestyleModel = dynamoose.model("ExpectedIslamicLifestyle", ExpectedIslamicLifestyleSchema);

export { ExpectedIslamicLifestyleModel };
