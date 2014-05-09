#!/usr/bin/env Node

//Base Setup

var express = require("express");
var app = express();
var port = process.env.PORT || 8080;

// $routeParams
//Sample route with a route we used to setElement
app.get("/sample", function (req, res) {
	res.send("this is a sample!");
});
//We'll define our routes here

//Start the server

app.listen(port);
console.log("Server started on port: "+ port);
