console.log("app.js has loaded");

const app = angular.module('app', ['ngRoute', 'angularFileUpload', 'chart.js']);

app.config(['$httpProvider', '$routeProvider', function($httpProvider, $routeProvider){

  $httpProvider.interceptors.push('authInterceptor');

  $routeProvider
    .when('/',{
      controller : 'mainController',
      templateUrl : 'partials/_main.html',
    })
    .when('/loginReg',{
      controller : 'userController',
      templateUrl : 'partials/_loginReg.html',
    })
    .when('/challenges',{
      controller : 'algoController',
      templateUrl : 'partials/_challenges.html',
    })
    .when('/solutions',{
      controller : 'algoController',
      templateUrl : 'partials/_solutions.html',
    })
    .when('/solutionshow',{
      controller : 'algoController',
      templateUrl : 'partials/_solutionShow.html',
    })
    .when('/newChallenge',{
      controller : 'algoController',
      templateUrl : 'partials/_newChallenge.html',
    })
    .when('/gallery',{
      controller : 'algoController',
      //templateUrl : 'partials/_gallery.html',
      templateUrl : 'partials/_solutions.html',
    })
    .when('/arena',{
      controller : 'algoController',
      templateUrl : 'partials/_arena.html',
    })
    .otherwise('/');
}]);

function errorHandler(error){
  console.log("app.js errorHandler =", error);
}

app.controller('mainController', ['$scope', function($scope){
  console.log('mainController restart');
}]);

// app.controller('loginRegController', ['$scope', 'loginRegFactory', function($scope, loginRegFactory){
//   console.log('loginRegController restart');
//   $scope.submitNewUser = function(){
//     console.log("submitNewUser");
//     loginRegFactory.create($scope.newUser)
//     $scope.newUser = {};
//   };
// }]);
//
// app.controller('algoController', ['$scope', 'algoFactory', '$http', 'FileUploader', function($scope, algoFactory, $http, FileUploader){
//   console.log('algoController restart');
//   $scope.algos = algoFactory.algos;
//
//   $scope.uploader = new FileUploader();
//
//   $scope.upload = function(){
//     $scope.uploader.uploadAll();
//   }
//
// }]);

app.controller('loadController', ['$scope', function($scope){
  $scope.algoUrl = '/algo/122cbb3df2d4d9ecbdc14b0c1803af19';

  $scope.runAlgo = function(){
    $scope.map = map;
  }
}]);

app.controller('arenaController', ['$scope', function($scope){
  $scope.algoUrl = '/algo/122cbb3df2d4d9ecbdc14b0c1803af19';

  $scope.runAlgo = function(){
    $scope.map = map;
  }
}]);
