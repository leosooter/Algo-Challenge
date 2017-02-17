angular.module('app')
  .factory('authInterceptor', ['authService', function(authService){
    const factory = {
      request : function(config){
        console.log("authInterceptor request initialized");
        const token = authService.getToken();
        if(token){
          console.log("Token has been retrieved from local storage");
          config.headers.Authorization = `Bearer ${token}`;
          //config.headers.Authorization = token;
        }
        return config;
      },

      requestError : function(config){
        console.log("authInterceptor requestError", config);

        return config;
      },

      response : function(res){
        console.log("authInterceptor response initialized");
        if(res.data.token){
          authService.saveToken(res.data.token);
          console.log("Token has been saved to localStorage");
        }

        return res;
      },

      responseError : function(res){
        console.log("authInterceptor responseError", res);

        return res;
      },

    }

    return factory;
  }])
