var express = require('express');
var favicon = require('serve-favicon');
//var mysql = require('mysql');
var fs = require('fs');
var passport = require('passport');
var ensurelogin = require('connect-ensure-login'); //allows for logged in only pages
var Strategy = require('passport-local').Strategy; //the authentication strategy is defined locally
//var csprng = require('csprng'); //don't need this for a json database
//var md5 = require('md5');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({extended: false});
var jsonParser = bodyParser.json();

var PORT = 80;

//database connection
//here i am using a json file as our database
//mysql-server.js uses a mysql server with several tables set up
var db = {
   users: [] 
};

fs.readFile(__dirname + '/db/users.json', 'utf8', function(err, data) {
    console.log('trying to open ',__dirname+'/db/users.json');
    db.users = JSON.parse(data).users;
        console.log('SAVED ');
        console.log(db.users);
        console.log('FROM DB');
});

//this is the login strategy
passport.use(new Strategy(function(username, password, cb) {
    console.log('trying to log in with user: ' + username + ' and pass: ' + password);

    //find the user
    var user = undefined;
    for (var i = 0; i<db.users.length; i++) {
        if (username === db.users[i].username) {
            user = db.users[i];
        }
    }

    //check the password
    if (user === undefined) {
        cb(null, undefined); //fail if the user does not exist
    } else {
        if (password === user.password) {
            user.online = true;
            cb(null, user); //pass if the password works for the username given
        } else {
            cb(null, undefined); //fail is the password fails for the username given
        }       
    }
}));

//given the user object, return the id
passport.serializeUser(function(user, cb) {
    console.log('serializeuser called by user: ')
    console.log(user)
    cb(null, user.id);
});

//given the id, return the user object
passport.deserializeUser(function(id, cb) {
    console.log('deserialiseuser called by id: ' + id)
    cb(null, db.users[id-1]);
});

//create express instance
var app = express();

//middle ware to handle sessions
app.use(require('express-session')({secret: 'secret', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());
app.use(urlencodedParser);
app.use(jsonParser);
app.use(favicon(__dirname + '/favicon.ico'));

//serve the city keeper game as static for easier development
app.use('/citykeeper', express.static('citykeeper'));

//ROUTES

//our home page, these lines are in every node server
app.get('/', function(req, res) {
    res.sendFile(__dirname + '/html/index.html');
});

app.get('/favicon.ico', function(req, res) {
    res.sendFile(__dirname + '/favicon.ico');
});

app.post('/register', jsonParser, function(req, res) {
    var newUser = {
        username: req.body.username,
        password: req.body.password,
        id: db.users.length+1,
        online: false
    }
    db.users.push(newUser);

    res.sendFile(__dirname + '/html/registerworked.html');
});

app.get('/register', function(req, res) {
    res.sendFile(__dirname + '/html/register.html');
});

//the POST /login gets called by a form with username and password fields that are checked in the passport stategy
app.post('/login', passport.authenticate('local', {successRedirect: '/profile',failureRedirect: '/login' }));

app.get('/login', function(req, res) {
    res.sendFile(__dirname + '/html/login.html');
});

app.get('/lobby', function(req, res) {
    res.sendFile(__dirname + '/html/lobby.html');
});

app.post('/lobby', function(req, res) {
    var userList = {
        'online': []
    };
    for (var i = 0; i<db.users.length; i++) {
        if (db.users[i].online) {
            userList.online.push({
                'username': db.users[i].username
            });
        }
    }
    var json = JSON.stringify(userList);
    res.write(json);
    res.end();
});

app.get('/lobby.js', function(req, res) {
    res.sendFile(__dirname + '/js/lobby.js');
});

app.get('/animation', function(req, res) {
    res.sendFile(__dirname + '/html/animation.html');
});

app.get('/animation.js', function(req, res) {
    res.sendFile(__dirname + '/js/animation.js');
});

app.get('/rogue', function(req, res) {
    res.sendFile(__dirname + '/html/rogue.html');
});

app.get('/rogue.js', function(req, res) {
    res.sendFile(__dirname + '/js/rogue.js');
});

app.get('/tictactoe', function(req, res) {
    res.sendFile(__dirname + '/html/tictactoe.html');
});

app.get('/tictactoe.js', function(req, res) {
    res.sendFile(__dirname + '/js/tictactoe.js');
});

app.get('/vimrc', function(req, res) {
    res.sendFile(__dirname + '/html/vimrc.html');
});

app.get('/logout', function(req, res) {
    req.user.online=false;
    req.logout();

    res.redirect('/login');
});

//ensure login will check if you are logged in and if not will redirect to /login
app.get('/profile', ensurelogin.ensureLoggedIn(), function (req, res) {
    res.json(req.user);
});

//START THE SERVER
app.listen(PORT);
console.log('server running on port: ' + PORT)
