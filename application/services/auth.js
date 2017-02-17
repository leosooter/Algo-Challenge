angular.module('app')
  .service('authService', ['$window', function($window){
    console.log("authService initiated");
    this.parseJWT = function(token){
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace('-', '+').replace('_', '/');
      return JSON.parse($window.atob(base64));
    };

    this.saveToken = function(token){
      $window.localStorage.jwtToken = token;
    };

    this.getToken = function(){
      return $window.localStorage.jwtToken;
    };

    this.isAuth = function(){
      const token = this.getToken();

      if(!token){
        return false;
      }

      const params = this.parseJWT(token)

      return Math.round( new Date().getTime() / 1000) <= params.exp;
    }

  }]);//End of service
