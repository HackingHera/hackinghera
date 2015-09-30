var OutputNode = function(ctxName) {
  ctxName = ctxName || 'global';
  this.__contextName__ = ctxName;
  this.__localVariables__ = [];
  this.__innerScopes__ = [];
};

OutputNode.prototype.addLocalVariable = function(localVarObj) {
  this.__localVariables__.push(localVarObj);
};
OutputNode.prototype.addChildOutputNode = function(ctxName) {
  var nodeToAdd = new OutputNode(ctxName);
  this.__innerScopes__.push(nodeToAdd);
  return nodeToAdd;
};
OutputNode.prototype.formatOutput = function() {
  if (this.__innerScopes__.length == 0) {
    this.__innerScopes__.push(null);
  } else {
    for (var i = 0; this.__innerScopes__.length; i++) {
      this.__innerScopes__[i].formatOutput();
    }
  }
};

module.exports = OutputNode;
