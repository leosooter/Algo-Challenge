const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SolutionSchema = mongoose.Schema({
  givenName : {
    type : String,
    required : true,
    maxLength : 30,
  },
  fileName : {
    type : String,
    required : true,
    unique : true,
    minLength : 6,
  },
  contents : {
    type : String,
    required : true,
  },
  privacy :{
    type : String,
    enum : ['private', 'friends', 'anyone'],
    default : 'private',
  },
  _user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    //required : true,
  },
  _challenge: {
    type: Schema.Types.ObjectId,
    ref: 'Challenge',
    required : true,
  },
});




module.exports = mongoose.model('Solution', SolutionSchema);
