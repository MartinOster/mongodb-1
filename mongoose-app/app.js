'use strict';

var path = require('path');
var mongoose = require('mongoose');
var db = mongoose.connection;
var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var routes = require('./routes');
var PORT = 8888;

mongoose.connect('mongodb://localhost/bazinga');
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback(err) {
    if (err) throw err;

    var app = express();
    app.set('views', path.join(__dirname, '/views'));
    app.set('view engine', 'jade');
    // app.engine('jade', require('jade').__express);

    app.use(bodyParser());
    app.use(cookieParser('mongooseApp'));
    app.use(session());

    routes(app);

    app.listen(PORT, function() {
        console.log('now listening on http://localhost:' + PORT);
    });
});
