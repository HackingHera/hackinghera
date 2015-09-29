var express = require('express');
var router = express.Router();
var esprima = require('esprima');
var util = require('../utility.js');
var OutputNode =  require('../outputnode.js');
var parser = require('../parser.js');



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/api/context', function(req, res) {
  console.log('request is', req.body.codeString);
  // res.writeHead(200);
  

  var rootNode = esprima.parse(req.body.codeString);
  // console.log(rootNode);
  var nodeMap = util.findAllFunctionNodes(rootNode);
  //console.log(nodeMap);
  var outputObject = new OutputNode();
  console.log(outputObject);
  //console.log(deepInspect(rootNode));
  parser.parseASTRecursively(rootNode, nodeMap, outputObject);
  //console.log(outputObject);
  // TODO: get actual response obj
  outputObject.formatOutput();
  var testObj = JSON.stringify(outputObject);  


  console.log(testObj);
  res.end(testObj);
});

module.exports = router;
