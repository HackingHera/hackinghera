var assert = require('assert');
var esprima = require('esprima');
var util = require('../serverHelpers/utility.js');
var OutputNode =  require('../serverHelpers/outputnode.js');
var parser = require('../serverHelpers/parser.js');
var fs = require('fs');


fs.readFile('.test/test1.js', 'utf8', function(err, data) {
  if (err) {
    console.log(err);
  }
  done();
});

var rootNode, nodeMap, outputObject;
var fileContents = fs.readFileSync('./test/test1.js', 'utf8');
rootNode = esprima.parse(fileContents);
nodeMap = util.findAllFunctionNodes(rootNode);
outputObject = new OutputNode();
parser.parseASTRecursively(rootNode, nodeMap, outputObject);

describe('ast parsing functionality', function() {

  describe('local variable declarations', function() {
    it('should return the string value', function() {
      assert.equal(outputObject.__localVariables__[0].firsString, 'valueheregoesitdoes');
    });
  });

});

