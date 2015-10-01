
/* parsing of local variables */
var firsString = 'valueheregoesitdoes';
var numero = 23;
var nnnnnnnull = null;
//var unnnnndefined = undefined;
var abool = true;
var otherbool = false;
var identifiesVariableThing = ['hey', 'dude'];
var aNumArray = [1,2,3,4];
var identifiesObjectLiteral = {'key':'noValHere'};
//function someFuncHere() {
//
//};
//var anotherFNHere = function() {
//
//};

// Expect
/*
var res = {  __contextName__: 'global',
             __localVariables__:
             [ { firsString: 'valueheregoesitdoes' },
             { numero: 23 },
             { nnnnnnnull: null },
             { unnnnndefined: undefined },
             { abool: true },
             { otherbool: false },
             { identifiesVariableThing: 'Array[2]' },
             { aNumArray: 'Array[4]' },
             { identifiesObjectLiteral: '{Object}' },
             { someFuncHere: '{f}' },
             { anotherFNHere: '{f}' } ],
             __innerScopes__: [ null ] }
 */