import * as dynamoose from 'dynamoose';

const WifeExpectedWorldlyLifestyleSchema = new dynamoose.Schema(
  {
    id: {
      type: String,
      hashKey: true,
    },
    decisionMakingAndLeadership: {
      type: String,
      required: false,
    },
    moneyInMarriage: {
      type: String,
      required: false,
    },
    willFinanciallySupportWifeEducation: {
      type: String,
      required: false,
    },
    husbandRelocation: {
      type: String,
      required: false,
    },
    jointFamily: {
      type: String,
      required: false,
    },
    husbandMustLiveAloneWithWife: {
      type: String,
      required: false,
    },
    husbandWillingToLiveWithWifeFamily: {
      type: String,
      required: false,
    },
    acceptWifesChildren: {
      type: String,
      required: false,
    },
    acceptHusbandsChildren: {
      type: String,
      required: false,
    },
    havingChildren: {
      type: String,
      required: false,
    },
    desiredNumberOfChildren: {
      type: String,
      required: false,
    },
    parenthoodTimingAfterMarriage: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
    saveUnknown: true,
  },
);

const WifeExpectedWorldlyLifestyleModel = dynamoose.model(
  'WifeExpectedWorldlyLifestyle',
  WifeExpectedWorldlyLifestyleSchema,
);

export { WifeExpectedWorldlyLifestyleModel };
