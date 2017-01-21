var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

var songs = require('./data.json'); //

var app = express();

app.use(express.static('public'));

// convert any url encoded body into a JS object
// added to req.body
app.use(bodyParser.urlencoded({extended: true}));







app.listen(5000);
