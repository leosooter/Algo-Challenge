const path = require('path');
const fs = require('fs');

const Solution = require(path.resolve('server', 'models', 'solutionModel'));
const Challenge = require(path.resolve('server', 'models', 'challengeModel'));
const solutionTester = require(path.resolve('server', 'modules', 'solutionTester'));

module.exports = {
  testSolutions : function(req, res){
    console.log("arenaController testSolutions method");
    const challengeId = req.body.challengeId;
    const idArray = req.body.solutionIds;

    const algos = [];

    Challenge.findOne({_id : challengeId})
      .then(function(challenge){

        for (solutionId of idArray) {
          Solution.findOne({_id : solutionId}, function(error, solution){
            const fileName = solution.fileName;
            //console.log(`Loading file ${fileName}`);
            algos.push({id : solution._id, algo : require(path.resolve('local_AWS', 'algos', fileName))} );
            if (algos.length === idArray.length) {
              console.log(solutionTester[challenge.key]);
              try{
                const results = solutionTester[challenge.key].runTest(algos);
                res.json({results : results});
              }
              catch(TypeError){
                console.log("Could not find a challenge key to test solutions", challenge.key, "does not exist in solutionTest");
              }
            }
          });
        }
      })

      .catch(function(error){
        console.log(error);
      })
  },

};


  // testSolutions : function(req, res){
  //   console.log("arenaController testSolutions method");
  //   const challengeId = req.body.challengeId;
  //   const solution1Id = req.body.solution1Id;
  //   const solution2Id = req.body.solution2Id;
  //
  //   Challenge.findOne({_id : challengeId})
  //     .then(function(challenge){
  //       var algo1 = false;
  //       var algo2 = false;
  //
  //       Solution.findOne({_id : solution1Id}, function(error, solution){
  //         const fileName = solution.fileName;
  //         console.log(`Loading file ${fileName}`);
  //         algo1 = require(path.resolve('local_AWS/algos', fileName));
  //         if (algo2) {
  //           const results = solutionTester.maxSum.runTest(algo1, algo2);
  //           res.json({results : results});
  //         }
  //       });
  //
  //       Solution.findOne({_id : solution2Id}, function(error, solution){
  //         const fileName = solution.fileName;
  //         console.log(`Loading file ${fileName}`);
  //         algo2 = require(path.resolve('local_AWS/algos', fileName));
  //         if (algo1) {
  //           const results = solutionTester.maxSum.runTest(algo1, algo2);
  //           res.json({results : results});
  //         }
  //       });
  //
  //     })
  //     .catch(function(error){
  //       console.log(error);
  //     })
