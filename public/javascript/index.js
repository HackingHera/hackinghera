angular.module('myApp', ['ui.codemirror', 'ui.materialize'])
  
.service('handleRequest', ['$http', function ($http) {
  this.sendCode = function(codeString, cb) {
    $http.post('/api/context', {
      codeString: codeString
    })
    .then(function (result) {
      // console.log(result.data);
      cb(result.data);
    }, function (err) {
      console.log("err is", err);
    });
  };
}])

.service('codeService', [function() { 
  this.codeString = exampleCode;
  this.context = {};
  var self = this;

  this.setContext = function(data) {
    angular.copy(data, self.context);
  };

  this.resetApp = function () {
    self.codeString = exampleCode;
    self.setContext({});
  };
}])

.controller('appController', ['$scope', 'handleRequest', 'codeService', function ($scope, handleRequest, codeService){
  $scope.resetApp = function () {
    codeService.resetApp();
    $scope.hasSubmitted = false;
  };

  $scope.codeString = codeService.codeString;
  $scope.context = codeService.context;
  
  $scope.hasSubmitted = false;
  $scope.selectedView = 'context';
  
  // watch statement is unecessary burden on memory, also not needed with codeService.setContext
  // $scope.$watch('context', function(newValue) {
  //   codeService.context = newValue;
  // }, true);

  // material design circus
  $scope.colors = ['#4caf50', '#f44336', '#2196f3', '#ffeb3b', '#9c27b0'];
  $scope.colorIndex = 0;

  $scope.sendPost = function (){
    handleRequest.sendCode($scope.codeString, function(data) {
      codeService.setContext(data);
      $scope.hasSubmitted = true;
    });
  };

  $scope.editorOptions = {
    lineWrapping : true,
    lineNumbers: true,
    mode: 'javascript',
    theme: 'monokai',
    autofocus: true,
    autoCloseBrackets: true,
    gutters: ["CodeMirror-lint-markers"],
    lint: true
  };
}]);

// example code and comments for codeString to be initialized to
var exampleCode = "/*\n" +
"Welcome to Contextualize!\n" +
"This tool produces a visual representation of the execution contexts in your JS code.\n" +
"An execution context is the environment within which a portion of script code executes.\n" +
"The call stack, in turn, can be thought of as an array of execution contexts.\n" +
"Let's begin with a quick example:\n" +
"*/\n\n" +

"var teamName = 'Hacking Hera!';\n" +
"var numTeamMembers = 4;\n" +
"var outerFunction = function() {\n" +
"  var rex = 'Rex Suter';\n" +
"  var innerFunction = function() {\n" +
"    var verlon = 'Verlon Smith';\n" +
"    var superInnerFunction = function() {\n" +
"      var victoria = 'Victoria Tapia';\n" +
"      var superDuperInnerFunction = function() {\n" +
"        var doug = 'Doug Shamoo';\n" +
"        return 'awesome';\n" +
"      };\n" +
"      superDuperInnerFunction();\n" +
"      return [1, 2, 3];\n" +
"    };\n" +
"    superInnerFunction();\n" +
"    return a + b;\n" +
"  };\n" +
"  innerFunction();\n" +
"  return 'something';\n" +
"};\n" +
"outerFunction();\n" +
"outerFunction();\n" +
"someOtherFunction();"