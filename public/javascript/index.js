angular.module('myApp', ['ui.codemirror', /*'ngRoute'*/])
  
  // .config(function($routeProvider) {
  //   $routeProvider
  //   .when('/', {
  //     template: '<div id="test-div">hello</div>',
  //     controller: 'appController'
  //   })
  //   .when('/context', {
  //     template: '<div ng-include="\'./views/contextTree.html\'" onload="colorIndex = colorIndex + 1"></div>',
  //     //templateUrl: '../views/contextTree.html',
  //     controller: 'appController'
  //   })
  //   .when('/lexical', {
  //     templateUrl: '../views/lexicalView.html',
  //     controller: 'appController'
  //   });
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

  // darkish blue-grey-green-orange-yellow
  // $scope.colors = ['#1b85b8', '#5a5255', '#559e83', '#ae5a41', '#c3cb71'];
  
  // Ih8fluttershy
  // $scope.colors = ['#0600bd', '#000b9f', '#09057e', '#03006d', '#0a004b'].reverse();

  // TAS
  // $scope.colors = ['#00a6b5', '#f7974a', '#5cba89', '#93a8cd', '#bb5475'];

  // blue - purple - darker blue purple - orange - yellow, all kind of dull
  // $scope.colors = ['#1b85b8', '#484d70', '#3B4C6D', '#ae5a41', '#c6c386'];

  // material design circus
  $scope.colors = ['#4caf50', '#f44336', '#2196f3', '#ffeb3b', '#9c27b0'];

  // green shades, too close
  // $scope.colors = ['#0c460d', '#0f5e1c', '#0d7e0f', '#11980d', '#00b404'];

  // material dark purple to red through blue
  // $scope.colors = ['#3f51b5', '#673ab7', '#03a9f4', '#f44336', '#e91e63'];

  // blue purple pink pastel
  // $scope.colors = ['#3f51b5', '#90a4ae', '#9575cd', '#e57373', '#55a8a3'];

  // green to purple
  // $scope.colors = ['#0c6f29', '#2b6356', '#4b5784', '#6a4bb2', '#8a3fe0'];

  // hsla colors
  // $scope.colors = ['hsla(100, 85%, 40%, 1)', 'hsla(0, 85%, 40%, 1)','hsla(215, 85%, 40%, 1)','hsla(55, 85%, 40%, 1)','hsla(250, 85%, 40%, 1)'];
  
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