var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/api/context', function(req, res) {
  console.log('request is', req.body);
  res.writeHead(200);
  
  // TODO: get actual response obj
  var testObj = JSON.stringify({ __contextName__: 'global',
 __localVariables__: [ { hero: 'aHero()' }, { newSaga: '{f}' } ],
 __innerScopes__: 
  [ { __contextName__: 'newSaga',
      __localVariables__: [ { foil: 'aFoil()' }, { saga: '{f}' } ],
      __innerScopes__: 
       [ { __contextName__: 'saga',
           __localVariables__: [ { deed: 'aDeed()' } ],
           __innerScopes__: [ null ] },
         { __contextName__: 'saga',
           __localVariables__: [ { deed: 'aDeed()' } ],
           __innerScopes__: [ null ] } ] },
    { __contextName__: 'newSaga',
      __localVariables__: [ { foil: 'aFoil()' }, { saga: '{f}' } ],
      __innerScopes__: 
       [ { __contextName__: 'saga',
           __localVariables__: [ { deed: 'aDeed()' } ],
           __innerScopes__: [ null ] },
         { __contextName__: 'saga',
           __localVariables__: [ { deed: 'aDeed()' } ],
           __innerScopes__: [ null ] } ] } ] });  

  res.end(testObj);
});

module.exports = router;
