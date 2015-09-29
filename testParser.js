var esprima = require('esprima');
var util = require('./utility.js');
var OutputNode =  require('./outputnode.js');
var parser = require('./parser.js');
var fs = require('fs');





fs.readFile('parseme.js', 'utf8', function(err, jsString) {
  if (err) {
    return console.log(err);
  }
  var rootNode = esprima.parse(jsString);
  var nodeMap = util.findAllFunctionNodes(rootNode);
  var outputObject = new OutputNode();
  parser.parseASTRecursively(rootNode, nodeMap, outputObject);
  outputObject.formatOutput();




  //console.log(parser.deepInspect(outputObject));

});