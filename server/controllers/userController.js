const path = require('path');
const bcrypt = require('bcrypt');
const User = require(path.resolve('server','models','userModel'));
const sign = require(path.resolve('server', 'modules', 'tokenAuth')).sign;

module.exports = {
  register : function(req, res){
    console.log("Creating new user");
    if(req.body.password != req.body.cPassword){
      console.log("Password and Confirm-Password do not match");
      return res.json({error : "Password and Confirm-Password do not match"});
    }
    req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(8));
    return User.create(req.body, function(error, user){
      console.log("Data from form =", req.body);
      console.log("Error =", error);
      console.log("user returned from DB =", user);
      user.password = null;
      sign(req, user, function(error, token){
        if(error){
          res.json({success : false, error : error});
        }
        res.json({success : true, user : user, token : token});
      })
    });
  },

  login : function(req, res){
    console.log("Logging in user");
    const email = req.body.email;
    User.findOne({email : email})
      .then(function(user){
        if(user){
          console.log("User matching email found");
          if (bcrypt.compareSync(req.body.password, user.password)) {
            console.log("password is correct");
            user.password = null;
            sign(req, user, function(error, token){
              if(error){
                res.json({success : false, error : error});
              }
              res.json({success : true, token : token});
            })
          }
          else{
            console.log("Password does not match");
            res.json({success : false, message : 'Password/email combination does not match'});
          }
        }
        else{
          console.log("User matching email not found");
          res.json({success : false, message : 'Password/email combination does not match'});
        }
      })
      .catch(function(error){
        console.log("userController findOne error", error);
      })
  },

  getAll : function(req, res){
    return User.find({}, function(error, users){
      res.json(users);
    });
  },

  getOne : function(req, res, id){
    return User.find({_id : id}, function(error, user){
      res.json(user);
    });
  },
}
