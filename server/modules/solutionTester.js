const now = require("performance-now");

const stringLower = "abcdefghijklmnopqrstuvwxyz";
const stringLetter = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
const stringAll = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%^&*()?,.";
//
function stringMaker(length, type){
  var returnString = "";
  for (var i = 0; i < length; i++) {
    var rand = Math.floor(Math.random() * (type.length));
    returnString += (type[rand]);
  }
  //console.log(returnString);
  return returnString;
}

function arrayMaker(length, min, max){
  var returnArray = [];
  if (min < 0) {
    max -= min;
  }
  for (var i = 0; i < length; i++) {
    returnArray.push(Math.floor((Math.random() * (max + 1)) + min));
  }
  return returnArray;
}

//Each algo is subjected to 3 tests:
//One set of edge cases
//One set of random test cases that are small enough to be useful in de-bugging
//One set of random test cases that are large enough to detect meaningful differences in speed
function testAlgo(algo, edgeArray, checkArray, speedArray){
  console.log("algo passed to testAlgo function =", algo);
  var results = {
    edgeArray : edgeArray,
    edgeErrors : new Array(edgeArray.length),
    checkArray : checkArray,
    checkErrors : new Array(checkArray.length),
    errors : 0,
    times : [],
    passed : true,
  };

  for(ioSet of edgeArray){
    let answer = algo(ioSet[0]);
    if( answer != ioSet[1]){
      results.passed = false;
      results.edgeErrors.push({ input : ioSet[0], answer : answer, correctAnswer : ioSet[1] });
      results.errors ++;
    }
  }
  //
  for(ioSet of checkArray){
    let answer = algo(ioSet[0]);
    if( answer != ioSet[1]){
      results.passed = false;
      results.checkErrors.push({ input : ioSet[0], answer : answer, correctAnswer : ioSet[1] });
      results.errors ++;
    }
  }
  //
  var totalTime = 0;
  for(ioSet of speedArray){
    const start = now();
    let answer = algo(ioSet[0]);
    const end = now();
    totalTime += (end - start);
    results.times.push(Math.round(( (end - start) + 0.00001) * 10000) / 10000);
    if( answer != ioSet[1]){
      results.passed = false;
      results.errors ++;
    }
  }
  results.avgTime = Math.round(( (totalTime / speedArray.length) + 0.00001) * 10000) / 10000;
  return results;
}

module.exports = {
  maxSum : {
    runTest : function(algoArray){
      //var ioArray = exampleArray;
      var edgeArray = [];
      var checkArray = [];
      var speedArray = [];
      edgeArray.push([[], undefined]);
      edgeArray.push([[0], 0]);
      edgeArray.push([[-10,-20,-3], -3]);

      for (let i = 0; i < 10; i++) {
        let input = arrayMaker(50, -100, 100);
        let output = this.benchTest(input);
        checkArray.push([input, output]);
      }

      for (let i = 0; i < 5; i++) {
        let input = arrayMaker(10000, -100, 100);
        let output = this.benchTest(input);
        speedArray.push([input, output]);
      }

      var results = {};

      for(algo of algoArray){
        results[algo.id] = testAlgo(algo.algo, edgeArray, checkArray, speedArray);
      }
      return results;
    },
    benchTest : function(array){
      var maxSum = array[0];
      var sum = array[0];
      for (var i = 0; i < array.length; i++) {
        sum += array[i];
        if(sum > maxSum){
          maxSum = sum;
        }
        if(sum <= 0){
          sum = 0;
        }
      }
      return maxSum;
    },
  },

  firstUnique : {
    runTest(algoArray){
      //var ioArray = exampleArray;
      var edgeArray = [];
      var checkArray = [];
      var speedArray = [];
      edgeArray.push(['a', 'a']);
      edgeArray.push(['abcdeabde', 'c']);
      edgeArray.push(['abcde$%&abcd$&', 'e']);

      for (var i = 0; i < 10; i++) {
        let input = stringMaker(50, stringAll);
        let output = this.benchTest(input);
        checkArray.push([input, output]);
      }

      for (var i = 0; i < 5; i++) {
        let input = stringMaker(1000, stringAll);
        let output = this.benchTest(input);
        speedArray.push([input, output]);
      }
      var results = {};
      for(algo of algoArray){
        results[algo.id] = testAlgo(algo.algo, edgeArray, checkArray, speedArray);
      }
      return results;
    },
    benchTest : function(str){
      var appearances=[];
      var occurences=[];
      for (var i=0; i<str.length; i++){
        var lookFor = str.charAt(i);
        var check= appearances.indexOf(lookFor);
        if(check === -1){
          appearances.push(lookFor);
          occurences.push(1)
        }
        else{
          occurences[check] +=1;
        }
      }
      check = occurences.indexOf(1);
      return appearances[check];
    }
  },

  terraceFill : {
    runTest(algoArray){
      var ioArray = [];
      ioArray.push([[9], 0]);
      ioArray.push([[4,4,4,4], 0]);
      ioArray.push([[-10,-20,-3], -3]);
      for (var i = 0; i < 5; i++) {
        let input = arrayMaker(100000, -100, 100);
        let output = this.benchTest(input);
        ioArray.push([input, output]);
      }
      var results = [];
      for(algo of algoArray){
        results.push( testAlgo(algo, ioArray) );
      }
      return results;
    },
    benchTest : function(array){
      var maxSum = array[0];
      var sum = array[0];
      for (var i = 0; i < array.length; i++) {
        sum += array[i];
        if(sum > maxSum){
          maxSum = sum;
        }
        if(sum <= 0){
          sum = 0;
        }
      }
      return maxSum;
    },
  },
};
