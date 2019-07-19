// STEP1: importing all predefined modules
var express = require("express");
var cors = require("cors");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var fs = require('fs');
var morgan = require('morgan');
var path = require('path');
// importing userdefined model 
var User = require('./models/user.model');

// creating app object to start server
var app = express();

// STEP2: CONFIGURE VIEW ENGINE IS OPTIONAL HERE


// STEP3: CONNECT YOUR MONGODB - mongodb url
mongoose.connect('mongodb://localhost:27017/users',
	{ useNewUrlParser: true });

// STEP4: CONFIGURE MIDDLEWARE
// parse requests of ENCODING-TYPE - 
// application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// parse requests of content-type - application/json
app.use(bodyParser.json());

// STEP5: DEFINE ROUTES
// create router object to create userfriendly urls
// routes logic will come here
var router = express.Router();

// MORGAN LOGGING
var accessLogStream =
	fs.createWriteStream(path.join(__dirname, 'access.log'),
		{ flags: 'a' });

// setup the logger
// app.use(morgan('dev', { stream: accessLogStream }))
app.use(morgan('combined', { stream: accessLogStream }))

// using Middlewares
// MOUNT ROUTE PATH - executed for each request and response
router.use(function (req, res, next) {
	// do logging 

	// MANUAL LOGGING
	// if (req.method == "GET")
	// 	accessLogStream.write(req.method + ' ' + req.url
	// 		+ ' All users are or User is retrieved at ' + new Date() + '\n');
	// else if (req.method == "POST")
	// 	accessLogStream.write(req.method + ' ' + req.url
	// 		+ ' New User has been ADDED at ' + new Date() + '\n');
	// else if (req.method == "PUT")
	// 	accessLogStream.write(req.method + ' ' + req.url
	// 		+ '  User has been MODIFIED at ' + new Date() + '\n');
	// else if (req.method == "DELETE")
	// 	accessLogStream.write(req.method + ' ' + req.url
	// 		+ ' User has been DELETED at ' + new Date() + '\n');

	// do authentication 
	console.log('Logging of request will be done here');
	// make sure we go to the next routes and don't stop here
	next();
});

// CREATE
router.route('/users').post(function (req, res) {
	var user = new User();
	user.firstName = req.body.firstName;
	user.lastName = req.body.lastName;
	user.age = req.body.age;
	user.mobileNumber = req.body.mobileNumber;
	user.email = req.body.email;
	user.password = req.body.password;

	user.save(function (err) {
		if (err) {
			res.send(err.stack);
			return;
		}
		console.log("added");
		res.send({ message: 'User Created !' })
	})
});

// read
router.route('/users').get(function (req, res) {
	User.find(function (err, users) {
		if (err) {
			res.send(err.stack);
			return;
		}
		res.send(users);
	});
});

// 	User.findById(req.params.id, 'firstName lastName age mobileNumber email password',
// get by Id
router.route('/users/:id')
	.get(function (req, res) {
		User.findById(req.params.id, { __v: 0 },
			function (err, user) {
				if (err) {
					res.send(err.stack);
					return;
				}
				res.json(user);
			});
	});

// update
router.route('/users/:id')
	.put(function (req, res) {
		User.findById(req.params.id,
			function (err, user) {
				if (err) {
					res.send(err.stack);
					return;
				}
				user.firstName = req.body.firstName;
				user.lastName = req.body.lastName;
				user.age = req.body.age;
				user.mobileNumber = req.body.mobileNumber;
				user.email = req.body.email;
				user.password = req.body.password;
				user.save(function (err) {
					if (err) {
						res.send(err.stack);
						return;
					}

					res.json({ message: 'User updated!' });
				});
			});
	});

// delete
router.route('/users/:id')
	.delete(function (req, res) {
		User.remove({ _id: req.params.id },
			function (err, user) {
				if (err) {
					res.send(err.stack);
					return;
				}
				res.json({ message: 'User successfully deleted' });
			})

		// User.findByIdAndRemove({_id: req.params.id}, 
		// 				(err, user) => {
		// if (err)
		// res.json(err);
		// else
		// res.json('Removed successfully');
		// });
	});

// middlewares
app.use(cors());
app.use('/api', router);
app.listen(8090);

console.log('REST API is runnning at 8090');