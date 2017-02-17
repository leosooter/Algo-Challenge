const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ChallengeSchema = mongoose.Schema({
  name : {
    type : String,
    trim : true,
    required : true,
    unique : true,
  },
  key : {
    type : String,
    trim : true,
    required : true,
    unique : true,
    match : [/^[\w\d]+$/, 'Challenge key must not contain any spaces'],
  },
  description : {
    type : String,
    trim : true,
    required : true,
  },
  returnDescription : {
    type : String,
    trim : true,
    required : true,
  },
  examples : {
    type : Array,
  },
  note : {
    type : String,
    trim : true,
  },
  solutions : [{
    type: Schema.Types.ObjectId,
    ref: 'Solution',
  }],
});

module.exports = mongoose.model('Challenge', ChallengeSchema);
