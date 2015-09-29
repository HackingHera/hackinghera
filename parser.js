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
  } else {}
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

module.exports.parseASTRecursively = function(rootNode, nodeMap, currentExecutionContext) {

  var kids = childrenOf(rootNode);
  var val;
  var params;
  var funcKey;
  // console.log(kids);
  if (kids && kids.length) {
    for (var i = 0; i < kids.length; i++) {
      var funcStorage = {};
      if (kids[i].type === 'FunctionDeclaration') {
        funcKey = funcDeclarations(kids[i].id.name);
        if (kids[i].params) {
          params =  '{f}' + '(' + outputParams(kids[i].params) + ')';
        }
          // funcStorage[funcKey] = params;
          // currentExecutionContext.addLocalVariable(funcStorage);
        //}
        // if (kids[i].body.type === 'BlockStatement') {
        //   //console.log(kids[i].body);
        //   var arr = [];
        //   R.forEach(function(item) {
        //     if (item.argument.left.value || item.argument.right.value) {
        //     arr.push(item.argument.left.value || item.argument.right.value);
        //     }
        //   }, kids[i].body.body);
          funcStorage[funcKey] = params;//.concat(arr);
          currentExecutionContext.addLocalVariable(funcStorage);
        //}
      }
      if (kids[i].type === 'VariableDeclaration') {
        for (var j = 0; j < kids[i].declarations.length; j++) {
          var currentDeclaration = kids[i].declarations[j];
          var expressionBeingAssigned = currentDeclaration.init.type;
          var localVariable = {};
          var key = currentDeclaration.id.name;
          if (expressionBeingAssigned === 'FunctionExpression') {
            if (expressionBeingAssigned.params) {
              console.log(expressionBeingAssigned.params);
              params = outputParams(expressionBeingAssigned.params);
              localVariable[key] = params;
              currentExecutionContext.addLocalVariable(localVariable);
            } else if (currentDeclaration.init.body.body.length === 0) {
              val = currentDeclaration.id.name;
            } else {
              var check = currentDeclaration.init.body.body[0].argument;
              if (check !== undefined) {
                val = currentDeclaration.init.body.body[0].argument.value;
              } else if (currentDeclaration.id.name) {
                val = currentDeclaration.id.name;
              }
            }
          } else if (expressionBeingAssigned === 'CallExpression') {
            val = currentDeclaration.init.callee.name + '()';
          } else if (expressionBeingAssigned === 'VariableDeclarator') {
            key = expressionBeingAssigned.id.name;
            console.log(key);
            localVariable[key]  = '{f}';//outputParams(expressionBeingAssigned.init.params);
          }
          localVariable[key] = val;
          currentExecutionContext.addLocalVariable(localVariable);
        }
      } else if (kids[i].type == 'ExpressionStatement') {
        var ctxName = kids[i].expression.callee.name;
        if (ctxName !== undefined) {
          var nodeAdded = currentExecutionContext.addChildOutputNode(ctxName);
          parseASTRecursively(nodeMap[ctxName], nodeMap, nodeAdded);
        }
      }
    }
  }
};

// fs.readFile('parseme.js', 'utf8', function(err, data) {
//   if (err) {
//     return console.log(err);
//   }
//   var rootNode = esprima.parse(data);
//   var nodeMap = findAllFunctionNodes(rootNode);
//   var outputObject = new OutputNode();
//   //console.log(deepInspect(rootNode));
   // parseASTRecursively(rootNode, nodeMap, outputObject);
//   console.log(deepInspect(outputObject));

// });
