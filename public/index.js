angular.module('myApp', [])

.controller('appController', ['$scope', 'handleRequest', function ($scope, handleRequest){
  $scope.context = {};
  $scope.codeString = '';
  $scope.sendPost = function (){
    handleRequest.sendCode($scope.codeString);
  }
}])


.service('handleRequest', ['$http', function ($http) {
  this.sendCode = function(codeString) {
    console.log('sendCode activated');
    $http.post('/api/context', {
      codeString: codeString
    })
    .then(function (result) {
      console.log("post result is", result);
      console.log("post sent");
    }, function (err) {
      console.log("err is", err);
    });
  } 

}])
