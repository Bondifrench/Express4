
//Base Setup
var express = require("express");
var app = express();
var port = process.env.PORT || 8080;
var bodyParser = require('body-parser');

app.use(bodyParser());

var router = express.Router(); //get an instance of the Express router

//test route to check if everything is working
router.get('/', function (req, res) {
	res.json({message: 'Welcome to our api!'})
});

//Register our routes
//all of our routes will  be rpefixed with /api
app.use('/api', router);


app.listen(port);
console.log("Server started on port: "+ port);
