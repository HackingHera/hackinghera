var express = require('express');
var router = express.Router();
var esprima = require('esprima');
var util = require('../serverHelpers/utility.js');
var OutputNode =  require('../serverHelpers/outputnode.js');
var parser = require('../serverHelpers/parser.js');
// var fs = require('fs');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/api/context', function(req, res) {
  console.log('request is', req.body);

  var rootNode = esprima.parse(req.body.codeString);
  // console.log("rootNode result = ", rootNode);
  var nodeMap = util.findAllFunctionNodes(rootNode);
  // console.log("nodeMap", nodeMap);
  var outputObject = new OutputNode();
  // console.log("outputObject is:", outputObject);
  parser.parseASTRecursively(rootNode, nodeMap, outputObject);
  // console.log("outputobject: ", outputObject);

  // outputObject.formatOutput();

  res.send(JSON.stringify(outputObject));
});

module.exports = router;
