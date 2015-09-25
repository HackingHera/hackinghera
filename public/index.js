angular.module('myApp', [])

.controller('appController', ['$scope', 'handleRequest', function ($scope, handleRequest){
  $scope.context = {};
  $scope.codeString = '';
  $scope.sendPost = function (){
    handleRequest.sendCode($scope.codeString);

}])

.service('handleRequest', ['$http', function ($http) {
  
  this.sendCode = function(codeString) {
    $http.post('/api/context', {
      code: codeString
    });
  } 

}])
