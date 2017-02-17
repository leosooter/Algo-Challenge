//const app = angular.module('app');

app.factory('userFactory', [ '$http', function($http){
  const factory = {};

  factory.register = function(newUser){
    console.log("factory register method");
    $http({
      method : 'POST',
      url : '/user',
      data : newUser,
    })
    .then(function(response){
      console.log("New user succesfully registered:", response.data);
    })
    .catch(errorHandler);
  }

  factory.login = function(loginUser){
    console.log("factory login method");
    $http({
      method : 'POST',
      url : '/user/login',
      data : loginUser,
    })
    .then(function(response){
      console.log("Succesfully logged in", response.data);
    })
    .catch(errorHandler);
  }

  factory.addFriend = function(callback, newFriend){
    console.log("Recieving from controller", newFriend);
    $http({
      method : "POST",
      url : "/new",
      data : newFriend,
    })
    .then(callback)
    .catch(function(error){
      console.log(error);
    });
  }

  return factory;
}])
