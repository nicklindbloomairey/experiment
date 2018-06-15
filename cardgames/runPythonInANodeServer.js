

var express = require('express'); // implicit use of ./node_modules/ directory
var app = express();


app.listen(8088, function() {
  console.log('server running on port 8088');
})


app.get('/name', callName);

function callName(req, res) {

  var spawn = require("child_process").spawn; // part of node?


// example of how to activate:
// http://localhost:8088/name?firstname=Nick&lastname=Will
  var pythonProcess = spawn('python',["./pythonScript.py",
    req.query.firstname,req.query.lastname ] 
//    'foo','bar' ] 
    );

console.log(' after spawn ');


// takes stdout data from python script with arguments and send this data to res object
  pythonProcess.stdout.on('data', function(data) {
    res.send(data.toString());
  } )


console.log(' after processing python output ');
 
}

console.log(' got to the end of the node server code, but asynchronous stuff could still be happening.. ');
