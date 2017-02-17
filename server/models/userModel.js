const mongoose = require('mongoose');
const nameRegex = /^[a-zA-Z]+$/;
const emailRegex = /^[a-zA-Z0-9\.\+_-]+@[a-zA-Z0-9\._-]+\.[a-zA-Z]*$/;
//Requires at least 1 uppercase, at least 1 number and 8 characters long
const passwordRegex = /(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]{8,}/;
const Schema = mongoose.Schema;

const UserSchema = mongoose.Schema({
  firstName : {
    type : String,
    required : true,
    trim : true,
    lowercase : true,
    minLength : 1,
    validate : {
      validator : function(name){
        return nameRegex.test(name)
      },
      message : "Name must be at least 1 letter long with no numbers or symbols",
    }
  },
  lastName : {
    type : String,
    required : true,
    trim : true,
    lowercase : true,
    minLength : 1,
    validate : {
      validator : function(name){
        return nameRegex.test(name)
      },
      message : "Name must be at least 1 letter long with no numbers or symbols",
    }
  },
  email : {
    type : String,
    required : true,
    trim : true,
    minLength : 6,
    validate : {
      validator : function(email){
        return emailRegex.test(email)
      },
      message : "Please enter a valid email",
    },
  },
  password : {
    type : String,
    required : true,
    trim : true,
    minLength : 8,
    validate : {
      validator : function(password){
        return passwordRegex.test(password)
      },
      message : "Password must be at least 8 characters long with at least 1 uppercase letter and 1 number",
    }
  },
  solutions : [{
    type : Schema.Types.ObjectId,
    ref : 'Solution',
  }],
});


module.exports = mongoose.model('User', UserSchema);
