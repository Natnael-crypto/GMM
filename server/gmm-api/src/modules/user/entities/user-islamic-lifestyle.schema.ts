import * as dynamoose from "dynamoose";

const UserIslamicLifestyleSchema = new dynamoose.Schema({
  id: {
    type: String,
    hashKey: true,  // Designates this as the partition key
  },
  salat: {
    type: String,
    required: false,
  },
  ramadan: {
    type: String,
    required: false,
  },
  fasting: {
    type: String,
    required: false,
  },
  zakat: {
    type: String,
    required: false,
  },
  food: {
    type: String,
    required: false,
  },
  islamAndCulture: {
    type: String,
    required: false,
  },
  islamicEducation: {
    type: String,
    required: false,
  },
  appearance: {
    type: String,
    required: false,
  },
  hajjAndUmrah: {
    type: String,
    required: false,
  },
  childrenAndUpbringing: {
    type: Number,
    required: false,
  },
}, {
  timestamps: true,  // Adds createdAt and updatedAt timestamps
  saveUnknown: true  // Allows saving fields not defined in the schema
});

// Define the model using the schema
const UserIslamicLifestyleModel = dynamoose.model("UserIslamicLifestyle", UserIslamicLifestyleSchema);

export { UserIslamicLifestyleModel };
