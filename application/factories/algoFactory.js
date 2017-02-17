//const app = angular.module('app');

app.factory('algoFactory', ['$http', function($http){
  const factory = {};

  factory.challenges = [];

  factory.uploadSolution = function(file){
    //console.log(file);
  };

  factory.submitChallenge = function(challenge){
    return $http({
      method : 'POST',
      url : '/challenge',
      data : challenge,
    });
  };

  factory.getAll = function(){
    return $http({
      method : 'GET',
      url : '/challenge',
    });
  };

  factory.getAllSolutions = function(){
    return $http({
      method : 'GET',
      url : '/solution',
    });
  };

  factory.runSolution = function(id){
    console.log("Running loadSolution function id", id);
    return $http({
      method : 'GET',
      url : `/solution/run/${id}`,
    });
  };

  factory.formatText = function(str){ //Takes a text document and displays with Javascript formatting
    var lineArray = str;
    //Find and record sections that should be excluded from regular formatting
    exclLog = lineArray.match( /console\.log\(.+\)/g );
    exclEmptyObj = lineArray.match( /{}/g);
    exclParens = lineArray.match( /\(.+;.*\)/g );
    exclBrackets = lineArray.match( /\[.+,.+\]/g );
    exclBackticks = lineArray.match( /`.+`/g );

    lineArray = lineArray.replace( /console\.log\(.+\)/g, 'log~~~~~')
      .replace(/{}+;*/g, 'emptyObj~~~~~$^$')
      .replace(/\(.+;.*\)/g, 'paren~~~~~')
      .replace(/\[.+,.+\]/g, 'brack~~~~~')
      .replace(/`.+`/g, 'back~~~~~')

      .replace(/,/g, ',$^$')
      .replace(/{/g, '{$^$')
      .replace(/;/g, ';$^$')
      .replace(/}/g, '}$^$')

    if(exclLog){
      for(line of exclLog){
        lineArray = lineArray.replace(/log~~~~~/, line);
      }
    }

    if(exclParens){
      for(line of exclParens){
        lineArray = lineArray.replace(/paren~~~~~/, line);
      }
    }

    if(exclBrackets){
      for(line of exclBrackets){
        lineArray = lineArray.replace(/brack~~~~~/, line);
      }
    }

    if(exclBackticks){
      for(line of exclBackticks){
        lineArray = lineArray.replace(/back~~~~~/, line);
      }
    }

    lineArray = lineArray.split('$^$');

    var returnArray = [];
    var indentCount = 0;
    for(line of lineArray){
      if(line[line.length - 1] === '{'){
        indentCount += 10;
      }
      else if(line[line.length - 1] === '}'){
        indentCount -= 10;
      }
      line = line.replace(/emptyObj~~~~~/g, '{};');
      returnArray.push([indentCount, line]);
    }
    //console.log("returnArray = ",returnArray);
    return returnArray;
  };


  factory.testSolutions = function(testIds){
    console.log("algoFactory testSolutions method- testIds =", testIds);
    return $http({
      method : 'Post',
      url : 'arena/test',
      data : testIds,
    });
  }


  // factory.testSolution = function(id){
  //   factory.loadSolution(id)
  //     .then(function(error, algo){
  //       console.log("Error", error);
  //       console.log("Algo", algo);
  //       return algo;
  //     })
  // }

  return factory;
}]);
