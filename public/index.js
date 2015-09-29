angular.module('myApp', [])

.controller('appController', ['$scope', 'handleRequest', function ($scope, handleRequest){
  $scope.context = {test: 'test'};
  $scope.codeString = '';
  $scope.colors = ['green', 'red', 'blue', 'yellow', 'orange'];
  $scope.colorIndex = 0;
  $scope.sendPost = function (){
    // $scope.context.text = handleRequest.sendCode($scope.codeString);
    handleRequest.sendCode($scope.codeString, function(data) {
      $scope.context = data;
    });
  };



}])

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

}]);

// var colors = ['green', 'red', 'blue'];
//$scope.num = -1
//$scope.localVarColors = [a,b,c,d];
//$scope.innerContextColors= [a,b,c];
//ng-include val={{num++}}
//local- localColors[num];
  //ng-style={'color', innerContextColor.shift}

// {
//   "__contextName__": "global",
//   "__localVariables__": [
//     {
//       "hero": "aHero()"
//     },
//     {
//       "newSaga": "{f}"
//     }
//   ],
//   "__innerScopes__": [
//     {
//       "__contextName__": "newSaga",
//       "__localVariables__": [
//         {
//           "foil": "aFoil()"
//         },
//         {
//           "saga": "{f}"
//         }
//       ],
//       "__innerScopes__": [
//         {
//           "__contextName__": "saga",
//           "__localVariables__": [
//             {
//               "deed": "aDeed()"
//             }
//           ],
//           "__innerScopes__": [
//             null
//           ]
//         },
//         {
//           "__contextName__": "saga",
//           "__localVariables__": [
//             {
//               "deed": "aDeed()"
//             }
//           ],
//           "__innerScopes__": [
//             null
//           ]
//         }
//       ]
//     },
//     {
//       "__contextName__": "newSaga",
//       "__localVariables__": [
//         {
//           "foil": "aFoil()"
//         },
//         {
//           "saga": "{f}"
//         }
//       ],
//       "__innerScopes__": [
//         {
//           "__contextName__": "saga",
//           "__localVariables__": [
//             {
//               "deed": "aDeed()"
//             }
//           ],
//           "__innerScopes__": [
//             null
//           ]
//         },
//         {
//           "__contextName__": "saga",
//           "__localVariables__": [
//             {
//               "deed": "aDeed()"
//             }
//           ],
//           "__innerScopes__": [
//             null
//           ]
//         }
//       ]
//     }
//   ]
// }

// .service('contextData', function () {
//   this.context = {'test': 'test'};
// })