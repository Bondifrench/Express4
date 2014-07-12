//app/routes.js

module.exports = function (app, passport) {
	// Home Page with login links
	app.get('/', function (req, res) {
		res.render('index'); //load the index.jade file
	});

	//Login page =========================================
	//Show the login form
	app.get('/login', function (req, res) {
		res.render('login.jade', {message: req.flash('loginmessage')});
	});

	//process login form
	//app.post('/login', do all our passport stuff here);

	//Sign-up =============================================
	//Show the sign-up form here
	app.get('/signup', function (req, res) {
		res.render('signup.jade', {message: req.flash('signupmessage')})
	});

	//process signup form
	//app.post('/signup', do all our passport stuff here);

	//Profile section ===================================
	//we want this protected so we have to be logged in to visit
	//we will use route middlewares to verify this (this is the isLoggedIn function)
	app.get('/profile', isLoggedIn, function (req, res) {
		res.render('profile.js', {
			user:req.user //get the user out of section and send it to template
		});
	});

	//Logout =============================================
	app.get('/logout', function (req, res) {
		req.logout();
		res.redirect('/');
	})

	// route middleware to make sure a user is logged in
	function isLoggedIn (req, res, next) {
		// if user is authenticated in the session, carry on
		if (req.isAuthenticated())
			return next();
		// if they are not, redirect to home page
		res.redirect('/');
	}
}