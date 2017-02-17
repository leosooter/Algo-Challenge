console.log("userController.js");

app.controller('userController', ['$scope', 'userFactory', function($scope, userFactory){
  console.log('userController restart');

  $scope.register = function(){
    console.log("submitNewUser");
    userFactory.register($scope.newUser);
    $scope.newUser = {};
  };

  $scope.login = function(){
    userFactory.login($scope.loginUser);
    $scope.loginUser = {};
  };

}]);
