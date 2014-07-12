var express = require("express");
var app = express();
//Routes for our API, see last line app.use('/api')
var Bear = require('./models/bear')

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
// on routes that end in /bears
router.route('/bears')
	//create a bear (accessed at POST  http://localhost:8080/api/bears)
	.post(function (req, res) {
		// Create a new instance of the Bear model
		console.log(req.body.name);
		Bear.create({
			name: req.body.name
		}).success(function (bear) {
			res.json({message: 'Bear created'});
		}).error(function (err) {
			console.log('The instance has not been saved: ', err);
		})				
	})
	//get all the bears (accessed at GET http://localhost:8080/api/bears)
	.get(function (req, res) {
		Bear.findAll()
		.success(function (bears) {
			res.json(bears);
		})
		.error(function (err) {
			res.send(err);
		})
	})
//on routes that end in /bears/:bear_id
router.route('/bears/:bear_id')
	.get(function (req, res) {
		Bear.find(req.params.bear_id)
			.success(function (bear) {
				res.json(bear);
			})
			.error(function (err) {
				res.send(err);
			})
	})
	//update the bear with this id (accessed at PUT http://localhost:8080/api/bears/:bear_id)
	.put(function (req, res) {
		Bear.find(req.params.bear_id)
			.success(function (bear) {
				bear.updateAttributes({name: req.body.name}).success(function () {
					res.json({message:'Bear updated!'});
				}).error(function (err) {
					res.send(err)
				});
			})
			.error(function (err) {
				res.send(err);
			})
	})
	//delete the bear with this id (accessed at DELETE http://localhost:8080/api/bears/:bear_id)
	.delete(function (req, res) {
		Bear.find(req.params.bear_id)
			.success(function (bear) {
				bear.destroy().success(function () {
					res.json({message:'Bear was successfully deleted'});
				}).error(function (err) {
					res.send(err);
				})
			})
			.error(function (err) {
				res.send(err);
			})
	})

module.exports = router