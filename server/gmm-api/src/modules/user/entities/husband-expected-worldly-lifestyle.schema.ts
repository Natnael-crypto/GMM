import * as dynamoose from 'dynamoose';

const HusbandExpectedWorldlyLifestyleSchema = new dynamoose.Schema(
  {
    id: {
      type: String,
      hashKey: true,
    },
    decisionMakingAndLeadership: {
      type: String,
      required: false,
    },
    willFinanciallySupportWifeEducation: {
      type: String,
      required: false,
    },
    moneyInMarriage: {
      type: String,
      required: false,
    },
    roleOfWife: {
      type: String,
      required: false,
    },
    wifeRelocation: {
      type: String,
      required: false,
    },
    jointFamily: {
      type: String,
      required: false,
    },
    wifeOpenToLiveWithHusbandsParents: {
      type: String,
      required: false,
    },
    haveTheirHomeSeparateFromTheirFamilies: {
      type: String,
      required: false,
    },
    husbandOpenToLiveWithWifeFamily: {
      type: String,
      required: false,
    },
    acceptHusbandsChildren: {
      type: String,
      required: false,
    },
    acceptWifesChildren: {
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

const HusbandExpectedWorldlyLifestyleModel = dynamoose.model(
  'HusbandExpectedWorldlyLifestyle',
  HusbandExpectedWorldlyLifestyleSchema,
);

export { HusbandExpectedWorldlyLifestyleModel };
