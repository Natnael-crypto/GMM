import * as dynamoose from "dynamoose";

const ExpectedWorldlyLifestyleSchema = new dynamoose.Schema({
  id: {
    type: String,
    hashKey: true,  
  },
  roleOfWife: {
    type: String,
    required: false,  // Optional
  },
  wifeCareer: {
    type: String,
    required: false,  // Optional
  },
  dualIncome: {
    type: String,
    required: false,  // Optional
  },
  relocation: {
    type: String,
    required: false,  // Optional
  },
  jointFamily: {
    type: String,
    required: false,  // Optional
  },
  coupleLivingAccomodation: {
    type: String,
    required: false,  // Optional
  },
  openToLiveWithWifeFamily: {
    type: String,
    required: false,  // Optional
  },
  expectWifeToLiveWithHisFamily: {
    type: String,
    required: false,  // Optional
  },
  havingChildren: {
    type: String,
    required: false,  // Optional
  },
  numberOfChildren: {
    type: Number,
    required: false,  // Optional
  },
  parenthoodTimingAfterMarriage: {
    type: String,
    required: false,  // Optional
  },
  requireWifeToAcceptChildren: {
    type: String,
    required: false,  // Optional
  },
  willingToAcceptWifeChildren: {
    type: String,
    required: false,  // Optional
  },
}, {
  timestamps: true,  
  saveUnknown: true  
});


const ExpectedWorldlyLifestyleModel = dynamoose.model("ExpectedWorldlyLifestyle", ExpectedWorldlyLifestyleSchema);

export { ExpectedWorldlyLifestyleModel };
