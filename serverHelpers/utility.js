var util = require('util');
var esprima = require('esprima');
var fs = require('fs');

module.exports.findAllFunctionNodes = function(inputTree) {
  var functionMapping = {};
  traverse(inputTree, function(nd) {
    if (nd.type === 'FunctionDeclaration') {
      functionMapping[nd.id.name] = nd;
    }
    if (nd.type === 'VariableDeclaration') {
      for (var x = 0; x < nd.declarations.length; x++) {
        if(nd.declarations[x].init === null) {
          continue;
        } else if (nd.declarations[x].init.type === 'FunctionExpression') {
          functionMapping[nd.declarations[x].id.name] = nd.declarations[x];
        }
      }
    }
  });
  return functionMapping;
};

function traverse(node, func) {
  func(node);
  for (var key in node) {
    if (node.hasOwnProperty(key)) {
      var child = node[key];
      if (typeof child === 'object' && child !== null) {
        if (Array.isArray(child)) {
          child.forEach(function(node) {
            traverse(node, func);
          });
        } else {
          traverse(child, func);
        }
      }
    }
  }
}