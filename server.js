// set up 
var express = require('express');
var app = express(); 						// Creates app varible for express
var mongoose = require('mongoose'); 				// mongoose for mongodb
var port = process.env.PORT || 8080; 				// sets the local port to use
var database = require('./config/database'); 			// load the database config
var morgan = require('morgan');                 //used to log requests to the console
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

// config
mongoose.connect(database.localUrl); 	// Connect to local database (also works with remote DB.  To use remote DB change 'localUrl' to 'remoteUrl' on line 12) 

app.use(express.static('./public')); 		// sets the static files location /public/img will be /img for users
app.use(morgan('dev')); // log every request to the console
app.use(bodyParser.urlencoded({'extended': 'true'})); 
app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.json({type: 'application/vnd.api+json'})); // parse application/vnd.api+json as json
app.use(methodOverride('X-HTTP-Method-Override'));  

// routes 
require('./app/routes.js')(app);

// listen (start app with 'node server.js') 
app.listen(port);
console.log("App listening on port " + port);
