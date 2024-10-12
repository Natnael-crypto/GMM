import * as dynamoose from 'dynamoose';

const UserWorldlyLifestyleSchema = new dynamoose.Schema(
  {
    id: {
      type: String,
      hashKey: true,
    },
    employmentType: {
      type: String,
      required: false,
    },
    annualIncome: {
      type: String,
      required: false,
    },
    annualIncomeCurrency: {
      type: String,
      required: false,
    },
    currentOccupationTitle: {
      type: String,
      required: false,
    },
    typeOfResidence: {
      type: String,
      required: false,
    },
    livingSituation: {
      type: String,
      required: false,
    },
    ownsVehicle: {
      type: String,
      required: false,
    },
    vehicleYear: {
      type: Number,
      required: false,
    },
    vehicleMake: {
      type: String,
      required: false,
    },
    vehicleModel: {
      type: String,
      required: false,
    },
    educationQualification: {
      type: String,
      required: false,
    },
    applicableDebts: {
      type: String,
      required: false,
    },
    currentDebts: {
      type: Array,
      schema: [String],
      required: false,
    },
    approximateDebt: {
      type: String,
      required: false,
    },
    approximateDebtCurrency: {
      type: String,
      required: false,
    },
    payingInterestOnDebts: {
      type: String,
      required: false,
    },
    presentFamilyMembers: {
      type: String,
      required: false,
    },
    numberOfSiblings: {
      type: Number,
      required: false,
    },
    pets: {
      type: String,
      required: false,
    },
    majorPreexistingHealthCondition: {
      type: String,
      required: false,
    },
    mobilityAssistantRequirement: {
      type: String,
      required: false,
    },
    preexistingHealthConditionDescription: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
    saveUnknown: true,
  },
);

const UserWorldlyLifestyleModel = dynamoose.model(
  'UserWorldlyLifestyle',
  UserWorldlyLifestyleSchema,
);

export { UserWorldlyLifestyleModel };
