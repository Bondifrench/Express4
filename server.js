//Base Setup
var express = require("express");
var app = express();
var http = require('http');
//var port = process.env.PORT || 8000;
var morgan = require('morgan');
var bodyParser = require('body-parser');

var Bear = require('./app/models/bear')
var router = require('./app/testroute')

app.set('port', process.env.PORT || 8080)
app.use(morgan('dev')); //log every request to the console
app.use(bodyParser());

//Register our routes
//all of our routes will be prefixed with /api
app.use('/api', router);

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.send(500, 'Something broke!');
});

Bear
	.sequelize
	.sync() //if argument is {force: true}, this will drop the table first and re-create it afterwards
	.complete(function (err) {
		if (err) {
			throw err;
		} else {
			http.createServer(app).listen(app.get('port'), function () {
				console.log('Listening on  '+ app.get('port'));
			});
		}
	})