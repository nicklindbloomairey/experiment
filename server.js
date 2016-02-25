var express = require('express');
var mysql = require('mysql');
var passport = require('passport');
var ensurelogin = require('connect-ensure-login');
var Strategy = require('passport-local').Strategy;
var csprng = require('csprng');
var md5 = require('md5');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({extended: false});
var jsonParser = bodyParser.json();

var pool = mysql.createPool({
        host: 'nick.lindbloomairey.com',
        user: 'root',
        password: '',
        database: 'users'
});

//this is the login strategy.
//'username' and 'password' are user-entered
//goal is to call 'cb' passing in the user info
passport.use(new Strategy(function(username, password, cb) {
        pool.getConnection(function(err, connection) {
                connection.query('SELECT hash, salt FROM password WHERE username=?', username, function(err, row) {
                        if (md5(password + row[0].salt) === row[0].hash) {
                                connection.query('SELECT * FROM info WHERE username=?', username, function(err, inforow) {
                                        cb(null, inforow[0]);
                                });
                        }
                }); 
        });
}));

passport.serializeUser(function(user, cb) {
        cb(null, user.id);
});

passport.deserializeUser(function(id, cb) {
        pool.getConnection(function(err, connection) {
                connection.query('SELECT * FROM info WHERE id=?', id, function(err, row) {
                        cb(null, row[0]);
                });
        });
});

//create express instance
var app = express();

//middle ware to handle sessions
app.use(require('express-session')({secret: 'secret', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());
app.use(urlencodedParser);
app.use(jsonParser);

//ROUTES

app.get('/', function(req, res) {
        res.sendFile(__dirname + '/index.html');
});

app.post('/register', jsonParser, function(req, res) {
        var salt = csprng(160, 32);
        var hash = md5(req.body.password + salt);
        var numberofusers;

        pool.getConnection(function(err, connection) {
                var info = {username: req.body.username, somedata: req.body.somedata};
                var password = {username: req.body.username, salt: salt, hash: hash};
                connection.query('INSERT INTO info SET ?', info, function(err, row) {});
                connection.query('INSERT INTO password SET ?', password, function(err, row) {});
                connection.release();
        });

        res.sendFile(__dirname + '/registerworked.html');
});

app.get('/register', function(req, res) {
        res.sendFile(__dirname + '/register.html');
});

app.post('/login', passport.authenticate('local', {failureRedirect: '/login' }), function(req, res) {
        //if the authentication worked this gets run
        res.redirect('/profile');
});

app.get('/login', function(req, res) {
        res.sendFile(__dirname + '/login.html');
});

app.get('/test', function(req, res) {
        res.sendFile(__dirname + '/test/canvas.html');
});

app.get('/test/screen.js', function(req, res) {
        res.sendFile(__dirname + '/test/screen.js');
});

app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/login');
});

app.get('/profile', ensurelogin.ensureLoggedIn(), function (req, res) {
        res.json(req.user);
});

//START THE SERVER
app.listen(80);
