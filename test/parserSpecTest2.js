var assert = require('assert');
var esprima = require('esprima');
var util = require('../serverHelpers/utility.js');
var OutputNode =  require('../serverHelpers/outputnode.js');
var parser = require('../serverHelpers/parser.js');
var fs = require('fs');

var rootNode, nodeMap, outputObject;

describe('ast parsing functionality', function() {

  describe('recursive function calls', function() {

    it('should something', function() {
      var fileContents = fs.readFileSync('./test/testCases/recursiveCase1.js', 'utf8');
      rootNode = esprima.parse(fileContents);
      nodeMap = util.findAllFunctionNodes(rootNode);
      outputObject = new OutputNode();
      parser.parseASTRecursively(rootNode, nodeMap, outputObject);
      console.log(outputObject);
      assert.equal(outputObject.__localVariables__[0].firsString, undefined);
    });

  });

});
