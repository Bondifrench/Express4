
//Base Setup
var express = require("express");
var app = express();
var port = process.env.PORT || 8000;
var bodyParser = require('body-parser');
var Bear = require('./app/models/bear')
app.use(bodyParser());

//

var router = express.Router(); //get an instance of the Express router
//middleware to use for all requests
router.use(function (req, res, next) {
	// Do logging
	console.log('Something is happening!');
	next(); // Make sure we go to the next routes and don't stop here
})


//test route to check if everything is working
router.get('/', function (req, res) {
	res.json({message: 'Welcome to our api!'})
});

//Register our routes
//all of our routes will  be rpefixed with /api
app.use('/api', router);

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.send(500, 'Something broke!');
});

app.listen(8080);
console.log("Server started on port: "+ 8080);
//console.log(host + ',' + port + ',' + dbname+ ',' + user+ ',' + password);