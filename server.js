#!/usr/bin/env Node

//Base Setup
var express = require("express");
var app = express();
var port = process.env.PORT || 8080;

// $routeParams
//We'll define our routes here
var router = express.Router();
//route middleware that will happen on every request
router.use(function (req, res, next) {
	//log each request to the console
	console.log(req.method, req.url);
	//continue doing what we were doing and go to the route 
	next();
})

router.param("name", function (req, resp, next, name) {
	// Do validation on name here
	//blah blah validation
	//log something so we know it works here
	console.log("doing name validations on "+name);
	//once validation is done save the new item in the req
	req.name = name;
	//go to the next thing
	next();
})
//The order you place your middleware and routes is very important. Everything will happen in the order
//that they appear. This means that if you place your middleware after a route, then the route will happen
// before the middleware and the request will end there. Your middleware will not run at that point.

//home page route (http://localhost:8080)
router.get("/", function (req, res) {
	res.send("I'm in the home page!");
});
//about page route (http://localhost:8080/about)
router.get("/about", function (req, res) {
	res.send("This is the about page!");
});
// route with parameters (http://localhost:8080/hello/:name)
router.get("/hello/:name", function (req, res) {
	res.send("Hello " + req.params.name +"!");
});

//apply the routes to our application
app.use("/", router);

//Notice how we can set a default root for using these routes we just defined.
//If we had changed line 21 to app.use('/app', router), then our routes would be http://localhost:8080/app
// and http://localhost:8080/app/about.

//This is very powerful because we can create multiple express.Router()s and then apply them to our application.
//We could have a Router for our basic routes, authenticated routes, and even API routes.


//Start the server
app.listen(port);
console.log("Server started on port: "+ port);
