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
console.log('done reading ',__dirname+'/db/usersAlternate.json\n');

gGameState.playersDBTable = gGameState.jsonObj.playersDBTable;
gGameState.handsDBTable = gGameState.jsonObj.handsDBTable;
gGameState.state = 0;

// show how a new property is added to the table. just assign it.
gGameState.playersDBTable["new login"] = { password: 'some new player' };
delete gGameState.playersDBTable["new login"]; // and use delete to remove it.

// add another one but notice we did not add an ID and that is not good.
gGameState.playersDBTable["other new login"] = { password: 'some new player' };

// here is how you iterate through the properties of an object. note this could be in any order
console.log('\n>> Iterate through all logins:');
for (var login in gGameState.playersDBTable) {
  if (   gGameState.playersDBTable.hasOwnProperty(login) 
      && gGameState.playersDBTable[login].hasOwnProperty('password')) {
    console.log(login," = ",gGameState.playersDBTable[login]);
  } else {
    console.log('this "login" has no password:',login," = ",gGameState.playersDBTable[login]);
  }
}

// here's how we'd access a particular property.
console.log('\n>>find a particular player and their hand:');
var player = gGameState.playersDBTable["john"];
console.log('john = ',player);
console.log("john's hand ",gGameState.handsDBTable[player.id]);

console.log('\n>>stringify playersDBTable');
console.log(JSON.stringify(gGameState.playersDBTable,null,2));
console.log('\n>>stringify handsDBTable');
console.log(JSON.stringify(gGameState.handsDBTable,null,2));

