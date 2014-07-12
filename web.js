//web.js

//set up
//get all the tools we need
var express= require('express');

var port = process.env.PORT || 8080;
var passport =  require('passport');
var flash = require('connect-flash');

var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var app = express();

//var configDB = require('./config/database.js');

//configuration
app.use(morgan('dev')); //log every request to the console
app.use(cookieParser()); //read cookies, needed for auth
app.use(bodyParser.json()); //get information from html forms
app.use(bodyParser.urlencoded({extended: true}));

app.set('views', __dirname + '/app/client/views');
app.set('view engine', 'jade'); //setup jade for templating
app.engine('jade', require('jade').__express)
app.use(express.static(__dirname+'/app/client'))

//required for passport
//require('./config/passport')(passport) //pass passport for configuration

app.use(session({
	secret: 'notveryoriginalsecretpassword',
	resave: true,
	saveUninitialized: true})); //session secret
app.use(passport.initialize());
app.use(passport.session()); //persistent login sessions
app.use(flash());//use connect flash for flash messages stored in session

require('./app/routes.js')(app, passport); //load our routes and pass in our app and fully configured passport

//launch
app.listen(port);
console.log('App is listening on port: '+ port);