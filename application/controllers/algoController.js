//const app = angular.module('app');

app.controller('algoController', ['$scope', 'algoFactory', '$http', 'FileUploader', function($scope, algoFactory, $http, FileUploader){
  console.log('algoController restart');

  //Set initial defaults
  $scope.newChallenge = {};
  $scope.newChallenge.examples = [
    [],
    [],
    [],
    [],
    [],
  ];

  $scope.solutionUploadMessage = '';

  $scope.showSolutionForm = false;

  $scope.uploader = new FileUploader();

  algoFactory.getAll()
    .then(function(challenges){
      console.log("All challenges =", challenges);
      algoFactory.challenges = challenges.data;
      $scope.challenges = algoFactory.challenges;
      $scope.currentChallenge = $scope.challenges[0];
      $scope.arenaChallenge = $scope.challenges[0];
    })
    .catch(function(error){
      console.log("Error", error);
    });

    algoFactory.getAllSolutions()
      .then(function(solutions){
        algoFactory.solutions = solutions.data;
        $scope.solutions = algoFactory.solutions;
        console.log("$scope.solutions =", $scope.solutions);

        for(solution of $scope.solutions){
          solution.contents = algoFactory.formatText(solution.contents);
        }

      })
      .catch(function(error){
        console.log("Error", error);
      });

  $scope.submitChallenge = function(){
    console.log($scope.newChallenge);
    var exampleArray = $scope.newChallenge.examples;
    //Remove any blank examples from the newChallenge object
    for (var i = exampleArray.length -1; i >= 0; i--) {
      if(!exampleArray[i][0]){
        console.log('removing blank example # ', i + 1);
        exampleArray.splice(i, 1);
      }
    }
    console.log($scope.newChallenge);
    algoFactory.submitChallenge($scope.newChallenge)
      .then(function(challenge){
        console.log(challenge);
      })
      .catch(function(error){
        console.log("Error", error);
      });
      $scope.newChallenge = {};
      $scope.newChallenge.examples = [
        [],
        [],
        [],
        [],
        [],
      ];
  };

  $scope.upload = function(){
    $scope.newSolution._challenge = $scope.currentChallenge._id;
    console.log($scope.uploader);
    $scope.uploader.queue[0].formData.push($scope.newSolution);
    $scope.uploader.uploadAll();
    $scope.solutionUploadMessage = 'Your solution has been uploaded!';
    $scope.newSolution = {};
    $scope.showSolutionForm = false;
  }

  $scope.testSolution = function(id){
    console.log("Running testSolution function");
    algoFactory.runSolution(id)
      .then(function(algoFunction){
        console.log("testSolution response", algoFunction);
      })
      .catch(function(error){
        console.log("testSolution error", error);
      })
  }

  $scope.testIds = {
    solutionIds : [],
  }

  $scope.testResults = [];
  $scope.arenaSolutions = [];

  Chart.defaults.global.colors = [
    '#e02e32', // red
    '#519431', // green
    '#1a87be', // blue
    '#f5b615', // yellow
    '#fb7405', // orange
    '#949FB1', // grey
    '#4D5360'  // dark grey
  ];

  $scope.testSolutions = function(){
    console.log("running algoController testSolutions function");

    for(solution of $scope.arenaSolutions){
      if(solution){
        $scope.testIds.challengeId = $scope.arenaChallenge._id;
        $scope.testIds.solutionIds.push(solution._id);
      }
    }
    algoFactory.testSolutions($scope.testIds)
      .then(function(response){
        console.log(response.data.results);
        $scope.testResults = response.data.results;
        $scope.series = [];
        $scope.data = [];
        for(solution of $scope.arenaSolutions){
          if(solution){
            $scope.series.push(solution.givenName);
            $scope.data.push($scope.testResults[solution._id].times)
          }
        }
      })
      .catch(function(error){
        console.log(error);
      })
  }

  $scope.labels = ["Test 1", "Test 2", "Test 3", "Test 4", "Test 5"];
  $scope.series = [];
  $scope.data = [];

  $scope.options = {
    scales: {
      yAxes: [
        {
          id: 'y-axis-1',
          type: 'linear',
          display: true,
          position: 'left'
        },
      ]
    }
  };

}]);
