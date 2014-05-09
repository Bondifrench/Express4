#!/usr/bin/env Node

//Base Setup

var express = require("express");
var app = express();
var port = process.env.PORT || 8080;

// $routeParams
//We'll define our routes here
var router = express.Router();

//home page route (http://localhost:8080)
router.get("/", function (req, res) {
	res.send("I'm in the home page!");
});
//about page route (http://localhost:8080/about)
router.get("/about", function (req, res) {
	res.send("This is the about page!");
});

//apply the routes to our application

app.use("/", router);

//Start the server

app.listen(port);
console.log("Server started on port: "+ port);
