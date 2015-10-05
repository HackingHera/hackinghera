describe("A suite", function() {
  it("contains spec with an expectation", function() {
    expect(true).toBe(true);
  });
});

describe('appController', function() {
  beforeEach(function () {
    module('myApp');
  });

  var $controller;

  beforeEach(inject(function(_$controller_){
    // The injector unwraps the underscores (_) from around the parameter names when matching
    $controller = _$controller_;
  }));


  describe('Scope initialization', function() {
    var $scope, controller;

    beforeEach(function() {
      $scope = {};
      controller = $controller('appController', { $scope: $scope });
    });

    it('should initialize $scope.hasSubmitted to false', function() {
      expect($scope.hasSubmitted).toEqual(false);
    });

    it('should initialize $scope.colorIndex to 0', function() {
      expect($scope.colorIndex).toEqual(0);
    });

    it('should have a editorOptions object', function() {
      expect($scope.editorOptions).toEqual(jasmine.any(Object));
    });

    it('should have a sendPost method', function() {
      expect($scope.sendPost).toEqual(jasmine.any(Function));
    });

    
    // it('should be set to true after code is submitted', function(done) {
    //   $scope.codeString = "var i = 0;";
    //   $scope.sendPost();
    //   setTimeout(function() {
    //     console.log($scope.hasSubmitted);
    //     expect($scope.hasSubmitted).toEqual(true);
    //     done();
    //   });
    // });
  });
});