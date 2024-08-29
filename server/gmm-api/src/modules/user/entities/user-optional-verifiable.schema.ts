import * as dynamoose from "dynamoose";

const UserOptionalVerifiableSchema = new dynamoose.Schema({
  id: {
    type: String,
    hashKey: true,  // Designates this as the partition key
  },
  annualIncome: {
    type: Boolean,
    required: false,
  },
  annualTaxReport: {
    type: Boolean,
    required: false,
  },
  fullCreditReport: {
    type: Boolean,
    required: false,
  },
  drivingRecord: {
    type: Boolean,
    required: false,
  },
  nationality: {
    type: Boolean,
    required: false,
  },
  stdTesting: {
    type: Boolean,
    required: false,
  },
  criminalBackgroundCheck: {
    type: Boolean,
    required: false,
  },
  divorced: {
    type: Boolean,
    required: false,
  },
  custodyAndParentingArrangements: {
    type: Boolean,
    required: false,
  },
}, {
  timestamps: true,  // Adds createdAt and updatedAt timestamps
  saveUnknown: true  // Allows saving fields not defined in the schema
});

// Define the model using the schema
const UserOptionalVerifiableModel = dynamoose.model("UserOptionalVerifiable", UserOptionalVerifiableSchema);

export { UserOptionalVerifiableModel };
