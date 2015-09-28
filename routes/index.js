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
  var testObj = { __contextName__: 'global',
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
           __innerScopes__: [ null ] } ] } ] };

  

  var jsonObj = JSON.stringify({
  '__contextName__': 'global',
  'hero'      :   'Gal',
  'newSaga'   :   '{f}',
  '__innerScopes__' :     [
  { 
    '__contextName__': 'newSaga',
    'foil': 'Cow',
    'saga': '{f}',
    '__innerScopes__': [
      {
        '__contextName__': 'saga',
        'deed': "Eyes"
      },
      {
        '__contextName__': 'saga',
        'deed': 'Tips'
      }
    ]
  },
  {
    '__contextName__': 'newSaga',
    'foil': 'Cat',
    'sagq': '{f}',
    '__innerScopes__': [
      {
        '__contextName__': 'saga',
        'deed': 'Rubs'
      },
      {
        '__contextName__': 'saga',
        'deed': 'Robs'
      }
    ]
  }
  ]
  });
  res.end(jsonObj);
});

module.exports = router;
