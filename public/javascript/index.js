angular.module('myApp', ['ui.codemirror'])
  
// .config(function($routeProvider) {
//   $routeProvider
//   .when('/context', {
//     template: '<div ng-include="\'../views/contextTree.html\'" onload="colorIndex = colorIndex + 1"></div>',
//     // templateUrl: '../views/contextTree.html',
//     controller: 'appController'
//   })
//   .when('/lexical', {
//     templateUrl: '../views/lexicalView.html',
//     controller: 'appController'
//   })
//   .otherwise({
//     template: ''
//   })
// })

.service('handleRequest', ['$http', function ($http) {
  this.sendCode = function(codeString, cb) {
    console.log('sendCode activated');
    $http.post('/api/context', {
      codeString: codeString
    })
    .then(function (result) {
      // console.log("post result is", result.data);
      // console.log("post sent");
      console.log(result.data);
      cb(result.data);
    }, function (err) {
      console.log("err is", err);
    });
  } 
}])

.service('codeService', [function() {
  this.codeString = '';
  this.context = {};

  var self = this;
  this.setContext = function(data) {
    angular.copy(data, self.context);
  };
}])

.controller('appController', ['$scope', 'handleRequest', 'codeService', function ($scope, handleRequest, codeService){
  // $scope.context = {};
  // $scope.codeString = '';

  $scope.codeString = codeService.codeString;
  $scope.context = codeService.context;
  
  // TODO: figure out how to remove this
  $scope.hasSubmitted = false;
  $scope.selectedView = 'context';
  
  // watch statement is unecessary burden on memory, also not needed with codeService.setContext
  // $scope.$watch('context', function(newValue) {
  //   codeService.context = newValue;
  // }, true);

  // material design circus
  $scope.colors = ['#4caf50', '#f44336', '#2196f3', '#ffeb3b', '#9c27b0'];
  
  // hsla color shades using transparency
  // $scope.colors = ['hsla(100, 85%, 40%, .4)', 'hsla(100, 85%, 40%, .4)', 'hsla(100, 85%, 40%, .4)', 'hsla(100, 85%, 40%, .4)', 'hsla(100, 85%, 40%, .4)'];

  $scope.colorIndex = 0;

  $scope.sendPost = function (){
    handleRequest.sendCode($scope.codeString, function(data) {
      // $scope.context = data;
      codeService.setContext(data);
      console.log('codeService.context:', codeService.context)
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