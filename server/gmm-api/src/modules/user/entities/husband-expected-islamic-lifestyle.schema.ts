import * as dynamoose from 'dynamoose';

const HusbandExpectedIslamicLifestyleSchema = new dynamoose.Schema(
  {
    id: {
      type: String,
      hashKey: true,
    },
    salat: {
      type: String,
      required: false,
    },
    obedience: {
      type: String,
      required: false,
    },
    hijab: {
      type: String,
      required: false,
    },
    appearance: {
      type: String,
      required: false,
    },
    polygyny: {
      type: String,
      required: false,
    },
    islamicEducation: {
      type: String,
      required: false,
    },
    socialMedia: {
      type: String,
      required: false,
    },
    wifeNonMehramContact: {
      type: String,
      required: false,
    },
    husbandNonMehramContact: {
      type: String,
      required: false,
    },
    obedienceToInLaws: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
    saveUnknown: true,
  },
);

const HusbandExpectedIslamicLifestyleModel = dynamoose.model(
  'HusbandExpectedIslamicLifestyle',
  HusbandExpectedIslamicLifestyleSchema,
);

export { HusbandExpectedIslamicLifestyleModel };
