// this section is our dependencies on other node modules and very similar code, more like #include in C, etc.
var fs = require('fs');

// okay, sorta kinda start the server code here...

/*
     'real' server execution actually starts here ?
*/

var gGameState = {};

// read in our game and config files or connect to our database if we had one

// we do this synchronously so that we have this data before we move on to the rest of the game.
console.log('trying to open ',__dirname+'/db/usersAlternate.json');
gGameState.jsonObj = JSON.parse(fs.readFileSync(__dirname+'/db/usersAlternate.json','utf8'));
console.log('done reading ',__dirname+'/db/usersAlternate.json');

gGameState.playersDBTable = gGameState.jsonObj.playersDBTable;
gGameState.handsDBTable = gGameState.jsonObj.handsDBTable;
gGameState.state = 0;

var player = gGameState.playersDBTable["john"];

console.log('john = ',player);

console.log("john's hand ",gGameState.handsDBTable[player.id]);

