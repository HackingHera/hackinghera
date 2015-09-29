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


<<<<<<< HEAD
  console.log(testObj);
=======
  // var testObj = JSON.stringify({ __contextName__: 'global',
  // __localVariables__:
  //  [ { dog: 'dog' },
  //    { cat: 'cat' },
  //    { innerFunction: 'Hey what\'s up?' },
  //    { outerFunctionDog: 'outerFunctionDog' },
  //    { outerFunctionCat: 'outerFunctionCat' } ],
  // __innerScopes__:
  //  [ null,
  //    { __contextName__: 'outerFunctionDog',
  //      __localVariables__: [ { placeholder: 'value1' } ],
  //      __innerScopes__: [ null ] },
  //    { __contextName__: 'outerFunctionCat',
  //      __localVariables__: [ { placeholder: 'value2' } ],
  //      __innerScopes__: [ null ] } ] });

  // var jsonObj = JSON.stringify({
  // '__contextName__': 'global',
  // 'hero'      :   'Gal',
  // 'newSaga'   :   '{f}',
  // '__innerScopes__' :     [
  // { 
  //   '__contextName__': 'newSaga',
  //   'foil': 'Cow',
  //   'saga': '{f}',
  //   '__innerScopes__': [
  //     {
  //       '__contextName__': 'saga',
  //       'deed': "Eyes"
  //     },
  //     {
  //       '__contextName__': 'saga',
  //       'deed': 'Tips'
  //     }
  //   ]
  // },
  // {
  //   '__contextName__': 'newSaga',
  //   'foil': 'Cat',
  //   'sagq': '{f}',
  //   '__innerScopes__': [
  //     {
  //       '__contextName__': 'saga',
  //       'deed': 'Rubs'
  //     },
  //     {
  //       '__contextName__': 'saga',
  //       'deed': 'Robs'
  //     }
  //   ]
  // }
  // ]
  // });
>>>>>>> implement code mirror text editor and materialize card panels
  res.end(testObj);
});

module.exports = router;
