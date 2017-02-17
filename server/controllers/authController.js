const path = require('path');
const User = require('mongoose').model('User');
const sign = require(path.resolve('server', 'modules', 'tokenAuth')).sign;

module.exports = {
  login : function(req, res){
    User.findOne({email : req.body.email})
      .then(function(user){
        if(!user){
          return res.status(404).json({message : "No user found in DB"});
        }
        //Bcrypt password validations here-
        sign(req, user._id.toObject(), function(error, token){
          if(error){
            console.log("Error from authController.login.sign", error);
          }
          res.json({token});
        });
      })
      .catch(function(error){
        console.log("Error from authController.login",error);
      })
  },

  register : function(req, res){
    sign(req, user.toObject(), function(error, token){
      if(error){
        console.log(error);
      }
      res.json({token});
    });
  }
}
