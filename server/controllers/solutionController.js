const path = require('path');
const fs = require('fs');

const verify = require(path.resolve('server', 'modules', 'tokenAuth')).verifySync;
const Solution = require(path.resolve('server', 'models', 'solutionModel'));
const Challenge = require(path.resolve('server', 'models', 'challengeModel'));

module.exports = {
  create : function(req, res){
    console.log("Req.file, solutionController =", req.file);
    req.body.contents = fs.readFileSync(`./local_AWS/algos/${req.file.filename}`,'utf8');
    req.body.fileName = req.file.filename;
    //console.log("Req.body, solutionController =", req.body);
    Solution.create(req.body, function(error, solution){
      console.log("error", error);
      Challenge.findOne({_id : solution.challenge})
        .then(function(challenge){
          console.log("Found challenge ", challenge.name);
          challenge.solutions.push(solution._id);
          challenge.save();
          res.json(challenge);
        })
        .catch(function(error){
          console.log(error);
        })
      //console.log("solutionController solution =", solution);
      res.json(solution);
    });
  },

  getAll : function(req, res){
    // console.log("Decoded =", decoded);
    Solution.find({}, function(error, solutions){
      //console.log("All solutions =", solutions);
      res.json(solutions);
    });
  },

  getOne : function(req, res, id){
    Solution.findOne({_id : id}, function(error, solution){
      res.json(solution);
    });
  },


  destroy : function(req, res, id){
    Solution.removeById({_id : id}, function(error, deleted){
      res.json(deleted);
    });
  },

  destroyAll : function(req, res){
    console.log("Deleting all solutions from DB");
    Solution.remove({}, function(error, data){
      console.log("Error ", error);
      console.log("Data", data);
    });
  },

}
