var assert = require('assert');
var esprima = require('esprima');
var util = require('../serverHelpers/utility.js');
var OutputNode =  require('../serverHelpers/outputnode.js');
var parser = require('../serverHelpers/parser.js');
var fs = require('fs');

var rootNode, nodeMap, outputObject;

describe('ast parsing functionality', function() {

  describe('local variable declarations of primitives', function() {
    it('should return the string value', function() {
      var fileContents = fs.readFileSync('./test/testCases/testPrimitiveAssignment.js', 'utf8');
      rootNode = esprima.parse(fileContents);
      nodeMap = util.findAllFunctionNodes(rootNode);
      outputObject = new OutputNode();
      parser.parseASTRecursively(rootNode, nodeMap, outputObject);
      assert.equal(outputObject.__localVariables__[0].firsString, 'valueheregoesitdoes');
    });

    it('should return the number value', function() {
      var fileContents = fs.readFileSync('./test/testCases/testPrimitiveAssignment.js', 'utf8');
      rootNode = esprima.parse(fileContents);
      nodeMap = util.findAllFunctionNodes(rootNode);
      outputObject = new OutputNode();
      parser.parseASTRecursively(rootNode, nodeMap, outputObject);
      assert.equal(outputObject.__localVariables__[1].numero, 23);
    });

    it('should return the an object', function() {
      var fileContents = fs.readFileSync('./test/testCases/testPrimitiveAssignment.js', 'utf8');
      rootNode = esprima.parse(fileContents);
      nodeMap = util.findAllFunctionNodes(rootNode);
      outputObject = new OutputNode();
      parser.parseASTRecursively(rootNode, nodeMap, outputObject);
      assert.equal(outputObject.__localVariables__[2].object, '{Object}');
    });

    it('should return the an array with length', function() {
      var fileContents = fs.readFileSync('./test/testCases/testPrimitiveAssignment.js', 'utf8');
      rootNode = esprima.parse(fileContents);
      nodeMap = util.findAllFunctionNodes(rootNode);
      outputObject = new OutputNode();
      parser.parseASTRecursively(rootNode, nodeMap, outputObject);
      assert.equal(outputObject.__localVariables__[3].array, 'Array[4]');
    });

    it('should return the a boolean value', function() {
      var fileContents = fs.readFileSync('./test/testCases/testPrimitiveAssignment.js', 'utf8');
      rootNode = esprima.parse(fileContents);
      nodeMap = util.findAllFunctionNodes(rootNode);
      outputObject = new OutputNode();
      parser.parseASTRecursively(rootNode, nodeMap, outputObject);
      assert.equal(outputObject.__localVariables__[4].bool, true);
    });

    it('should return null', function() {
      var fileContents = fs.readFileSync('./test/testCases/testPrimitiveAssignment.js', 'utf8');
      rootNode = esprima.parse(fileContents);
      nodeMap = util.findAllFunctionNodes(rootNode);
      outputObject = new OutputNode();
      parser.parseASTRecursively(rootNode, nodeMap, outputObject);
      assert.equal(outputObject.__localVariables__[5].nnnnnnnull, '{Null}');
    });

    it('should return undefined', function() {
      var fileContents = fs.readFileSync('./test/testCases/testPrimitiveAssignment.js', 'utf8');
      rootNode = esprima.parse(fileContents);
      nodeMap = util.findAllFunctionNodes(rootNode);
      outputObject = new OutputNode();
      parser.parseASTRecursively(rootNode, nodeMap, outputObject);
      assert.equal(outputObject.__localVariables__[6].unnnnndefined, '{undefined}');
    });

    it('should return undefined when not initialized', function() {
      var fileContents = fs.readFileSync('./test/testCases/testPrimitiveAssignment.js', 'utf8');
      rootNode = esprima.parse(fileContents);
      nodeMap = util.findAllFunctionNodes(rootNode);
      outputObject = new OutputNode();
      parser.parseASTRecursively(rootNode, nodeMap, outputObject);
      assert.equal(outputObject.__localVariables__[7].q, '{undefined}');
    });
  });

  describe('local variable declarations of immediately invoked function expressions', function() {

    it('should return undefined when no explicit return statement', function() {
      var fileContents = fs.readFileSync('./test/testCases/testIifeAssignment.js', 'utf8');
      rootNode = esprima.parse(fileContents);
      nodeMap = util.findAllFunctionNodes(rootNode);
      outputObject = new OutputNode();
      parser.parseASTRecursively(rootNode, nodeMap, outputObject);
      assert.equal(outputObject.__localVariables__[1].otherIife, undefined);
    });

    it('should return the value of any explicit return statement', function() {
      var fileContents = fs.readFileSync('./test/testCases/testIifeAssignment.js', 'utf8');
      rootNode = esprima.parse(fileContents);
      nodeMap = util.findAllFunctionNodes(rootNode);
      outputObject = new OutputNode();
      parser.parseASTRecursively(rootNode, nodeMap, outputObject);
      assert.equal(outputObject.__localVariables__[0].thing, 'stringVal');
    });

    it('should return a representation of any functions being invoked outside of the source file', function() {
      var fileContents = fs.readFileSync('./test/testCases/testIifeAssignment.js', 'utf8');
      rootNode = esprima.parse(fileContents);
      nodeMap = util.findAllFunctionNodes(rootNode);
      outputObject = new OutputNode();
      parser.parseASTRecursively(rootNode, nodeMap, outputObject);
      assert.equal(outputObject.__localVariables__[2].hero, 'aHero()');
    });

  });

  describe('local variable declarations within a function ', function() {

    it('outer primitive assignment - Arrays', function() {
      var fileContents = fs.readFileSync('./test/testCases/innerPrimitiveAssignmentTest.js', 'utf8');
      rootNode = esprima.parse(fileContents);
      nodeMap = util.findAllFunctionNodes(rootNode);
      outputObject = new OutputNode();
      parser.parseASTRecursively(rootNode, nodeMap, outputObject);
      assert.equal(outputObject.__localVariables__[0].outerArr, 'Array[2]');
    });

    it('outer primitive assignment - Strings', function() {
      var fileContents = fs.readFileSync('./test/testCases/innerPrimitiveAssignmentTest.js', 'utf8');
      rootNode = esprima.parse(fileContents);
      nodeMap = util.findAllFunctionNodes(rootNode);
      outputObject = new OutputNode();
      parser.parseASTRecursively(rootNode, nodeMap, outputObject);
      assert.equal(outputObject.__localVariables__[1].outerStr, 'outerString');
    });

    it('outer primitive assignment - Objects', function() {
      var fileContents = fs.readFileSync('./test/testCases/innerPrimitiveAssignmentTest.js', 'utf8');
      rootNode = esprima.parse(fileContents);
      nodeMap = util.findAllFunctionNodes(rootNode);
      outputObject = new OutputNode();
      parser.parseASTRecursively(rootNode, nodeMap, outputObject);
      assert.equal(outputObject.__localVariables__[2].outerObj, '{Object}');
    });

    it('inner primitive assignment - Strings', function() {
      var fileContents = fs.readFileSync('./test/testCases/innerPrimitiveAssignmentTest.js', 'utf8');
      rootNode = esprima.parse(fileContents);
      nodeMap = util.findAllFunctionNodes(rootNode);
      outputObject = new OutputNode();
      parser.parseASTRecursively(rootNode, nodeMap, outputObject);
      assert.equal(outputObject.__innerScopes__[0].__localVariables__[0].innerStr, 'innerString');
    });

    it('inner primitive assignment - Arrays', function() {
      var fileContents = fs.readFileSync('./test/testCases/innerPrimitiveAssignmentTest.js', 'utf8');
      rootNode = esprima.parse(fileContents);
      nodeMap = util.findAllFunctionNodes(rootNode);
      outputObject = new OutputNode();
      parser.parseASTRecursively(rootNode, nodeMap, outputObject);
      assert.equal(outputObject.__innerScopes__[0].__localVariables__[1].innerArr, 'Array[3]');
    });

    it('inner primitive assignment - Objects', function() {
      var fileContents = fs.readFileSync('./test/testCases/innerPrimitiveAssignmentTest.js', 'utf8');
      rootNode = esprima.parse(fileContents);
      nodeMap = util.findAllFunctionNodes(rootNode);
      outputObject = new OutputNode();
      parser.parseASTRecursively(rootNode, nodeMap, outputObject);
      assert.equal(outputObject.__innerScopes__[0].__localVariables__[2].innerObj, '{Object}');
    });

  });

});
