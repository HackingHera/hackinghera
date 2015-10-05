var express = require('express');
var router = express.Router();
var esprima = require('esprima');
var util = require('../serverHelpers/utility.js');
var OutputNode =  require('../serverHelpers/outputnode.js');
var parser = require('../serverHelpers/parser.js');

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/api/context', function(req, res) {
  console.log('request is', req.body);

  var rootNode = esprima.parse(req.body.codeString);
  console.log(parser.deepInspect(rootNode));
  // console.log("rootNode result = ", rootNode);
  var nodeMap = util.findAllFunctionNodes(rootNode);
  // console.log("nodeMap", nodeMap);
  var outputObject = new OutputNode();
  // console.log("outputObject is:", outputObject);
  parser.parseASTRecursively(rootNode, nodeMap, outputObject);
  // console.log("outputobject: ", outputObject);

  var retThis = JSON.stringify(outputObject);

  console.log(outputObject);
  res.send(retThis);
});

module.exports = router;
