var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var expressLayouts = require('express-ejs-layouts');
var index = require('./routes/index');
var connection  = require('express-myconnection');
var session = require('express-session');
var mysql = require('mysql');
var keys = require('./config');
const cacheTime = 86400000 * 30;
var app = express();

var dbOptions = {
	host     : keys.DB_HOST,
	user     : keys.DB_USER,
	password : keys.DB_PASSWORD,
	database : keys.DB_DATABASE
}

app.use(
    connection(mysql, dbOptions,'pool')
);

app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressLayouts);
app.use(express.static(path.join(__dirname, 'dist'), {
	maxAge: cacheTime
}));
app.use('/', index);

app.listen(process.env.PORT || keys.PORT);

module.exports = app;