import * as dynamoose from 'dynamoose';

const WifeExpectedIslamicLifestyleSchema = new dynamoose.Schema(
  {
    id: {
      type: String,
      hashKey: true,
    },
    salat: {
      type: String,
      required: false,
    },
    hijab: {
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
    wifeAppearance: {
      type: String,
      required: false,
    },
    husbandAppearance: {
      type: String,
      required: false,
    },
    childrenUpbringing: {
      type: String,
      required: false,
    },
    polygyny: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
    saveUnknown: true,
  },
);

const WifeExpectedIslamicLifestyleModel = dynamoose.model(
  'WifeExpectedIslamicLifestyle',
  WifeExpectedIslamicLifestyleSchema,
);

export { WifeExpectedIslamicLifestyleModel };
