const path = require('path');

const Challenge = require(path.resolve('server', 'models', 'challengeModel'));

module.exports = {
  create : function(req, res){
    console.log('challenge create route');
    Challenge.create(req.body, function(error, challenge){
      res.json(challenge);
    });
  },

  getAll : function(req, res){
    Challenge.find({})
      .populate('solutions')
      .then(function(challenges){
        //console.log("Challeges =", challenges);
        res.json(challenges);
      })
      .catch(function(error){
        console.log(error);
      });
  },

  getOne : function(req, res, id){
    Challenge.findOne({_id : id}, function(error, challenge){
      res.json(challenge);
    });
  },
}
