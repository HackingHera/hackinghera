var util = require('util');
var esprima = require('esprima');
var fs = require('fs');
// var helper = require('./utility.js');
var OutputNode = require('./outputnode.js');
var R = require('ramda');

module.exports.deepInspect = function(node) {
  var obj = {
    colors: true,
    depth: null
  };
  return util.inspect(node, obj);
};

var childrenOf = function(node) {
  var directChildrenNodes;
  if (node === undefined) {
    return;
  }
  if (node.type == 'Program') {
    directChildrenNodes = node.body;
  } else if (node.type == 'VariableDeclarator') {
    directChildrenNodes = node.init.body.body;
  } else if(node.type == 'FunctionExpression') {
    console.log('here in here');
  } else if(node.type == 'FunctionDeclaration') {
    directChildrenNodes = node.body.body;
  } else {

  }
  return directChildrenNodes;
};

var funcDeclarations = function(declarations) {
  var ctxName = declarations;
  return ctxName;
};

var outputParams = function(params) {
  var arr = [];
  R.forEach(function(item) {
    arr.push(item.name);
  }, params);
  return arr;
};

var varDeclarations = function(type) {

};

var createLocalVariable = function() {

};

var funcExpression = function() {

};

var callExpression = function() {

};

var expressionStatement = function() {

};

var parseASTRecursively = function(rootNode, nodeMap, currentExecutionContext) {

  var kids = childrenOf(rootNode);
  var val;
  var params;
  var funcKey;
  if (kids && kids.length) {
    for (var i = 0; i < kids.length; i++) {
      var funcStorage = {};
      var currentNode = kids[i];
      if (kids[i].type === 'FunctionDeclaration') {
        funcKey = funcDeclarations(kids[i].id.name);
        if (kids[i].params) {
          params =  '{f}';// + '(' + outputParams(kids[i].params) + ')';
        }
        funcStorage[funcKey] = params;//.concat(arr);
        currentExecutionContext.addLocalVariable(funcStorage);
      }
      if (kids[i].type === 'VariableDeclaration') {
        for (var j = 0; j < kids[i].declarations.length; j++) {
          var currentDeclaration = kids[i].declarations[j];
          var expressionBeingAssigned;
          if(currentDeclaration.init!==null) {
            expressionBeingAssigned = currentDeclaration.init.type;
          }
          var localVariable = {};
          var key = currentDeclaration.id.name;
          if(expressionBeingAssigned===null) {
            val = '{undefined}';
          } else if(!currentDeclaration.init) {
            val = '{undefined}';
          } else if(expressionBeingAssigned === 'FunctionExpression') {
            val = '{f}';
          } else if (expressionBeingAssigned === 'CallExpression') {
            if(currentDeclaration.init.callee.name) {
              val = currentDeclaration.init.callee.name + '()';
            } else if(currentDeclaration.init.callee.body.type == 'BlockStatement') {
              var arr = currentDeclaration.init.callee.body.body;
              if(arr.length === 0) {
                val = undefined;
              } else {
                for(var k=0; k<arr.length; k++) {
                  if(arr[k].type=='ReturnStatement'){
                    val = arr[k].argument.value;
                  }
                }
              }
            }
          } else if (expressionBeingAssigned === 'Literal') {
            var tmpVal = currentDeclaration.init.value;
            if(tmpVal===null){
              val = '{Null}';
            } else {
              val = tmpVal;
            }
          } else if (expressionBeingAssigned === 'ArrayExpression') {
            val = 'Array['+currentDeclaration.init.elements.length+']';
          } else if (expressionBeingAssigned === 'ObjectExpression') {
            val = '{Object}';
          } else if (currentDeclaration.init.name === 'undefined') {
            val = '{undefined}';
          }
          localVariable[key] = val;
          currentExecutionContext.addLocalVariable(localVariable);
        }
      } else if (kids[i].type == 'ExpressionStatement') {
        var currentNode = kids[i];
        if(currentNode.expression) {
          var currentExpression = currentNode.expression;
          if(currentExpression.type=='CallExpression'){
            // ex: doSomething();
            if (kids[i].expression.callee.name !== undefined) {
              var nodeAdded = currentExecutionContext.addChildOutputNode(kids[i].expression.callee.name);
              parseASTRecursively(nodeMap[kids[i].expression.callee.name], nodeMap, nodeAdded);
            }
          } else if(currentExpression.type == 'UpdateExpression') {
            // ex: num--;
            // TODO Handle this
            console.log('handle num--');
          }
        }
      }
    }
  }
};

module.exports.parseASTRecursively = parseASTRecursively;