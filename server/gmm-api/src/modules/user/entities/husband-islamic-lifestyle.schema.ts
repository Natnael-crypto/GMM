import * as dynamoose from 'dynamoose';

const HusbandIslamicLifestyleSchema = new dynamoose.Schema(
  {
    id: {
      type: String,
      hashKey: true,
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
    celebratingBirthdays: {
      type: String,
      required: false,
    },
    celebratingMawlid: {
      type: String,
      required: false,
    },
    money: {
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
    hajjAndUmra: {
      type: String,
      required: false,
    },
    childrenAndUpbringing: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
    saveUnknown: true,
  },
);

const HusbandIslamicLifestyleModel = dynamoose.model(
  'HusbandIslamicLifestyle',
  HusbandIslamicLifestyleSchema,
);

export { HusbandIslamicLifestyleModel };
